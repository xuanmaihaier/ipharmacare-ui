import request from 'web-vue2-front-end-lib/src/utils/http.js';

const api = {
  logOutUrl: '/syscenter/api/v1/currentUser'
};

const topbarApi = {
  API: api,
  /**
   * 退出
   */
  logOut: () => {
    return request({
      url: api.logOutUrl,
      method: 'delete'
    });
  }
};

export default topbarApi;
