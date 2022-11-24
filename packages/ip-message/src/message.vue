<template>
  <!-- 消息盒子 -->
  <el-dropdown style="position: relative" trigger="click" @visible-change="messageVisibleChange">
    <span class="el-dropdown-link">
      <span class="iconfont icon-notice" style="vertical-align: center;padding-right: 5px" />
      <span>消息</span>
      <i v-if="messageCountInit > 0 && messageCountInit <= 9" class="meesage-unread-icon">
        {{ messageCountInit }}
      </i>
      <i v-if="messageCountInit > 9" class="meesage-unread-icon"> 9+ </i>
    </span>
    <el-dropdown-menu slot="dropdown" ref="msgDropdownMenu" style="width: 330px; padding: 0"
      class="flex flex-column">
      <!-- 消息盒子头部 -->
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
      <!-- 消息盒子主体 -->
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
                  item.serverShortName ? item.serverShortName : item.serverName
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
                <div class="message-item-title" :title="(item ? item.sendRealName : '') + item.createTime">
                  {{ item && (item.sendRealName ? item.sendRealName + ' ' : '')
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
      <!-- 消息盒子footer -->
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
</template>

<script>
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import ElDropdown from 'web-vue2-front-end-lib/packages/dropdown';
import ElDropdownMenu from 'web-vue2-front-end-lib/packages/dropdown-menu';
import syscenterApi from './api';

export default {
  name: 'IpMessage',
  props: {
    messageCount: {
      type: Number,
      default: 0
    },
    messageList: {
      type: Object,
      default: {
        recordList: {
          type: Array,
          default: () => []
        }
      }
    },
    userId: {
      type: Number,
      require: true
    },
    token: {
      type: String,
      require: true
    },
    socketUrl: {
      type: String,
      require: true
    },
    tempUrl: {
      type: String,
      default: '/syscenter/management/message-center/message-list/'
    },
    messageListLink: {
      type: String,
      default: '/syscenter/management/message-center/message-list'
    }
  },
  components: {
    'el-dropdown': ElDropdown,
    'el-dropdown-menu': ElDropdownMenu
  },
  data() {
    return {
      // 消息通知
      messageMenuTop: 32,
      messageMenuBottom: 5,
      messageMaxHeight: 500,
      messageContainerHeight: 570,
      messageOtherHeight: 70,
      reconnectionCount: 1,
      messageCountInit: 0
    };
  },
  mounted() {
    this.getMsgList();
    syscenterApi.getWebsocketAddress(res=>{
      console.log(res, 777);
    });
  },
  watch: {
    socketUrl: {
      handler: function() {
        if (this.userId && this.socketUrl) {
          this.reconnect(this.socketUrl);
        }
      },
      immediate: true
    },
    messageCount: {
      handler: function() {
        this.messageCountInit = this.messageCount;
      },
      immediate: true
    }
  },
  methods: {
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
    /**
     * 标记已读
     * @param messageId 不传时候为标记全部已读
     */
    readMessage(messageId) {
      this.$emit('readMessage', messageId, () => {
        this.$nextTick(() => {
          this.setMessageBoxHeight();
        });
      });
      window.open(this.tempUrl + messageId);
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
            this.$emit('readAllHandler', () => {
              this.$nextTick(() => {
                this.setMessageBoxHeight(); // 全部已读后，重新设置盒子高度
              });
            });
          })
          .catch(() => { });
      }
    },
    /**
     * WebSocket 连接
     * @param socketUrl socket连接url
     * 方法中的 userId 用户信息中获取
     */
    reconnect(socketUrl) {
      // 建立连接对象（还未发起连接）
      const socket = new SockJS(`${socketUrl}?token=${this.token}`);
      // 获取 STOMP 子协议的客户端对象
      const stompClient = Stomp.over(socket);
      // 向服务器发起websocket连接并发送CONNECT帧
      stompClient.connect(
        {}, // 可添加客户端的认证信息
        frame => {
          // 连接成功的回调函数
          // 订阅频道
          stompClient.subscribe(
            '/user/' + this.userId + '/notice/message',
            data => {
              if (data && data.body) {
                this.messageCountInit = Number(data.body);
                this.getMsgList();
              }
            }
          );
        },
        error => {
          // 连接失败时再次调用函数
          this.reconnectionCount += 1;
          if (this.reconnectionCount <= 10) {
            this.reconnect(socketUrl);
          }
          console.log('error', error);
        }
      );
    },
    // 获取消息列表
    getMsgList() {
      this.$emit('getMsgList');
    },
    // 点击每条消息的进入
    openUrl(item, $event) {
      $event.stopPropagation();
      this.$emit('openUrl', item, () => {
        this.$nextTick(() => {
          this.setMessageBoxHeight(); // 点击后，重新设置盒子高度
        });
      });
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

.el-dropdown-link {
  color: #ffffff;
  cursor: pointer;  
  outline: none;
  &:focus {
    outline: none;
  }
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

.el-popper[x-placement^='bottom'] {
  /deep/ .popper__arrow,
  /deep/ .popper__arrow::after {
    border-bottom-color: #ebeef5;
  }

}

.el-popper[x-placement^='bottom'] {
  margin-top: -3px;
}
.el-popper[x-placement^='bottom'] /deep/ .popper__arrow {
  top: -7px;
}
</style>