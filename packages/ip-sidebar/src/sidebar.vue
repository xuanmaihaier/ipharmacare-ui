<template>
  <div class="flex flex-column sidebar-content" id="ip-sidebar" :style="`position: relative;width:${isCollapse?'54px':'200px'}`">
   <div :class="classObj">
    <div class="sidebar-container flex-1 flex flex-column">
      <el-scrollbar wrap-class="scrollbar-wrapper" class="flex-1">
        <el-menu :default-active="activeMenu" :collapse="isCollapse" :background-color="variables.menuBg"
          :text-color="variables.menuText" :unique-opened="false" active-text-color="#333" :collapse-transition="false"
          mode="vertical">
          <sidebar-item v-for="route in routes" :key="route.url" :item="route" :base-path="route.url"
            :is-collapse="isCollapse" :device="device" class="sidebar-item-style" />
        </el-menu>
      </el-scrollbar>
      <switch-btn v-on="$listeners" :collapse="isCollapse" />
    </div>
   </div>
  </div>
</template>
<script>
import SwitchBtn from './SwitchBtn';
import SidebarItem from './SidebarItem';
import variables from 'web-vue2-front-end-lib/packages/theme-chalk/src/public/variables.scss';

export default {
  name: 'IpSidebar',
  components: { SidebarItem, SwitchBtn },
  props: {
    sidebarData: {
      type: Array,
      default: () => []
    },
    activeMenu: {
      type: String,
      default: ''
    },
    opened: {
      type: Boolean,
      default: true
    },
    withoutAnimation: {
      type: Boolean,
      default: false
    },
    device: {
      type: String,
      default: 'desktop'
    }
  },
  computed: {
    routes() {
      return this.sidebarData;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.opened;
    },
    classObj() {
      return {
        hideSidebar: !this.opened,
        openSidebar: this.opened,
        withoutAnimation: this.withoutAnimation,
        mobile: this.device === 'mobile'
      };
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/ .el-menu-item.is-active.submenu-title-noDropdown {
  //   font-weight: bold;
  color: #5c8ef7 !important;
  border-right: 4px solid #4585ff;
  background-color: #F3F7FE !important;
  color: #4585FF !important;
  font-weight: bolder;
}

/deep/.el-menu-item.is-active {
  color: #4585ff !important;
  border-right: 4px solid #4585ff;
  box-sizing: border-box;
  background: #f3f7fe !important;
  position: relative;
  font-weight: 600;
}

/deep/.el-menu-item {
  transition: border-color .3s, background-color .3s
}

.sidebar-item-style {
  // font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
</style>
