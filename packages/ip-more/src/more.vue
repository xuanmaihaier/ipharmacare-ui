<template>
  <el-dropdown trigger="click" placement="bottom-end" @visible-change="visibleChange">
    <span class="el-dropdown-link" style="margin: 0">
      <span class="iconfont icon-menu" style="vertical-align: center;padding-right: 5px" />
      <span>更多</span>
    </span>
    <el-dropdown-menu slot="dropdown" ref="dropdownMenu" class="extend-nav flex flex-column" style="width: 300px">
      <!-- 菜单主体 -->
      <div v-if="extensionMenusInit && extensionMenusInit.length" class="flex-1 extend-nav-main" style="flex: 1 1 auto">
        <el-dropdown-item v-for="(item, index) in extensionMenusInit" :key="index" class="extend-nav-item">
          <div @click="blink(item)">
            <div class="extend-menus-name">
              <span class="extend-menus-img">
                <img :src="`${imageUrl}${item.systemId}.svg`">
              </span>
              <span>
                {{ item.name }}
              </span>
            </div>
            <div class="extend-menus-children-name" :title="item.navName">
              <span v-for="(item, index) in item.children" :key="index">
                · {{ item.name }}
              </span>
            </div>
          </div>
        </el-dropdown-item>
      </div>
      <!-- 菜单footer -->
      <div>
        <el-dropdown-item style="padding: 0">
          <ul class="extend-quick-route">
            <li style="margin-top: 10px">
              <a href="/intervene/zlcx/aq.action" target="_blank">处方评估</a>
              |
              <a href="/pages/docs/" target="_blank">资料查询</a>
              |
              <a href="/pages/drug-match/matching" target="_blank">配伍禁忌</a>
              |
              <a href="/intervene/medjs/heart_system.jsp" target="_blank">医学计算</a>
            </li>
          </ul>
        </el-dropdown-item>
      </div>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'IpMore',
  props: {
    extensionMenus: {
      type: Array,
      default: () => []
    },
    imageUrl: {
      type: String,
      default: '/web/static/images/top/'
    }
  },
  computed: {
    extensionMenusInit() {
      return this.extensionMenus;
    }
  },
  watch: {
    extensionMenus: {
      handler: function() {
        this.sortMenus(this.extensionMenusInit);
        if (this.extensionMenusInit && this.extensionMenusInit.length) {
          this.extendMenuAllHeight =
              this.extensionMenusInit.length * this.extendMenuItemHeight +
              (this.extendMenuItemHeight +
                this.extendMenuPading * 3 +
                this.extendMenuAllBorder);
          for (let i = 0; i < this.extensionMenusInit.length; i++) {
            if (
              this.extensionMenusInit[i].children &&
                this.extensionMenusInit[i].children.length
            ) {
              this.sortMenus(this.extensionMenusInit[i].children);
              let str = '';
              for (
                let k = 0;
                k < this.extensionMenusInit[i].children.length;
                k++
              ) {
                str += '.' + this.extensionMenusInit[i].children[k].name;
              }
              this.extensionMenusInit[i]['navName'] = str;
            }
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      // 消息通知
      extendMenuAllHeight: null,
      extendMenuAllBorder: 2,
      extendMenuItemHeight: 60,
      extendMenuTop: 32,
      extendMenuPading: 10,
      extendMenuBottom: 5
    };
  },
  methods: {
  // 点击更多，菜单显示隐藏
    visibleChange(value) {
      if (value) {
        this.setMenuHeight();
      }
    },
    blink(menu) {
      window.open(menu.url, '_blank');
    },
    // 递归排序
    sortMenus(navs) {
      if (navs && navs.length > 1) {
        navs.sort((a, b) => {
          return a.sort - b.sort;
        });
      }
    },
    // 自适应更多导航栏高度
    setMenuHeight() {
      this.$nextTick(() => {
        if (this.$refs.dropdownMenu) {
          const extendMenu = this.$refs.dropdownMenu.$el;
          const explorerClientHeight = document.documentElement.clientHeight;
          if (
            this.extendMenuTop +
          this.extendMenuAllHeight +
          this.extendMenuBottom >=
          explorerClientHeight
          ) {
            extendMenu.style.height =
            explorerClientHeight -
            this.extendMenuTop -
            this.extendMenuBottom * 2 +
            'px';
          } else {
            extendMenu.style.height = this.extendMenuAllHeight + 'px';
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-dropdown {
  background: #4585ff;
  line-height: 40px;
  padding: 0 10px;
}
img {
    vertical-align: middle;
}
.el-dropdown-link {
  color: #ffffff;
  cursor: pointer;  
  outline: none;
  &:focus {
    outline: none;
  }
}

.extend-nav {
  &-item {
    background: #f7f8fa;
  }

  padding: 10px;

  /deep/ .extend-nav-main {
    overflow: auto;
  }

  /deep/ li {
    height: 60px;

    .extend-menus-name {
      font-size: 14px;
      line-height: 30px;

      .extend-menus-img {
        img {
          width: 30px;
          height: 30px;
        }
      }

      span {
        color: #333;

        &.iconfont {
          color: #4585ff;
          font-size: 20px;
        }
      }

      &>* {
        vertical-align: middle;
      }
    }

    .extend-menus-children-name {
      padding-left: 25px;
      line-height: 20px;
      font-size: 12px;
      color: #666;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      span {
        padding-right: 5px;
      }
    }
  }

  /deep/ ul.extend-quick-route {
    li {
      height: 60px;
      padding: 0 10px;
      background: #f7f8fa;
      line-height: 60px;
      color: #999;
      text-align: center;
      cursor: pointer;

      a {
        font-size: 12px;
        color: #333;
        text-align: center;
        display: inline;

        &:hover {
          text-decoration: underline;
          color: #4585ff;
        }
      }
    }
  }
}
/deep/ .el-dropdown-menu__item {
    line-height: 24px;
    padding: 0 10px;
    font-size: 12px;
}

.el-popper[x-placement^='bottom'] {
  margin-top: -3px;
}
.el-popper[x-placement^='bottom'] /deep/ .popper__arrow {
  top: -7px;
}
</style>