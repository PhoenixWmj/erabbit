<template>
  <div class="member-order" v-if="order">
    <!-- 操作栏 -->
    <DetailAction :order="order" />
    <!-- 步骤条-->
    <DetailSteps :order="order" />
    <!-- 物流栏 -->
    <Suspense>
      <template #default>
        <DetailLogistics
          v-if="[3, 4, 5].includes(order.orderState)"
          :order="order"
        />
      </template>
      <template #fallback>
        <div class="loading">loading...</div>
      </template>
    </Suspense>
    <!-- 订单商品信息 -->
    <DetailInfo :order="order" />
  </div>
</template>
<script>
import DetailAction from "./components/detail-action";
import DetailSteps from "./components/detail-steps";
import DetailLogistics from "./components/detail-logistics";
import DetailInfo from "./components/detail-info.vue";
import { ref } from "vue";
import { findOrderDetail } from "@/api/order";
import { useRoute } from "vue-router";
export default {
  name: "MemberDetail",
  components: { DetailAction, DetailSteps, DetailLogistics, DetailInfo },
  setup() {
    const route = useRoute();
    const order = ref(null);
    findOrderDetail(route.params.id).then((data) => {
      order.value = data.result;
    });
    return { order };
  },
};
</script>
<style scoped lang="less">
.member-order {
  background: #fff;
  height: 100%;
}
.loading {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background-color: #f5f5f5;
  margin: 30px 50px 0;
}
</style>