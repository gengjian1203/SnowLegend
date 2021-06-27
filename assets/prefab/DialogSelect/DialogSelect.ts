import { _decorator, Component, Node, Label, Button } from "cc";
import MyEvent from "../../services/MyEvent";
import IDManager from "../../services/IDManager";
import UtilsManager from "../../services/UtilsManager";

const { ccclass, property } = _decorator;

@ccclass("DialogSelect")
export class DialogSelect extends Component {
  dialogID = "";

  /**
   * 灰色蒙版
   */
  @property(Node)
  m_mask: any = undefined;

  /**
   * 标题
   */
  @property(Node)
  m_labelTitle: any = undefined;

  /**
   * 内容
   */
  @property(Node)
  m_labelContent: any = undefined;

  /**
   * 取消按钮
   */
  @property(Node)
  m_btnCancel: any = undefined;

  /**
   * 确认按钮
   */
  @property(Node)
  m_btnConfirm: any = undefined;

  start() {
    // [3]
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
    this.m_mask.on(Node.EventType.TOUCH_START, UtilsManager.stopPropagation);
    this.m_mask.on(Node.EventType.TOUCH_END, UtilsManager.stopPropagation);
  }

  /**
   * 注销事件
   */
  unRegEvent() {
    this.m_mask.off(Node.EventType.TOUCH_START, UtilsManager.stopPropagation);
    this.m_mask.off(Node.EventType.TOUCH_END, UtilsManager.stopPropagation);
  }

  /**
   * 设置对话框标题
   */
  setDialogID(strID: string) {
    this.dialogID = strID;
  }

  /**
   * 设置对话框标题
   */
  setDialogTitle(strTitle: string) {
    const labelTitle = this.m_labelTitle.getComponent(Label);
    labelTitle.string = strTitle;
    // labelTitle._forceUpdateRenderData(true);
  }

  /**
   * 设置对话框内容
   */
  setDialogContent(strContent: string) {
    const str = strContent.replace(/\\n/g, "\n");
    // console.log("ModuleDialog setNoticeContent.", strContent, str);
    const labelContent = this.m_labelContent.getComponent(Label);
    labelContent.string = str;
    // labelContent._forceUpdateRenderData(true);
  }

  /**
   * 关闭对话框消息传递
   */
  onDialogSelectClose() {
    // console.log("onDialogSelectClose", Event);
    this.node.active = false;
    this.node.removeFromParent();
  }

  /**
   * 取消按钮点击
   */
  handleBtnCancelClick() {
    const params = { dialogID: this.dialogID };
    const eventCustom = new MyEvent(
      IDManager.ID_EVENT_DIALOG_SELECT_CANCEL,
      true,
      params
    );
    this.node.dispatchEvent(eventCustom);
    this.onDialogSelectClose();
  }

  /**
   * 确认按钮点击
   */
  hanldeBtnConfirmClick() {
    const params = { dialogID: this.dialogID };
    const eventCustom = new MyEvent(
      IDManager.ID_EVENT_DIALOG_SELECT_CONFIRM,
      true,
      params
    );
    this.node.dispatchEvent(eventCustom);
    this.onDialogSelectClose();
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
