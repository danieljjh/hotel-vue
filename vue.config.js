module.exports = {
    publicPath: process.env.NODE_ENV === "production" ?
        "/back/" : "/",
    outputDir: "dist",
    crossorigin: "anonymous",
    devServer: {
        proxy: {
            "/localApi": {
                target: "http://localhost:8000/",
                changeOrigin: true
            }
        }
    },
    chainWebpack: config => {
        config.module.rule("md")
            .test(/\.md/)
            .use("raw-loader")
            .loader("raw-loader")
    }
}
