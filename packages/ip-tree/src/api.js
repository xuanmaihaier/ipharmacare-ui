/**
树结构的api接口
*/
import { post } from 'web-vue2-front-end-lib/src/utils/http.js';

const host = '';

const apiUrlList = [
  {
    type: 'dept', // 科室
    url: host + '/syscenter/api/v1/component/dept/tree/search',
    childrenUrl: host + '/syscenter/api/v1/component/dept/tree/pid',
    fillUrl: host + '/syscenter/api/v1/component/dept/tree/fill'
  },
  {
    type: 'doctor', // 医生
    url: host + '/syscenter/api/v1/component/doctor/tree/search',
    childrenUrl: host + '/syscenter/api/v1/component/doctor/tree/pid',
    fillUrl: host + '/syscenter/api/v1/component/doctor/tree/fill'
  },
  {
    type: 'ward', // 病区
    url: host + '/syscenter/api/v1/component/medical-ward/tree/search',
    childrenUrl: host + '/syscenter/api/v1/component/medical-ward/tree/pid',
    fillUrl: host + '/syscenter/api/v1/component/medical-ward/tree/fill'
  },
  {
    type: 'group', // 医疗组
    url: host + '/syscenter/api/v1/component/medical-group/tree/search',
    childrenUrl: host + '/syscenter/api/v1/component/medical-group/tree/pid',
    fillUrl: host + '/syscenter/api/v1/component/medical-group/tree/fill'
  }
];

const getUrl = (type, name) => {
  let url = '';
  apiUrlList.forEach((item) => {
    if (item.type === type) {
      url = item[name];
    }
  });
  return url;
};

const api = {
  search: '/syscenter/api/v1/component/zone/tree/search'
};

const treeApi = {
  API: api,

  getTreeData: (type, params) => {
    let url = getUrl(type, 'url');
    return post(url, params);
  },

  getTreeChildData: (type, params) => {
    let url = getUrl(type, 'childrenUrl');
    return post(url, params);
  },

  // 获取机构列表
  getZoneListData: (params) => {
    return post(api.search, params);
  },

  // 获取回显树结构
  getBackData: (type, params) => {
    let url = getUrl(type, 'fillUrl');
    return post(url, params);
  }
};

export default treeApi;
