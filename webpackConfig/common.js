const path = require('path');

module.exports = {
    entry: "./src/js/main.js",
    output: {
        path: path.resolve(__dirname, "..", "build"),
        filename: "js/main.[fullhash].js",
        // clean: true,
    },
    resolve: {
        alias: {
            '$root': path.resolve(__dirname, "..", "src")
        }
    },
};