<template>
  <!-- 首页入口 分类+广告 -->
  <div class="home-entry">
    <div class="container">
      <!-- 左侧分类 -->
      <HomeCategroy />
      <!-- 轮播图 -->
      <HomeBanner />
    </div>
  </div>
  <!-- 新鲜好物 -->
  <HomeNew />
  <!-- 人气推荐 -->
  <HomeHot />
</template>
<script>
import HomeCategroy from "./components/home-categroy";
import HomeBanner from "./components/home-banner";
import HomePanel from "./components/home-panel";
import HomeNew from "./components/home-new";
import HomeHot from "./components/home-hot";

export default {
  name: "HomePage",
  components: {
    HomeCategroy,
    HomeBanner,
    HomePanel,
    HomeNew,
    HomeHot,
  },
};
</script>
<style scoped lang="less">
</style>