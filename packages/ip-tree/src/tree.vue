<template>
  <el-dialog
    :title="'选择' + _title + '名称'"
    width="650px"
    :visible.sync="dialogVisible"
    custom-class="tree-selector-dialog"
  >
    <div class="flex-1 flex flex-column drugContent">
      <div class="flex-1 flex flex-column" v-show="typeModel == 'tree'">
        <div class="search-bar tree-dialog-search">
          <el-form
            :inline="true"
            class="demo-form-inline"
            @keyup.enter.native="search"
            @submit.native.prevent
          >
            <el-form-item :label="_title + '名称' + ':'">
              <el-input
                class="dict-input"
                size="mini"
                :placeholder="'输入' + _title + '名称'"
                v-model="filterKeyword"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                icon="el-icon-search"
                size="small"
                plain
                @click="search"
                >查询</el-button
              >
            </el-form-item>
          </el-form>
          <el-button
            icon="el-icon-edit"
            size="small"
            plain
            @click="goToBatchBox"
            >批量输入</el-button
          >
        </div>
        <div class="flex tree-box-total">
          <div class="tree-box flex flex-1 flex-column mr5">
            <div class="flex checked-handler" v-if="isExpand">
              <span
                :class="{ disabled: !treeData.length }"
                size="default"
                @click="allChecked"
                >全选</span
              >
            </div>
            <div class="flex flex-1 content" style="overflow: auto;">
              <el-tree
                ref="treeModel"
                :expand-on-click-node="false"
                :default-expanded-keys="pExpandList"
                highlight-current
                :props="config"
                :empty-text="contentTitle"
                node-key="id"
                lazy
                :load="lazyLoadNode"
                :data="treeData"
                @node-click="handleNodeClick"
              >
              </el-tree>
            </div>
          </div>
          <div class="tree-box flex flex-1 flex-column ml5">
            <div class="flex checked-handler">
              <span>已选</span>
              <el-tooltip effect="dark" content="清除" placement="top">
                <i class="el-icon-delete" @click="removeAll"></i>
              </el-tooltip>
            </div>
            <div class="flex flex-1 content" style="overflow: auto;">
              <el-tree
                ref="childrenTreeModel"
                :expand-on-click-node="false"
                highlight-current
                :default-expanded-keys="expandList"
                :props="config"
                node-key="id"
                lazy
                :load="lazyLoadChildNode"
                :data="childrenTreeData"
                @node-click="removeCheckedNode"
              >
              </el-tree>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex-1 flex flex-column"
        v-show="typeModel == 'batch'"
        style="background: #f9f9f9;"
      >
        <div class="zoneList">
          <label>选择机构：</label>
          <el-select
            v-model="batchzoneIds"
            multiple
            collapse-tags
            size="mini"
            class="multiple-select-no-wrap"
            placeholder="请选择"
          >
            <el-option
              v-for="item in zoneList"
              :key="item.zoneId"
              :label="item.zoneName"
              :value="item.zoneId"
            >
            </el-option>
          </el-select>
        </div>
        <div style="padding: 0 10px;">
          <el-input
            v-model="groupTextarea"
            class="importBox"
            rows="13"
            :placeholder="
              '请输入' +
                _title +
                '名称， 多个支持换行或|分隔，最多输入1000个名称'
            "
            type="textarea"
            resize="none"
          />
        </div>
        <div class="text-line">
          当医院存在多机构且多机构下有同名{{ title }}时，可选择指定的机构
        </div>
      </div>
    </div>
    <!-- footer -->
    <template slot="footer" class="dialog-footer">
      <template v-if="typeModel == 'tree'">
        <el-button size="small" @click="close">关闭</el-button>
        <el-button size="small" type="primary" @click="confirm">确定</el-button>
      </template>
      <template v-if="typeModel == 'batch'">
        <el-button size="small" @click="typeModel = 'tree'">返回</el-button>
        <el-button
          size="small"
          type="primary"
          :key="'changes'"
          @click="importTreeData"
          :disabled="!groupTextarea"
          >导入</el-button
        >
      </template>
    </template>
  </el-dialog>
</template>

<script>
import treeApi from './api.js';
import ElDialog from 'web-vue2-front-end-lib/packages/dialog';
import ElForm from 'web-vue2-front-end-lib/packages/form';
import ElFormItem from 'web-vue2-front-end-lib/packages/form-item';
import ElButton from 'web-vue2-front-end-lib/packages/button';
import Tree from 'web-vue2-front-end-lib/packages/tree';
import Tooltip from 'web-vue2-front-end-lib/packages/tooltip';
import Select from 'web-vue2-front-end-lib/packages/select';
import ElOption from 'web-vue2-front-end-lib/packages/option';
import ElInput from 'web-vue2-front-end-lib/packages/input';
import _ from 'lodash';
export default {
  name: 'IpTree',
  components: {
    ElDialog,
    ElForm,
    ElFormItem,
    ElButton,
    Tree,
    Tooltip,
    Select,
    ElOption,
    ElInput
  },
  props: {
    checkedNodes: {
      type: Array
    },

    urlType: {
      type: String
    },

    title: {
      type: String
    },

    deptType: {
      type: String
    },

    permission: {
      type: String
    },

    role: {
      type: String
    }
  },
  watch: {
    checkedNodes: {
      handler: function(newValue, oldValue) {
        if (newValue) {
          this._checkedNodes = newValue;
        }
      },
      immediate: true
    },

    urlType: {
      handler: function(newValue, oldValue) {
        if (newValue) {
          this._urlType = newValue;
        }
      },
      immediate: true
    },

    title: {
      handler: function(newValue, oldValue) {
        if (newValue) {
          this._title = newValue;
        }
      },
      immediate: true
    },

    deptType: {
      handler: function(newValue, oldValue) {
        if (newValue) {
          this._deptType = newValue.toUpperCase();
        }
      },
      immediate: true
    },

    permission: {
      handler: function(newValue, oldValue) {
        this._permission = newValue || 'MANAGE';
      },
      immediate: true
    },

    role: {
      handler: function(newValue, oldValue) {
        this._role = newValue || 'PHARMACIST';
      },
      immediate: true
    }
  },

  data() {
    return {
      expandList: [],
      pExpandList: [],
      _checkedNodes: [],
      _title: '科室名称',
      _urlType: 'dept',
      contentTitle: '暂无数据',
      findIdlist: [],
      pfindIdlist: [],
      typeModel: 'tree',
      _deptType: 'OPT',
      _role: 'ALL',
      _permission: 'MANAGE',
      dialogVisible: false,
      treeData: [], // 默认树的数据
      childrenTreeData: [], // 子树的数据
      groupTextarea: '',
      loading: false,
      isExpand: false,
      isLazy: true,
      filterMode: false, // 搜索模式
      filterKeyword: '',
      zoneList: [],
      batchzoneIds: [],
      count: 0,
      config: {
        label: 'name',
        isLeaf: 'leaf'
      }
    };
  },

  methods: {
    // 打开
    open() {
      this.dialogVisible = true;
      if (
        this._checkedNodes &&
        this._checkedNodes.length &&
        !this.childrenTreeData.length
      ) {
        this.getBackNewData();
      }
      if (!this._checkedNodes || !this._checkedNodes.length) {
        this.childrenTreeData = [];
      }
      this.typeModel = 'tree';
      this.groupTextarea = '';
      this.batchzoneIds = [];
    },

    // 获得机构列表
    getZoneList() {
      this.zoneList = [];
      let params = {
        permission: this._permission
      };
      treeApi.getZoneListData(params).then((res) => {
        this.batchzoneIds = [];
        if (res.code == 200) {
          let arr = res.data;
          arr.forEach((item) => {
            this.zoneList.push(item.dataNode);
          });
          this.batchzoneIds.push(this.zoneList[0].zoneId);
        }
      });
    },

    // 左侧搜索
    search() {
      let params = {
        deptType: this._deptType,
        name: this.filterKeyword,
        nameList: [],
        permission: this._permission,
        sameLevel: false,
        role: this._role,
        zoneList: []
      };
      treeApi.getTreeData(this._urlType, params).then((res) => {
        if (res.code == 200) {
          if (this.filterKeyword) {
            this.isExpand = true;
            this.setNodeLeaf(res.data);
            this.treeData = res.data || [];
            this.pexpandIdLists(this.treeData);
            this.pExpandList = _.cloneDeep(this.pExpandList);
          } else {
            this.isExpand = false;
            this.pExpandList = [];
            this.setNodeLeaf(res.data);
            this.treeData = res.data || [];
          }
        }
      });
    },

    // 遍历树结构
    setNodeLeaf(list) {
      const forEachTree = (treeData) => {
        treeData.forEach((node) => {
          if (!node.hasNext) {
            node.leaf = true;
          } else {
            node.leaf = false;
          }
          if (node.children && node.children.length > 0) {
            forEachTree(node.children);
          }
        });
      };
      forEachTree(list);
    },

    // 左侧树双击
    handleNodeClick(node) {
      this.count++;
      if (this.count > 2) {
        return;
      }
      setTimeout(() => {
        if (this.count == 1) {
        } else if (this.count > 1) {
          this.getChildrenTree(node);
        }
        this.count = 0;
      }, 300);
    },

    // 处理树结构数据
    getCommonList(treeData) {
      let list = [];
      const forEachTree = (treeData) => {
        treeData.forEach((node) => {
          if (node.children && node.children.length > 0) {
            list.push(node);
            forEachTree(node.children);
          } else {
            list.push(node);
          }
        });
      };
      forEachTree(treeData);
      return list;
    },

    getChildrenTree(node) {
      let nodesList = [];
      nodesList = _.cloneDeep(this.treeData);
      let commonList = this.getCommonList(_.cloneDeep(nodesList));
      let otherList = this.concatNewList(_.cloneDeep(commonList), node.id, []);
      this.compareRightTreeList(this.childrenTreeData, node);
      if (this.isExpand && node.children && node.children.length) {
        let expendList = this.getCommonList(_.cloneDeep(node.children));
        otherList = _.concat(otherList, expendList);
      }
      this.rightTreeList = this.getCommonList(
        _.cloneDeep(this.childrenTreeData)
      );
      this.rightTreeList = _.unionBy(
        _.concat(this.rightTreeList, otherList),
        'id'
      );
      this.childrenTreeData = this.changeTreeList(
        _.cloneDeep(this.rightTreeList)
      );
      this.expandIdLists(this.childrenTreeData);
      this.expandList = _.cloneDeep(this.expandList);
    },

    // 展开idList
    expandIdLists(list) {
      this.expandList = [];
      const forEachTree = (treeData) => {
        treeData.forEach((item) => {
          if (item.children && item.children.length) {
            this.expandList.push(item.id);
            forEachTree(item.children);
          }
        });
      };
      forEachTree(list);
    },

    pexpandIdLists(list) {
      this.expandList = [];
      const forEachTree = (treeData) => {
        treeData.forEach((item) => {
          if (item.children && item.children.length) {
            this.pExpandList.push(item.id);
            forEachTree(item.children);
          }
        });
      };
      forEachTree(list);
    },

    // 点击的节点对比右侧数据，如果右侧已经存在，则把这个节点的children变为[]
    compareRightTreeList(list, node) {
      const forEachTree = (treeData) => {
        treeData.forEach((item) => {
          if (item.children && item.children.length > 0) {
            if (item.id == node.id) {
              item.children = [];
            } else {
              forEachTree(item.children);
            }
          } else {
            if (item.id == node.id) {
              item.children = [];
            }
          }
        });
      };
      forEachTree(list);
    },

    // 过滤数据
    concatNewList(arr, id, newList) {
      arr.forEach((item) => {
        if (item.id == id) {
          newList.push(item);
          if (item.pid) {
            this.concatNewList(arr, item.pid, newList);
          }
        }
      });
      return newList;
    },

    // 递归转化拼接成树结构
    changeTreeList(list) {
      const transList = [];
      list.forEach((item) => {
        item.children = [];
        if (!item.pid) {
          transList.push(item);
        }
        const transChildren = list.filter((data) => data.pid == item.id);
        item.children = transChildren;
      });
      return transList;
    },

    // 右侧树点击删除
    removeCheckedNode(node) {
      this.count++;
      if (this.count > 2) {
        return;
      }
      setTimeout(() => {
        if (this.count == 1) {
        } else if (this.count > 1) {
          this.$refs.childrenTreeModel.remove(node);
          if (node.pid) {
            this.removeNodeListChange(this.childrenTreeData, node.pid);
          }
        }
        this.count = 0;
      }, 300);
    },

    removeNodeListChange(list, id) {
      if (id) {
        const RemovedNodeList = (treeData, pid) => {
          treeData.forEach((item) => {
            if (item.id == pid) {
              if (!item.children || !item.children.length) {
                this.$refs.childrenTreeModel.remove(item.id);
                this.removeNodeListChange(this.childrenTreeData, item.pid);
              }
            }
            if (item.children && item.children.length) {
              RemovedNodeList(item.children, pid);
            }
          });
        };
        RemovedNodeList(list, id);
      }
    },

    /**
     * 右侧树懒加载
     */
    lazyLoadChildNode(node, resolve) {
      if (node.level === 0) {
      } else {
        this.findIdListFun(this.childrenTreeData, node.data.id);
        if (this.findIdlist && this.findIdlist.length) {
          return resolve(this.findIdlist);
        } else {
          this.loadChildNode(node, resolve);
        }
      }
    },

    findIdListFun(list, id) {
      this.findIdlist = [];
      const forEachTree = (treeData) => {
        treeData.forEach((item) => {
          if (item.id === id) {
            this.findIdlist = item.children;
          }
          if (item.children && item.children.length) {
            forEachTree(item.children);
          }
        });
      };
      forEachTree(list);
    },

    pfindIdListFun(list, id) {
      this.findIdlist = [];
      const forEachTree = (treeData) => {
        treeData.forEach((item) => {
          if (item.id === id) {
            this.pfindIdlist = item.children;
          }
          if (item.children && item.children.length) {
            forEachTree(item.children);
          }
        });
      };
      forEachTree(list);
    },

    /**
     * 懒加载数据
     */
    lazyLoadNode(node, resolve) {
      // 第一层的数据
      if (node.level === 0) {
        // 将父级数据放到resolve中
        this.loadFirstNode(resolve);
      } else {
        this.pfindIdListFun(this.treeData, node.data.id);
        if (this.pfindIdlist && this.pfindIdlist.length) {
          return resolve(this.pfindIdlist);
        } else {
          this.loadChildNode(node, resolve);
        }
      }
    },

    // 加载第一级节点
    loadFirstNode(resolve) {
      let params = {
        deptType: this._deptType,
        name: this.filterKeyword,
        nameList: [],
        permission: this._permission,
        sameLevel: false,
        role: this._role,
        zoneList: []
      };
      treeApi.getTreeData(this.urlType, params).then((res) => {
        if (res.data && res.data.length) {
          res.data.forEach((item) => {
            if (!item.hasNext) {
              item.leaf = true;
            } else {
              item.leaf = false;
            }
          });
        }
        this.treeData = res.data;
        return resolve(res.data);
      });
    },

    // 加载第二层+数据
    loadChildNode(node, resolve) {
      let pid = node.data.id || '';
      let params = {
        deptType: this._deptType,
        permission: this._permission,
        pid: pid,
        role: this._role,
        sameLevel: false
      };
      treeApi.getTreeChildData(this._urlType, params).then((res) => {
        if (res.data && res.data.length) {
          res.data.forEach((item) => {
            if (!item.hasNext) {
              item.leaf = true;
            } else {
              item.leaf = false;
            }
          });
        }
        node.data.children = res.data;
        return resolve(res.data);
      });
    },

    // 搜索全选
    allChecked() {
      let nodesList = [];
      nodesList = _.cloneDeep(this.treeData);
      let commonList = this.getCommonList(_.cloneDeep(nodesList));
      this.rightTreeList = this.getCommonList(
        _.cloneDeep(this.childrenTreeData)
      );
      this.rightTreeList = _.unionBy(
        _.concat(this.rightTreeList, commonList),
        'id'
      );
      this.childrenTreeData = this.changeTreeList(
        _.cloneDeep(this.rightTreeList)
      );
      this.expandIdLists(this.childrenTreeData);
      this.expandList = _.cloneDeep(this.expandList);
    },

    importTreeData() {
      if (!this.batchzoneIds.length) {
        this.$message({
          message: '请选择机构！',
          type: 'warning'
        });
        return false;
      }
      let namesArr = this.groupTextarea
        .replace(/[\r\n]/g, '|')
        .split('|')
        .filter((item) => item.length > 0);
      let params = {
        deptType: this._deptType,
        name: '',
        nameList: namesArr,
        permission: this._permission,
        sameLevel: false,
        zoneList: this.batchzoneIds,
        role: this._role
      };
      treeApi.getTreeData(this._urlType, params).then((res) => {
        if (res.code == 200) {
          if (res.data.length) {
            let nodesList = [];
            nodesList = _.cloneDeep(res.data);
            let commonList = this.getCommonList(_.cloneDeep(nodesList));
            this.rightTreeList = this.getCommonList(
              _.cloneDeep(this.childrenTreeData)
            );
            this.rightTreeList = _.unionBy(
              _.concat(this.rightTreeList, commonList),
              'id'
            );
            this.childrenTreeData = this.changeTreeList(
              _.cloneDeep(this.rightTreeList)
            );
            this.expandIdLists(this.childrenTreeData);
            this.expandList = _.cloneDeep(this.expandList);
            this.groupTextarea = '';
            this.batchzoneIds = [];
            this.typeModel = 'tree';
          } else {
            this.$message({
              message: '没有数据，请重新输入',
              type: 'warning'
            });
          }
        }
      });
    },

    // 跳转到批量处理页面
    goToBatchBox() {
      this.typeModel = 'batch';
      this.getZoneList();
    },

    // 保存数据
    confirm() {
      this.$emit('checkNodes', this.childrenTreeData);
      this.dialogVisible = false;
    },

    // 取消
    close() {
      this.dialogVisible = false;
    },

    removeAll() {
      this.childrenTreeData = [];
    },

    // 回显
    getBackNewData() {
      let params = {
        deptType: this._deptType,
        fillIds: this.checkedNodes,
        permission: this._permission,
        sameLevel: false
      };
      treeApi.getBackData(this._urlType, params).then((res) => {
        if (res.code == 200) {
          console.log(res.data);
          this.setNodeLeaf(res.data);
          let nodesList = [];
          nodesList = _.cloneDeep(res.data);
          let commonList = this.getCommonList(_.cloneDeep(nodesList));
          this.rightTreeList = this.getCommonList(
            _.cloneDeep(this.childrenTreeData)
          );
          this.rightTreeList = _.unionBy(
            _.concat(this.rightTreeList, commonList),
            'id'
          );
          this.childrenTreeData = this.changeTreeList(
            _.cloneDeep(this.rightTreeList)
          );
          this.expandIdLists(this.childrenTreeData);
          this.expandList = _.cloneDeep(this.expandList);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/ .tree-selector-dialog {
  .el-dialog__title {
    color: #333;
    font-weight: 400;
  }

  .el-dialog__header {
    background: #ffffff;
    padding: 15px 20px 15px 20px;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
  }

  .el-dialog__headerbtn {
    top: 15px !important;
    right: 20px !important;
    font-size: 16px !important;
  }

  .el-dialog__footer {
    background: #ffffff;
    padding: 10px 20px 10px 20px;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
  }

  .el-dialog__body {
    padding: 0px;
  }

  .drugContent {
    min-height: 380px;
    position: relative;

    .text-line {
      position: absolute;
      color: #666666;
      bottom: 14px;
      left: 20px;
      font-size: 12px;
    }
  }

  .tree-box-total {
    background: #f9f9f9;
    padding: 0 10px 10px 10px;

    .mr5 {
      margin-right: 5px;
    }

    .ml5 {
      margin-left: 5px;
    }
  }

  .tree-box {
    overflow: auto;
    background: #ffffff;
  }

  .checked-handler {
    padding: 4px 10px 0 10px;
    height: 32px;
    line-height: 32px;
    align-items: center;
    background: #fff;
    justify-content: space-between;

    span {
      font-size: 14px;
      font-weight: 600;
      color: #4585ff;
      cursor: pointer;
    }

    .disabled {
      color: #999999;
      font-weight: 400;
      pointer-events: none;
      cursor: not-allowed;
    }

    .el-icon-delete {
      width: 7px;
      cursor: pointer;
      margin-right: 20px;
      color: #f14141;
    }
  }

  .selected-box {
    border: 1px solid #ddd;
    margin: 0px 5px;

    .checked-node {
      overflow: auto;

      .checked-node-item {
        &:hover {
          background-color: #ecf6fd;
        }

        padding: 5px 10px;
        align-items: center;
        justify-content: space-between;

        .name {
          max-width: 250px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: inline-block;
          white-space: nowrap;
        }

        .product {
          max-width: 120px;
          margin-right: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: inline-block;
          white-space: nowrap;
        }

        i.el-icon-error {
          font-size: 18px;
          color: #999;
          cursor: pointer;

          &:hover {
            color: #f04134;
          }
        }
      }
    }
  }

  .tree-dialog-search {
    padding: 15px 10px 15px 20px;
    display: flex;
    justify-content: space-between;
    background: #f9f9f9;
    align-items: center;

    .el-form-item {
      margin-bottom: 0 !important;

      .el-form-item__label {
        color: #333;
        font-weight: 400;
        padding: 0 12px 0 0;
      }

      .el-form-item__content {
        .el-button {
          background: #f9f9f9;

          .el-icon-search {
            color: #4585ff;
          }
        }
      }

      .el-input {
        .el-input__inner {
          background: #f9f9f9;
        }
      }
    }

    .dict-input {
      width: 200px;
    }

    .el-button {
      background: #f9f9f9;

      .el-icon-edit {
        color: #4585ff;
      }
    }
  }

  .content {
    min-height: 284px;
    background: #fff;
    padding-top: 0px !important;
    // overflow: hidden;
    .el-tree {
      .el-tree-node__label {
        color: #333333;
      }
    }

    .list {
      overflow: auto;

      .list-item {
        padding: 2px 5px;
        cursor: pointer;

        span {
          max-width: 90px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: inline-block;
          white-space: nowrap;
          line-height: 14px;
          margin-right: 5px;
        }
      }
    }

    > div {
      margin: 5px;
      background: #ffffff;
      //background: #F9F9F9;
      width: 100%;
      position: relative;

      .el-tree {
        position: absolute;
        min-width: 100%;
      }
    }
  }

  .zoneList {
    margin: 15px 20px 15px 20px;

    label {
      color: #333333;
    }

    .el-input {
      .el-input__inner {
        background: #f9f9f9;
      }
    }
  }

  /deep/ .el-tree-node > .el-tree-node__children {
    overflow: inherit !important;
  }

  .el-textarea__inner {
    background-color: #ffffff;
    border: none;
    color: #333333;
    outline: none;
  }

  textarea:focus,
  textarea.focus,
  textarea:not(:disabled):not(.disabled):active,
  textarea:not(:disabled):not(.disabled).active {
    outline: none;
    border: none;
  }
}
</style>
