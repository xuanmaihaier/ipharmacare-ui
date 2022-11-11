## ip-topbar 头部

集成消息、更多的头部，支持 ip-message、ip-more 所有属性和方法。

### 基础用法

:::demo

```html
<template>
  <div class="block">
    <ip-topbar
      minWidth="800px"
      :extensionMenus="extensionMenus"
      imageUrl="http://10.1.1.156:9999/web/static/images/top/"
      :messageCount="messageCount"
      :messageList="messageList"
      :userId="-200"
      :showMenu="true"
      name="逸曜信息-前端"
      title="逸曜信息"
      token="7"
      :pageResource="pageResource"
      socketUrl="syscenter/api/v1/config/websocketAddress"
      tempUrl="/syscenter/management/message-center/message-list/"
      messageListLink="/syscenter/management/message-center/message-list"
      @getMsgList="getMsgList"
      @readMessage="readMessage"
      @readAllHandler="readAllHandler"
      @openUrl="openUrl"
      @handleSelect="handleSelect"
      @logout="logout"
      @setWindows="setWindows"
    >
    </ip-topbar>
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
        pageResource: [
          {
            id: 300001,
            resourceId: '#report',
            permission: '',
            name: '统计报表',
            status: 1,
            type: 0,
            systemId: 'cpod',
            url: '#/report',
            pId: '0',
            icon: 'icon-menu-report',
            remark: '',
            module: '',
            sort: 1,
            isXtss: 0,
            children: [
              {
                id: 300101,
                resourceId: 'overview',
                permission: '',
                name: '使用概览',
                status: 1,
                type: 0,
                systemId: 'cpod',
                url: '/report/overview',
                pId: 'report',
                icon: 'icon-menu-overview',
                remark: '',
                module: '',
                sort: 1,
                isXtss: 0,
                children: [],
                hasChildren: false,
                checked: false,
                disable: false,
                redirectUrl: null,
                redirectSystemId: null,
                mandatory: 0,
                shortName: null,
                createdBy: null,
                createdTime: null,
                updatedBy: null,
                updatedTime: null,
                hide: 0,
                operationPlatformControl: 1,
                resourceTag: null,
                key: 'cpod_overview_',
              },
            ],
            hasChildren: true,
            checked: false,
            disable: false,
            redirectUrl: null,
            redirectSystemId: null,
            mandatory: 0,
            shortName: null,
            createdBy: null,
            createdTime: null,
            updatedBy: null,
            updatedTime: null,
            hide: 0,
            operationPlatformControl: 1,
            resourceTag: null,
            key: 'cpod_report_',
          },
          {
            id: 300002,
            resourceId: '#manage',
            permission: '',
            name: '药品管理',
            status: 1,
            type: 0,
            systemId: 'cpod',
            url: '#/manage',
            pId: '0',
            icon: 'icon-menu-manage',
            remark: '',
            module: '',
            sort: 2,
            isXtss: 0,
            children: [
              {
                id: 300201,
                resourceId: 'catalog',
                permission: '',
                name: '目录管理',
                status: 1,
                type: 0,
                systemId: 'cpod',
                url: '/manage/catalog',
                pId: 'manage',
                icon: 'icon-menu-catalog',
                remark: '',
                module: '',
                sort: 1,
                isXtss: 0,
                children: [],
                hasChildren: false,
                checked: false,
                disable: false,
                redirectUrl: null,
                redirectSystemId: null,
                mandatory: 0,
                shortName: null,
                createdBy: null,
                createdTime: null,
                updatedBy: null,
                updatedTime: null,
                hide: 0,
                operationPlatformControl: 1,
                resourceTag: null,
                key: 'cpod_catalog_',
              },
            ],
            hasChildren: true,
            checked: false,
            disable: false,
            redirectUrl: null,
            redirectSystemId: null,
            mandatory: 0,
            shortName: null,
            createdBy: null,
            createdTime: null,
            updatedBy: null,
            updatedTime: null,
            hide: 0,
            operationPlatformControl: 1,
            resourceTag: null,
            key: 'cpod_manage_',
          },
        ],
        extensionMenus: [
          {
            id: null,
            resourceId: null,
            permission: null,
            name: '首页',
            status: null,
            type: null,
            systemId: 'index',
            url: '/',
            pId: null,
            icon: 'index',
            remark: null,
            module: null,
            isXtss: null,
            sort: 0,
            children: [
              {
                id: null,
                resourceId: null,
                permission: null,
                name: '系统导航',
                status: null,
                type: null,
                systemId: null,
                url: null,
                pId: null,
                icon: null,
                remark: null,
                module: null,
                isXtss: null,
                sort: null,
                children: [],
                hasChildren: false,
                checked: false,
                disable: false,
                redirectUrl: null,
                redirectSystemId: null,
                mandatory: null,
                shortName: null,
                createdBy: null,
                createdTime: null,
                updatedBy: null,
                updatedTime: null,
                hide: null,
                operationPlatformControl: null,
                resourceTag: null,
              },
            ],
            hasChildren: false,
            checked: false,
            disable: false,
            redirectUrl: null,
            redirectSystemId: null,
            mandatory: null,
            shortName: null,
            createdBy: null,
            createdTime: null,
            updatedBy: null,
            updatedTime: null,
            hide: null,
            operationPlatformControl: null,
            resourceTag: null,
            navName: '.系统导航.公告.资料更新',
          },
        ],
      }
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
      },
      handleSelect(item) {
        console.log(item)
      },
      setWindows(width) {
        console.log(width)
        // this.$store.dispatch('app/setWindows', window.innerWidth)
      },
      logout(){
        console.log('退出')
      }
    },
  }
</script>
```

:::

### Attributes

| 参数            | 说明                             | 类型    | 可选值 | 默认值                                               |
| --------------- | -------------------------------- | ------- | ------ | ---------------------------------------------------- |
| minWidth        | 最小宽度                         | string  | —      | '1280px'                                             |
| name            | 用户名                           | string  | —      | —                                                    |
| title           | 系统名称                         | string  | —      | —                                                    |
| path            | 当前路由的 path                  | string  | —      | /dashboard                                           |
| showMenu        | 是否显示头部路由菜单             | boolean | —      | true                                                 |
| pageResource    | 从后端获取的路由表               | array   | —      | []                                                   |
| messageCount    | 信息的条数，初始化的时候就要获取 | Number  | —      | 0                                                    |
| messageList     | 信息源                           | {}      | —      | {recordList：[]}                                     |
| userId          | 用户 id                          | Number  | —      | —                                                    |
| token           | 登录标识                         | String  | —      | —                                                    |
| socketUrl       | socket 请求地址，通过接口获取    | String  | —      | —                                                    |
| tempUrl         | 点击消息跳转的 url 地址          | String  | —      | '/syscenter/management/message-center/message-list/' |
| messageListLink | 点击消息列表跳转的地址           | String  | —      | '/syscenter/management/message-center/message-list'  |
| extensionMenus  | 菜单数据源                       | array   | —      | []                                                   |
| imageUrl        | 图片的 url 根地址                | string  | —      | '/web/static/images/top/'                            |

### Events

| 事件名称       | 说明                                                                           | 回调参数                                     |
| -------------- | ------------------------------------------------------------------------------ | -------------------------------------------- |
| handleSelect   | 点击切换菜单时触发，只有路由表中的 resourceId 与路由 path 匹配时才会导出改方法 | item：点击的路由信息                         |
| logout         | 点击确认退出账户触发                                                           | —                                            |
| setWindows     | 当窗口变换长度时触发，可能需要讲长度存入 vuex 中                               | width：缩放后的长度                          |
| getMsgList     | 获取列表数据的方法，会在组件 mounted 以及 socket 建立连接后触发                | -                                            |
| readMessage    | 点击单条数据时触发                                                             | messageId：点击的 id;callback：重置组件高度  |
| readAllHandler | 点击全部已读触发                                                               | callback:重置组件高度                        |
| openUrl        | 点击消息卡片上的 a 链接触发                                                    | messageId：点击的 id; callback：重置组件高度 |
