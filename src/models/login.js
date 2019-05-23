import * as loginServices from '../services/login.js';
import router from 'umi/router';
import { message } from 'antd';


export default {
    namespace: 'login',

    state: {
        status: undefined,
        user: null
    },

    effects: {
        *login({ payload: user }, { call, put }) {
            const result = yield call(loginServices.loginIn, { userName: user.userName, password: user.password });
            if(user != null) {
                console.log(user)
                localStorage.setItem("userName",user.userName);
                router.push("/")
            }
            else {
                message.error("用户名或密码错误！");
            }
        },
    },

    reducers: {
    },
};
