module.exports = {
  parallel: false,
  configureWebpack: {
    output: {
      globalObject: "this"
    },
    resolve: {
      extensions: ["*", ".mjs", ".js", ".vue", ".json", ".mjs", ".js", ".vue", ".json", ".gql", ".graphql"]
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: require.resolve("@open-wc/webpack-import-meta-loader"),
        },
        {
          test: /\.(c|m)?js$/,
          use: {
            loader: "babel-loader",
            options: {
              compact: false,
              presets: ["@babel/preset-env"]
            }
          }
        },
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto"
        }
      ]
    }
  }
}