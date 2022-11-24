import request from 'web-vue2-front-end-lib/src/utils/http.js';

const api = {
  rightTopResourcesUrl: '/syscenter/api/v1/resource/rightTopResources'
};

const moreApi = {
  API: api,
  /**
   * 获取更多菜单
  */
  getExtensionMenus: () => {
    return request({
      url: api.rightTopResourcesUrl,
      method: 'get'
    });
  }
};

export default moreApi;
