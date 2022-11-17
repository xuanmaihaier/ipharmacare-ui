<template>
  <div>
    <el-button plain :disabled="disabled" @click="handlerTableExportClick" style="margin-right:10px">
      <i
        class="iconfont btnicon icon-export" />
      <span class="ml-5">导出</span>
    </el-button>
    <div class="report-file-download">
      <el-button plain @click="toggleDialogVisible">
        <i
          class="iconfont btnicon icon-xiazailiebiao" />
        <span class="ml-5">下载列表</span>
      </el-button>
      <el-dialog title="文件列表" :visible.sync="dialogVisible" :width="options.width">
        <div class="flex report-file-download-inner flex-column">
          <div class="opera-btn-warp">
            <el-button size="mini" :disabled='!tableData.length' @click="showConfirmDialog('clearList')"><i
                class="icon el-icon-delete"></i>清空</el-button>
            <el-button size="mini" @click="getFileList"><i class="icon el-icon-refresh-right"></i>刷新</el-button>
          </div>
          <div class="flex flex-column flex-1">
            <el-table border class="flex-1" :data="tableData" style="width: 100%" height="a" highlight-current-row
              v-loading="loading">
              <el-table-column label="序号" width="60" :resizable="false">
                <template slot-scope="scope">
                  <div>
                    {{ scope.$index + 1 }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column v-for="config in tableColumnConfig.filter((item) =>
                hiddenColProps.includes(item.prop) ? '' : item
              )" :key="config.prop" :prop="config.prop" :label="config.name" :min-width="config.width"
                :resizable="false">
              </el-table-column>
              <el-table-column label="状态" width="80" :resizable="false">
                <template slot-scope="scope">
                  <div class="export-status">
                    <span class="export-status-pending" v-if="scope.row[statusKey] === 0">未开始</span>
                    <span class="export-status-generating" v-else-if="scope.row[statusKey] === 1">生成中</span>
                    <span class="export-status-success" v-else-if="scope.row[statusKey] === 2">生成成功</span>
                    <span class="export-status-fail" v-else-if="scope.row[statusKey] === 3">生成失败</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100" :resizable="false">
                <template slot-scope="scope">
                  <div class="export-btn">
                    <span class="export-btn-download"
                      :style="`color:${scope.row[statusKey] !== 2 ? '#B7B7B7' : '#2584FF'}`"
                      @click="downloadFile(scope.row)">
                      下载
                    </span>
                    <b> | </b>
                    <span @click="showConfirmDialog('deleteItem', scope.row)"
                      :style="`color:${scope.row[statusKey] === 1 ? '#B7B7B7' : '#2584FF'}`"
                      class="export-btn-delete">删除</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-dialog>
      <el-dialog title="提示" :visible.sync="confirmDialog.visible" width="200px" custom-class="confirm-dialog"
        top='35vh'>
        <div class="confirm-dialog-content">{{ confirmDialog.msg }}</div>
        <template slot="footer">
          <span class="dialog-footer">
            <el-button type="primary" @click="handlerConfirmDialog">确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import ElButton from 'web-vue2-front-end-lib/packages/button';
import ElDialog from 'web-vue2-front-end-lib/packages/dialog';
import ElTable from 'web-vue2-front-end-lib/packages/table';
import ElTableColumn from 'web-vue2-front-end-lib/packages/table-column';
export default ({
  name: 'IpFileDownload',
  props: {
    options: {
      type: Object,
      required: true
    },
    statusKey: {
      type: String,
      default: 'exportStatus'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      require: true,
      default: () => []
    },
    loading: {
      type: Boolean,
      require: true,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      confirmDialog: {
        type: '',
        visible: false,
        msg: '',
        selectData: {}
      },
      tableConfig: {
        border: true,
        sortConfig: {},
        showHeaderConfig: true,
        resizable: true
      },
      tableColumnConfig: [
        {
          name: '项目名称',
          prop: 'fileName',
          width: '250'
        },
        {
          name: '导出时间',
          prop: 'exportDate',
          width: '150'
        },
        {
          name: '下载次数',
          prop: 'downloadCount',
          width: '80'
        }
      ],
      timeout: null,
      getFileListTimeout: null
    };
  },
  computed: {
    hiddenColProps() {
      return this.options.hiddenColProps ? this.options.hiddenColProps : [];
    }
  },
  components: {
    'el-button': ElButton,
    'el-dialog': ElDialog,
    'el-table': ElTable,
    'el-table-column': ElTableColumn
  },
  methods: {
    handlerTableExportClick() {
      this.$emit('handlerTableExportClick');
    },
    downloadFile(file) {
      if (file && file[this.statusKey] !== 2) return;
      clearTimeout(this.getFileListTimeout);
      let params = { censusId: file.id };
      this.$emit('downloadFile', params);
      this.getFileListTimeout = setTimeout(() => {
        this.getFileList();
      }, 500);
    },

    downFile(blob, fileName) {
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(link.href);
    },

    deleteFile(fileId) {
      let params = { censusId: fileId };
      this.$emit('deleteFile', params, () => {
        this.getFileList();
        this.confirmDialog.visible = false;
      });
    },

    clearFileList() {
      this.$emit('clearFileList', () => {
        this.getFileList();
        this.confirmDialog.visible = false;
      });
    },

    getFileList() {
      clearTimeout(this.timeout);
      if (!this.dialogVisible) {
        return;
      }
      this.$emit('getFileList', needReloadFlag => {
        if (needReloadFlag) {
          this.timeout = setTimeout(() => {
            this.getFileList();
          }, 5000);
        }
      });

    },

    submitTableHeaderChange() {
      this.toggleDialogVisible();
    },

    toggleDialogVisible() {
      this.dialogVisible = !this.dialogVisible;
      this.getFileList();
    },

    showConfirmDialog(type, selectData) {
      if (selectData && selectData[this.statusKey] === 1) return;
      switch (type) {
        case 'deleteItem':
          this.confirmDialog = {
            type,
            visible: true,
            msg: '确定删除当前文件？',
            selectData
          };
          break;
        case 'clearList':
          this.confirmDialog = {
            type,
            visible: true,
            msg: '确定清空当前文件列表？',
            selectData
          };
          break;
        default:
          break;
      }
    },

    handlerConfirmDialog() {
      switch (this.confirmDialog.type) {
        case 'deleteItem':
          this.deleteFile((this.confirmDialog.selectData).id);
          break;
        case 'clearList':
          this.clearFileList();
          break;
        default:
          break;
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.btnicon {
    color: #4585FF;
    font-size: 14px;
}
.ml-5{
  margin-right: 5px;
}
.flex-1 {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1 1 0;
}
.flex {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.flex-column {
    -ms-flex-flow: column;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-flow: column;
}
.el-icon-refresh-right {
    color: #f38a24;
    font-weight: bold;
}
.report-file-download {
  position: relative;
  display: inline-block;
  // float: right;
  vertical-align: top;
  text-align: right;

  /deep/ .el-dialog.confirm-dialog {
    min-width: 300px;
    margin-top: 23vh
  }

  .confirm-dialog-content {
    padding: 10px 20px;
    font-size: 14px;
  }

  /deep/ .el-dialog {
    min-width: 800px;
    text-align: left;

    .el-dialog__header {
      .el-dialog__title {
        font-weight: 500;
      }
    }
  }


  /deep/ .el-dialog__body {
    padding: 0;
  }

  .report-file-download-inner {
    min-height: 400px;
    border: 1px solid #EEEEEE;
    border-width: 1px 0;
    line-height: 32px;

    .opera-btn-warp {
      line-height: 40px;
      padding: 8px 12px 4px 12px;

      .icon {
        font-size: 12px;
        margin-right: 6px;
      }
    }

    .export-status {

      &-pending {
        color: #ccc;
      }

      &-generating {
        color: #FFBF00;
      }

      &-success {
        color: #2584FF;
      }

      &-fail {
        color: #FF4949;
      }
    }

    .export-btn {
      >span {
        color: #2584FF;
        cursor: pointer;
      }

      >b {
        font-weight: normal;
        padding: 0 4px;
        color: #DDE8FF;
      }

      &-download {
        color: #0004fd;
      }

      &-delete {
        color: #0004fd;
      }
    }
  }
}
</style>
