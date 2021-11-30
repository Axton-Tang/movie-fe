module.exports = {
  devServer: {
    proxy: {
      '/api': {
        // 目标代理服务器地址
        target: 'http://localhost:3000/',
        // 开启代理，本地创建一个虚拟服务器 允许跨域
        changeOrigin: true,
        rewrite: '/'
      },
    },
  },
}
