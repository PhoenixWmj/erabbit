import request from '@/utils/request'

/**
 * 获取结算信息
 */
export const createOrder = () => {
  return request('/member/order/pre', 'get')
}

/**
 * 添加收货地址信息
 * @param {Object} form - 地址对象
 */
export const addAddress = (form) => {
  return request('/member/address', 'post', form)
}

/**
 * 编辑收货地址信息
 * @param {Object} form - 地址对象
 */
export const editAddress = (form) => {
  return request(`/member/address/${form.id}`, 'put', form)
}