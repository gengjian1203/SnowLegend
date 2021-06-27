// ID管理器
class IDManager {
  ID_DLG_SELECT_NAME_CONFIRM = "ID_DLG_SELECT_NAME_CONFIRM";
  ID_DLG_SELECT_NAME_REPEAT = "ID_DLG_SELECT_NAME_REPEAT";

  ID_EVENT_DIALOG_SELECT_CANCEL = "ID_EVENT_DIALOG_SELECT_CANCEL";
  ID_EVENT_DIALOG_SELECT_CONFIRM = "ID_EVENT_DIALOG_SELECT_CONFIRM";
  ID_EVENT_DIALOG_MODAL_CLOSE = "ID_EVENT_DIALOG_MODAL_CLOSE";
  // on-dialog-modal-close
  // "on-dialog-select-confirm";
  static instance: any = null;

  static getInstance() {
    if (!this.instance) {
      this.instance = new IDManager();
    }
    return this.instance;
  }
}

export default IDManager.getInstance();
