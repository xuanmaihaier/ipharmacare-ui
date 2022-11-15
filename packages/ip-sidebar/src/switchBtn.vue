<template>
  <div class="sidebar-switch-container" :class="{'collapse':collapse}" @click="toggleSideBar">
    <transition name="sidebarSwitchFade">
      <div v-if="collapse" class="sidebar-switch-btn">
        <i class="ico iconfont icon-arrow-right" />
      </div>
      <div v-else class="sidebar-switch-btn">
        <i class="ico iconfont icon-arrow-left" />
      </div>
    </transition>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
export default {
  name: 'SidebarSwitchBtn',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    toggleSideBar() {
      this.$emit('toggleSideBar');
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebarSwitchFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarSwitchFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-switch-container {
  position: relative;
  width: 100%;
  height: 45px;
  line-height: 45px;
  border-top: 1px solid #f5f8fd;
  height: 45px;
  text-align: center;
  overflow: hidden;
  .ico {
    float: right;
    width: 25px;
    height: 25px;
    border-radius: 4px;
    background-color: #f5f8fd;
    color: #5c8ef7;
    text-align: center;
    line-height: 25px;
    margin-top: 10px;
    margin-right: 10px;
    cursor: pointer;
  }
  &.collapse {
    .sidebar-icon {
      margin-right: 0px;
    }
  }
}
</style>
