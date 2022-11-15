## ip-sidebar 侧边栏

vue2 统一样式的侧边栏。

### 基础用法

:::demo

```html
<template>
  <div class="block">
    <ip-sidebar
      style="height:500px"
      :sidebarData="sidebarData"
      :opened="opened"
      :withoutAnimation="false"
      activeMenu="#doctor-statistical"
      @toggleSideBar="toggleSideBar"
    >
      <a href="#doctor-statistical"></a>
      <a href="#overview"></a>
      <a href="#statistics"></a>
      <a href="#dept-statistical"></a>
    </ip-sidebar>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        windowW: 0,
        opened: true,
        sidebarData: [
          {
            id: 300101,
            resourceId: 'overview',
            permission: '',
            name: '使用概览',
            status: 1,
            type: 0,
            systemId: 'cpod',
            url: '#overview',
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
          {
            id: 300102,
            resourceId: 'statistics',
            permission: '',
            name: '全院统计',
            status: 1,
            type: 0,
            systemId: 'cpod',
            url: '#statistics',
            pId: 'report',
            icon: 'icon-menu-statistics',
            remark: '',
            module: '',
            sort: 2,
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
            key: 'cpod_statistics_',
          },
          {
            id: 300104,
            resourceId: 'dept_statistics',
            permission: '',
            name: '科室统计',
            status: 1,
            type: 0,
            systemId: 'cpod',
            url: '#dept-statistical',
            pId: 'report',
            icon: 'icon-menu-dept-statistical',
            remark: '',
            module: '',
            sort: 4,
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
            key: 'cpod_dept_statistics_',
          },
          {
            id: 300105,
            resourceId: 'doctor_statistics',
            permission: '',
            name: '医生统计',
            status: 1,
            type: 0,
            systemId: 'cpod',
            url: '#doctor-statistical',
            pId: 'report',
            icon: 'icon-menu-doctor-statistical',
            remark: '',
            module: '',
            sort: 5,
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
            key: 'cpod_doctor_statistics_',
          },
        ],
      }
    },
    mounted() {
      this.windowW = 0
    },
    watch: {
      windowW: {
        handler: function(newVal, oldValue) {
          if (newVal <= 1280) {
            this.opened = false
          } else if (newVal > 1280) {
            if (!this.opened) {
              this.opened = true
            }
          }
        },
        immediate: true,
      },
    },
    methods: {
      toggleSideBar() {
        this.opened = !this.opened
      },
    },
  }
</script>
```

:::

### Attributes

| 参数             | 说明                 | 类型    | 可选值 | 默认值  |
| ---------------- | -------------------- | ------- | ------ | ------- |
| sidebarData      | 侧边栏源数据         | array   | —      | []      |
| activeMenu       | 当前活跃路由 path    | string  | —      | ''      |
| opened           | 侧边栏展开与收起状态 | boolean | —      | true    |
| withoutAnimation | 是否关闭动画         | boolean | —      | false   |
| device           | 当前设备类型         | string  | —      | desktop |

### Events

| 事件名称      | 说明                                       | 回调参数 |
| ------------- | ------------------------------------------ | -------- |
| toggleSideBar | 点击切换箭头时触发，主要控制 opened 的状态 |
