/**
 * queryMemberInfo
 * 查询跟 MemberInfo 相关的信息
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

async function queryMemberInfo(data, db) {
  let objResult = {};

  try {
    objResult = {
      code: 200,
      data: await db
        .collection("TB_MEMBER")
        .doc(data._id)
        .get()
    };
  } catch (e) {
    // 没有查到。异常。
    objResult = {
      code: 500,
      data: e
    };
    console.error("queryMemberInfo error", e);
  }

  return objResult;
}

module.exports = queryMemberInfo;
