// ID管理器
class IDManager {
  ID_DLG_SELECT_NAME_CONFIRM = "ID_DLG_SELECT_NAME_CONFIRM"; // 名字确认对话框
  ID_DLG_SELECT_NAME_REPEAT = "ID_DLG_SELECT_NAME_REPEAT"; // 名字重复提示对话框
  ID_DLG_SELECT_NAME_EMPTY = "ID_DLG_SELECT_NAME_EMPTY"; // 名字为空提示对话框

  ID_EVENT_DIALOG_SELECT_CANCEL = "ID_EVENT_DIALOG_SELECT_CANCEL"; // 选择对话框点击取消事件
  ID_EVENT_DIALOG_SELECT_CONFIRM = "ID_EVENT_DIALOG_SELECT_CONFIRM"; // 选择对话框点击确认事件
  ID_EVENT_DIALOG_MODAL_CLOSE = "ID_EVENT_DIALOG_MODAL_CLOSE"; // 模态对话框点击关闭事件

  static instance: any = null;

  static getInstance() {
    if (!this.instance) {
      this.instance = new IDManager();
    }
    return this.instance;
  }
}

export default IDManager.getInstance();
