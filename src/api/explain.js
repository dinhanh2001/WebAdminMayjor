import axiosClient from './axiosClient';

const getExplainsApi = (params) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let isCheck = params['user_id'] ? `&user_id=${params['user_id']}` : '';
  if (!params.page) {
    return axiosClient.get(`/explain?page=${1}&limit=${10}${isCheck}`);
  }
  return axiosClient.get(`/explain?page=${params['page']}&limit=${params['limit']}${isCheck}`);
};

const requestDeleteExplainApi = (id) => {
  return axiosClient.delete(`/explain/${id}`);
};

const requestGetExplainApi = (params) => {
  return axiosClient.get(`/explain/${params}`);
};

// const requestUpdateTimeSheetApi = (params) => {
//   return axiosClient.post(`/timesheet`, params);
// };

const requestSearchExplainApi = (reason_name, user_name, page, limit) => {
  return axiosClient.get(`/explain/search?reason_name=${reason_name}&user_name=${user_name}&page=${page}}&limit=${limit}`);
};

const requestUpdateExplainApi = (params) => {
  console.log(params);
  const id = params['id'];
  if (!id) throw new Error('Id is required');

  delete params['id'];
  return axiosClient.patch(`/explain/${id}`, { active: params?.status, approval_name: params['approval_name'] });
};

export {
  requestUpdateExplainApi,
  requestGetExplainApi,
  requestDeleteExplainApi,
  getExplainsApi,
  requestSearchExplainApi
  // requestUpdateTimeSheetApi
};
