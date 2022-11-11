<template>
  <div class="top-nav" :style="`min-width:${minWidth}`">
    <div class="log">{{ title }}</div>
    <el-menu v-if="showMenu" :active-text-color="variables.menuActiveText" :default-active="activeMenu" mode="horizontal"
      @select="handleSelect">
      <div v-for="item in pageResource" :key="item.url" class="nav-item">
        <app-link :to="resolvePath(item)">
          <el-menu-item :index="item.url">{{ item.name }}</el-menu-item>
        </app-link>
      </div>
    </el-menu>
    <div class="right-menu">
      <ip-message ref="ipMessage" v-bind="_attrs" v-on="$listeners" />
      <ip-more ref="ipMore" v-bind="_attrs" v-on="$listeners" />
      <div class="nav-item-tool">
        <el-dropdown trigger="click" class="user-btn">
          <span class="el-dropdown-link">
            <span class="iconfont icon-user" style="vertical-align: center;padding-right: 5px" />
            <span style="margin-left: -1px">{{ name }}</span>
          </span>
          <el-dropdown-menu slot="dropdown" class="outLoginMenu">
            <el-dropdown-item class="outLogin" @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>

import AppLink from './components/Link';
import variables from 'element-ui/packages/theme-chalk/src/public/variables.scss';

export default {
  name: 'IpTopbar',
  components: {
    AppLink
  },
  props: {
    minWidth: {
      type: String,
      default: '1280px'
    },
    title: {
      type: String,
      require: true
    },
    pageResource: {
      type: Array,
      require: true
    },
    name: {
      type: String,
      require: true
    },
    path: {
      type: String,
      default: '/dashboard'
    },
    showMenu: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    activeMenu() {
      const path = this.path;
      if (path === '/dashboard') {
        return '/';
      }
      const activeMenu = '/' + path.split('/')[1];
      return activeMenu;
    },
    variables() {
      return variables;
    },
    _attrs() {
      let attrs = { ...this.$attrs };
      return attrs;
    }
  },
  mounted() {
    // 窗口放大缩小
    window.addEventListener(
      'resize',
      () => {
        this.$emit('setWindows', window.innerWidth);
        this.$refs.ipMessage.setMessageBoxHeight();
        this.$refs.ipMore.setMenuHeight();
      },
      false
    );
  },
  methods: {
    resolvePath(item) {
      return item.url;
    },
    handleSelect(key, keyPath) {
      // 根据id和路径的key筛选出左侧菜单
      key = key.replace('/', '');
      const item = this.pageResource.find(item => {
        return item.resourceId === key;
      });
      if (item && item.children && item.children.length) {
        this.$emit('handleSelect', item);
      }
    },
    logout() {
      this.$confirm('您确定要退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning'
      }).then(() => {
        this.$emit('logout');
      });
    }
  }
};
</script>
<style lang="scss" scoped>
$navMenuHeight: 40px;

.top-nav {
  // min-width: 1280px;
  height: $navMenuHeight;

  // font-family: PingFangSC-Medium, PingFang SC;
  .el-menu {
    height: 100%;

    .nav-item .el-menu-item {
      height: $navMenuHeight;
      line-height: $navMenuHeight;
      opacity: .8;
    }

    .nav-item .el-menu-item.is-active {
      background: #004098;
      opacity: 1;
    }
  }
}

.right-menu {
  display: flex;
  align-items: center;
}

.el-dropdown-link {
  color: #ffffff;
  cursor: pointer;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.nav-item-tool {
  margin: 0 10px;
}

.box-header {
  height: 35px;
  border-bottom: 1px solid #ccc;
  background: #ebedf1;
  line-height: 35px;
  padding-left: 12px;
  cursor: initial;

  a {
    display: inline-block;
    float: right;
    padding: 0 15px 0 0 !important;
    color: #4585ff !important;
    cursor: pointer !important;
    font-size: 14px !important;
  }
}

.box-container {
  //max-height: 500px;
  overflow-y: auto;
  // text-align: center;
  color: #aaaab2;
  cursor: initial;

  .box-item {
    color: #000;
    cursor: pointer;

    &:hover {
      background-color: #f3f3f3;
    }

    .message-item {
      width: 250px;
      padding-top: 10px;
    }

    .message-item-icon {
      text-align: center;
      width: 72px;
      padding-top: 10px;

      span {
        max-width: 62px;
        display: inline-block;
        line-height: 22px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        border: 1px solid #d9d9d9;
        padding: 0 7px;
        border-radius: 5px;
        background: #f6f7f6;
      }
    }

    .message-item-content,
    .message-item-date {
      color: #aaa;
    }

    .message-item-title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 20px;
    }

    .message-item-content {
      margin: 3px 0 7px 0px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
      line-height: 1.42857143;
    }
  }
}

.box-footer {
  cursor: initial;
  line-height: 35px;
  height: 35px;
  text-align: center;
  border-top: 1px solid #ccc;
  padding: 0 !important;
  font-size: 14px !important;
  color: #d9d9d9 !important;
}

i.meesage-unread-icon {
  background: #f04134;
  width: 20px;
  padding: 4px;
  height: 20px;
  font-size: 12px;
  display: inline-block;
  text-align: center;
  border-radius: 50%;
  transform: scale(1);
  position: absolute;
  line-height: 12px;
  font-style: normal;
  top: -5px;
  right: -10px;
}

.extend-nav {
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

.extend-nav-item {
  background: #f7f8fa;
}

.el-dropdown-link {
  outline: none;

  &:focus {
    outline: none;
  }
}

.el-popper[x-placement^='bottom'] {
  margin-top: 5px;
  // top: 32px !important;
}

.el-popper[x-placement^='bottom'] /deep/ .popper__arrow {
  top: -7px;
}
.outLoginMenu{
  padding: 3px 0;
}
.outLogin {
  line-height: 27px !important;
  padding: 3px 12px !important;
  font-size: 13px !important;
}
</style>
