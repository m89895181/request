import request from '@/utils/request'

let user = {
    login: data => request.post('/api/login', data),
    registry: data => request.post('/api/registry', data)
}


export default user