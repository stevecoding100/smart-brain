const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "https://api.clarifai.com",
            changeOrigin: true,
            // onProxyRes(proxyRes, req, res) {
            //     res.header("Access-Control-Allow-Origin", "*");
            //     let originalBody = "";
            //     proxyRes.on("data", (chunk) => {
            //         originalBody += chunk;
            //     });
            //     proxyRes.on("end", () => {
            //         // Ensure response is passed back correctly
            //         res.end(originalBody);
            //     });
            // },
        })
    );
};
