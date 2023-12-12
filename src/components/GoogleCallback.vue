<script setup lang="ts">

    import { ref } from 'vue';
    import { inject } from 'vue'
    import { axios } from 'axios'
    import { useRoute, useRouter } from "vue-router";

    const router = useRouter()
    const axios: any = inject('axios') 

    import { useAuthStore } from '@/stores/auth'
    const authStore = useAuthStore()

    const loading = ref(true)

    // On page load, we take "search" parameters 
    // and proxy them to /api/auth/callback on our Laravel API

console.log('query', useRoute().query);
console.log('fullPath', useRoute().fullPath);

const url = new URL('http://blahblah' + useRoute().fullPath); // TODO: find better way than this ;)


    axios.get(`/api/auth/socialite/google/callback${url.search}`)
    .then((response) => {
        loading.value = false;

        console.log('response', response);
        authStore.setLoggedIn(true)
        authStore.setAccessToken(response.data.access_token)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;

        // literal string path
        router.push('/habits')

    });

</script>

<template>
    <div v-if="loading">Loading...</div>
</template>