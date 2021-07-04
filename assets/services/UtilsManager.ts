import { sys } from "cc";

// 公共方法管理器
class UtilsManager {
  static instance: any = null;
  static getInstance() {
    if (!this.instance) {
      this.instance = new UtilsManager();
    }
    return this.instance;
  }

  /**
   * 阻止事件冒泡
   */
  stopPropagation(event: any) {
    event.propagationStopped = true;
  }
}

export default UtilsManager.getInstance();
