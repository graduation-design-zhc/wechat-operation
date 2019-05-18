import request from '../utils/request'

export function getCategoryList() {
    return request('/wechat/category/getList')
}

export function getProductByCategoryType(categoryType) {
    return request(`/wechat/product/getByCategoryType?categoryType=${categoryType}`, {method: 'POST'})
}

export function getProductByProductId(productId) {
    return request(`/wechat/product/getByProductId?productId=${productId}`);
}