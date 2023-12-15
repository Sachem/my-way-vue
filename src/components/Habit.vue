<script setup lang="ts">

    import { ref } from 'vue'
    import { IonAlert, IonButton, IonButtons, IonCheckbox, IonContent, IonIcon, IonItem, IonLabel, IonPopover } from '@ionic/vue';
    import { alertController } from '@ionic/vue';
    import { addCircleOutline, createOutline, trashOutline , checkmark, close, calendarOutline, ellipsisVerticalCircleOutline} from 'ionicons/icons';
    import { useUIStore } from '@/stores/ui'

    const UI = useUIStore()
    
    const props = defineProps(['habit'])
    const emit = defineEmits(['onMarkCompleted', 'onChangeProgress', 'onDelete', 'onEditHabit'])
    const popoverOpened = ref(false);

    // console.log(props.habit)

    function onMarkCompleted(dateIndex){
        console.log('onMarkCompleted');

        emit('onMarkCompleted', props.habit, 0)
    }

    function onCalendarOpen(){
        console.log('onCalendarOpen');
        setPopoverOpened(false);
    }

    function onEditStart(){
        console.log('onEditStart');

        emit('onEditHabit', props.habit);
        setPopoverOpened(false);
    }

    function onChangeProgress(dateIndex, progress){
        console.log('onChangeProgress: ' + progress);

        emit('onChangeProgress', props.habit, dateIndex, progress)
    }


    const presentDeleteAlert = async () => {
        const alert = await alertController.create(deleteHabitAlertParams);

        await alert.present();
        setPopoverOpened(false);
    };

    const deleteHabitAlertParams = {
        header: 'Are you sure you want to delete this habit?',
        buttons: [
            {
                text: 'No',
                role: 'cancel',
            },
            {
                text: 'Yes',
                role: 'confirm',
                handler: () => {
                    console.log('deleting habit...' + props.habit.id);
                    emit('onDelete', props.habit.id);
                },
            },
        ]
    };

    function setPopoverOpened(opened){
        console.log('setPopoverOpened');
        popoverOpened.value = opened;
    }

    const updateProgressAlertButtons=[
        {
            text: 'Cancel',
            role: 'cancel'
        },
        {
            text: 'OK',
            role: 'confirm',
            handler: (alertData) => {
                onChangeProgress(0, alertData.progress);
            }
        }
    ];

    const updateProgressAlertInputs=[
        {
            name: 'progress',
            type: 'number',
            placeholder: 'Progress',
            min: 0,
            value: props.habit.progress[0].progress
        }
    ];

</script>

<template>
<ion-item v-if="UI.appView == 'home'">
    <ion-checkbox 
        :disabled="habit.measurable" 
        :checked="habit.progress[0].done"
        @click="onMarkCompleted"
    ></ion-checkbox>
    <ion-label>
        {{ habit.name }} 
        <template v-if="habit.measurable == 1"> 
            <br />
            <ion-label :id="'update-progress-habit-'+habit.id" class="smallGrey">
                Progress: <b>{{ habit.progress[0].progress }} / {{ habit.goal }}</b> {{ habit.unit }}
            </ion-label>
            <ion-alert
                :trigger="'update-progress-habit-'+habit.id"
                header="What is your progress today?"
                :buttons="updateProgressAlertButtons"
                :inputs="updateProgressAlertInputs"
            ></ion-alert>
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
            @click="presentDeleteAlert"
            fill="clear"
            size='large'
            className='ion-hide-sm-down'
        >
            <ion-icon :icon="trashOutline"></ion-icon>
        </ion-button>
        <ion-button 
            :id="'open-menu-habit-' + habit.id"
            @click="setPopoverOpened(true)"
            className='ion-hide-sm-up'
        >
            <ion-icon :icon="ellipsisVerticalCircleOutline"></ion-icon>
        </ion-button>
        <ion-popover :trigger="'open-menu-habit-' + habit.id" :isOpen="popoverOpened">
            <ion-content class="ion-padding">
                <ion-item @click="onCalendarOpen">
                    <ion-icon :icon="calendarOutline"></ion-icon>&nbsp;Calendar
                </ion-item>
                <ion-item @click="onEditStart">
                    <ion-icon :icon="createOutline"></ion-icon>&nbsp;Edit
                </ion-item> 
                <ion-item @click="presentDeleteAlert">
                    <ion-icon :icon="trashOutline"></ion-icon>&nbsp;Delete
                </ion-item>
            </ion-content>
        </ion-popover>
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
            @click="onMarkCompleted"
            :icon="checkmark"
        ></IonIcon>
        <IonIcon
            v-else 
            @click="onMarkCompleted"
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
