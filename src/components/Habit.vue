<script setup lang="ts">

    import { ref } from 'vue'
    import { IonAlert, IonButton, IonButtons, IonCheckbox, IonContent, IonIcon, IonItem, IonLabel } from '@ionic/vue';
    import { addCircleOutline, createOutline, trashOutline , checkmark, close, calendarOutline, ellipsisVerticalCircleOutline} from 'ionicons/icons';
    import { useUIStore } from '@/stores/ui'

    const UI = useUIStore()
    
    const props = defineProps(['habit'])
    const emit = defineEmits(['on-mark-completed', 'on-change-progress', 'on-delete', 'on-edit-habit', 'on-open-popover'])

    function onMarkCompleted(dateIndex: number){
        console.log('onMarkCompleted');

        emit('on-mark-completed', props.habit, dateIndex)
    }

    function onCalendarOpen(){
        console.log('onCalendarOpen');
    }

    function onEditStart(){
        console.log('onEditStart');

        emit('on-edit-habit', props.habit);
    }

</script>

<template>
<ion-item v-if="UI.appView == 'home'">
    <ion-checkbox 
        :disabled="habit.measurable" 
        :checked="habit.progress[0].done"
        @click="onMarkCompleted(0)"
    ></ion-checkbox>
    <ion-label>
        {{ habit.name }} 
        <template v-if="habit.measurable == 1"> 
            <br />
            <ion-label @click="$emit('on-change-progress', props.habit, 0)" class="smallGrey">
                Progress: <b>{{ habit.progress[0].progress }} / {{ habit.goal }}</b> {{ habit.unit }}
            </ion-label>
        </template>
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
            @click="$emit('on-delete', habit)"
            fill="clear"
            size='large'
            className='ion-hide-sm-down'
        >
            <ion-icon :icon="trashOutline"></ion-icon>
        </ion-button>
        <ion-button 
            :id="'open-menu-habit-' + habit.id"
            @click="$emit('on-open-popover', habit)"
            className='ion-hide-sm-up'
        >
            <ion-icon :icon="ellipsisVerticalCircleOutline"></ion-icon>
        </ion-button>
    </ion-buttons>
</ion-item>
<tr v-else>
    <td v-for="(day, index) in habit.progress" :key="day.date">
        <IonButton 
            v-if="habit.measurable == 1"
            fill="clear"
            size='small'
            :id="'update-progress-habit-'+habit.id+'-day-'+day.date"
        >
            {{ day.progress }}
        </IonButton>
        <IonIcon
            v-else-if="day.done == 1" 
            @click="onMarkCompleted(index)"
            :icon="checkmark"
        ></IonIcon>
        <IonIcon
            v-else 
            @click="onMarkCompleted(index)"
            :icon="close"
        ></IonIcon>
    </td>
</tr>
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
