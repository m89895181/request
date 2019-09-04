/*
 * @Author: 苑振东 
 * @Date: 2019-09-04 19:50:02 
 * @Last Modified by:   苑振东 
 * @Last Modified time: 2019-09-04 19:50:02 
 */
export default {
    state: {
        username: ''
    },
    mutations: {
        changeUserName(state, payload) {
            state.username = payload
        }
    }
}