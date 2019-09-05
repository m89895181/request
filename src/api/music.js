import request from '@/utils/request'

let music = {
    getMusic: data => request.get('/api/querymusic', data), // 获取列表
    deleteMusic: data => request.get('/api/deletemusic', data), // 删除音乐
    upload: data => request.post('/api/upload', data), // 上传图片接口
    addmusic: data => request.post('/api/addmusic', data), // 添加音乐接口
    updatemusic: data => request.post('/api/updatemusic', data) // 修改音乐(项)
}

export default music