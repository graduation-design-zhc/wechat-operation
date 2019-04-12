export default [
    { path: '/', redirect: '/user' },
    // operation
    {
        path:"/basic",
        component: '../layout/BasicLayout',
        routes: [
            {
                path: '/basic',
                routes: [
                    { path: '/basic/analysis', component: 'basic/analysis' },
                    { path: '/basic/monitor', component: 'basic/monitor' },
                    { path: '/basic/workplace', component: 'basic/workplace' }
                ]
            },
        ]
    },
    {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          { path: '/user', redirect: '/user/login' },
          { path: '/user/login', component: './User/Login' },
        ],
    },
];