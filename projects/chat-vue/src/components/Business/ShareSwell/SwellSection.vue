<template>
  <ModuleCard :title="title" v-if="visible">
    <template #headerRight v-if="errorState === 0">
      <div class="count-down-wrapper">
        <div class="count-down-text">距本场结束</div>
        <Counter :count="count" color="#25C9FF" />
      </div>
    </template>
    <template v-if="errorState === 0">
      <TabList v-if="tabList.length > 1" :currentTab="currentTab" :tabList="tabList" @on-change="onSwitchTab"></TabList>
      <SwellCouponList ref="couponList" :list="currentCouponList" @update="getBulkCouponBySettingId" />
    </template>
    <Error :state="errorState" @callback="tryAgain" />
  </ModuleCard>
</template>

<script>
// 福利专区
import ModuleCard from '@components/Business/ShareSwell/ModuleCard.vue';
import TabList from '@components/Business/ShareSwell/SwellTab.vue';
import SwellCouponList from '@components/Business/ShareSwell/SwellCouponList.vue';
import Counter from '@components/Base/Counter.vue';
import Error from '@components/Base/Error.vue';
import { getBulkCouponList } from '@apis/shareswell.api.js';

export default {
  name: 'SwellSection',
  components: {
    ModuleCard,
    Counter,
    TabList,
    SwellCouponList,
    Error,
  },
  props: {
    title: {
      type: String,
      default: '福利专区',
    },
    activityId: {
      type: Number,
      required: true,
    },
    distanceTime: {
      // 客户端时间 - 服务器时间
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      errorState: 0,
      visible: true,
      currentTab: '',
      endTime: new Date(),
      couponListByType: [],
    };
  },
  computed: {
    count() {
      const diff = this.endTime.getTime() - new Date().getTime() + this.distanceTime;
      return diff > 0 ? diff : 0;
    },
    tabList() {
      return this.couponListByType.reduce((pre, cur) => {
        if (cur.couponList && cur.couponList.length > 0) {
          pre.push(cur.typeName);
        }
        return pre;
      }, []);
    },
    currentCouponList() {
      // 筛选tab对应列表
      if (!this.currentTab) {
        return [];
      }
      const typeEl = this.couponListByType.find((type) => {
        if (type.typeName === this.currentTab) {
          return true;
        }
        return false;
      });

      // 处理倒计时时间
      let { couponList = [] } = typeEl;
      if (typeEl) {
        couponList = couponList.map((coupon) => {
          let { bulkExpireTime } = coupon;
          const res = coupon;
          if (bulkExpireTime) {
            bulkExpireTime = bulkExpireTime.replace(/-/g, '/');
            const count = new Date(bulkExpireTime).getTime() - new Date().getTime() + this.distanceTime;
            res.count = count > 0 ? count : 0;
          } else {
            res.count = null;
          }
          return res;
        });
      }
      return couponList;
    },
  },
  created() {
    this.getBulkCouponList();
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState !== 'hidden') {
        this.getBulkCouponList();
      }
    });
  },
  methods: {
    tryAgain() {
      this.errorState = 0;
      this.getBulkCouponList();
    },
    getBulkCouponList() {
      getBulkCouponList({ activityId: this.activityId })
        .then(({ result, returncode }) => {
          if (result) {
            const { endTime, typeList } = result;
            this.endTime = new Date(endTime.replace(/-/g, '/'));
            this.currentTab = typeList[0].typeName;
            this.couponListByType = typeList;
          } else if (returncode === 0) {
            this.visible = false;
          } else {
            throw Error('接口报错');
          }
        })
        .catch((e) => {
          this.errorState = 3;
          console.log('获取膨胀领券接口报错：', e);
        });
    },
    getBulkCouponBySettingId(settingId) {
      if (!settingId) {
        return false;
      }
      getBulkCouponList({ activityId: this.activityId, settingId }).then(({ result }) => {
        if (result) {
          const {
            typeList: [
              {
                couponList: [coupon],
              },
            ],
          } = result;
          if (coupon) {
            // 更新当前选中优惠券
            this.$refs.couponList.updateCurrentCoupon(coupon);
            // 匹配更新优惠券列表
            const index = this.couponListByType.findIndex((type) => {
              if (type.typeName === this.currentTab) {
                return true;
              }
              return false;
            });
            const { couponList } = this.couponListByType[index];
            const newCouponList = couponList.map((oriCoupon) => {
              let res = oriCoupon;
              if (oriCoupon.settingId === settingId) {
                res = coupon;
              }
              return res;
            });

            this.couponListByType[index].couponList = newCouponList;
          }
        }
      });
      return true;
    },
    onSwitchTab(tab) {
      this.currentTab = tab;
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
