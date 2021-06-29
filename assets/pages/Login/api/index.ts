import FetchManager from "../../../services/FetchManager";

/**
 * 测试接口
 */
export const testMemberInfo = async (params: any = {}) => {
  const strCloudName = "fetchMemberInfo";
  const objCloudParams = {
    ...params,
    type: "QUERY_MEMBER",
  };
  const res = await FetchManager.fetch(strCloudName, objCloudParams);
  console.log("Api testMemberInfo", res);
  return res;
};

/**
 * 测试接口
 */
export const queryMemberInfo = async (params: any = {}) => {
  const strCloudName = "fetchMemberInfo";
  const objCloudParams = {
    ...params,
    type: "QUERY_MEMBER",
  };
  const res = await FetchManager.fetch(strCloudName, objCloudParams);
  console.log("Api queryMemberInfo", res);
  return res;
};

export default {
  testMemberInfo,
  queryMemberInfo,
};
