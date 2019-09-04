/*
 * @Author: 苑振东
 * @Date: 2019-09-04 20:18:13
 * @Last Modified by: 苑振东
 * @Last Modified time: 2019-09-04 20:31:05
 */
import axios from 'axios'
import router from '../router'
// 创建axios实例
let instance = axios.create();

// 拦截请求
instance.interceptors.request.use(function(config) {
    // 判断该接口是否需要token
    let notTokenUrl = ['/api/login', '/api/registry']

    // 需要则在请求头上添加 不需要则继续执行
    return notTokenUrl.includes(config.url) ? config : {
        ...config,
        headers: {
            ...config.headers,
            // 获取在登录界面存储的token
            token: window.localStorage.getItem('token')
        }
    }
}, function(error) {
    // 错误请求处理返回reject error
    return Promise.reject(error)
})

instance.interceptors.response.use(function(response) {
    // 正确请求无需拦截
    return response
}, function(error) {
    // 结构状态码
    let { status } = error.response
        // 判断状态码是否小于500 小于500是前端错误
    if (status < 500) {
        switch (key) {
            case 422:
                {
                    alert('缺少重要参数或者已经注册过')
                    return
                }
            case 401:
                {
                    alert('登录失效 请重新登录')
                    router.replace('/login');
                    return
                }
            default:
                break;
        }
    } else {
        alert('服务端错误')
    }
    // 错误要返回错误相应
    return Promise.reject(error)
})

export default {
    get(url, data) {
        return instance.get(url, { params: data })
    },
    post(url, data) {
        return instance.post(url, data)
    }
}