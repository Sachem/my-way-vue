<script setup lang="ts">

    import { ref } from 'vue'
    import { 
        IonAlert, IonButton, IonButtons, IonCheckbox, IonCol, IonContent, IonIcon, IonItem, IonLabel, IonPopover, IonRow, IonSelect, IonSelectOption 
    } from '@ionic/vue';

    import { addCircleOutline, createOutline, trashOutline , checkmark, close, calendarOutline, ellipsisVerticalCircleOutline} from 'ionicons/icons';

    const props = defineProps(['habit'])

    console.log(props.habit)

    function onMarkCompleted(){
        console.log('onMarkCompleted');
    }
    function onCalendarOpen(){
        console.log('onCalendarOpen');
    }
    function onEditStart(){
        console.log('onEditStart');
    }
    function presentAlert(){
        console.log('presentAlert');
    }
    function setPopoverOpened(){
        console.log('setPopoverOpened');
    }
</script>

<template>
<ion-item>
    <ion-checkbox 
        :disabled="habit.measurable" 
        :checked="habit.progress[0].done"
        @click="onMarkCompleted"
    ></ion-checkbox>
    <ion-label>
        {{props.habit.name}}
        <!-- TODO: add progress and alert to change progress (for measurable)-->
    </ion-label>
    <ion-buttons slot="end">
        <ion-button 
            @click="onCalendarOpen"
            fill="clear"
            size='large'
            className='ion-hide-sm-down'
        >
            <ion-icon :icon="calendarOutline"></ion-icon>
        </ion-button>
        <ion-button 
            @click="onEditStart"
            fill="clear"
            size='large'
            className='ion-hide-sm-down'
        >
            <ion-icon :icon="createOutline"></ion-icon>
        </ion-button>
        <ion-button 
            @click="presentAlert"
            fill="clear"
            size='large'
            className='ion-hide-sm-down'
        >
            <ion-icon :icon="trashOutline"></ion-icon>
        </ion-button>
        <ion-button 
            id={habit.id}
            @click="setPopoverOpened"
            className='ion-hide-sm-up'
        >
            <ion-icon :icon="ellipsisVerticalCircleOutline"></ion-icon>
        </ion-button>
        <!-- TODO: add popover-->
    </ion-buttons>
</ion-item>
</template>

<style scoped>
ion-checkbox {
  --size: 24px;
  --checkbox-background-checked: rgb(56, 128, 255);
  margin-right: 10px;
}

ion-checkbox::part(container) {
  border-radius: 6px;
  border: 2px solid rgb(56, 128, 255);
}

ion-col:not(:first-child){
  text-align: center;
}

ion-col span, td span{
  color: #999;
  font-size: 12px;
}

.smallGrey{ 
  color: #999 !important;
  font-size: 12px !important;
}

ion-row {
  height: 50px;
}

ion-row button{
  display: flex;
  align-items: top;
  justify-content: top;
}

ion-row ion-icon{
  cursor: pointer;
}

</style>
