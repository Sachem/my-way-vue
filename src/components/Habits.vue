<script setup lang="ts">

    import { reactive, ref } from 'vue'
    import { IonContent, IonList, IonItem, IonButton } from '@ionic/vue';
    import Habit from '../components/Habit.vue'
    import AddEditHabit from '../components/AddEditHabit.vue'
    import { useUIStore } from '@/stores/ui'

    import { inject } from 'vue'
    const axios: any = inject('axios') 

    const UI = useUIStore()
    
    interface Habit {
        id: number;
        name: string;
        category_id: number;
        measurable: number;
        goal: number;
        progress: any;
    }

    interface ProgressDate {
        date: string;
        dayOfWeek: string;
        dayInMonth: number;
    }

    const loading = ref(true)

    const config = {};

    const editedHabit = ref<null | Habit>(null);
    const habits = ref<Habit[]>([]);
    const dates = ref<ProgressDate[]>([]); // TODO: move to UI store
 
    axios.get('/sanctum/csrf-cookie')
            .then(response => {
              
        axios.get('/api/habits', config)
            .then(response => {
            console.log('habits from API: ', response.data.data);
            console.log('dates from API: ', response.data.meta.dates);
            habits.value = response.data.data;
            dates.value = response.data.meta.dates;
            loading.value = false;
            })
            .catch(error => {
                console.error(error);
            });

    });

    axios.get('/api/habit/meta', config)
        .then(response => {
            UI.setHabitCategories(response.data.categories);
            UI.setHabitUnits(response.data.units);
        })
        .catch(error => {
            console.error(error);
        });


    function markCompleted(habit, dateIndex){
        console.log("marking completed ID: " + habit.id)

        let isChecked = habit.progress[dateIndex].done;
        isChecked = ! isChecked;

        const data = {
            'date': dates.value[dateIndex].date,
            'done': isChecked
        };

        console.log("marking habit ID: " + habit.id+ " as "+(isChecked ? '' : 'not ')+"completed at: " + data.date + "(dateIndex: "+dateIndex+")");


        axios.post('/api/habit/mark-completed/' + habit.id, data, config).then(response => {
            console.log("request successful, response: "+response.data);

            //let respHabit = response.data;
            habits.value.map((h) => {
                if (h.id === habit.id) {
                    habit.progress[dateIndex].done = isChecked;
                    return habit;
                } 

                return h;
            });
        //console.log('habits', habits.value)

        });

    }

    function changeProgress(habit, dateIndex, progress){
        console.log("changing progress of habit ID: " + habit.id+ " to "+progress +" at dateIndex: "+dateIndex);

        const data = {
            'date': dates.value[dateIndex].date,
            'progress': progress
        };

        console.log("changing progress of habit ID: " + habit.id+ " to "+progress +" at: " + data.date + "(dateIndex: "+dateIndex+")");

        axios.post('/api/habit/change-progress/' + habit.id, data, config).then(response => {
            console.log("request successful, response: "+response.data);

            let respHabit = response.data;
            habits.value.map((h) => {
                if (h.id === habit.id) {
                    console.log(habit);

                    habit.progress[dateIndex].progress = progress;
                    if (habit.progress[dateIndex].progress >= habit.goal){
                        habit.progress[dateIndex].done = true;
                    } else {
                        habit.progress[dateIndex].done = false;
                    }
                    return habit;
                } 

                return h;
            });
          //  console.log('habits', habits.value)

        });

    }
    function addHabit(){
        console.log("adding new habit...")
        editedHabit.value = null;
        UI.setAddEditHabitModalOpened(true);
    }

    function startEditHabit(habit: Habit){
        console.log("editing habit ID: " + habit.id)
        editedHabit.value = habit;
        UI.setAddEditHabitModalOpened(true);
    }


    const addEditHabit = data => {

        console.log("addEditHabit... data:")
        data = JSON.parse(JSON.stringify(data))
        data.measurable = data.measurable ? 1 : 0 
        console.log(data)


        if (editedHabit.value == null) {
            // create new habit
            axios.post('/api/habits', data, config)
                .then(response => {
                    console.log("POSTed");
                    console.log(response.data);
                    
                    habits.value.push(reactive(response.data));
                    UI.setAddEditHabitModalOpened(false);
                    console.log(habits.value)

                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            // update existing
            axios.put('/api/habits/' + editedHabit.value.id, data, config)
                .then(response => {
                    console.log("PUT, habit ID: " + editedHabit.value.id);
                    console.log(response.data);
                    
                    const respHabit = response.data;
                    habits.value = habits.value.map((h) => {
                        if (h.id === respHabit.id) {
                            console.log('yes, found', respHabit);

                            return reactive(respHabit);
                        } 
            
                        return h;
                    });
                    console.log(habits.value)

                    editedHabit.value = null;
                    UI.setAddEditHabitModalOpened(false);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    function deleteHabit(habitId: number){
        console.log("deleting habit ID: " + habitId);

        axios.delete('/api/habits/' + habitId, config)
            .then(response => {
                console.log("DELETED");
                console.log(response.data);
                
                habits.value = habits.value.filter((h) => h.id !== habitId);
            })
            .catch(error => {
                console.error(error);
            });
    }

</script>

<template>
    <ion-content color="light">
        <ion-list v-if="loading">
            <ion-item>
                <p>Loading...</p>
            </ion-item>
        </ion-list>
        <ion-list v-else-if="habits.length == 0">
            <ion-item>
                <p>No habits yet, add one now.</p>
            </ion-item>
        </ion-list>
        <ion-list v-else-if="UI.appView == 'home'" className="ion-no-padding">
            <Habit
            v-for="habit in habits"
            :habit="habit"
            :key="habit.id"
            @on-mark-completed="markCompleted" 
            @on-change-progress="changeProgress" 
            @on-delete="deleteHabit" 
            @on-edit-habit="startEditHabit" 
            />
        </ion-list>
        <ion-list v-else className="ion-no-padding">
            <IonItem>
                <div className='multiDayWrapper'>
                    <div className='habitNamesColumn'>
                        <table className='habitsTable habitNamesTable'>
                            <thead>
                            <tr><td>&nbsp;</td></tr>
                            </thead>
                            <tbody>
                                <tr v-for="habit in habits" :key="habit.id">
                                    <td key="name">
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
                    <div className='habitProgressColumn'>
                        <table className='habitsTable habitProgressTable'>
                            <thead>
                            <tr>
                                <td v-for="date in dates" :key="date.date">{{ date.dayOfWeek }}<br /><span>{{ date.dayInMonth }}</span></td> 
                            </tr>
                            </thead>
                            <tbody>
                                <Habit
                                    v-for="habit in habits"
                                    :habit="habit"
                                    :key="habit.id"
                                    @on-mark-completed="markCompleted" 
                                    @on-change-progress="changeProgress" 
                                    @on-delete="deleteHabit" 
                                    @on-edit-habit="startEditHabit" 
                                /> 
                            </tbody>
                        </table>
                    </div>
                </div>
            </IonItem>
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
        :key="editedHabit ? editedHabit.id : '0'"
        :editedHabit="editedHabit"
        @on-submit="addEditHabit" 
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

