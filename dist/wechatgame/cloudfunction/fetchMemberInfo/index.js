// 云函数入口文件
const cloud = require("wx-server-sdk");
const addMemberInfo = require("addMemberInfo/index.js");
const loginMemberInfo = require("loginMemberInfo/index.js");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV, // API 调用都保持和云函数当前所在环境一致
});

/**
 * fetchMemberInfo
 * 处理跟 MEMBER 表相关的信息
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
    case "ADD_MEMBER_INFO":
      objResult = await addMemberInfo(event.data, db, strMemberId);
      break;
    case "LOGIN_MEMBER_INFO":
      objResult = await loginMemberInfo(event.data, db, strMemberId);
    default:
      break;
  }

  return objResult;
};
