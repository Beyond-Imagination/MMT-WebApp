const Dotenv = require('dotenv-webpack');
const path = require('path');
const withPlugins = require('next-compose-plugins');

const withTM = require('next-transpile-modules')(['react-kakao-maps-sdk']);

module.exports = withPlugins([withTM], {
  future: {
    webpack5: true,
  },
  webpack: config => {
    config.plugins.push(new Dotenv({ silent: true }));

    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
});
