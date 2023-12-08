<script setup lang="ts">

    import { ref } from 'vue'
    import { IonContent, IonList, IonItem } from '@ionic/vue';
    import Habit from '../components/Habit.vue'


    const habits = ref([
        {
            "id": 1,
            "name": "Jog",
            "category_id": 5,
            "priority": null,
            "measurable": 1,
            "goal": 3,
            "unit_id": 8,
            "unit": "kilometers",
            "progress": [
                {
                    "progress": 0,
                    "done": 0,
                    "date": "2023-11-7"
                },
            ]
        },
        {
            "id": 2,
            "name": "Meditate every day",
            "category_id": 1,
            "priority": null,
            "measurable": 1,
            "goal": 2,
            "unit_id": 5,
            "unit": "minutes",
            "progress": [
                {
                    "progress": 0,
                    "done": 0,
                    "date": "2023-11-7"
                },
            ]
        }
    ]);
</script>

<template>
    <ion-content color="light">
        <ion-list v-if="habits.length == 0">
            <ion-item>
                <p>No habits yet, add one now.</p>
            </ion-item>
        </ion-list>
        <ion-list v-else className="ion-no-padding">
            <Habit
            v-for="habit in habits"
            :habit="habit"
            :key="habit.id"
            />
        </ion-list>
    </ion-content>
</template>

<style scoped>
.addHabit{
    position: absolute;
    bottom: 80px;
    right: 20px;
    font-size: 70px;
}

.addHabitSmall{
    position: absolute;
    bottom: 80px;
    right: 48px;
    font-size: 30px;
}

ion-button[shape=circle] {
    --border-radius: 50%;
    width: 56px;
    height: 56px;
}

.multiDayWrapper{
    margin-top: 5px;
    overflow-x: hidden;
    display: flex;
}

.habitNamesColumn{
    flex: 1 1 auto;
}

.habitNamesColumn tr td{
    white-space: nowrap;
}

.habitProgressColumn{
    flex: 3 3 auto;
    overflow-x: scroll;
}

.habitsTable{
    table-layout:fixed;
}

.habitsTable tr{
    border-bottom: 1px rgb(34, 34, 34) solid;
    height: 40px;
}

.habitsTable tr:last-child{
    border-bottom: none;
}

.habitNamesTable tr td div{
    padding-right: 3px;
}

.habitProgressTable tr td{
    text-align: center;
    min-width: 43px;
}

.habitsTable ion-icon{
    font-size: 16px;
    font-weight: bold;
}

@media only screen and (max-width: 800px) {
    .habitsTable{
        font-size: 13px;
    }

}
</style>
