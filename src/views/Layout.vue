<template>
  <!-- 顶部通栏 -->
  <AppTopnav />
  <!-- 吸顶头部组件 -->
  <AppHeaderSticky />
  <!-- 头部组件 -->
  <AppHeader />
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
import AppHeaderSticky from "@/components/app-header-sticky";
import AppHeader from "@/components/app-header";
import AppFooter from "@/components/app-footer";
import { useStore } from "vuex";

export default {
  name: "Layout",
  components: {
    AppTopnav,
    AppHeaderSticky,
    AppHeader,
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
  height: 600px;
}
</style>