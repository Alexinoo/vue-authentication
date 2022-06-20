export default {

    async login(context , payload) {
        return context.dispatch('auth' , {
            ...payload,
            mode : 'login'
        })        
    },

    async signup(context, payload) {

       return context.dispatch('auth', {
            ...payload,
            mode: 'signup'
        })  
    } ,

    async auth(context , payload){

        const mode = payload.mode

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAWRaqbU2IdRPjQMbkqLw_HSd1oslpSq-I'

        if (mode === 'signup'){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAWRaqbU2IdRPjQMbkqLw_HSd1oslpSq-I'
        }

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        });

        const responseData = await response.json()

        if (!response.ok) {
            const error = new Error(responseData.message || 'Invalid Credentials')
            throw error;
        }

        localStorage.setItem('token', responseData.idToken)
        localStorage.setItem('userId', responseData.localId)

        context.commit('setUser', {
            userId: responseData.localId,
            token: responseData.idToken,
            tokenExpiration: responseData.expiresIn
        })

    },

    tryLogin(context){
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')

        if(token && userId){
            context.commit('setUser' , {
                token,
                userId,
                tokenExpiration : null
            })
        }
    },

    logout(context){

        context.commit('setUser',{
            token : null,
            userId : null,
            tokenExpiration : null,
        })

    }
}