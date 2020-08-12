const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.
  if (config.mode === 'development') {
    config.devServer.proxy = {
      '/api_1': {
        target: {
          host: 'open.timepill.net',
          protocol: 'https:',
          port: 443,
        },
        pathRewrite: {'^/api_2' : '/api'},
        secure: false,
        changeOrigin: true,
        logLevel: 'info',
      },
      '/api_2': {
        target: {
          host: 'v2.timepill.net',
          protocol: 'https:',
          port: 443,
        },
        pathRewrite: {'^/api_2' : '/api'},
        secure: false,
        changeOrigin: true,
        logLevel: 'info',
      },
    };
  }

  return config;
};
