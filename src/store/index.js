import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'

// 三个模块
import cart from './modules/cart'
import category from './modules/category'
import user from './modules/user'

export default createStore({
  modules: {
    cart,
    category,
    user
  },
  // 配置插件
  plugins: [
    // 默认存储在localStorage
    createPersistedstate({
      // 本地存储名字
      key: 'erabbit-client-pc-124-store',
      // 指定需要存储的模块
      paths: ['user', 'cart']
    })
  ]
})