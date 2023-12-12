<template>
  <ion-page>
    <ion-header>
        <ion-toolbar>
          <ion-title><b className="themeBlue">My Way</b> - {{ appView == 'home' ? 'Today' : 'Recent days'}}</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="logout">              
              <ion-icon className="themeBlue" :icon="logOutOutline"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content fullscreen>
        <Habits />
      </ion-content>
      <ion-footer>
        <ion-toolbar>
          <ion-segment value={appView}>
            <ion-segment-button value="home" >
              <ion-icon :icon="home"></ion-icon>
            </ion-segment-button>
            <ion-segment-button value="multiple-days" >
              <ion-icon :icon="listOutline"></ion-icon>
            </ion-segment-button>
          </ion-segment>
        </ion-toolbar>
      </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/vue';
import { addCircleOutline, ellipsisVerticalCircleOutline, home, listOutline, logOutOutline } from 'ionicons/icons';
import { ellipse, square, triangle } from 'ionicons/icons';

import Habits from '../components/Habits.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from "vue-router";

const router = useRouter()

const appView = ref('home');

const logout = () => {
      const authStore = useAuthStore();
      authStore.setLoggedIn(false)
      authStore.setAccessToken('')
      router.push('/auth')
  };
</script>

<style scoped>
.themeBlue{
    color:rgb(56, 128, 255);
}
</style>