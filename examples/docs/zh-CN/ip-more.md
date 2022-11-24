## ip-more 更多

业务中的更多按钮，数据已在内部处理。

### 基础用法

:::demo

```html
<template>
  <div class="block">
    <ip-more
      imageUrl="http://10.1.1.156:9999/web/static/images/top/"
    >
    </ip-more>
  </div>
</template>
<script>
  export default {
    data() {
      return {
      }
    },
    methods: {},
  }
</script>
```

:::

### Attributes

| 参数           | 说明            | 类型   | 可选值 | 默认值                    |
| -------------- | --------------- | ------ | ------ | ------------------------- |
| imageUrl       | 图片的 url 根地址 | string | —      | '/web/static/images/top/' |
