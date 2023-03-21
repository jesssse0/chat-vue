<template>
  <div class="footer-wrapper">
    <img src="../../../assets/images/redcoupon/auto-logo.png" alt="" />
  </div>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style lang="scss" scoped>
// @import '../../../assets/style/core/base.scss';
.footer-wrapper {
  padding: pr(16) 0 pr(42);
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    display: block;
    width: pr(134);
    height: pr(52);
  }
}
</style>
