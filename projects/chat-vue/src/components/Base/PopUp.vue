<template>
  <section :class="['popup-container']" v-if="visible">
    <div class="mask" @click="closeModal"></div>
    <div class="pop-content">
      <slot></slot>
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
  },
  data() {
    return {
      isShow: false,
    };
  },
  watch: {
    visible: {
      immediate: true,
      deep: true,
      handler(n) {
        this.isShow = n;
      },
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: transform 200ms ease-in-out;
  }
}

.fade-in {
  bottom: 0;
  .mask {
    opacity: 0.7;
  }
  .pop-content {
    transform: translate(-50%, -50%);
  }
}

.fade-out {
  bottom: 100%;
  .mask {
    opacity: 0;
  }
  .pop-content {
    transform: translate(0%, 0%);
  }
}
</style>
