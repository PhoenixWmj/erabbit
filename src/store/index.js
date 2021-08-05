import { createStore } from 'vuex'

// A模块
const moduleA = {
  state: {
    username: 'moduleA'
  },
  getters: {
    newName(state) {
      return state.username + '!'
    }
  },
}
// B模块
const moduleB = {
  namespaced: true,
  state: {
    username: 'moduleB'
  },
  getters: {
    newName(state) {
      return state.username + '!'
    }
  },
  mutations: {
    updateName(state) {
      state.username = 'ls'
    }
  },
  actions: {
    updateName(ctx) {
      // 发请求
      setTimeout(() => {
        ctx.commit('updateName')
      }, 1000)
    }
  },
}
export default createStore({
  modules: {
    moduleA,
    moduleB
  }
})
// vue2.0 创建仓库 new Vuex.Store({})
// vue3.0 创建仓库 createStore({})
// export default createStore({
//   state: {
//     username: 'zs'
//   },
//   getters: {
//     newName(state) {
//       return state.username + '!'
//     }
//   },
//   mutations: {
//     updateName(state) {
//       state.username = 'ls'
//     }
//   },
//   actions: {
//     updateName(ctx) {
//       // 发请求
//       setTimeout(() => {
//         ctx.commit('updateName')
//       }, 1000)
//     }
//   },
//   modules: {}
// })