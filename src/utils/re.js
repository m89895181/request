/*
 * @Author: 苑振东
 * @Date: 2019-09-04 19:49:40
 * @Last Modified by: 苑振东
 * @Last Modified time: 2019-09-04 20:19:14
 */
import axios from 'axios'
import router from '@/router'

// 创建axios实例
let instance = axios.create();

// 添加请求拦截器
instance.interceptors.request.use(function(config) {
    // 判断是不是需要token的接口
    let notTokenUrl = ['/api/registry', '/api/registry'];

    //在发送请求之前对这些接口进行处理
    return notTokenUrl.includes(config.url) ? config : {
        ...config,
        headers: {
            ...config.headers,
            // 在这里获取登陆成功存储的token  
            token: window.localStorage.getItem('token')
        }
    }
}, function(error) {
    return Promise.reject(error)
})


instance.interceptors.response.use(function(response) {
    return response
}, function(error) {
    let { status } = error.response;
    if (status < 500) {
        switch (status) {
            case 422:
                {
                    alert('缺少重要参数 数据传递有误')
                    return
                }
            case 401:
                {
                    alert('token(身份认证令牌)失效')
                    router.replace('/login')
                    return
                }
            default:
                break;
        }
    } else {
        alert('服务端错误')
    }
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