const Timestamp = new Date().getTime();

module.exports = {
    publicPath: process.env.NODE_ENV === "production"
        ? "/back/" : "/",
    outputDir: "dist",
    // crossorigin: "anonymous",
    devServer: {
        proxy: {
            "/localApi": {
                target: "http://localhost:8000/",
                changeOrigin: true
            }
        }
    },
    // lintOnSave: process.env.NODE_ENV !== "production",
    chainWebpack: config => {
        if (process.env.NODE_ENV === "production") {
            // 给js和css配置版本号
            config.output.filename("js/[name]." + Timestamp + ".js").end();
            config.output.chunkFilename("js/[name]." + Timestamp + ".js").end();
            config.plugin("extract-css").tap(args => [{
                filename: `css/[name].${Timestamp}.css`,
                chunkFilename: `css/[name].${Timestamp}.css`
            }])
        }
        config.module.rule("md")
            .test(/\.md/)
            .use("raw-loader")
            .loader("raw-loader")
    }
}
