<template>
  <section class="tab-container">
    <div
      v-for="(itm, idx) in list"
      :key="idx"
      :class="[
        'tab-item',
        { 'tab-divider': idx < list.length - 1 },
        { 'tab-active': itm.startTimeSeconds === activeTab },
      ]"
      @click="tabClickHandel(itm.startTimeSeconds)"
    >
      <div :class="['black-text']">{{ itm.tabName }}</div>
      <div :class="['gray-text', 'flex-box']">
        <img
          class="icon-fire"
          v-if="itm.startTimeSeconds === activeTab"
          src="@assets/images/shareswell/icon-fire.png"
        />
        {{ itm.tabDesc }}
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'SessionTab',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    activeTab: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {};
  },
  methods: {
    tabClickHandel(idx) {
      this.$emit('changeTab', idx);
    },
  },
};
</script>
<style lang="scss">
.tab-container {
  width: 100%;
  height: pr(108);
  background: #f8f9fc;
  border-radius: pr(12);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .tab-item {
    flex: 1;
  }
  .tab-active {
    .black-text,
    .gray-text {
      color: #f10265;
    }
  }
  .tab-divider {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(-50%, -50%);
      width: 1px;
      height: pr(36);
      background-color: #eaeaea;
    }
  }
  .flex-box {
    display: flex;
    justify-content: center;
  }
  .icon-fire {
    width: pr(24);
    height: pr(24);
  }

  .black-text {
    font-family: Avenir-Heavy;
    font-weight: 900;
    font-size: pr(32);
    color: #464e64;
    text-align: center;
    margin-bottom: pr(12);
  }

  .gray-text {
    font-family: PingFangSC-Regular;
    font-weight: 400;
    font-size: pr(24);
    color: #828ca0;
    text-align: center;
  }
}
</style>
