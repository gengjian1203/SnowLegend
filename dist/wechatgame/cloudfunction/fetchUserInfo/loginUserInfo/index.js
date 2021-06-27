/**
 * loginUserInfo
 * 角色登录。如果有账号信息，则返回用户信息，如果没有则返回空
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

async function loginUserInfo(data, db, strMemberId) {
  let objResult = {};
  let objUserInfo = undefined;

  try {
    objUserInfo = await db.collection("USER").doc(strMemberId).get();
  } catch (e) {
    console.error("queryUserInfo error", e);
  }

  objResult = {
    code: 200,
    data: objUserInfo,
  };

  return objResult;
}

module.exports = addUserInfo;
