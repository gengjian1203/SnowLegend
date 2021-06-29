/**
 * addMemberInfo
 * 新增注册成员信息
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

// 创建角色
const createMember = async (data, db, strMemberId, date, time) => {
  // 创建新用户
  let objResult = {};
  const objMember = {
    // 创建基本信息
    _id: strMemberId, // 主键
    // 系统级
    sysCountLogin: 0, // 登录次数
    sysCreateDate: date, // 创建时间
    sysCreateTime: time, // 创建时间
    sysLoginDate: date, // 登录时间
    sysLoginTime: time, // 登录时间
    sysUpdateDate: date, // 修改时间
    sysUpdateTime: time, // 修改时间
    // 溯源级
    shareSourceID: data.shareSourceID,
    shareShareType: data.shareShareType,
    shareSharePath: data.shareSharePath,
    // 身份级
    userOpenid: strMemberId.substr(4),
    userNickName: data.nickName, // 昵称*
    userAvatarUrl: data.avatarUrl, // 头像*
    userGender: data.gender, // 性别*
    userCountry: data.country, // 国家*
    userProvince: data.province, // 省份*
    userCity: data.city, // 城市*
    userLanguage: data.language, // 语言*
    userCellphone: data.cellphone, // 手机号
    // 应用级
    appLevel: 1, // 等级
    appExp: 0 // 经验
  };
  // 创建新的玩家信息
  try {
    await db.collection("TB_MEMBER").add({ data: objMember });
    objResult = {
      code: 200,
      data: { data: objMember }
    };
  } catch (e) {
    objResult = {
      code: 500,
      data: e
    };
    console.error("addMemberInfo error", e);
  }

  return objResult;
};

async function addMemberInfo(data, db, strMemberId) {
  let objResult = {};
  let objMemberInfo;
  const date = new Date();
  const YYYY = date.getFullYear();
  const MM = date.getMonth() + 1;
  const DD = date.getDate();
  const hh = date.getHours();
  const mm = date.getMinutes();
  const ss = date.getSeconds();
  const time = `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;

  try {
    objMemberInfo = await db
      .collection("TB_MEMBER")
      .doc(strMemberId)
      .get();
  } catch (e) {
    console.error("addMemberInfo error", e);
  }

  if (objMemberInfo) {
    // 已经注册过注册
    objResult = {
      code: 200,
      data: objMemberInfo
    };
  } else {
    // 尚未注册过，创建角色
    objResult = await createMember(data, db, strMemberId, date, time);
  }

  return objResult;
}

module.exports = addMemberInfo;
