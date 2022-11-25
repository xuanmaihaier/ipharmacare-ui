## ip-topbar 头部

集成消息、更多的头部，支持 ip-message、ip-more 所有属性和方法。

### 基础用法

:::demo

```html
<template>
  <div class="block">
    <ip-topbar
      minWidth="800px"
      imageUrl="http://10.1.1.156:9999/web/static/images/top/"
      :userId="-200"
      :showMenu="true"
      name="逸曜信息-前端"
      title="逸曜信息"
      :pageResource="pageResource"
      activeMenu="#report"
      tempUrl="/syscenter/management/message-center/message-list/"
      messageListLink="/syscenter/management/message-center/message-list"
      @handleSelect="handleSelect"
      @setWindows="setWindows"
    >
    <i slot="logo" style="margin-right:5px;font-size:15px" class="el-icon-takeaway-box" />
    <a href='#report'></a>
    <a href='#manage'></a>
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
        pageResource: [
          {
            id: 300001,
            resourceId: '#report',
            permission: '',
            name: '统计报表',
            status: 1,
            type: 0,
            systemId: 'cpod',
            url: '#report',
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
            url: '#manage',
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
      }
    },
    methods: {
      handleSelect(item) {
        console.log(item)
      },
      setWindows(width) {
        console.log(width)
        // this.$store.dispatch('app/setWindows', window.innerWidth)
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
| activeMenu            | 当前路由的path                  | string  | —      | /dashboard                                           |
| showMenu        | 是否显示头部路由菜单             | boolean | —      | true                                                 |
| pageResource    | 从后端获取的路由表               | array   | —      | []                                                   |
| userId          | 用户 id                          | Number  | —      | —                                                    |
| tempUrl         | 点击消息跳转的 url 地址          | String  | —      | '/syscenter/management/message-center/message-list/' |
| messageListLink | 点击消息列表跳转的地址           | String  | —      | '/syscenter/management/message-center/message-list'  |
| imageUrl        | 图片的 url 根地址                | string  | —      | '/web/static/images/top/'                            |

### Events

| 事件名称       | 说明                                                                           | 回调参数                                     |
| -------------- | ------------------------------------------------------------------------------ | -------------------------------------------- |
| handleSelect   | 点击切换菜单时触发，只有路由表中的 resourceId 与路由 path 匹配时才会导出改方法 | item：点击的路由信息                         |
| setWindows     | 当窗口变换长度时触发，可能需要讲长度存入 vuex 中                               | width：缩放后的长度                          |

### Slot
| name | 说明 |
|------|--------|
| logo | 标题前的图标，如果存在图标使用slot写即可 |
