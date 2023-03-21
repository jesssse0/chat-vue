<template>
  <div class="tab-list-container" ref="tabContainer">
    <ul class="tab-list" ref="tabWrapper">
      <li
        v-for="tab in tabList"
        :key="tab"
        class="tab-item"
        :class="{'active': currentTab === tab}"
        @click="onSwitchTab($event, tab)"
      >{{ tab }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TabList',
  props: {
    currentTab: {
      type: String,
      required: true,
    },
    tabList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    onSwitchTab(e, tab) {
      // 切换tab, 并回调
      this.$emit('on-change', tab);
      // 平滑移动
      const elTab = e.target;
      const elContainer = this.$refs.tabContainer;
      const elWrapper = this.$refs.tabWrapper;
      const left = elTab.offsetLeft - elContainer.offsetLeft + elTab.offsetWidth / 2;
      const halfContainer = elContainer.offsetWidth / 2;
      const scrollDistance = left - halfContainer;
      elWrapper.scrollLeft = scrollDistance;
    }
  },
};
</script>

<style lang="scss" scoped>
.tab-list-container {
  .tab-list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
    overflow: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    .tab-item {
      line-height: pr(52);
      padding: 0 pr(16);
      font-size: pr(24);
      color: #828ca0;
      background: #f8f9fc;
      border-radius: pr(6);
      flex-shrink: 0;

      &.active {
        color: #f10265;
        font-weight: 500;
        background-color: #fff0f6;
      }
    }
    .tab-item + .tab-item {
      margin-left: pr(20);
    }
  }
}
</style>
