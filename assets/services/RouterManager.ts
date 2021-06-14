import { loader, director } from "cc";

/**
 * 路由跳转管理器
 */
class RouterManager {
  static instance: any = null;

  static getInstance() {
    if (!this.instance) {
      this.instance = new RouterManager();
    }
    return this.instance;
  }

  navigateTo(strRouterName: string) {
    return new Promise((resolve, reject) => {
      loader?.downloader?.loadSubpackage(strRouterName, (res) => {
        if (res) {
          console.error("loadingSubBattle Error", res);
          reject(res);
        } else {
          console.debug("Main loadingSubBattle resolve", res);
          director.loadScene(strRouterName);
          resolve(res);
        }
      });
    });
  }

  navigateBack() {}
}

export default RouterManager.getInstance();
