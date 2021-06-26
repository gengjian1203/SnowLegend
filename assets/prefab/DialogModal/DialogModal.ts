import { _decorator, Component, Node, Label } from "cc";
const { ccclass, property } = _decorator;

@ccclass("DialogModal")
export class DialogModal extends Component {
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

  start() {
    // [3]
  }

  // update (deltaTime: number) {
  //     // [4]
  // }

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
    console.log("ModuleDialog setNoticeContent.", strContent, str);
    const labelContent = this.m_labelContent.getComponent(Label);
    labelContent.string = str;
    // labelContent._forceUpdateRenderData(true);
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
