/*
 * @Author: 苑振东 
 * @Date: 2019-09-03 16:49:53 
 * @Last Modified by: 苑振东
 * @Last Modified time: 2019-09-03 16:56:19
 */
import axios from 'axios'

// 创建axios实例
let instance = axios.create();

// 添加请求拦截器(request)
instance.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么
    return config
}, function(error) {
    // 对错误请求做些什么
    return Promise.reject(error)
});

// 添加响应拦截器(response)
instance.interceptors.response.use(function(response) {
    return response
}, function(error) {
    // 对错误响应做点什么
    return Promise.reject(error)
})


export default {
    get(url, data) { // 返回一个get请求
        return instance.get(url, { params: data })
    },
    post(url, data) { // 返回一个post请求
        return instance.post(url, data)
    }
}