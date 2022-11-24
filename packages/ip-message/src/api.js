import request from 'web-vue2-front-end-lib/src/utils/http.js';

const api = {
  markMessagesUrl: '/syscenter/api/v1/message/markMessages',
  websocketAddressUrl: '/syscenter/api/v1/config/websocketAddress',
  getMessagesUrl: '/syscenter/api/v1/message/getMessages',
  unReadCountUrl: '/syscenter/api/v1/message/unReadCount'
};

const messageApi = {
  API: api,
  /**
   * 标记已读
   * @param messageId 不传时候为标记全部已读
   */
  readMark: (messageId) => {
    const readMessageOption = {
      messageIds: []
    };
    messageId && readMessageOption.messageIds.push(messageId);
    return request({
      url: api.markMessagesUrl,
      data: readMessageOption,
      method: 'post'
    });
  },

  /**
   *获取消息盒子WebsocketAddress
   */
  getWebsocketAddress: () => {
    return request({
      url: api.websocketAddressUrl,
      method: 'get'
    });
  },

  /**
   * 获取消息列表
   */
  getMsgList: (param) => {
    return request({
      url: api.getMessagesUrl,
      method: 'post',
      data: param
    });
  },

  /**
    * 页面初始时获取消息条数
  */
  unReadCount: () => {
    return request({
      url: api.unReadCountUrl,
      method: 'get'
    });
  }
};

export default messageApi;
