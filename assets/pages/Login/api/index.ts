import FetchManager from "../../../services/FetchManager";

/**
 * 测试接口
 */
export const testMemberInfo = async (params: any = {}) => {
  const strCloudName = "fetchMemberInfo";
  const objCloudParams = {
    ...params,
    type: "QUERY_MEMBER_INFO",
  };
  const res = await FetchManager.fetch(strCloudName, objCloudParams);
  console.log("Api testMemberInfo", res);
  return res;
};

/**
 * 测试接口
 */
export const loginMemberInfo = async (params: any = {}) => {
  const strCloudName = "fetchMemberInfo";
  const objCloudParams = {
    ...params,
    type: "LOGIN_MEMBER_INFO",
  };
  const res = await FetchManager.fetch(strCloudName, objCloudParams);
  console.log("Api loginMemberInfo", res);
  return res;
};

export default {
  testMemberInfo,
  loginMemberInfo,
};
