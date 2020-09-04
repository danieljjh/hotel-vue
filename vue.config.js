module.exports = {
  publicPath: "/",
  outputDir: "dist",
  chainWebpack: config => {
    config.module.rule("md")
      .test(/\.md/)
      .use("raw-loader")
      .loader("raw-loader")
  }
}
