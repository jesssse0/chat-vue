<template>
  <div class="counter-container" :style="{ color: color }">
    <div class="counter-box" :style="{ background: color }">{{ timeObj.hour }}</div>
    <div class="divider">:</div>
    <div class="counter-box" :style="{ background: color }">{{ timeObj.minute }}</div>
    <div class="divider">:</div>
    <div class="counter-box" :style="{ background: color }">{{ timeObj.second }}</div>
  </div>
</template>
<script>
export default {
  name: 'Counter',
  props: {
    count: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: '#25C9FF',
    },
  },
  data() {
    return {
      time: 0,
      timeObj: {
        hour: '00',
        minute: '00',
        second: '00',
      },
    };
  },
  watch: {
    count: {
      immediate: true,
      deep: true,
      handler(n) {
        this.time = n;
        console.log('倒计时时长：', n);
        this.formatTime();
        this.countdown();
      },
    },
  },
  methods: {
    // 倒计时
    countdown() {
      this.clearTimer();
      this.timer = setInterval((_) => {
        const val = this.time;
        if (val < 1000) {
          this.time = 0;
          this.clearTimer();
          this.$emit('finishCallBack');
        } else {
          this.time = val - 1000;
        }
        this.formatTime();
      }, 1000);
    },
    formatTime() {
      const val = this.time;
      // 单位时
      let hour = parseInt(val / (1000 * 60 * 60), 10);
      // 单位分
      let minute = parseInt((val - hour * 1000 * 60 * 60) / (1000 * 60), 10);
      // 单位秒
      let second = parseInt((val - hour * 1000 * 60 * 60 - minute * 1000 * 60) / 1000, 10);

      hour = hour < 10 ? `0${hour}` : hour;
      minute = minute < 10 ? `0${minute}` : minute;
      second = second < 10 ? `0${second}` : second;
      this.timeObj = {
        hour,
        minute,
        second,
      };
    },
    // 清除倒计时
    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    },
  },
  beforeDestroy() {
    this.clearTimer();
  },
};
</script>
<style lang="scss">
.counter-container {
  display: flex;
  color: #25c9ff;
  .counter-box {
    padding: pr(2);
    line-height: pr(32);
    background: #25c9ff;
    border-radius: pr(6);
    color: #fff;
    font-family: Avenir-Heavy;
    font-weight: 900;
    font-size: pr(22);
    color: #ffffff;
    text-align: center;
  }
  .divider {
    padding: 0 pr(2);
  }
}
</style>
