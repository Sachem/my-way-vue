<script setup lang="ts">

    import { ref } from 'vue'
    import { IonButton, IonIcon } from '@ionic/vue';
    import { checkmark, close } from 'ionicons/icons';

    const props = defineProps(['habit','day','index'])
    const emit = defineEmits(['onMarkCompleted','onChangeProgress'])

    function onMarkCompleted(){
        emit('onMarkCompleted', props.index)
    }
    function onChangeProgress(progress){
        emit('onChangeProgress', props.index, progress)
    }
</script>


<template >
    <IonButton 
        v-if="props.habit.measurable == 1"
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
</template>
