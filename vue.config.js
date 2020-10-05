module.exports = {
    publicPath: "/back",
    outputDir: "dist",
    crossorigin: "anonymous",
    chainWebpack: config => {
        config.module.rule("md")
            .test(/\.md/)
            .use("raw-loader")
            .loader("raw-loader")
    }
}
