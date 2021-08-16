import { createRouter, createWebHashHistory } from 'vue-router'
const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home')
const TopCategory = () => import('@/views/category/index')
const SubCategory = () => import('@/views/category/sub')
const Goods = () => import('@/views/goods/index')
const Cart = () => import('@/views/cart/index')

const Login = () => import('@/views/login/index')
const LoginCallBack = () => import('@/views/login/callback')

const routes = [
  // 一级路由布局容器
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Home
      }, {
        path: '/category/:id',
        component: TopCategory
      },
      {
        path: '/category/sub/:id',
        component: SubCategory
      },
      { path: '/product/:id', component: Goods },
      { path: '/cart', component: Cart }
    ]
  },
  {
    path: '/login', component: Login
  },
  {
    path: '/login/callback', component: LoginCallBack
  }
]

// vue2.0 new VueRouter({}) 创建路由实例
// vue3.0 createRouter({}) 创建路由实例
const router = createRouter({
  // 使用hash的路由模式
  history: createWebHashHistory(),
  // 配置路由规则 写法和之前一样
  routes,
  // 每次切换路由的时候 滚动到页面顶部
  scrollBehavior() {
    return { left: 0, top: 0 }
  }
})

export default router