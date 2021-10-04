const Dotenv = require('dotenv-webpack')

module.exports = {
  future: {
    webpack5: true,
  },
  webpack: (config) => {
    config.plugins.push(new Dotenv({ silent: true }))

    return config
  }
}
