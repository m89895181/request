/*
 * @Author: 苑振东 
 * @Date: 2019-09-04 19:49:47 
 * @Last Modified by: 苑振东
 * @Last Modified time: 2019-09-04 20:31:56
 */
import request from '@/utils/rpra'

let user = {
    login: data => request.post('/api/login', data),
    registry: data => request.post('/api/registry', data),
    userinfo: () => request.get('/api/userinfo')
}


export default user