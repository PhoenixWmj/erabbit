<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
    </div>
  </div>
</template>
<script>
import SubBread from "./components/sub-bread";
export default {
  components: { SubBread },
  name: "SubCategory",
};
</script>
<style scoped lang="less"></style>