<template>
  <div class="footer-wrapper">
    <img src="@assets/images/redcoupon/auto-logo.png" alt="" />
  </div>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style lang="scss" scoped>
.footer-wrapper {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: pr(120);
  display: flex;
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
