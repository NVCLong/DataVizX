// webpack.config.js
const path = require('path');

module.exports = {
    entry: '../src/chartMain.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    }
};