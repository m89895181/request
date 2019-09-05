/*
 * @Author: 苑振东 
 * @Date: 2019-09-05 08:58:30 
 * @Last Modified by: 苑振东
 * @Last Modified time: 2019-09-05 08:59:35
 */

export default {
    state: {
        curMisicList: []
    },
    mutations: {
        changeCurMusic(state, payload) {
            state.curMisicList = payload
        }
    }
}