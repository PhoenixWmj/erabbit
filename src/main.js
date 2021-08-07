import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入自己的UI组件库
import UI from './components/library'

// 1、重置样式的库
import 'normalize.css'
// 2、自己项目的重置样式和公用样式
import '@/assets/styles/common.less'
// 插件的使用，在main.js使用app.use(插件)
createApp(App).use(store).use(router).use(UI).mount('#app')

