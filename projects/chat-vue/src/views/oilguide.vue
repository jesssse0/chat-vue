<template>
  <div class="oil-guide-container">
    <img src="@assets/images/oilguide/img1.png" alt="" />
    <img src="@assets/images/oilguide/img2.png" alt="" />
    <img src="@assets/images/oilguide/img3.png" alt="" />
    <img src="@assets/images/oilguide/img4.png" alt="" />
  </div>
</template>

<script>
export default {
  name: 'oilguide',
};
</script>

<style scoped lang="scss">
.oil-guide-container {
  @media screen and (min-width: 480px) {
    max-width: 375px;
  }
  margin: 0 auto;
  img {
    display: block;
    width: 100%;
  }
}
</style>
