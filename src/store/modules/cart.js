import { getNewCartGoods } from "@/api/cart"

// 购物车模块
export default {
  namespaced: true,
  state() {
    return {
      // 购物车商品列表
      list: []
    }
  },
  getters: {
    // 有效商品列表
    validList(state) {
      // 有效商品：库存大于零 stock 商品有效标识为true isEffective
      return state.list.filter(goods => goods.stock > 0 && goods.isEffective)
    },
    // 有效商品总件数
    validTotal(state, getters) {
      return getters.validList.reduce((p, c) => p + c.count, 0)
    },
    // 有效商品总金额
    validAmount(state, getters) {
      // return getters.validList.reduce((p, c) => p + c.nowPrice * 100 * c.count, 0) / 100
      // return getters.validList.reduce((p, c) => p + parseInt(c.nowPrice * 100) * c.count, 0) / 100
      return getters.validList.reduce((p, c) => p + Math.round(c.nowPrice * 100) * c.count, 0) / 100
    },
    // 无效商品列表
    invalidList(state) {
      return state.list.filter(goods => goods.stock <= 0 || !goods.isEffective)
    },
    // 选中商品列表
    selectedList(state, getters) {
      return getters.validList.filter(item => item.selected)
    },
    // 选中商品件数
    selectedTotal(state, getters) {
      return getters.selectedList.reduce((p, c) => p + c.count, 0)
    },
    // 选中商品总金额
    selectedAmount(state, getters) {
      return getters.selectedList.reduce((p, c) => p + Math.round(c.nowPrice * 100) * c.count, 0) / 100
    },
    // 是否全选
    isCheckAll(state, getters) {
      return getters.validList.length !== 0 && getters.selectedList.length === getters.validList.length
    }
  },
  mutations: {
    // 删除购物车商品
    deleteCart(state, skuId) {
      const index = state.list.findIndex(item => item.skuId === skuId)
      state.list.splice(index, 1)
    },
    // 加入购物车
    insertCart(state, payload) {
      // 加入购物车字段必须和后端保持一致
      // 插入数据规则：
      // 1、先看是否有相同的商品
      // 2、如果有 先查询它的数量 然后累加到payload上 再保存至最新位置 原来的商品需要删除
      // 3、如果没有 保存在最新位置即可
      const sameIndex = state.list.findIndex(goods => goods.skuId === payload.skuId)
      if (sameIndex > -1) {
        const count = state.list[sameIndex].count
        payload.count += count
        // 删除原来的
        state.list.splice(sameIndex, 1)
      }
      // 追加至最新位置
      state.list.unshift(payload)
    },
    // 修改购物车商品
    updateCart(state, goods) {
      // goods中字段有可能不完整 goods有的信息才去修改
      // goods中必须有skuId 才能找到对应的商品信息
      const updateGoods = state.list.find(item => item.skuId === goods.skuId)
      for (const key in goods) {
        if (goods[key] !== null && goods[key] !== undefined && goods[key] !== '') {
          updateGoods[key] = goods[key]
        }
      }
    },
  },
  actions: {
    // 做有效商品的全选&反选
    checkAllCart(ctx, selected) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
        } else {
          // 本地
          // 获取有效的商品列表 遍历的去调用修改mutations即可
          ctx.getters.validList.forEach(goods => {
            ctx.commit('updateCart', { skuId: goods.skuId, selected })
          })
          resolve()
        }
      })
    },
    // 修改购物车(选中状态 数量)
    updateCart(ctx, payload) {
      // payload需要 必须有skuId 可能有selected count
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
        } else {
          // 本地
          ctx.commit('updateCart', payload)
          resolve()
        }
      })
    },
    // 删除购物车商品
    deleteCart(ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
        } else {
          // 本地
          ctx.commit('deleteCart', payload)
          resolve()
        }
      })
    },
    // 加入购物车
    insertCart(ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
        } else {
          // 未登录
          ctx.commit('insertCart', payload)
          resolve()
        }
      })
    },
    // 获取商品列表
    findCartList(ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
        } else {
          // 未登录
          // 同时发送请求(有几个商品发送几个请求) 等所有请求成功 一并去修改本地数据
          // Promise.all() 可以并列发送多个请求 等所有请求成功 调用then
          // Promise.race() 可以并列发送多个请求 等最快的请求成功 调用then
          const promiseArr = ctx.state.list.map(goods => {
            // 返回接口函数的调用
            return getNewCartGoods(goods.skuId)
          })
          Promise.all(promiseArr).then(dataList => {
            // 更新本地购物车
            dataList.forEach((data, i) => {
              ctx.commit('updateCart', { skuId: ctx.state.list[i].skuId, ...data.result })
            })
            // 调用resolve代表操作成功
            resolve()
          })
        }
      })
    },
  }
}