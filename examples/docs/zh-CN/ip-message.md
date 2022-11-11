## ip-message 消息

带 websocket 的业务消息通知。

### 基础用法

:::demo

```html
<template>
  <div class="block">
    <ip-message
      :messageCount="messageCount"
      :messageList="messageList"
      :userId="-200"
      token="7"
      socketUrl="syscenter/api/v1/config/websocketAddress"
      tempUrl="/syscenter/management/message-center/message-list/"
      messageListLink="/syscenter/management/message-center/message-list"
      @getMsgList="getMsgList"
      @readMessage="readMessage"
      @readAllHandler="readAllHandler"
      @openUrl="openUrl"
    >
    </ip-message>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        messagesOption: {
          page: 1,
          pageSize: 9,
          status: 'STATUS_UNREAD',
        },
        messageCount: 0,
        messageList: {},
      }
    },
    mounted() {
      // 初始化条数
      this.unReadCount()
    },
    methods: {
      getMsgList(options) {
        // socket连接成功后调用的方法用于更新数据
        this.messageList = {
          recordList: [
            {
              id: 19599,
              serverCode: 'audit_center',
              serverName: '审方',
              serverShortName: null,
              title: '开方医生1 kf1 长时间未处理',
              message: '请联系医生',
              type: 0,
              codition: '-200',
              level: 1,
              createTime: 1667809010683,
              url: '##SF_ADDRESS##/workspace/audit-review/ipt/details/2/311679',
              isShowUrl: 1,
              sendUserName: 'kf1',
              sendRealName: '开方医生1',
              empty: true,
            },
            {
              id: 19599,
              serverCode: 'audit_center',
              serverName: '审方',
              serverShortName: null,
              title: '开方医生2 kf2 长时间未处理',
              message: '请联系医生',
              type: 0,
              codition: '-200',
              level: 1,
              createTime: 1667809010683,
              url: '##SF_ADDRESS##/workspace/audit-review/ipt/details/2/311679',
              isShowUrl: 1,
              sendUserName: 'kf2',
              sendRealName: '开方医生2',
              empty: true,
            },
            {
              id: 19599,
              serverCode: 'audit_center',
              serverName: '审方',
              serverShortName: null,
              title: '开方医生3 kf3 长时间未处理',
              message: '请联系医生',
              type: 0,
              codition: '-200',
              level: 1,
              createTime: 1667809010683,
              url: '##SF_ADDRESS##/workspace/audit-review/ipt/details/2/311679',
              isShowUrl: 1,
              sendUserName: 'kf3',
              sendRealName: '开方医生3',
              empty: true,
            },
          ],
        }
      },
      unReadCount() {
        // 初始化未读条数
        this.messageCount = this.messageList.recordList.length
      },
      readMessage(id, cb) {
        // 点击消息
        this.messageCount--
        this.messageList.recordList.pop()
        console.log('点击消息', id)
        cb()
      },
      readAllHandler(cb) {
        this.messageCount = 0
        this.messageList = null
        console.log('点击全部已读')
        cb()
      },
      openUrl(id, cb) {
        // 点击消息中的a链接
        this.messageCount--
        this.messageList.recordList.pop()
        cb()
        console.log('点击消息中的a链接', id)
      }
    },
  }
</script>
```

:::

### Attributes

| 参数            | 说明                             | 类型   | 可选值 | 默认值                                               |
| --------------- | -------------------------------- | ------ | ------ | ---------------------------------------------------- |
| messageCount    | 信息的条数，初始化的时候就要获取 | Number | —      | 0                                                    |
| messageList     | 信息源                           | {}     | —      | {recordList：[]}                                     |
| userId          | 用户 id                          | Number | —      | —                                                    |
| token           | 登录标识                         | String | —      | —                                                    |
| socketUrl       | socket 请求地址，通过接口获取    | String | —      | —                                                    |
| tempUrl         | 点击消息跳转的 url 地址          | String | —      | '/syscenter/management/message-center/message-list/' |
| messageListLink | 点击消息列表跳转的地址           | String | —      | '/syscenter/management/message-center/message-list'  |

### Events

| 事件名称       | 说明                                                            | 回调参数                                     |
| -------------- | --------------------------------------------------------------- | -------------------------------------------- |
| getMsgList     | 获取列表数据的方法，会在组件 mounted 以及 socket 建立连接后触发 | -                                            |
| readMessage    | 点击单条数据时触发                                              | messageId：点击的 id;callback：重置组件高度   |
| readAllHandler | 点击全部已读触发                                                | callback:重置组件高度                        |
| openUrl        | 点击消息卡片上的 a 链接触发                                     | messageId：点击的 id; callback：重置组件高度 |
