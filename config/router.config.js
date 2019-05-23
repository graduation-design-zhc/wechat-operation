export default [
    { path: '/auth/info', component: './member/memberAuth' },
    { path: '/auth/member', component: './member/memberHome' }, 
    { path: '/auth/member/edit', component: './member/memberEdit' }, 
    { path: '/', redirect: '/member' }, 
    // operation
    {
        path: "/member",
        component: '../layouts/BasicLayout',
        routes: [
            // wechat
            { path: '/', redirect: '/member/order' },
            {
                path: '/member',
                routes: [
                    { path: '/member', redirect: 'member/order' },
                    { path: '/member/list', component: 'member/memberList' },
                    { path: '/member/order', component: 'member/order' },
                    { path: '/member/orderLog', component: 'member/orderLog' },
                    { path: '/member/rechargeLog', component: 'member/rechargeLog' },
                    { path: '/member/wxMenu', component: 'wechat/wxMenu' },
                ]
            },
        ]
    },
    {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
            { path: '/user', redirect: '/user/login' },
            { path: '/user/login', component: './user/login' },
        ],
    },
];