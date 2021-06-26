import { _decorator, Component, instantiate, Node, Prefab } from "cc";
import StorageManager from "../../services/StorageManager";
import RouterManager from "../../services/RouterManager";
import Api from "./api";
import Utils from "./utils";

const { ccclass, property } = _decorator;

@ccclass("Login")
export class Login extends Component {
  /**
   * 登录按钮
   */
  btnLogin: any = undefined;

  /**
   * 模态对话框
   */
  dlgModal: any = undefined;

  /**
   * 画布对象
   */
  @property(Node)
  m_canvas: any = undefined;

  /**
   * 预制体-对话框
   */
  @property(Prefab)
  m_prefabDlg: any = undefined;

  start() {
    console.log("Login start...");
    this.init();

    // [3]
  }

  // update (deltaTime: number) {
  //     // [4]
  // }

  onEnable() {
    console.log("Login onEnable");
    this.regEvent();
  }

  onDisable() {
    console.log("Login onDisable");
    this.unRegEvent();
  }

  onDestroy() {
    console.log("Login onDestroy");
  }

  /**
   * 页面初始化
   */
  init() {
    Utils.passiveShare();
  }

  /**
   * 注册事件
   */
  regEvent() {
    this.btnLogin = Utils.createLoginButton();
    if (this.btnLogin) {
      this.btnLogin.onTap(this.hanldeBtnLoginClick);
      this.btnLogin.show();
    }
  }

  /**
   * 注销事件
   */
  unRegEvent() {
    if (this.btnLogin) {
      this.btnLogin.offTap(this.hanldeBtnLoginClick);
      this.btnLogin.destroy();
      this.btnLogin = undefined;
    }
  }

  /**
   * 点击登录按钮
   */
  async hanldeBtnLoginClick(res: any) {
    const userInfo = res?.userInfo;
    console.log("hanldeBtnLoginClick", userInfo);
    if (userInfo) {
      StorageManager.setStorageSync("USERINFO", userInfo);
      const res = await Api.getUserInfo({});
      console.log("Login getUserInfo", res);
      RouterManager.navigateTo("Main");
    }
  }

  /**
   * 点击公告按钮
   */
  async handleBtnNoticeClick() {
    console.log("handleBtnNoticeClick");
    if (this.btnLogin) {
      this.btnLogin.hide();
    }
    this.dlgModal = instantiate(this.m_prefabDlg);
    const dlgModal = this.dlgModal.getComponent("DialogModal");

    dlgModal.setDialogTitle("公告");
    dlgModal.setDialogContent("公告内容丫");
    dlgModal.setBtnConfirmActive(false);
    dlgModal.setLabelConfirm("sssssss");
    this.m_canvas.addChild(this.dlgModal);
  }

  /**
   * 点击测试按钮
   */
  async handleBtnTestClick() {
    console.log("handleBtnTestClick");
    RouterManager.navigateTo("Main");
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
