import FetchManager from "../../services/FetchManager";

/**
 * 查询成员接口
 */
export const queryMemberInfo = async (params: any = {}) => {
  const strCloudName = "fetchMemberInfo";
  const objCloudParams = {
    type: "QUERY_MEMBER",
    data: params,
  };
  const res = await FetchManager.fetch(strCloudName, objCloudParams);
  console.log("Api queryMemberInfo", res);
  return res;
};

/**
 * 新增成员接口
 */
interface IAddMemberInfoParams {}
export const addMemberInfo = async (params: IAddMemberInfoParams = {}) => {
  const strCloudName = "fetchMemberInfo";
  const objCloudParams = {
    type: "ADD_MEMBER",
    data: params,
  };
  const res = await FetchManager.fetch(strCloudName, objCloudParams);
  console.log("Api addMemberInfo", res);
  return res;
};

export default {
  queryMemberInfo,
  addMemberInfo,
};
