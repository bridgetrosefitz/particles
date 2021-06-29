module.exports = function override (config, env) {
  // insert ourselves into the webpack config...
  config.module.rules = config.module.rules.map((rule) => {
    if (rule.oneOf instanceof Array) {
      return {
        ...rule,
          // create-react-app lets every file which doesn't match to any filename test falls back to file-loader,
          // so we need to add raw-loader before that fallback.
          // see: https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/config/webpack.config.dev.js#L220-L236
        oneOf: [
          {
            test: /\.(glsl|vs|fs|vert|frag)$/,
            use: ["raw-loader"],
            exclude: /node_modules/,
          },
          ...rule.oneOf,
        ]
      }
    }
    return rule
  })
  return config
}