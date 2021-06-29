// @ts-ignore
import md5 from "blueimp-md5";
import { sys } from "cc";
import webConfig from "../config/web";

const keyToken = "I have a dream";

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
        const keyTime = String(new Date().getTime());
        const keySecret = md5(`${keyToken}${keyTime}${objCloudParams.type}`);
        const param = {
          ...objCloudParams,
          keyTime: keyTime,
          keySecret: keySecret,
        };
        // @ts-ignore
        wx.cloud
          .callFunction({
            name: strCloudName,
            data: param,
          })
          .then((res: any) => {
            this.fetchSuccess(strCloudName, param, res);
            resolve(res.result);
          })
          .catch((err: any) => {
            this.fetchError(strCloudName, param, err);
            reject(err);
          });
      } else {
        resolve({});
      }
    });
  }
}

export default FetchManager.getInstance();
