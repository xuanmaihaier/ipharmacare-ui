## ip-file-download 导出下载

针对逸曜 Vue2 项目导出下载功能的二次封装，根据原项目中的核心功能进行封装，并对业务代码进行了抽离，基本可以满足所有 vue2 项目，与项目中相比改动较大，需要在产品确定一致性的情况下进行替换

### 基础用法

:::demo 设置`ref`，点击导出通过ref上的toggleDialogVisible触发显示；设置`statusKey`，表示文件列表中文件状态的key，目前value与后端限定的是0未开始，1生成中，2生成成功，3生成失败；设置`options`是组件的配置项，提供组件长度`width`，`hiddenColProps`可以去隐藏特定的列；设置`disabled`可以设置导出按钮是否可以点击；`loading`是导出列表的加载loading；`tableData`则是表格列表的数据源；`downloadFile`方法为下载，暴露出的id在父组件请求并打开链接即可；`handlerTableExportClick`为点击导出按钮触发的方法，控制弹窗的显示隐藏；`getFileList`为获取数据源，可以通过是否存在未开始、生成中的数据进行定时重新获取，通过flag触发回调即可；`deleteFile`与`clearFileList`分别是删除单个数据与删除所有数据，其回调同样会触发`getFileList`以及确认弹窗的关闭。

```html
<template>
  <div class="block">
    <ip-file-download
      ref="ReportFileRef"
      statusKey="exportStatus"
      :options="downloadOptions"
      :disabled="disabled"
      :loading="loading"
      :tableData="fileTableList"
      @downloadFile="downloadFile"
      @handlerTableExportClick="handlerTableExportClick"
      @getFileList="getFileList"
      @deleteFile="deleteFile"
      @clearFileList="clearFileList"
    >
    </ip-file-download>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        // 导出外表格的数据
        tableList: [
          {
            name: '逸曜',
          },
        ],
        // 可下载列表表格的数据
        fileTableList: [],
        // 导出组件
        downloadOptions: {
          width: '80', // 长度

          hiddenColProps: ['exportDate'], // 导出需要隐藏的列名
        },
        // 表格加载
        loading: false,
      }
    },
    computed: {
      disabled() {
        return !this.tableList.length
      },
    },
    mounted() {
      // this.downloadOptions.exportModule = 'SUMMARY'
      // this.downloadOptions.exportModule_ = 'summary'
    },
    methods: {
      // 导出
      handlerTableExportClick() {
        setTimeout(() => {
          // code 200
          this.$refs['ReportFileRef'].toggleDialogVisible()
        }, 100)
      },
      getFileList(callback) {
        this.loading = true
        setTimeout(() => {
          this.fileTableList = [
            {
              id: 15220,
              serverCode: 'intervene',
              exportModule: '干预概要统计',
              isRemote: 0,
              remoteUrl: null,
              fileName: '干预概要统计门诊2022-11-07.xlsx',
              filePath: 'intervene/SUMMARY/2022-11-07T10:54:15.849',
              exportProcess: null,
              exportStatus: 0,
              exportUserId: -200,
              exportDate: '2022-11-07 10:54:16',
              downloadCount: 0,
            },
            {
              id: 15225,
              serverCode: 'intervene',
              exportModule: '干预概要统计',
              isRemote: 0,
              remoteUrl: null,
              fileName: '干预概要统计门诊2022-11-07.xlsx',
              filePath: 'intervene/SUMMARY/2022-11-07T11:01:21.597',
              exportProcess: null,
              exportStatus: 1,
              exportUserId: -200,
              exportDate: '2022-11-07 11:01:22',
              downloadCount: 0,
            },
            {
              id: 15224,
              serverCode: 'intervene',
              exportModule: '干预概要统计',
              isRemote: 0,
              remoteUrl: null,
              fileName: '干预概要统计门诊2022-11-07.xlsx',
              filePath: 'intervene/SUMMARY/2022-11-07T10:54:15.849',
              exportProcess: null,
              exportStatus: 2,
              exportUserId: -200,
              exportDate: '2022-11-07 10:54:16',
              downloadCount: 0,
            },
            {
              id: 15222,
              serverCode: 'intervene',
              exportModule: '干预概要统计',
              isRemote: 0,
              remoteUrl: null,
              fileName: '干预概要统计门诊2022-11-07.xlsx',
              filePath: 'intervene/SUMMARY/2022-11-07T10:54:15.849',
              exportProcess: null,
              exportStatus: 3,
              exportUserId: -200,
              exportDate: '2022-11-07 10:54:16',
              downloadCount: 0,
            },
          ]
          // 重载
          let needReloadFlag = this.fileTableList.some((item) => {
            return item.exportStatus === 0 || item.exportStatus === 1
          })
          callback(needReloadFlag)
          this.loading = false
        }, 500)
      },
      clearFileList(callback) {
        console.log('模拟删除整体，组件内部会重新调用获取数据方法')
        // code 200
        this.fileTableList = []
        callback()
      },
      deleteFile(parmas, callback) {
        console.log(parmas,'模拟删除单个，组件内部会重新调用获取数据方法')
        // code 200
        this.fileTableList = []
        callback()
      },
      downloadFile(parmas) {
        console.log(parmas)
        const a = document.createElement('a')
        // a.href = downloadApi.getExportFileData(params)
        // code 200
      //   this.$nextTick(() => {
      //   a.click()
      //   a.remove()
      // })
      },
    },
  }
</script>
```

:::

### Attributes

| 参数               | 说明                                                     | 类型              | 可选值      | 默认值 |
|--------------------|----------------------------------------------------------|-------------------|-------------|--------|
| statusKey | 导出列表中状态的key字段 | string | — | 'exportStatus' |
| disabled  | 导出按钮是否可以点击    | boolean | — | false |
| loading   | 导出列表的loading状态  | boolean | — | false |
| tableData | 导出列表的数据源       | array  | — | [] |
| options   | 组件的配置项 width：长度  hiddenColProps：需要隐藏的列    | object  | — | {} |

### Events

| 事件名称       | 说明                               | 回调参数 |
| -------------- | ---------------------------------- | -------- |
| handlerTableExportClick | 点击导出按钮触发，通过`this.$refs['ReportFileRef'].toggleDialogVisible()`设置组件的显示 | \ |
| downloadFile   | 点击下载时触发；parmas为点击的id；通过回调参数中的a.href设置跳转链接  | params, a |
| getFileList    | 获取导出文件列表；callback函数中如果传入true,会执行内部定时器，可以通过list数据中是否存在未生成、生成中的数据来判断是否执行callback  | parmas, callback |
| deleteFile     | 删除单个文件；parmas为文件id；callback执行会触发关闭二次确认窗口并重新执行getFileList，可以在发送请求200后执行  | parmas, callback |
| clearFileList  | 删除所有文件；callback执行会触发关闭二次确认窗口并重新执行getFileList，可以在发送请求200后执行  | parmas, callback |

