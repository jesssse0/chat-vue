<template>
  <section class="loading-container" v-show="loadingState !== 0">
    <img class="icon-fail" :src="uri" />
    <div class="loading-text">
      <div class="loading-title">{{ dataHint }}</div>
      <div class="loading-desc">{{ dataHintDescription }}</div>
    </div>
    <div class="loading-btn" @click="tapToRetry" v-if="noDataBtnHint">{{ noDataBtnHint }}</div>
  </section>
</template>
<script>
import ICONFAIl from '@assets/images/icon-load-fail.png';
import ICONNONETWORK from '@assets/images/icon-load-nonetwork.png';

export default {
  name: 'Loading',
  props: {
    state: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      loadingState: 0, // 0:正常 1:加载中 2:暂无数据 3:接口异常 4:网络错误
      dataHint: '',
      noDataBtnHint: '',
      dataHintDescription: '',
      uri: '',
    };
  },
  watch: {
    state: {
      immediate: true,
      deep: true,
      handler(newVal) {
        if (newVal === 0) {
          this.setSuccess();
        } else if (newVal === 1) {
          this.setLoading();
        } else if (newVal === 2) {
          this.setEmpty();
        } else if (newVal === 3) {
          this.setCustomError();
        } else if (newVal === 4) {
          this.setNetworkError();
        }
      },
    },
  },
  methods: {
    tapToRetry() {
      this.$emit('callback');
    },

    setSuccess() {
      this.loadingState = 0;
    },

    setLoading(dataHint = '加载中...') {
      this.loadingState = 1;
      this.dataHint = dataHint;
    },

    setEmpty(dataHint = '暂无数据', dataHintDescription = '') {
      this.loadingState = 2;
      this.dataHint = dataHint;
      this.dataHintDescription = dataHintDescription;
      this.uri = ICONFAIl;
    },

    setCustomError(
      dataHint = '网络错误',
      dataHintDescription = '脑袋放空中，坐下来休息会吧~',
      noDataBtnHint = '刷新重试'
    ) {
      this.loadingState = 3;
      this.dataHint = dataHint;
      this.noDataBtnHint = noDataBtnHint;
      this.dataHintDescription = dataHintDescription;
      this.uri = ICONFAIl;
    },

    setNetworkError(
      dataHint = '网络不给力',
      dataHintDescription = '页面失联，家家正在紧急寻找中…',
      noDataBtnHint = '刷新重试'
    ) {
      this.loadingState = 4;
      this.dataHint = dataHint;
      this.noDataBtnHint = noDataBtnHint;
      this.dataHintDescription = dataHintDescription;
      this.uri = ICONNONETWORK;
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

//加载结果
.loading-container {
  background: #ffffff;
  border-radius: pr(12);
  box-sizing: border-box;
  padding: pr(80) pr(136);

  display: flex;
  flex-direction: column;
  align-items: center;

  .icon-fail {
    width: pr(320);
    height: pr(320);
    margin-bottom: pr(44);
  }

  .loading-text {
  }

  .loading-title {
    font-family: PingFangSC-Regular;
    font-weight: 400;
    font-size: pr(34);
    color: #111e36;
    text-align: center;
    line-height: pr(42);
    margin-bottom: pr(16);
  }

  .loading-desc {
    font-family: PingFangSC-Light;
    font-weight: 300;
    font-size: pr(26);
    line-height: pr(34);
    color: #666d7f;
    text-align: center;
  }

  .loading-btn {
    box-sizing: border-box;
    padding: pr(26) pr(52);
    background: #ebf2ff;
    border-radius: pr(8);

    font-family: PingFangSC-Regular;
    font-weight: 400;
    font-size: pr(28);
    color: #206cfe;
    text-align: center;

    margin-top: pr(44);
  }
}
</style>
