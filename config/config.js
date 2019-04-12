import pageRoutes from './router.config';

export default {
    plugins: [
        ['umi-plugin-react', {
          antd: true,
          dva: true,
        }],
      ],
    proxy: {
      '/user':{
        target:'http://localhost:9000',
        changeOrigin:true,
    },
    },
    routes: pageRoutes,
};