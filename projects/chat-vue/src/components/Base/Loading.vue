<template>
  <section v-show="loadingState === 1">
    <section class="loading">
      <div class="loading-box">
        <div class="icon-loading"></div>
        <div class="text" v-if="dataHint">{{ dataHint }}</div>
      </div>
    </section>
  </section>
</template>
<script>
export default {
  name: 'Loading',
  props: {
    loadingObj: {
      type: Object,
      default: () => ({
        loadingState: 0,
        dataHint: '',
      }),
    },
  },
  data() {
    return {
      loadingState: 0, // 0:正常 1:加载中 2:暂无数据 3:接口异常 4:网络错误
      dataHint: '',
    };
  },
  watch: {
    loadingObj: {
      immediate: true,
      deep: true,
      handler(newVal) {
        if (newVal.loadingState === 0) {
          this.setSuccess();
        } else if (newVal.loadingState === 1) {
          this.setLoading(newVal.dataHint || '加载中...');
        }
      },
    },
  },
  methods: {
    setSuccess() {
      this.loadingState = 0;
    },

    setLoading(dataHint = '加载中...') {
      this.loadingState = 1;
      this.dataHint = dataHint;
    },
  },
};
</script>
<style lang="scss" scoped>
// 加载中
.loading {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  transform: translateZ(1px);
  .loading-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: pr(200);
    min-height: pr(200);
    box-sizing: border-box;
    padding: pr(24);
    background: rgba(0, 0, 0, 0.9);
    border-radius: pr(16);

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .icon-loading {
      width: pr(40);
      height: pr(40);
      background: url(../../assets/images/icon-loading.png) center center;
      background-size: 100% 100%;
      animation: loading 1s infinite linear;
      transform-origin: center center;
    }
    .text {
      color: #fff;
      margin-top: pr(20);
      text-align: center;
    }
  }
}

@keyframes loading {
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(1);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}
</style>
