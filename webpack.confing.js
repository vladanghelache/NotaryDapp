module.exports = {
  resolve: {
    fallback: {
      url : require.resolve("url/"),
      stream: require.resolve("stream-browserify"),
      os: require.resolve("os-browserify/browser"),
      http: require.resolve("stream-http"),
      crypto: require.resolve("crypto-browserify"),

    },

  },

}
