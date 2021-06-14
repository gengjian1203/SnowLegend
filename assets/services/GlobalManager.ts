/**
 * 全局数据管理器
 */
class GlobalManager {
  static instance: any = null;

  static getInstance() {
    if (!this.instance) {
      this.instance = new GlobalManager();
    }
    return this.instance;
  }
}

export default GlobalManager.getInstance();
