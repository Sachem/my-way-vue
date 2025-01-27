<script>

    const props = defineProps(['habits', 'dates'])
    const emit = defineEmits(['on-mark-completed', 'on-change-progress', 'on-delete', 'on-edit-habit', 'on-open-popover'])
  
</script>
    
<template>
    <ion-list class="ion-no-padding">
      <Habit
        v-for="habit in habits"
        :key="habit.id"
        :habit="habit"
        @on-mark-completed="markCompleted"
        @on-change-progress="changeProgress"
        @on-delete="deleteHabit"
        @on-edit-habit="startEditHabit"
        @on-open-popover="openPopover"
      />
    </ion-list>
  </template>

  