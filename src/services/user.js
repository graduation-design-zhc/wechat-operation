import request from '../utils/request'

export function getUserList() {
    return request('/user/list', {
        method: 'POST',
    });
}