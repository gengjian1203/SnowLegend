import { sys } from "cc";
import webConfig from "../config/web";

/**
 * 接口请求管理器
 */
class FetchManager {
  static instance: any = null;

  // 接口成功
  fetchSuccess(strCloudName: string, objCloudParams: any, res: any) {
    console.debug("fetchSuccess", strCloudName, objCloudParams, res);
  }

  // 接口异常
  fetchError(strCloudName: string, objCloudParams: any, err: any) {
    console.debug("fetchError", strCloudName, objCloudParams, err);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new FetchManager();
      if (sys.platform === sys.WECHAT_GAME) {
        // @ts-ignore
        wx.cloud.init({
          env: webConfig.env,
        });
      }
    }
    return this.instance;
  }

  init() {}

  fetch(strCloudName: string, objCloudParams: any) {
    return new Promise((resolve, reject) => {
      if (sys.platform === sys.WECHAT_GAME) {
        // @ts-ignore
        wx.cloud
          .callFunction({
            name: strCloudName,
            data: objCloudParams,
          })
          .then((res: any) => {
            this.fetchSuccess(strCloudName, objCloudParams, res);
            resolve(res.result);
          })
          .catch((err: any) => {
            this.fetchError(strCloudName, objCloudParams, err);
            reject(err);
          });
      } else {
        resolve({});
      }
    });
  }
}

export default FetchManager.getInstance();
