module.exports = {
  publicPath: '/vuejs-employee-crud/',
  devServer: {
    proxy: {
      '/mockapi': {
        target: 'http://5e851373a8fdea00164acf97.mockapi.io/',
        pathRewrite: {
          '^/mockapi': '',
        },
      },
    },
  },
};
