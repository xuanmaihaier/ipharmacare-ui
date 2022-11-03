  <!-- 二次封装的规范 不涉及修改的的proxy 用v-bind="_attrs" 解构$attrs可以全部绑定 不涉及重写方法使用v-on='$listeners' 可以省去每一个都去emit 组件内部的样式 已经在webpack增加打包sass的配置，在组件内部写即可,插槽也可以暴露，该组件暂时不涉及 -->
  <!-- https://blog.csdn.net/qq_42365082/article/details/125144676 -->
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
  },
  render(h) {
    const Pagination = h(
      'el-pagination',
      {
        ref: 'pagination',
        props: {
          ...this.$attrs,
          total: this.total, // 分页总数
          currentPage: this.currentPage, // 当前页码
          pageSize: this.pageSize, // 当前页数量
          layout: this.layout,
          pageSizes: this.pageSizes
        },
        // attrs: { align: 'right' },
        on: {
          'size-change': pageSize => {
            // size-change事件时currentPage 赋值为1，避免el-pagination某些场景调用两次查询方法，比如，共有29条数据，每页20条，切换到第二页的时候展示了9条，这是size-change调整为30，此时第二页其实没有数据，el-pagination会再次调用查询方法，page传1
            this.pageSize = pageSize;
            this.currentPage = 1;
            this.$emit('size-change', this.pageSize);
          },
          'current-change': curPage => {
            this.currentPage = curPage;
            this.$emit('current-change', this.currentPage);
          },
          'prev-click': curPage => {
            this.currentPage = curPage;
            this.$emit('prev-click', this.currentPage);
          },
          'next-click': curPage => {
            this.currentPage = curPage;
            this.$emit('next-click', this.currentPage);
          }
        }
      }
    );
    return (<div ref='changePaginationDom'>{Pagination}</div>);
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
