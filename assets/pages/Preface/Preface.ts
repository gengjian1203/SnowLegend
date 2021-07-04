import {
  _decorator,
  Component,
  instantiate,
  Node,
  Label,
  EditBox,
  Prefab,
} from "cc";
import Api from "../../api";
import IDManager from "../../services/IDManager";
import RouterManager from "../../services/RouterManager";
import StorageManager from "../../services/StorageManager";
import UtilsManager from "../../services/UtilsManager";
import name from "./config/name";

const { ccclass, property } = _decorator;

@ccclass("Preface")
export class Preface extends Component {
  strIndex = 0;
  bFinish = false;
  strContent =
    `序章\n` +
    `\n` +
    `这一天你打开了手机，\n` +
    `忽然手机出现了一个漩涡，\n` +
    `将你吸入其中，\n` +
    `...\n` +
    `等你醒过来的时候，\n` +
    `你发现来到了一个陌生的世界，\n` +
    `看了看周围的人，\n` +
    `似熟悉又陌生，\n` +
    `...\n` +
    `如今的你，\n` +
    `只好随遇而安，\n` +
    `而这个神奇的世界，\n` +
    `将会给你带来一段奇妙的旅程。\n`;

  /**
   * 选择对话框
   */
  dlgSelect: any = undefined;

  /**
   * 画布对象
   */
  @property(Node)
  m_canvas: any = undefined;

  /**
   * 黑色蒙版
   */
  @property(Node)
  m_mask: any = null;

  /**
   * 文字内容叙述
   */
  @property(Node)
  m_labelContent: any = null;

  /**
   * 起名对话框
   */
  @property(Node)
  m_dlgName: any = undefined;

  /**
   * 起名对话框
   */
  @property(Node)
  m_editBoxName: any = undefined;

  /**
   * 确认对话框
   */
  @property(Prefab)
  m_prefabDlgSelect: any = undefined;

  start() {
    this.run();
  }

  // update (deltaTime: number) {
  //     // [4]
  // }

  onEnable() {
    // console.log("ModuleDialog onEvable.");
    this.regEvent();
  }

  onDisable() {
    // console.log("ModuleDialog onDisable.");
    this.unRegEvent();
  }

  /**
   * 注册事件
   */
  regEvent() {
    this.node.on(
      IDManager.ID_EVENT_DIALOG_SELECT_CANCEL,
      this.hanldeDialogSelectCancelClick,
      this
    );
    this.node.on(
      IDManager.ID_EVENT_DIALOG_SELECT_CONFIRM,
      this.hanldeDialogSelectConfirmClick,
      this
    );
    this.m_mask.on(Node.EventType.TOUCH_START, this.handleMaskClick, this);
  }

  /**
   * 注销事件
   */
  unRegEvent() {
    this.node.off(
      IDManager.ID_EVENT_DIALOG_SELECT_CANCEL,
      this.hanldeDialogSelectCancelClick
    );
    this.node.off(
      IDManager.ID_EVENT_DIALOG_SELECT_CONFIRM,
      this.hanldeDialogSelectConfirmClick
    );
    this.m_mask.off(Node.EventType.TOUCH_START, this.handleMaskClick, this);
  }

  /**
   * 开始执行
   */
  run() {
    this.m_labelContent.getComponent(Label).string = "";
    this.schedule(this.showContent, 0.2);
  }

  /**
   * 显示内容完毕
   */
  finishContent() {
    // 使文字加载完毕
    this.unschedule(this.showContent);
    this.m_labelContent.getComponent(Label).string = this.strContent;
    this.bFinish = true;
  }

  /**
   * 打字机模式显示文字
   */
  showContent() {
    if (this.strIndex < this.strContent.length) {
      this.m_labelContent.getComponent(Label).string +=
        this.strContent[this.strIndex];
      this.strIndex++;
    } else {
      this.finishContent();
    }
  }

  /**
   * 蒙板点击事件
   */
  handleMaskClick(e: any) {
    UtilsManager.stopPropagation(e);
    console.log("Preface onMaskClick");
    if (!this.bFinish) {
      this.finishContent();
    } else {
      this.m_dlgName.active = true;
    }
  }

  /**
   * 随机取名字
   */
  handleBtnNameRandom() {
    console.log("handleBtnNameRandom");
    const editBoxName = this.m_editBoxName.getComponent(EditBox);
    editBoxName.string = name.getRandomName();
  }

  /**
   * 确认使用该名字
   */
  handleBtnNameConfirm() {
    console.log("handleBtnNameConfirm");
    this.dlgSelect = instantiate(this.m_prefabDlgSelect);
    const dlgSelect = this.dlgSelect.getComponent("DialogSelect");
    const editBoxName = this.m_editBoxName.getComponent(EditBox);
    const editBoxNameText = editBoxName.string.trim();

    if (editBoxNameText) {
      dlgSelect.setDialogID(IDManager.ID_DLG_SELECT_NAME_CONFIRM);
      dlgSelect.setDialogTitle("提示");
      dlgSelect.setDialogContent(
        `“${editBoxNameText}”可真是个好名字，你确认要使用么？`
      );
    } else {
      dlgSelect.setDialogID(IDManager.ID_DLG_SELECT_NAME_EMPTY);
      dlgSelect.setDialogTitle("提示");
      dlgSelect.setDialogContent(`没有个响亮的名字怎么能行\n=.=#`);
    }
    this.m_canvas.addChild(this.dlgSelect);
  }

  /**
   * 选择对话框点击取消
   */
  hanldeDialogSelectCancelClick(e: any) {
    console.log("hanldeDialogSelectCancelClick", e);
  }

  /**
   * 选择对话框点击确认
   */
  async hanldeDialogSelectConfirmClick(e: any) {
    console.log("hanldeDialogSelectConfirmClick", e);
    const { detail } = e;
    switch (detail.dialogID) {
      case IDManager.ID_DLG_SELECT_NAME_CONFIRM:
        console.log("请求接口");
        const userInfo = StorageManager.getStorageSync("USERINFO");
        const nickName = this.m_editBoxName.getComponent(EditBox).string.trim();
        const params = {
          ...userInfo,
          nickName: nickName,
        };
        const res = await Api.fetchMemberInfo.addMemberInfo(params);
        if (res.code === 500003) {
          this.dlgSelect = instantiate(this.m_prefabDlgSelect);
          const dlgSelect = this.dlgSelect.getComponent("DialogSelect");
          dlgSelect.setDialogID(IDManager.ID_DLG_SELECT_NAME_REPEAT);
          dlgSelect.setDialogTitle("提示");
          dlgSelect.setDialogContent(`该昵称已被占用，请重新输入`);
          this.m_canvas.addChild(this.dlgSelect);
        } else {
          // res.code === 500002 重复注册用户相当于直接登录
          StorageManager.setStorageSync("MEMBERINFO", res.data);
          RouterManager.navigateTo("Main");
        }
        break;
      case IDManager.ID_DLG_SELECT_NAME_REPEAT:
        console.log("姓名重复");
        break;
      case IDManager.ID_DLG_SELECT_NAME_EMPTY:
        console.log("姓名不能为空");
        break;
      default:
        break;
    }
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
