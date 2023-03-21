<template>
  <section class="list-contianer">
    <SessionCoupon
      v-for="(itm, idx) in list"
      :dataObj="itm"
      :key="idx"
      :isGrabing="isGrabing"
      :deviceId="deviceId"
      :userInfo="userinfo"
      :dataKey="idx"
      :activityId="activityId"
      :startTime="startTime"
      :distanceTime="distanceTime"
      @changeData="changeData"
    />
  </section>
</template>
<script>
import { getUserInfo } from '@apis/common.api';
import SessionCoupon from './SessionCoupon.vue';

export default {
  name: 'SessionCouponList',
  components: {
    SessionCoupon,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    isGrabing: {
      type: Boolean,
      default: false,
    },
    activityId: {
      type: Number,
      default: 0,
    },
    startTime: {
      type: Number,
      default: 0,
    },
    distanceTime: {
      // 客户端时间 - 服务器时间
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      deviceId: '',
      userinfo: {},
    };
  },
  created() {
    this.getUserInfo();
    if (this.CfwEnvService.isAutoApp()) {
      this.getDeviceId();
    }
  },
  methods: {
    async getUserInfo() {
      try {
        const res = await getUserInfo();
        if (res && res.returncode === 0) {
          this.userinfo = res.result;
        }
      } catch (e) {
        console.log(e, '获取用户信息');
      }
    },
    async getDeviceId() {
      const deviceInfo = await this.CfwEnvService.getDeviceInfo();
      const { deviceid } = deviceInfo;
      this.deviceId = deviceid;
    },
    changeData(idx, val) {
      const couponList = [...this.list];
      couponList[idx] = val;
      this.$emit('changeData', couponList);
    },
  },
};
</script>
<style lang="scss" scoped>
.list-contianer {
  padding-top: pr(24);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: pr(-20);
}
</style>
