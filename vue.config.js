/*
 * @Author: 苑振东 
 * @Date: 2019-09-03 16:41:54 
 * @Last Modified by: 苑振东
 * @Last Modified time: 2019-09-04 20:39:03
 */
const bodyParser = require('body-parser')
module.exports = {
    devServer: {
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3000/',
                changeOrigin: true
            }
        },
    }
}