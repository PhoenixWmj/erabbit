import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [

]

// vue2.0 new VueRouter({}) 创建路由实例
// vue3.0 createRouter({}) 创建路由实例
const router = createRouter({
  // 使用hash的路由模式
  history: createWebHashHistory(),
  // 配置路由规则 写法和之前一样
  routes
})

export default router
