## ip-topbar 头部

业务中的更多按钮。

### 基础用法

:::demo

```html
<template>
  <div class="block">
    <ip-topbar
      minWidth="100%"
      :extensionMenus="extensionMenus"
      imageUrl="http://10.1.1.156:9999/web/static/images/top/"
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
              {
                id: null,
                resourceId: null,
                permission: null,
                name: '公告',
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
              {
                id: null,
                resourceId: null,
                permission: null,
                name: '资料更新',
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
    methods: {},
  }
</script>
```

:::

### Attributes

| 参数           | 说明              | 类型   | 可选值 | 默认值                    |
| -------------- | ----------------- | ------ | ------ | ------------------------- |
| extensionMenus | 菜单数据源        | array  | —      | []                        |
| imageUrl       | 图片的 url 根地址 | string | —      | '/web/static/images/top/' |
