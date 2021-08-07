<template>
  <div class="container">
    <!-- 首页入口 分类+广告 -->
    <div class="home-entry">
      <!-- 左侧分类 -->
      <HomeCategroy />
      <!-- 轮播图 -->
    </div>
  </div>
</template>
<script>
import HomeCategroy from "./components/home-categroy";
export default {
  name: "HomePage",
  components: {
    HomeCategroy,
  },
};
</script>
<style scoped lang="less">
</style>