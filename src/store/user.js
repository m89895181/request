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