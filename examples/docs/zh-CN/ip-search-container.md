## ip-search-container 带展开的搜索

支持展开收起的搜索组件，与项目中不同的是，业务项目中可以使用v-slot，该demo中只能使用slot=''，如果遇到存在slot无效的情况，请在业务项目中手动修改v-slot=>slot。

### 基础用法

:::demo 设置`isExtend`，表示是否默认展开；`search`方法在点击搜索按钮时触发；`extend`方法在点击更多时触发；根据`slot`name的不同区分不同的区域。

```html
<template>
  <div class="block">
    <ip-search-container @search="toQuery" :extend="isExtend" @extend="emitFn">
      <template slot='search-default'>
        <el-col :span="6">
          <el-form-item
            label="药品名称/ID："
            prop="productName"
            label-width="100px"
          >
            <el-autocomplete
              v-model="params.productName"
              style="width: 100%"
              :trigger-on-focus="false"
              clearable
              filterable
              placeholder=""
              remote
              reserve-keyword
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="规格：">
            <el-input v-model="params.specification" placeholder="" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="厂家：">
            <el-input v-model="params.manufacturerName" placeholder="" />
          </el-form-item>
        </el-col>
      </template>
      <template slot='search-extend'>
        <el-col :span="6">
          <el-form-item v-show="isExtend" label="状态：">
            <el-select
              v-model="params.status"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in statusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </template>
      <template slot='search-operation'>
        <el-button icon="el-icon-search" plain @click="toQuery">搜索</el-button>
      </template>
    </ip-search-container>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        params: {
          productName: '逸曜公用组件库',
          specification: '250',
          manufacturerName: '逸曜信息',
          status: 0,
        },
        statusList: [
          {
            label: '逸曜',
            value: 0,
          },
        ],
        isExtend: false,
      }
    },
    methods: {
      toQuery() {
        console.log('toQuery')
      },
      emitFn($event) {
        console.log($event)
        this.isExtend = $event
      },
    },
  }
</script>
```

:::

### Attributes

| 参数               | 说明                                                     | 类型              | 可选值      | 默认值 |
|--------------------|----------------------------------------------------------|-------------------|-------------|--------|
| isExtend | 是否默认展开 | boolean | — | false |

### Events

| 事件名称       | 说明                               | 回调参数 |
| -------------- | ---------------------------------- | -------- |
| search         | 点击搜索时触发                        | \ |
| extend         | 点击更多和收起时触发                   | 当前isExtend   |

### Slot

| name | 说明                                      |
| ---- | ----------------------------------------- |
| search-default    | 默认显示的筛选框 |
| search-extend     | 点击展开显示的筛选框 |
| search-operation  | 操作框 |
