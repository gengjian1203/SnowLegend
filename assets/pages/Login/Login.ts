import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Login")
export class Login extends Component {
  // [1]
  // dummy = '';

  // [2]
  // @property
  // serializableDummy = 0;
  start() {
    console.log("Login start...");
    this.passiveShare();
    // [3]
  }

  // update (deltaTime: number) {
  //     // [4]
  // }

  // 点击测试功能
  handleBtnTestClick() {
    console.log("handleBtnTestClick");
  }

  // 监听被动分享
  passiveShare() {
    // 监听小程序右上角菜单的「转发」按钮
    // @ts-ignore
    if (typeof wx === "undefined") {
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
  }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
