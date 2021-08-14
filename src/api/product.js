import request from '@/utils/request'

/**
 * 获取商品详情
 * @param {String} id - 商品ID
 */
export const findGoods = (id) => {
  return request('/goods', 'get', { id })
}

/**
 * 获取商品同类推荐 - 未传入ID为猜你喜欢
 * @param {String} id - 商品ID
 * @param {Number} limit - 商品数量
 */
export const findRelevantGoods = (id, limit = 16) => {
  return request('/goods/relevant', 'get', { id, limit })
}

/**
 * 获取热榜商品
 * @param {String} id - 商品ID
 * @param {Number} type - 1代表24小时热销榜 2代表周热销榜 3代表总热销榜
 * @param {Number} limit - 获取个数
 */
export const findHotGoods = ({ id, type, limit = 3 }) => {
  return request('/goods/hot', 'get', { id, type, limit })
}

/**
 * 获取商品的评价统计信息
 * @param {String} id - 商品ID
 */
export const findGoodsCommentInfo = (id) => {
  // https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate 一个临时接口
  // return request(`/goods/${id}/evaluate`,'get')
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`, 'get')
}

/**
 * 获取商品的评价统计信息
 * @param {String} id - 商品ID
 * @param {Object} params - 商品参数
 */
export const findGoodsCommentList = (id, params) => {
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`, 'get', params)
}