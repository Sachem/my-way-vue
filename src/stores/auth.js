import { defineStore } from 'pinia'

export const useAuthStore = defineStore('Auth', {
    state: () => ({ 
        loggedIn: sessionStorage.getItem('loggedIn') == 'true' || false,
        accessToken: sessionStorage.getItem('accessToken') || ''
    }),
    actions: {
        setLoggedIn(loggedIn) {
            this.loggedIn = loggedIn;
            sessionStorage.setItem('loggedIn', loggedIn);
        },
        setAccessToken(accessToken) {
            this.accessToken = accessToken;
            sessionStorage.setItem('accessToken', accessToken);
        },
    },
})