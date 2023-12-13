import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router';
import axios from 'axios'
import VueAxios from 'vue-axios'

import { IonicVue } from '@ionic/vue';
import { useAuthStore } from '@/stores/auth'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

const hostname = window && window.location && window.location.hostname;

//let apiEndpoint = 'https://myway-api.01solutions.co.uk';
let apiEndpoint = 'http://0.0.0.0';
console.log('apiEndpoint', apiEndpoint);

axios.defaults.baseURL = apiEndpoint;
axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
//axios.defaults.withCredentials = true;
//axios.defaults.withXSRFToken = true;

axios.interceptors.request.use(request => {
  // console.log(request);
  // Edit request config
  return request;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  // console.log(response);
  // Edit response config
  return response;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

const pinia = createPinia()


const app = createApp(App)
  .use(VueAxios, axios)
  .use(pinia)
  .use(IonicVue)
  .use(router);

const authStore = useAuthStore()
axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.accessToken;

app.provide('axios', app.config.globalProperties.axios)
  
router.isReady().then(() => {
  app.mount('#app');
});