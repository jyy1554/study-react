const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // proxy가 필요한 path parameter
    createProxyMiddleware({
      target: 'http://localhost:5000', //타겟이 되는 api url
      changeOrigin: true,
    })
  );
};