<!-- <template>
  <div class="top-nav" :style="`min-width:${minWidth}`">
    <div class="log">{{ title }}</div>
    <el-menu :active-text-color="variables.menuActiveText" :default-active="activeMenu" mode="horizontal"
      @select="handleSelect">
      <div v-for="item in pageResource" :key="item.url" class="nav-item">
        <app-link :to="resolvePath(item)">
          <el-menu-item :index="item.url">{{ item.name }}</el-menu-item>
        </app-link>
      </div>
    </el-menu>

    <div class="right-menu">
      <div class="nav-item-tool">
        <el-dropdown style="position: relative" trigger="click" @visible-change="messageVisibleChange">
          <span class="el-dropdown-link">
            <span class="iconfont icon-notice" style="vertical-align: center;padding-right: 5px" />
            <span>消息</span>
            <i v-if="messageCount > 0 && messageCount <= 9" class="meesage-unread-icon">
              {{ messageCount }}
            </i>
            <i v-if="messageCount > 9" class="meesage-unread-icon"> 9+ </i>
          </span>
          <el-dropdown-menu slot="dropdown" ref="msgDropdownMenu" style="width: 330px; padding: 0"
            class="flex flex-column">
            <div class="box-header">
              <span ref="message" style="color: #000" @click="readAllHandler">消息通知</span>
              <a v-if="
                messageList &&
                messageList.recordList &&
                messageList.recordList.length != 0
              " target="_blank" :href="messageListLink">
                消息列表
              </a>
            </div>
            <div v-if="
              messageList &&
              messageList.recordList &&
              messageList.recordList.length >= 0
            " class="box-container flex flex-column" style="flex: 1 1 auto">
              <div ref="boxElement" class="flex-1">
                <div v-for="(item, index) in messageList.recordList" :key="index" class="box-item flex"
                  @click="readMessage(item.id)">
                  <div class="message-item-icon">
                    <span>{{
                        item.serverShortName
                          ? item.serverShortName
                          : item.serverName
                    }}</span>
                  </div>
                  <div class="message-item">
                    <div class="message-item-title" :title="item.title">
                      {{ item.title }}
                    </div>
                    <div class="message-item-content">
                      {{ item.message }}
                    </div>
                    <div class="message-item-date">
                      <div class="message-item-title" :title="
                        (item ? item.sendRealName : '') + item.createTime
                      ">
                        {{
                            item &&
                            (item.sendRealName ? item.sendRealName + ' ' : '')
                        }}{{ item.createTime }}
                      </div>
                      <a v-if="item.url && item.isShowUrl" href="javascript:(0)" @click="openUrl(item, $event)">
                        进入{{
                            item.serverShortName
                              ? item.serverShortName
                              : item.serverName
                        }}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else ref="boxElement" class="box-container" style="height: 40px;
                    text-align: center;
                    color: #aaaab2;
                    line-height: 40px;
                    cursor: initial;">
              没有未读信息
            </div>
            <div class="box-footer">
              <a v-if="
                !messageList ||
                (messageList &&
                  messageList.recordList &&
                  messageList.recordList.length == 0)
              " target="_blank" :href="messageListLink">消息列表</a>
              <a v-else style="font-size: 14px" @click="readAllHandler()">全标已读</a>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="nav-item-tool">
        <el-dropdown trigger="click" placement="bottom-end" @visible-change="visibleChange">
          <span class="el-dropdown-link" style="margin: 0">
            <span class="iconfont icon-menu" style="vertical-align: center;padding-right: 5px" />
            <span>更多</span>
          </span>
          <el-dropdown-menu slot="dropdown" ref="dropdownMenu" class="extend-nav flex flex-column" style="width: 300px">
            <div v-if="extensionMenus && extensionMenus.length" class="flex-1 extend-nav-main" style="flex: 1 1 auto">
              <el-dropdown-item v-for="(item, index) in extensionMenus" :key="index" class="extend-nav-item">
                <div @click="blink(item)">
                  <div class="extend-menus-name">
                    <span class="extend-menus-img">
                      <img :src="`/web/static/images/top/${item.systemId}.svg`">
                    </span>
                    <span>
                      {{ item.name }}
                    </span>
                  </div>
                  <div class="extend-menus-children-name" :title="item.navName">
                    <span v-for="(item, index) in item.children" :key="index">
                      ·{{ item.name }}
                    </span>
                  </div>
                </div>
              </el-dropdown-item>
            </div>
            <div class="extend-nav-footer">
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
      </div>
      <div class="nav-item-tool">
        <el-dropdown trigger="click" class="user-btn">
          <span class="el-dropdown-link">
            <span class="iconfont icon-user" style="vertical-align: center;padding-right: 5px" />
            <span style="margin-left: -1px">{{ name }}</span>
          </span>
          <el-dropdown-menu slot="dropdown">
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
    userId: {
      type: Number,
      require: true
    },
    messageCount: {
      type: Number,
      default: 0
    },
    messageList: {
      type: Object,
      default: {
        recordList: {
          type: Array,
          default: ()=>[]
        }
      }
    },
    messagesOption: {
      type: Object,
      default: ()=>{}
    },
    extensionMenus: {
      type: Array,
      default: ()=>[]
    }
  },
  data() {
    return {
      // 消息通知
      messageMenuTop: 32,
      messageMenuBottom: 5,
      messageMaxHeight: 500,
      messageContainerHeight: 570,
      messageOtherHeight: 70,
      messageListLink: '/syscenter/management/message-center/message-list',
      // 更多菜单
      extendMenuAllHeight: null,
      extendMenuAllBorder: 2,
      extendMenuItemHeight: 60,
      extendMenuTop: 32,
      extendMenuPading: 10,
      extendMenuBottom: 5,
      visible: false
    };
  },
  computed: {
    activeMenu() {
      const route = this.$route;
      const { path } = route;
      if (path === '/dashboard') {
        return '/';
      }
      const activeMenu = '/' + path.split('/')[1];
      return activeMenu;
    },
    variables() {
      return variables;
    }
  },
  mounted() {
    this.getMsgList(this.messagesOption);
    this.unReadCount();
    this.getExtensionMenusInit();
    if (this.userId) {
      this.$emit('socket');
    }
    // 窗口放大缩小
    window.addEventListener(
      'resize',
      () => {

        this.$emit('setWindows', window.innerWidth);
        this.setMenuHeight();
        this.setMessageBoxHeight();
      },
      false
    );
  },
  methods: {
    // 点击每条消息的进入
    openUrl(item, $event) {
      $event.stopPropagation();
      this.$emit('openUrl', item.id);
      if (item.url.indexOf('##SF_ADDRESS##') > -1) {
        if (
          location.hostname === 'localhost' ||
          location.hostname === '127.0.0.1'
        ) {
          window.open(item.url.replace(/##SF_ADDRESS##/g, location.origin));
        } else {
          window.open(
            item.url.replace(
              /##SF_ADDRESS##/g,
              `${location.origin}/auditcenter`
            )
          );
        }
      } else {
        window.open(item.url);
      }
    },
    /**
     * 标记已读
     * @param messageId 不传时候为标记全部已读
     */
    readMessage(messageId) {
      this.$emit('readMessage', messageId, ()=>{
        this.$nextTick(() => {
          this.setMessageBoxHeight();
        });
      });
      const tempUrl = '/syscenter/management/message-center/message-list/';
      window.open(tempUrl + messageId);
    },
    /** 全部已读 */
    readAllHandler() {
      if (this.messageList && this.messageList.recordList.length) {
        this.$confirm('确定要将全部消息标为已读吗？', {
          distinguishCancelAndClose: true,
          closeOnClickModal: false,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$emit('readAllHandler', ()=>{
              this.$nextTick(() => {
                this.setMessageBoxHeight(); // 全部已读后，重新设置盒子高度
              });
            });
          })
          .catch(() => { });
      }
    },
    // 初始化获取未读取的消息条目数
    unReadCount() {
      this.$emit('unReadCount');
    },
    // 获取消息列表
    getMsgList(option) {
      this.$emit('getMsgList', option);
    },
    // 自适应消息盒子高度
    setMessageBoxHeight() {
      this.$nextTick(() => {
        if (this.$refs.msgDropdownMenu) {
          const targetMenuDom = this.$refs.msgDropdownMenu.$el;
          if (this.$refs.boxElement) {
            const boxHeight = this.$refs.boxElement.offsetHeight;
            const pageClinetHeight = document.documentElement.clientHeight;
            const msgDropdownMenuAllHeight = boxHeight + this.messageOtherHeight;
            if (
              this.messageMenuTop +
              msgDropdownMenuAllHeight +
              this.messageMenuBottom >=
              pageClinetHeight
            ) {
              targetMenuDom.style.height =
                pageClinetHeight -
                this.messageMenuTop -
                this.messageMenuBottom * 2 +
                'px';
            } else {
              targetMenuDom.style.height = 'unset';
            }
          }
        }
      });
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
    },
    // 消息盒子，隐藏
    messageVisibleChange(value) {
      if (value) {
        this.setMessageBoxHeight();
        this.$nextTick(() => {
          if (this.$refs.message) {
            if (this.messageList && this.messageList.recordList.length !== 0) {
              this.$refs.message.style.cursor = 'pointer';
            }
          }
        });
      }
    },
    // 点击更多，菜单显示隐藏
    visibleChange(value) {
      if (value) {
        this.setMenuHeight();
      }
    },
    blink(menu) {
      window.open(menu.url, '_blank');
    },
    isOnlyOneChild(item) {
      if (item.children && item.children.length === 1) {
        return true;
      }
      return false;
    },
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
    },
    getExtensionMenusInit() {
      this.$emit('getExtensionMenusInit');
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

.outLogin {
  line-height: 27px !important;
  padding: 3px 12px !important;
  font-size: 13px !important;
}
</style> -->
