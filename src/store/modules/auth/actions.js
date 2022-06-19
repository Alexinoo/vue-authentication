export default {

    async login(context , payload) {

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAWRaqbU2IdRPjQMbkqLw_HSd1oslpSq-I', {
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

        context.commit('setUser', {
            userId: responseData.localId,
            token: responseData.idToken,
            tokenExpiration: responseData.expiresIn
        } )
    },

    async signup(context, payload) {

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAWRaqbU2IdRPjQMbkqLw_HSd1oslpSq-I', {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        });

        const responseData = await response.json()

        if (!response.ok) {
            console.log(responseData);
            const error = new Error(responseData.message || 'Failed to authenticate')
            throw error;
        }

        context.commit('setUser',{
            token : responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn
        })
    }
}