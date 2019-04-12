import request from '../utils/request';

export function loginIn(user){
    return request('/user/login',{
        method:'POST',
        body:JSON.stringify(user)
    })
}