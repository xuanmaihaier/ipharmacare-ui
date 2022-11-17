<template>
  <div>
    <template v-if="hasOneShowingChild(item.children,item) && (!( onlyOneChild.children && onlyOneChild.children.length )||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link :to="resolvePath(onlyOneChild.url)">
        <el-menu-item :index="resolvePath(onlyOneChild.url)" :class="{'submenu-title-noDropdown':!isNest}">
          <!-- 没有有子菜单的父级菜单 -->
          <item icon="dotted" :title="onlyOneChild.name" :min-title="item.shortName || item.name.slice(0,2)" :is-collapse="isCollapse" />
        </el-menu-item>
      </app-link>
    </template>
    <el-submenu v-else ref="subMenu" :index="resolvePath(item.url)" popper-append-to-body>
      <template slot="title">
        <!-- 有子菜单的父级菜单 -->
        <item icon="dotted" :title="item.name" :min-title="item.shortName || item.name.slice(0,2)" :is-collapse="isCollapse" />
      </template>
      <sidebar-item v-for="child in item.children" :key="child.url" :is-nest="true" :item="child" :base-path="resolvePath(child.url)" class="nest-menu" />
    </el-submenu>
  </div>
</template>

<script>
import Item from './Item';
import AppLink from './Link';
import FixiOSBug from './FixiOSBug';

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    },
    isCollapse: {
      type: Boolean,
      default: false
    },
    device: {
      type: String,
      default: 'desktop'
    }
  },
  data() {
    this.onlyOneChild = null;
    return {};
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden || item.type === 1 || item.type === '1') {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, noShowingChildren: true };
        return true;
      }

      return false;
    },
    resolvePath(routePath) {
      return routePath;
    }
  }
};
</script>
