<template>
  <div class="loading_wrapper">
    <div class="loading-spinner">
      <svg class="van-loading__circular" viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="20" fill="none"></circle>
      </svg>
    </div>
    <div class="loading-text"> 加载中</div>
  </div>
</template>

<script>
export default {
  name: 'Loading'
};
</script>

<style scoped lang="scss">
.loading_wrapper {
  margin-bottom: pr(32);
  width: 100%;
  height: pr(500);
  border-radius: pr(12);
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .loading-spinner {
    position: relative;
    display: inline-block;
    width: pr(60);
    height: pr(60);
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
    animation: van-rotate 2s linear infinite;
    .van-loading__circular {
      display: block;
      width: 100%;
      height: 100%;
      color: rgb(0, 148, 255);
    }
  }

  .loading-text {
    margin-top: pr(20);
    text-align: center;
    font-size: pr(28);
    color: rgb(0, 148, 255);
  }

  @keyframes van-rotate {
    0% {
      transform: rotate(0)
    }

    to {
      transform: rotate(360deg)
    }
  }
}
</style>
