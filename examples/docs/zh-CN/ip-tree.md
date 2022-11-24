## ip-tree 树组件

目前该组件，只针对项目中科室、医生、病区、医疗组需求来做的定制化树组件，且只支持右侧已选部分数据结构是树结构的字典树。如需增加同类型数据结构的字典树，需在 api.js 文件中的 apiUrlList 数组中添加配置项。如后期产品需求希望此组件能支持右侧已选的字典数据结构是 list 形式的则需要开发者继续优化迭代。

### 基础用法

:::demo

```html
<template>
  <div class="block">
    <div class="row">
      <span class="label">出院科室</span>
      <span class="fake-input" @click="showDeptDialog">
        <el-tag size="mini" v-if="depts.length >= 1"
          >{{ depts[0] && depts[0].name }}</el-tag
        >
        <el-tag size="mini" v-if="depts.length > 1"
          >+{{ depts.length - 1 }}</el-tag
        >
      </span>
    </div>
    <ip-tree
      ref="DeptSelectorRef"
      :checked-nodes="deptIds"
      :urlType="'dept'"
      :title="'科室'"
      :deptType='"IPT"'
      :role="'PHARMACIST'"
      @checkNodes="getDepts"
    >
    </ip-tree>
  </div>
</template>
<script> 
  export default {
    
    data() {
      return {
        deptIds: [],
        depts: [],
      };
    },
    methods: {
      showDeptDialog() {
        this.$refs.DeptSelectorRef.open();
      },
      getDepts(value) {
        this.deptIds = this.getTreeIdList(value);
        let list = this.getTreeTotalList(value);
        this.depts = list;
      },
      getTreeTotalList(treeData) {
        let list = [];
        const forEachTree = (treeData) => {
          treeData.forEach((node) => {
            if (node.children && node.children.length > 0) {
              forEachTree(node.children);
            } else {
              list.push({ id: node.id, name: node.name });
            }
          });
        };
        forEachTree(treeData);
        return list;
      },
      getTreeIdList(treeData) {
        let list = [];
        const forEachTree = (treeData) => {
          treeData.forEach((node) => {
            list.push(node.id);
            if (node.children && node.children.length > 0) {
              forEachTree(node.children);
            }
          });
        };
        forEachTree(treeData);
        return list;
      },
    },
  };
</script>
<style>
  .fake-input{
    text-align: left;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 2px;
    border: 1px solid #DCDFE6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    outline: 0;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    position: relative;
    white-space: nowrap;
    overflow: hidden;
  }
  .page-component .content{
    padding-top:0px;
  }
</style> 
```
:::
### Attributes
| 参数            | 说明                             | 类型    | 可选值 | 默认值    
| -------------- |----------------------------------|--------|--------|----------|
| checkedNodes   | 已选择的科室树节点数据               | Array  | -       | []       |
| urlType        | 接口类型：dept、doctor             | String | dept、doctor、ward、group | dept |
| title          | 树组件弹框 title                   | String | -        |   科室名称 |
| deptType       | 科室类型： 门诊、住院                |  String | OPT、IPT | OPT |
| permission     | 后端根据不同的权限给出不同的数据       |  String  | MANAGE（ 管理科室 ）、DOCTOR（ 医生 ）、IGNORE（无限制） | MANAGE |
| role           | 过滤医生                           |  String  | ALL、 PHARMACIST（ 抗网项目过滤填写人是药师 ） | All | 

### Events
| 事件名称       | 说明                                                                           | 回调参数                                     |
| -------------- | ------------------------------------------------------------------------------ | -------------------------------------------- |
| checkNodes   | 保存后获取已选择的数据          ｜       