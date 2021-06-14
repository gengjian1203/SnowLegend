// 云函数入口文件
const cloud = require("wx-server-sdk");
const queryUserInfo = require("queryUserInfo/index.js");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV, // API 调用都保持和云函数当前所在环境一致
});

/**
 * fetchUserInfo
 * 处理跟 USER 表相关的信息
 * @param {*} event
 * @param {*} context
 * @returns
 */
// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID, APPID, UNIONID } = cloud.getWXContext();

  const db = cloud.database();
  const strMemberId = `mem-${OPENID}`;
  console.log("请求人:", strMemberId, event.type);

  let objResult = {};

  switch (event.type) {
    case "QUERY_USER_INFO":
      objResult = await queryUserInfo(event.data, db, strMemberId);
      break;
    default:
      break;
  }

  return objResult;
};
