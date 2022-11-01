## ip-pagination 分页

针对逸曜Vue2项目二次封装的通用分页器,箭头修改为上一页，下一页，增加首页与末页逻辑，并针对超长数据导致的的页码溢出父容器进行优化，此组件额外导出方法frist-click和last-click。

### 基础用法

:::demo 设置`layout`，表示需要显示的内容，用逗号分隔，(业务在基础上增加了frist,last按钮表示首页和末页)，布局元素会依次显示。`frist`表示首页，`last`表示末页，`prev`表示上一页，`next`为下一页，`pager`表示页码列表，除此以外还提供了`jumper`和`total`，`size`和特殊的布局符号`->`，`->`后的元素会靠右显示，`jumper`表示跳页元素，`total`表示总条目数，`size`用于设置每页显示的页码数量。
```html
<template>
<div class="block">
  <span class="demonstration">页数较少时的效果</span>
  <ip-pagination
    layout='total, ->, sizes, frist, prev, pager, next, last, jumper'
    :total="50"
    @frist-click='handleFristClick'
    @last-click='handleLastClick'>
  </ip-pagination>
</div>
<div class="block">
  <span class="demonstration">页数较多时的效果</span>
  <ip-pagination
    layout='total, ->, sizes, frist, prev, pager, next, last, jumper'
    :total="10000">
  </ip-pagination>
</div>
</template>
<script>
  export default {
    methods: {
      handleFristClick(val) {
        console.log(val);
      },
      handleLastClick(val) {
        console.log(val);
      }
    },
  }
</script>
```
:::
### Attributes
| 参数               | 说明                                                     | 类型              | 可选值      | 默认值 |
|--------------------|----------------------------------------------------------|-------------------|-------------|--------|
| small | 是否使用小型分页样式 | boolean | — | false |
| background | 是否为分页按钮添加背景色 | boolean | — | false |
| page-size | 每页显示条目个数，支持 .sync 修饰符 | number | — | 10 |
| total | 总条目数 | number | — | — |
| page-count | 总页数，total 和 page-count 设置任意一个就可以达到显示页码的功能；如果要支持 page-sizes 的更改，则需要使用 total 属性 | Number | — | — |
| pager-count | 页码按钮的数量，当总页数超过该值时会折叠 | number | 大于等于 5 且小于等于 21 的奇数 | 7 |
| current-page | 当前页数，支持 .sync 修饰符 | number | — | 1 |
| layout | 组件布局，子组件名用逗号分隔| String | `total`, `->`, `sizes`, `frist`, `prev`, `pager`, `next`, `last`, `jumper` | 'total, ->, sizes, frist, prev, pager, next, last, jumper' |
| page-sizes | 每页显示个数选择器的选项设置 | number[] | — |  [10, 20, 30, 40, 50, 100] |
| popper-class | 每页显示个数选择器的下拉框类名 | string | — | — |
| prev-text | 替代图标显示的上一页文字 | string | — | — |
| next-text | 替代图标显示的下一页文字 | string | — | — |
| disabled | 是否禁用 | boolean | — | false |
| hide-on-single-page | 只有一页时是否隐藏 | boolean | — | - |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| size-change | pageSize 改变时会触发 | 每页条数 |
| current-change | currentPage 改变时会触发 | 当前页 |
| prev-click | 用户点击上一页按钮改变当前页后触发 | 当前页 |
| next-click | 用户点击下一页按钮改变当前页后触发 | 当前页 |
| frist-click | 用户点击首页按钮改变当前页后触发 | 当前页 |
| last-click | 用户点击末页按钮改变当前页后触发 | 当前页 |

### Slot
| name | 说明 |
|------|--------|
| — | 自定义内容，需要在 `layout` 中列出 `slot` |