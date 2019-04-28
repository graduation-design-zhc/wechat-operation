import pageRoutes from './router.config';

export default {
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
    }],
  ],
  proxy: {
    '/wechat': {
      target: 'http://localhost:9000',
      changeOrigin: true,
    }
  },
  routes: pageRoutes,
};