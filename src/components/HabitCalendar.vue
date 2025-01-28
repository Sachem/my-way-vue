<script setup>
import { ref, watch } from 'vue';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import Habit from './Habit.vue'

// Props
defineProps({
  isOpen: Boolean,
  habit: Habit,
  accessToken: String,
  onClose: Function,
});

defineEmits(['on-calendar-close']);

// Reactive state
const value = ref(new Date());
const highlightedDates = ref([]);
const calendarAttributes = ref([]);

// Function to handle date change
function onDateChange(selectedDate) {
  value.value = selectedDate;
}
</script>

<template>
    <ion-modal :is-open="isOpen">
      <ion-header>
        <ion-toolbar>
          <ion-title>{{ habit ? habit.name : '' }}</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="$emit('on-calendar-close')">Close</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <vue-cal
          :selected-date="value"
          :highlighted="highlightedDates"
          @change="onDateChange"
          :attributes="calendarAttributes"
        />
      </ion-content>
    </ion-modal>
  </template>
  

  