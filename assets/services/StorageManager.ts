import { sys } from "cc";

// 持久化管理器
class StorageManager {
  static instance: any = null;

  static getInstance() {
    if (!this.instance) {
      this.instance = new StorageManager();
    }
    return this.instance;
  }

  /**
   * 存缓存
   * @param {*} key 缓存键
   * @param {*} value 缓存值
   * @param {*} time 缓存时间、单位为秒、不传值则永久缓存
   */
  setStorageSync(key: string, value: any, time: any) {
    if (sys.platform !== sys.WECHAT_GAME) {
      return;
    }
    const header = `CACHE_`; // 管理字段前缀
    const tailer = "_DEADTIME"; // 管理字段后缀
    const strKey = `${header}${key}`;
    const strTime = `${header}${key}${tailer}`;
    const seconds = parseInt(time);
    // @ts-ignore
    wx.setStorageSync(strKey, value);
    if (seconds > 0) {
      let timestamp = Date.parse(String(new Date()));
      timestamp = timestamp / 1000 + seconds;
      // @ts-ignore
      wx.setStorageSync(strTime, timestamp);
    } else {
      // @ts-ignore
      wx.removeStorageSync(strTime);
    }
  }

  /**
   * 取缓存
   * @param {*} key 缓存键
   * @returns 缓存值、如不存在或超时则返回undefined
   */
  getStorageSync(key: string) {
    if (sys.platform !== sys.WECHAT_GAME) {
      return undefined;
    }
    const header = `CACHE_`; // 管理字段前缀
    const tailer = "_DEADTIME"; // 管理字段后缀
    const strKey = `${header}${key}`;
    const strTime = `${header}${key}${tailer}`;
    // @ts-ignore
    const deadtime = parseInt(wx.getStorageSync(strTime));

    if (deadtime) {
      if (Number(deadtime) < Date.parse(String(new Date())) / 1000) {
        return undefined;
      }
    }
    // @ts-ignore
    const res = wx.getStorageSync(strKey);
    return res;
  }

  /**
   * 移除指定缓存字段
   * @param {*} key 缓存键
   */
  removeStorageSync(key: string) {
    if (sys.platform !== sys.WECHAT_GAME) {
      return;
    }
    const header = `CACHE_`; // 管理字段前缀
    const tailer = "_DEADTIME"; // 管理字段后缀
    const strKey = `${header}${key}`;
    const strTime = `${header}${key}${tailer}`;

    // @ts-ignore
    wx.removeStorageSync(strKey);
    // @ts-ignore
    wx.removeStorageSync(strTime);
  }

  /**
   * 清除所有缓存
   */
  clearStorageSync() {
    if (sys.platform !== sys.WECHAT_GAME) {
      return;
    }
    // @ts-ignore
    wx.clearStorageSync();
  }
}

export default StorageManager.getInstance();
