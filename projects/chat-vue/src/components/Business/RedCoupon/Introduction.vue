<template>
  <div class="introduction-container" v-if="introductionImg">
<!--    <img src="../../../assets/images/redcoupon/introduction.png" alt="">-->
    <img :src="introductionImg" alt="">
  </div>
</template>

<script>
import { isJSON } from '@utils/stringHelper';

const defaultImg = require('../../../assets/images/redcoupon/introduction.png');

export default {
  name: 'Introduction',
  props: {
    activityInfo: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  computed: {
    introductionImg() {
      let { activityFlow } = this.activityInfo;
      activityFlow = isJSON(activityFlow) ? JSON.parse(activityFlow) : '';
      if (Array.isArray(activityFlow) && activityFlow.length > 0) {
        [activityFlow] = activityFlow;
      } else {
        activityFlow = defaultImg;
      }
      return activityFlow;
    },
  },
};
</script>

<style lang="scss" scoped>
// @import '../../../assets/style/core/base.scss';
.introduction-container {
  margin-bottom: pr(32);
  border-radius: pr(12);
  overflow: hidden;
  img {
    display: block;
    width: 100%;
  }
}
</style>
