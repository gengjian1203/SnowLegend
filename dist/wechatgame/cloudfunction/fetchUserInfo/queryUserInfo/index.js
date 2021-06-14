/**
 * queryUserInfo
 * 查询跟 UserInfo 相关的信息
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

async function queryUserInfo(data, db, strMemberId) {
  let objResult = {};

  try {
    objResult = {
      data: await db.collection("USER").doc(data._id).get(),
    };
  } catch (e) {
    // 没有查到。异常。
    objResult = {
      data: e,
    };
    console.error("queryMemberInfo error", e);
  }

  return objResult;
}

module.exports = queryUserInfo;
