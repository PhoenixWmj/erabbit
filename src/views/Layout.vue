<template>
  <!-- 顶部通栏 -->
  <AppTopnav />
  <!-- 头部组件 -->
  <AppHeader />
  <!-- 吸顶头部组件 -->
  <AppHeaderSticky />
  <!-- 内容容器 -->
  <div class="app-body">
    <!-- 二级路由 -->
    <RouterView />
  </div>
  <!-- 底部组件 -->
  <AppFooter />
</template>
<script>
import AppTopnav from "@/components/app-topnav";
import AppHeader from "@/components/app-header";
import AppHeaderSticky from "@/components/app-header-sticky";
import AppFooter from "@/components/app-footer";
import { useStore } from "vuex";
export default {
  name: "Layout",
  components: {
    AppTopnav,
    AppHeader,
    AppHeaderSticky,
    AppFooter,
  },
  // 获取分类数据
  setup() {
    const store = useStore();
    store.dispatch("category/getList");
  },
};
</script>
<style scoped lang="less">
.app-body {
  min-height: 600px;
}
</style>