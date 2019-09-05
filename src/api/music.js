import request from '@/utils/request'

let music = {
    getMusic: data => request.get('/api/querymusic', data),
    deleteMusic: data => request.get('/api/deletemusic', data)
}

export default music