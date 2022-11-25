## ip-message 消息

带 websocket 的业务消息通知，数据已放入内部处理，需要传入userId创建socket连接。

### 基础用法

:::demo

```html
<template>
  <div class="block">
    <ip-message
      :userId="-200"
      tempUrl="/syscenter/management/message-center/message-list/"
      messageListLink="/syscenter/management/message-center/message-list"
    >
    </ip-message>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {

    },
  }
</script>
```

:::

### Attributes

| 参数            | 说明                             | 类型   | 可选值 | 默认值                                               |
| --------------- | -------------------------------- | ------ | ------ | ---------------------------------------------------- |
| userId          | 用户 id                          | Number | —      | —                                                    |
| tempUrl         | 点击消息跳转的 url 地址          | String | —      | '/syscenter/management/message-center/message-list/' |
| messageListLink | 点击消息列表跳转的地址           | String | —      | '/syscenter/management/message-center/message-list'  |

