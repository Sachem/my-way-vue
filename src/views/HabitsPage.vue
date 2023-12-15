<script setup lang="ts">
import { ref } from 'vue';
import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/vue';
import { addCircleOutline, ellipsisVerticalCircleOutline, home, listOutline, logOutOutline } from 'ionicons/icons';

import Habits from '../components/Habits.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from "vue-router";
import { useUIStore } from '@/stores/ui'

const UI = useUIStore()

const router = useRouter()

const logout = () => {
      const authStore = useAuthStore();
      authStore.setLoggedIn(false)
      authStore.setAccessToken('')
      router.push('/auth')
  };

</script>

<template>
  <ion-page>
    <ion-header>
        <ion-toolbar>
          <ion-title><b className="themeBlue">My Way</b> - {{ UI.appView == 'home' ? 'Today' : 'Recent days'}}</ion-title>
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
          <ion-segment value="home">
            <ion-segment-button value="home" @click="UI.setAppView('home')">
              <ion-icon :icon="home"></ion-icon>
            </ion-segment-button>
            <ion-segment-button value="multiple-days" @click="UI.setAppView('multiple-days')">
              <ion-icon :icon="listOutline"></ion-icon>
            </ion-segment-button>
          </ion-segment>
        </ion-toolbar>
      </ion-footer>
  </ion-page>
</template>

<style scoped>
.themeBlue{
    color:rgb(56, 128, 255);
}
</style>