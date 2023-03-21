<template>
  <div class="mask" v-if="!isLogined" @click="handleGoLogin"></div>
</template>
<script>
// 未登录遮罩，点击唤起登录
export default {
  name: 'UnLoginMask',
  data() {
    return {
      isLogined: true,
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    async checkLogin() {
      console.log(this.CfwEnvService);
      const { isLogined } = await this.CfwEnvService.checkLogin();
      this.isLogined = isLogined;
    },
    handleGoLogin() {
      this.CfwEnvService.goLogin({
        success: () => {
          window.location.reload();
        },
      });
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
  z-index: 1001;
}
</style>
