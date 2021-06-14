import FetchManager from "../../../services/FetchManager";

/**
 * 测试接口
 */
export const getUserInfo = async (params: any) => {
  const strCloudName = "fetchUserInfo";
  const objCloudParams = {
    ...params,
    type: "QUERY_USER_INFO",
  };
  const res = await FetchManager.fetch(strCloudName, objCloudParams);
  console.log("Api getUserInfo", res);
  return res;
};

export default {
  getUserInfo,
};
