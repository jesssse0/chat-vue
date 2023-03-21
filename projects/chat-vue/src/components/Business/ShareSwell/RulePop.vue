<template>
  <section :class="['popup-container']" v-if="visible">
    <div class="mask" @click="closeModal"></div>
    <div class="pop-content">
      <div class="content-header">
        活动规则
        <i class="colse-btn" @click="closeModal"></i>
      </div>
      <div class="content-body">{{ text }}</div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'PopUp',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: '',
    },
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
  },
};
</script>
<style lang="scss" scoped>
.popup-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.7;
    color: #fff;
  }

  .pop-content {
    position: absolute;
    bottom: 0%;
    left: 0;
    right: 0;
    .content-header {
      width: 100%;
      height: pr(90);
      background-color: #fff;
      box-shadow: inset 0 2px 0 0 #ffffff;
      border-radius: pr(32) pr(32) 0 0;
      line-height: pr(90);
      text-align: center;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      font-size: pr(34);
      color: #111e36;
      position: relative;
      .colse-btn {
        width: pr(44);
        height: pr(44);
        background: url('~@assets/images/shareswell/btn_close_black@2x.png') center center no-repeat;
        background-size: 100% 100%;
        position: absolute;
        right: pr(32);
        top: pr(22);
      }
      &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: #f1f3f6;
        transform: scaleY(0.5);
      }
    }

    .content-body {
      width: 100%;
      max-height: pr(770);
      background: #fff;
      box-sizing: border-box;
      padding: pr(34) pr(32);
      line-height: pr(34);
      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: pr(24);
      color: #464e64;
      white-space: pre-line;
      overflow-y: scroll;
    }
  }
}
</style>
