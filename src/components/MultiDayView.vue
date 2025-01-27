<script>

    const props = defineProps(['habits', 'dates'])
    const emit = defineEmits(['on-mark-completed', 'on-change-progress', 'on-delete', 'on-edit-habit', 'on-open-popover'])
  
</script>

<template>
    <ion-list class="ion-no-padding">
      <ion-item>
        <div class="multiDayWrapper">
          <div class="habitNamesColumn">
            <table class="habitsTable habitNamesTable">
              <thead>
                <tr><td>&nbsp;</td></tr>
              </thead>
              <tbody>
                <tr v-for="habit in habits" :key="habit.id">
                  <td>
                    <div>
                      {{ habit.name }}
                      <template>
                        <br />
                        <span>Goal: {{ habit.goal }}</span>
                      </template>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="habitProgressColumn">
            <table class="habitsTable habitProgressTable">
              <thead>
                <tr>
                  <td v-for="date in dates" :key="date.date">{{ date.dayOfWeek }}<br /><span>{{ date.dayInMonth }}</span></td>
                </tr>
              </thead>
              <tbody>
                <Habit
                  v-for="habit in habits"
                  :key="habit.id"
                  :habit="habit"
                  @on-mark-completed="$emit('on-mark-completed', $event)"
                  @on-change-progress="$emit('on-change-progress', $event)"
                  @on-delete="$emit('on-delete', $event)"
                  @on-edit-habit="$emit('on-edit-habit', $event)"
                />
              </tbody>
            </table>
          </div>
        </div>
      </ion-item>
    </ion-list>
  </template>