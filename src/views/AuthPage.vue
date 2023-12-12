<template>
  <ion-page>
    <ion-header>
        <ion-toolbar>
          <ion-title><b className="themeBlue">My Way</b> - {{ appView == 'home' ? 'Today' : 'Recent days'}}</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="clicked">              
              <ion-icon className="themeBlue" icon={logOutOutline}></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content fullscreen>
        <IonGrid> 
            <IonRow> 
                <IonCol size-md="6" size-lg="5" size-xs="12">
                    <h4>Social Auth</h4>
                </IonCol>
            </IonRow>
            <IonRow> 
                <IonCol size-md="6" size-lg="5" size-xs="12">
                    <a v-if="loginUrl != null" :href="loginUrl">
                        <IonButton>Login with Google</IonButton>
                    </a>
                </IonCol>
            </IonRow>
        </IonGrid>
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
import { IonRouterOutlet } from '@ionic/vue';
import { 
    IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar,
    IonGrid, IonRow, IonCol 
} from '@ionic/vue';
import { addCircleOutline, ellipsisVerticalCircleOutline, home, listOutline, logOutOutline } from 'ionicons/icons';
import { ellipse, square, triangle } from 'ionicons/icons';


import { inject } from 'vue'
    const axios: any = inject('axios') 

const loginUrl = ref(null)

axios.get('/api/auth/socialite/google')
    .then((response) => {
        console.log(response);
        loginUrl.value = response.data.url;
    })
    .catch((error) => console.error(error));

</script>

<style scoped>
.themeBlue{
    color:rgb(56, 128, 255);
}
</style>