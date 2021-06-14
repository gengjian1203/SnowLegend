import { sys } from "cc";

/**
 * 监听被动分享
 * @returns
 */
export const passiveShare = () => {
  // 监听小程序右上角菜单的「转发」按钮
  if (sys.platform !== sys.WECHAT_GAME) {
    return;
  }
  // 显示当前页面的转发按钮
  // @ts-ignore
  wx.showShareMenu({
    success: (res: any) => {
      console.log("开启被动转发成功！");
    },
    fail: (err: any) => {
      console.log("开启被动转发失败！", err);
    },
  });
  // 获取当前转发人的信息，
  // @ts-ignore
  wx.onShareAppMessage(() => {
    return {
      title: "雪人坛说，等你来玩~",
      imageUrlId: "8io3vSE1RFKdT3hm9bNIOA==",
      imageUrl:
        "https://mmocgame.qpic.cn/wechatgame/2gGBq1F0NK3s6JyIkVPYxknqibqcZql0IOX2iag0c7477lialpFGf5ru3EMapicJNiaRx/0", // 分享图片要放在 wechatgame/res/raw-assets 路径下
      query: `shareId=`,
    };
  });
};

/**
 * 创建登录按钮
 * @returns
 */
export const createLoginButton = () => {
  if (sys.platform !== sys.WECHAT_GAME) {
    return;
  }
  //获取系统信息的宽度
  // @ts-ignore
  let sysInfo = wx.getSystemInfoSync();
  let screenW = sysInfo.screenWidth;
  let screenH = sysInfo.screenHeight;
  let rate = screenW / 750; //设计分辨率为750*1334
  //根据你图片的大小调整对应的长宽高，并且在不同的分辨率下大小也会对应变化，我的图片是418*160
  let width = 251 * rate;
  let height = 108 * rate;
  // @ts-ignore
  const button = wx.createUserInfoButton({
    type: "image",
    image:
      "https://mmocgame.qpic.cn/wechatgame/2gGBq1F0NK3s6JyIkVPYxknqibqcZql0IOX2iag0c7477lialpFGf5ru3EMapicJNiaRx/0", // 图片的位置是在打包构建后的bulid里的根目录开始而不是项目目录
    style: {
      // 设置位置
      left: screenW / 2 - width / 2,
      top: screenH - 160,
      width: width,
      height: height,
    },
  });
  return button;
};

export default {
  passiveShare,
  createLoginButton,
};
