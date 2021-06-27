import { _decorator, Component, Event, Node, Label, Button } from "cc";
const { ccclass, property } = _decorator;

@ccclass("DialogModal")
export class DialogModal extends Component {
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
   * 确认按钮
   */
  @property(Node)
  m_btnConfirm: any = undefined;

  /**
   * 确认按钮文案
   */
  @property(Node)
  m_labelConfirm: any = undefined;

  start() {
    // [3]
  }

  onEnable() {
    // console.log("ModuleDialog onEvable.");
    this.regEvent();
  }

  onDisable() {
    // console.log("ModuleDialog onDisable.");
    this.unRegEvent();
  }

  // update (deltaTime: number) {
  //     // [4]
  // }

  /**
   * 注册事件
   */
  regEvent() {
    this.m_mask.on(Node.EventType.TOUCH_START, this.handleStopPropagation);
    this.m_mask.on(Node.EventType.TOUCH_END, this.handleStopPropagation);
  }

  /**
   * 注销事件
   */
  unRegEvent() {
    this.m_mask.off(Node.EventType.TOUCH_START, this.handleStopPropagation);
    this.m_mask.off(Node.EventType.TOUCH_END, this.handleStopPropagation);
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
   * 设置确认按钮是否展示
   */
  setBtnConfirmActive(isActive: boolean) {
    const btnConfirm = this.m_btnConfirm.getComponent(Button);
    // console.log("ModuleDialog setBtnConfirmActive.", isActive, btnConfirm);
    btnConfirm.node.active = isActive;
  }

  /**
   * 设置确认按钮文案
   */
  setLabelConfirm(strLabel: string) {
    // console.log("ModuleDialog setLabelConfirm.", strLabel);
    const labelConfirm = this.m_labelConfirm.getComponent(Label);
    labelConfirm.string = strLabel;
  }

  /**
   * 关闭对话框消息传递
   */
  onDialogModalClose() {
    // console.log("onDialogModalClose", Event);
    const eventCustom = new Event("on-dialog-modal-close", true);
    this.node.dispatchEvent(eventCustom);
    this.node.active = false;
    this.node.removeFromParent();
  }

  /**
   * 阻止消息冒泡
   */
  handleStopPropagation(event: any) {
    // console.log("handleStopPropagation", event);
    event.propagationStopped = true;
  }

  /**
   * 右上角关闭按钮点击
   */
  handleBtnCloseClick() {
    this.onDialogModalClose();
  }

  /**
   * 确认按钮点击
   */
  hanldeBtnConfirmClick() {
    this.onDialogModalClose();
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
