export default {
    userId(state) {
        return state.userId;
    },

    getToken(state){
        return state.token;
    },

    isAuthenticated(state){
        return !!state.token;
    }

}