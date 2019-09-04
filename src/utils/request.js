/*
 * @Author: 苑振东 
 * @Date: 2019-09-03 16:49:53 
 * @Last Modified by: 苑振东
 * @Last Modified time: 2019-09-04 11:00:22
 */
import axios from 'axios'
import router from '@/router'
// 创建axios实例
let instance = axios.create();

// 添加请求拦截器(request)
instance.interceptors.request.use(function(config) {
    // 是不是登录和注册的接口 (不需要token的)
    let notTokenUrl = ['/api/login', '/api/registry'];
    // 在发送请求之前做些什么
    return notTokenUrl.includes(config.url) ? config : {
        ...config,
        headers: {
            ...config.headers,
            // 在登陆成功存储的token 在这里获取
            token: window.localStorage.getItem('token')
        }
    }
}, function(error) {
    // 对错误请求做些什么
    return Promise.reject(error)
});

// 添加响应拦截器(response)
instance.interceptors.response.use(function(response) {
    return response
}, function(error) {
    let { status } = error.response;

    if (status < 500) {
        switch (status) {
            case 422:
                {
                    alert('缺少参数 数据传递有误')
                    return
                }
            case 401:
                {
                    alert('权限不够 登陆过期')
                    router.push('/login')
                    return
                }
            default:
                break;
        }
    } else {
        alert('服务端错误')
    }

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