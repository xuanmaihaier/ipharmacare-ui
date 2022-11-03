<template>
    <!-- 搜索条件 -->
    <div class="search-box page-container-style" :class="{ 'noExtend': (!hasExtendBtn || hasExtendBtn && !isExtend) }">
        <el-form ref="searchForm" label-position="right" label-width="85px" @keyup.enter.native="$emit('search')"
            @submit.native.prevent>
            <el-row :gutter="20">
                <slot name="search-default"></slot>
                <slot name="search-extend" v-if="isExtend"></slot>
                <el-col :span="isExtend ? 24 : 6">
                    <el-form-item class="operationItem" label-width="0px"
                        :style="`text-align:${isExtend ? 'right' : 'left'}`">
                        <el-button v-if="hasExtendBtn" type="text" :icon="
                            isExtend
                                ? 'el-icon-arrow-up'
                                : 'el-icon-arrow-down'
                        " @click="operationExtend">{{ isExtend ? "收起" : "更多" }}</el-button>
                        <slot name="search-operation"></slot>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import ElForm from 'element-ui/packages/form';
import ElRow from 'element-ui/packages/row';
import ElCol from 'element-ui/packages/col';
import ElFormItem from 'element-ui/packages/form-item';

export default {
  name: 'IpSearchContainer',
  props: {
    extend: {
      type: Boolean,
      default: false
    },
    extendBtn: undefined
  },
  components: {
    'el-form': ElForm,
    'el-row': ElRow,
    'el-form-item': ElFormItem,
    'el-col': ElCol
  },
  data() {
    return {
      isExtend: false,
      hasExtendBtn: true
    };
  },
  watch: {
    extend: {
      handler: function(newValue, oldValue) {
        this.isExtend = newValue;
      },
      immediate: true
    },
    extendBtn: {
      handler: function(newValue, oldValue) {
        if (newValue !== undefined) {
          this.hasExtendBtn = newValue;
        }
      },
      immediate: true
    }
  },
  methods: {
    operationExtend() {
      this.isExtend = !this.isExtend;
      this.$emit('extend', this.isExtend);
    }
  }
};
</script>

<style scoped lang="scss">
.search-box {

    &.noExtend {

        padding-bottom: 10px;

        /deep/ .el-form {
            .el-row {
                display: flex;
                flex-wrap: wrap;

                .el-col {
                    .el-form-item {
                        margin-bottom: 0px;
                    }
                }
            }
        }

    }

    /deep/ .el-form {
        .el-row {
            display: flex;
            flex-wrap: wrap;

            .el-col {
                .el-form-item:not(.operationItem) {
                    .el-form-item__content {
                        &>* {
                            width: 100% !important;
                        }
                    }
                }
            }
        }
    }
}
.page-container-style {
  background: #fff;
  box-shadow: 0 0 6px 0 rgba(40, 50, 57, 0.1);
}
</style>