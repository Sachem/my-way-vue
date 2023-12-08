<script setup lang="ts">

    import { ref } from 'vue'
    import { IonContent, IonList, IonItem, IonButton } from '@ionic/vue';
    import Habit from '../components/Habit.vue'
    import AddEditHabit from '../components/AddEditHabit.vue'
    import { useUIStore } from '@/stores/ui'

    const UI = useUIStore()

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
        },
        {
            "id": 3,
            "name": "Pray",
            "category_id": 1,
            "priority": null,
            "measurable": 0,
            "goal": null,
            "unit_id": null,
            "unit": null,
            "progress": [
                {
                    "progress": null,
                    "done": 0,
                    "date": "2023-11-7"
                },
            ]
        }
    ]);

    const habitCategories = ref([
        {
            id: 1,
            name: 'body'
        },
        {
            id: 2,
            name: 'spirit'
        }
    ])

    function markCompleted(habit, dateIndex){
        console.log("marking completed ID: " + habit.id)

        let isChecked = habit.progress[dateIndex].done;
        isChecked = ! isChecked;

        habits.value.map((h) => {
            if (h.id === habit.id) {
                habit.progress[dateIndex].done = isChecked;
                return habit;
            } 

            return h;
        });

        console.log(habits)
    }

    function changeProgress(habit, dateIndex, progress){
        console.log("change progress to "+progress+" for ID: " + habit.id)

        habits.value.map((h) => {
            if (h.id === habit.id) {
                habit.progress[dateIndex].progress = progress;
                return habit;
            } 

            return h;
        });

        console.log(habits)
    }

    function deleteHabit(habitId){
        console.log("delete ID: " + habitId)

        habits.value = habits.value.filter((h) => h.id !== habitId);

        console.log(habits)
    }

    function addHabit(){
        console.log("adding new habit...")
        UI.setAddEditHabitModalOpened(true);
    }
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
            @on-mark-completed="markCompleted" 
            @on-change-progress="changeProgress" 
            @on-delete="deleteHabit" 
            />
        </ion-list>
    </ion-content>

    <ion-button 
        shape="round" 
        class="addHabit ion-hide-md-down" 
        @click="addHabit"
    >+</ion-button>

    <ion-button 
        shape="round" 
        class="addHabitSmall ion-hide-md-up" 
        @click="addHabit"
    >+</ion-button>

    <AddEditHabit 
        :habitCategories="habitCategories" 
    />
    
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

