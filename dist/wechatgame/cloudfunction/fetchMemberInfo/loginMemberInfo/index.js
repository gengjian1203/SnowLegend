/**
 * loginMemberInfo
 * 角色登录。如果有账号信息，则返回用户信息，如果没有则返回空
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

async function loginMemberInfo(data, db, strMemberId) {
  let objResult = {};
  let objMemberInfo = undefined;

  try {
    objMemberInfo = await db.collection("MEMBER").doc(strMemberId).get();
  } catch (e) {
    console.error("loginMemberInfo error", e);
  }

  objResult = {
    code: 200,
    data: objMemberInfo,
  };

  return objResult;
}

module.exports = loginMemberInfo;
