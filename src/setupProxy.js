const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        proxy('/api_linkpay', {
            target: 'http://[::1]:8000/api/v1',
            changeOrigin: true,
            secure: false,
            pathRewrite: {
                "^/api_linkpay": ""
            } 
        })
    );

    app.use(
        proxy('/api_linkaran', {
            target: "https://linkaran.demo.thortech.asia/api/v1",
            changeOrigin: true,
            secure: false,
            pathRewrite: {
                "^/api_linkaran": ""
            } 
        })
    );
};