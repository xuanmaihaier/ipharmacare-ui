## ip-tree 树组件

目前该组件，只针对项目中科室、医生、病区、医疗组需求来做的定制化树组件，且只支持右侧已选部分数据结构是树结构的字典树。如需增加同类型数据结构的字典树，需在api.js文件中的apiUrlList数组中添加配置项。如后期产品需求希望此组件能支持右侧已选的字典数据结构是list形式的则需要开发者继续优化迭代。

### 基础用法

:::demo

```html
<template>
  <div class="block">
      <ip-tree 
            ref="DeptSelectorRef"
            :checked-nodes="deptIds"
            :urlType="'dept'"
            :title="'科室'"
            :deptType='"IPT"'
            :role="'PHARMACIST'"
            @checkNodes="getDepts">
      </ip-tree>
  </div> 
</template>
<script>
  export default {
    data(){
      return {
        deptIds:[]
      }
    },
    methods:{
        getDepts(value){
          this.deptIds = this.getTreeIdList(value);
        },
         getTreeIdList(treeData) {
            let list  = [];
            const forEachTree = (treeData) => {
                treeData.forEach((node) => {
                    list.push(node.id)
                    if (node.children && node.children.length > 0) {
                        forEachTree(node.children);
                    }
                })
            }
            forEachTree(treeData);
            return list
        }
    }
  }
</script>
```