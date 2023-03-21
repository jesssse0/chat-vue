<template>
  <div class="mask" v-if="!isAutoApp" @click="jumpToNext"></div>
</template>
<script>
// 非主软遮罩
export default {
  name: 'UnLoginMask',
  props: {
    downloadUrl: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isAutoApp: false,
    };
  },
  created() {
    this.checkEnv();
  },
  methods: {
    checkEnv() {
      this.isAutoApp = this.CfwEnvService.isAutoApp();
    },
    jumpToNext() {
      if (!this.downloadUrl) {
        return;
      }
      this.CfwEnvService.open(this.downloadUrl);
      // window.location.href = this.downloadUrl;
    },
  },
};
</script>
<style lang="scss" scoped>
.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1002;
}
</style>
