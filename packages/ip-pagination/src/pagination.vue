<template>
  <div ref='changePaginationDom'>
    <ElPagination ref="pagination" v-bind="_attrs" :total="total" :currentPage='currentPage' :pageSizes='pageSizes'
      :pageSize='pageSize' :layout='layout' @size-change='sizeChange' @current-change='currentChange'
      @prev-click="prevClick" @next-click="nextClick" />
  </div>
</template>
<script>
import ElPagination from 'element-ui/packages/pagination';
export default {
  name: 'IpPagination',
  components: {
    'el-pagination': ElPagination
  },
  props: {
    total: {
      type: Number,
      default: 0
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50, 100]
    },
    layout: {
      type: String,
      default: 'total, ->, sizes, prev, pager, next, jumper'
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 20,
      firstPageEl: {},
      lastPageEl: {}
    };
  },
  computed: {
    pageChange() {
      const { pageSize, currentPage, total } = this;
      return { pageSize, currentPage, total };
    },

    _attrs() {
      let attrs = { ...this.$attrs };
      return attrs;
    }

  },
  methods: {
    sizeChange(pageSize) {
      this.pageSize = pageSize;
      this.currentPage = 1;
      this.$emit('size-change', this.pageSize);
    },
    currentChange(curPage) {
      this.currentPage = curPage;
      this.$emit('current-change', this.currentPage);
    },
    prevClick(prev) {
      this.$emit('prev-click', prev);
    },
    nextClick(prev) {
      this.$emit('next-click', prev);
    }

  },
  mounted() {
    let el = this.$refs.changePaginationDom;
    let elPaginationRightWrapperEl = el.querySelector('.el-pagination__rightwrapper') || null;
    if (!elPaginationRightWrapperEl) return;
    let prevButtonEl = el.querySelector('button.btn-prev') || null;
    if (!prevButtonEl) return;
    prevButtonEl.innerHTML = '上一页';
    let nextButtonEl = el.querySelector('button.btn-next') || null;
    if (!nextButtonEl) return;
    nextButtonEl.innerHTML = '下一页';
    this.firstPageEl = prevButtonEl.cloneNode(true); // 拷贝其他节点 生成新节点
    this.firstPageEl.innerHTML = '首页'; // 修改节点内容
    this.firstPageEl.disabled = true; // 修改节点 disabled 状态
    elPaginationRightWrapperEl.insertBefore(this.firstPageEl, prevButtonEl); // 插入节点
    this.lastPageEl = nextButtonEl.cloneNode(true);
    this.lastPageEl.innerHTML = '末页';
    this.lastPageEl.disabled = true;
    let pageText = el.querySelector('.el-pagination__jump') || null;
    if (!pageText) return;
    pageText.childNodes[0].nodeValue = '跳转到：';
    pageText.childNodes[2].nodeValue = '';
    elPaginationRightWrapperEl.insertBefore(this.lastPageEl, nextButtonEl.nextSibling);
  },
  watch: {
    // page size total 改变时执行
    pageChange: {
      handler() {
        let { firstPageEl, lastPageEl, currentPage, total, pageSize } = this;
        // 添加点击监听事件
        this.firstPageEl.onclick = () => {
          this.currentPage = 1;
          this.$emit('current-change', this.currentPage);
        };
        this.lastPageEl.onclick = () => {
          this.currentPage = Math.ceil(total / pageSize);
          this.$emit('current-change', this.currentPage);
        };
        const maxPage = Math.ceil(total / pageSize);
        if (maxPage <= 1) {
          firstPageEl.disabled = true;
          lastPageEl.disabled = true;
        } else {
          if (currentPage === 1) {
            firstPageEl.disabled = true;
            lastPageEl.disabled = false;
          } else if (currentPage === maxPage) {
            firstPageEl.disabled = false;
            lastPageEl.disabled = true;
          } else {
            firstPageEl.disabled = false;
            lastPageEl.disabled = false;
          }
        }
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/.el-pagination {
  button {
    padding: 0 10px;
    margin: 0 4px;
    border-radius: 4px;

    &:disabled {
      color: #999999;
    }
  }

  span:not([class*=suffix]),
  .el-pagination__jump {
    color: #666666;
    font-size: 12px;
  }

  .btn-prev,
  .btn-next,
  .el-pager li {
    border: 1px solid #DCDFE6;
    font-size: 14px;
    color: #666666;
    font-weight: 400;
  }

  .el-pager li {
    min-width: 29px;
    margin: 0 4px;
    border-radius: 4px;

    &.active {
      background: #4585FF;
      color: #fff;
    }
  }
}
</style>
