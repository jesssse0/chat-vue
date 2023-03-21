<template>
  <section v-if="showSection">
    <module-card :title="title">
      <div slot="headerRight" class="count-down-wrapper" v-if="showCounter">
        <div class="count-down-text">距本场结束</div>
        <Counter :count="counterTime" />
      </div>
      <template v-if="errorState === 0">
        <SessionTab :list="tabList" :activeTab="activeTab" @changeTab="changeTab" />
        <SessionCouponList
          :list="couponList"
          :activityId="activityId"
          :isGrabing="showCounter"
          :startTime="activeTab"
          :distanceTime="distanceTime"
          @changeData="changeData"
        />
      </template>
      <Error :state="errorState" @callback="getData" />
    </module-card>
  </section>
</template>
<script>
import ModuleCard from '@components/Business/ShareSwell/ModuleCard.vue';
import SessionTab from '@components/Business/ShareSwell/SessionTab.vue';
import SessionCouponList from '@components/Business/ShareSwell/SessionCouponList.vue';
import Counter from '@components/Base/Counter.vue';
import Error from '@components/Base/Error.vue';
import { getGrabCouponList } from '@apis/shareswell.api.js';
import { Track } from '@utils';
import { GRABCOUPON_SHIDUAN_CLICK } from '@data/statistic';

export default {
  name: 'SessionSection',
  props: {
    title: {
      type: String,
      default: '每日必抢',
    },
    activityId: {
      type: Number,
      default: 0,
    },
    distanceTime: {
      // 客户端时间 - 服务器时间
      type: Number,
      required: true,
    },
  },
  components: {
    ModuleCard,
    SessionTab,
    SessionCouponList,
    Counter,
    Error,
  },
  data() {
    return {
      tabList: [],
      couponList: [],
      activeTab: 0,
      showCounter: false,
      counterTime: 0,
      errorState: 0,
      showSection: true,
    };
  },
  created() {
    this.getData(0);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState !== 'hidden') {
        this.getData(0);
      }
    });
  },
  methods: {
    async getData(startTimeSeconds) {
      try {
        const res = await getGrabCouponList({ activityId: this.activityId });
        let { result } = res;
        if (result && result.length === 0) {
          this.showSection = false;
          return;
        }
        if (res && res.returncode === 0) {
          this.errorState = 0;
          this.showSection = true;
          result = this.getTransData(result);
          this.tabList = result;

          if (startTimeSeconds === 0) {
            this.couponList = result[0].couponList;
            this.counterTime = result[0].counterTime;
            this.showCounter = this.counterTime > 0;
            this.activeTab = result[0].startTimeSeconds;
          } else {
            const { flag, data } = this.getExactObj(result, startTimeSeconds);
            if (flag) {
              this.activeTab = startTimeSeconds;
              this.couponList = data[0].couponList;
              this.counterTime = data[0].counterTime;
              this.showCounter = this.counterTime > 0;
            } else {
              this.couponList = result[0].couponList;
              this.counterTime = result[0].counterTime;
              this.showCounter = this.counterTime > 0;
              this.activeTab = result[0].startTimeSeconds;
            }
          }
        } else {
          throw res;
        }
      } catch (e) {
        this.errorState = 3;
        console.log(e, '每日必抢接口异常');
      }
    },
    // tab数据转换
    getTransData(data) {
      return [...data].map((item) => {
        const newObj = { ...item };
        // 当前时间
        const nowTime = new Date().getTime() - this.distanceTime;
        const today = new Date(nowTime).getDate();

        let startTime = newObj.startTime.replace(/-/g, '/');
        startTime = new Date(startTime);
        let endTime = newObj.endTime.replace(/-/g, '/');
        endTime = new Date(endTime);

        const startDate = startTime.getDate();
        const startMonth = startTime.getMonth() + 1;

        // eslint-disable-next-line
        newObj.startTimeSeconds = startTime.getTime();
        // eslint-disable-next-line
        newObj.endTimeSeconds = endTime.getTime();

        // tab名称
        let h = startTime.getHours();
        h = h > 9 ? h : `0${h}`;
        let m = startTime.getMinutes();
        m = m > 9 ? m : `0${m}`;
        // eslint-disable-next-line
        newObj.tabName = `${h}:${m}`;
        newObj.counterTime = 0;
        // tab描述
        if (nowTime >= newObj.startTimeSeconds && nowTime <= newObj.endTimeSeconds) {
          // eslint-disable-next-line
          newObj.tabDesc = '正在热抢';
          newObj.counterTime = endTime - nowTime;
        } else if (today === startDate) {
          // eslint-disable-next-line
          newObj.tabDesc = '即将开抢';
        } else if (today === startDate - 1) {
          // eslint-disable-next-line
          newObj.tabDesc = '明天开抢';
        } else {
          newObj.tabDesc = `${startMonth}月${startDate}日`;
        }
        return newObj;
      });
    },
    getCounterTime(obj) {
      const nowTime = new Date().getTime() - this.distanceTime;
      if (nowTime >= obj.startTimeSeconds && nowTime <= obj.endTimeSeconds) {
        this.counterTime = obj.endTimeSeconds - nowTime;
        this.showCounter = true;
      } else {
        this.counterTime = 0;
        this.showCounter = false;
      }
    },
    changeTab(newKey) {
      Track.pvClick.call(this, GRABCOUPON_SHIDUAN_CLICK);
      if (this.activeTab === newKey) {
        return;
      }
      this.getData(newKey);
    },

    // 判断选中的tab是否还在
    getExactObj(arr, startTimeSeconds) {
      const newArr = arr.filter((item) => item.startTimeSeconds === startTimeSeconds);
      const flag = newArr.length > 0;
      return {
        flag,
        data: newArr,
      };
    },

    // 优惠券领取或设置提醒后，数据修改
    changeData(newCouponList) {
      const idx = this.tabList.findIndex((item) => item.startTimeSeconds === this.activeTab);
      this.tabList[idx].couponList = newCouponList;
      this.couponList = newCouponList;
    },
  },
};
</script>
<style lang="scss" scoped>
.count-down-wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: pr(24);
  color: #464e64;
  .count-down-text {
    margin-right: pr(6);
  }
}
</style>
