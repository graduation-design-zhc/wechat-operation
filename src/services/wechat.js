import request from '../utils/request'

export function getMenuList() {
    return request('/wechat/menu/getList')
}

export function createMenu(menuList) {
    return request('/wechat/menu/createMenu', {
        method: 'POST',
        body: JSON.stringify(menuList)
    })
}