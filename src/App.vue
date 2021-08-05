<template>
  <div>
    <!-- 1.1使用A模块的state数据 -->
    <p>{{ $store.state.moduleA.username }}</p>
    <!-- 1.2使用A模块的getters数据 -->
    <p>{{ $store.getters.newName }}</p>
    <!-- 2.1使用B模块的state数据 -->
    <p>{{ $store.state.moduleB.username }}</p>
    <!-- 2.2使用B模块的getters数据 -->
    <p>{{ $store.getters["moduleB/newName"] }}</p>
    <button @click="mutationsFn">mutationsFn</button>
    <button @click="actionsFn">actionsFn</button>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  name: "App",
  setup() {
    const store = useStore();
    const mutationsFn = () => {
      // 2.3提交B模块的修改
      store.commit("moduleB/updateName");
    };
    const actionsFn = () => {
      // 2.4调用B模块的actions
      store.dispatch("moduleB/updateName");
    };
    return { mutationsFn, actionsFn };
  },
};
</script>
<style lang="less" scoped>
</style>