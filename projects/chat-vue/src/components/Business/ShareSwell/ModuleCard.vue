<template>
  <section class="module-card-container">
    <div class="header">
      <h3>{{ title }}</h3>
      <slot name='headerRight'></slot>
    </div>
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'ModuleCard',
  props: {
    title: {
      type: String,
      default: '每日必抢',
      required: true,
    },
    countDownObj: {
      type: Object,
      // required: true,
      default() {
        return {
          h: 23,
          m: 57,
          s: 26,
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.module-card-container {
  background-color: #fff;
  border-radius: pr(12);
  padding: 0 pr(30) pr(32);
  box-sizing: border-box;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: pr(88);
    h3 {
      font-size: pr(32);
      color: #111e36;
      font-weight: 900;
      font-family: MF-YuanHei-Regular;
    }
  }
}
</style>
