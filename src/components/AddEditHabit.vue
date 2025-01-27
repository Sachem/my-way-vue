<script setup lang="ts">
    import { computed, reactive, ref } from 'vue'
    import { IonModal, IonHeader, IonContent, IonTitle, IonButtons, IonButton, IonToolbar, IonList, IonItem, 
        IonSelect, IonSelectOption, IonToggle, IonLabel, IonInput, IonNote, IonBadge } from '@ionic/vue';
    import { useUIStore } from '@/stores/ui'
    import useVuelidate from '@vuelidate/core'
    import { required, integer, minValue } from '@vuelidate/validators'
    
    const UI = useUIStore()

    const props = defineProps(['editedHabit']) // TODO: can this logic be improved?
                                               // ...read here: https://vuejs.org/guide/essentials/reactivity-fundamentals.html#why-refs

    const emit = defineEmits(['onSubmit'])

    const habit = props.editedHabit;

    function onModalClose(){
        console.log('modal closing...');
        UI.setAddEditHabitModalOpened(false);
    }

    const handleSubmit = async() => {
        console.log('form submitted...');

        const result = await v$.value.$validate();

        console.log('result', result);
        console.log('v$', v$);

        if (result){
            emit('onSubmit', formData)
        }
    }

    let formData = reactive({
        measurable: false,
        name: "",
        category_id: null,
        goal: "",
        unit_id: null
    });
    
    if (props.editedHabit != null){
        const habit = ref(props.editedHabit)
        formData = reactive({
            measurable: habit.value.measurable == 1,
            name: habit.value.name,
            category_id: habit.value.category_id,
            goal: habit.value.goal,
            unit_id: habit.value.unit_id
        });
    }
console.log('formData', formData);
    const rules = computed(() => {
        const localRules = {
            measurable: { required },
            name: { required },
            category_id: { required },
            goal: {},
            unit_id: {}
        }

        if (formData.measurable) {
            localRules.goal = { minValue: minValue(1), integer, required };
            localRules.unit_id = { required };
        }

        return localRules;
    });

    const v$ = useVuelidate(rules, formData);

    console.log('UI.habitCategories', UI.habitCategories);
</script>

<template>
    <!-- onDidDismiss="onDidDismiss" -->
    <ion-modal 
        :is-open="UI.addEditHabitModalOpened" 
    >
        <ion-header>
            <ion-toolbar>
                <ion-title>{{ habit == null ? 'Create New Habit' : 'Edit Habit' }}</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="onModalClose">Close</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-list lines="none">
                    <ion-item class='addHabitFormItem'>
                        <ion-label>Habit Title</ion-label>
                        <ion-input
                            class="text-input"
                            placeholder="Enter habit title"
                            slot="end"
                            v-model="formData.name"
                        ></ion-input>
                        <ion-badge v-if="v$.name.$error" color="danger">Required</ion-badge> 
                    </ion-item>
                    <ion-item class='addHabitFormItem'>
                        <ion-select 
                            label="Habit Category" 
                            placeholder="Choose category"
                            v-model="formData.category_id"
                        >
                            <ion-select-option v-for="category in UI.habitCategories" :value="category.id">{{ category.name }}</ion-select-option>
                        </ion-select>
                        <ion-badge v-if="v$.category_id.$error" color="danger">Required</ion-badge> 
                    </ion-item>
                    <ion-item class='addHabitFormItem'>
                        <ion-toggle
                            v-model="formData.measurable"
                        >
                            <ion-label>Is habit Measurable?</ion-label>
                            <ion-note color="medium">(leave unchecked for "Yes / No")</ion-note>
                        </ion-toggle>
                    </ion-item>
                    <template v-if="formData.measurable">
                        <ion-item class='addHabitFormItem'>
                            <ion-label>Goal</ion-label>
                            <ion-input
                                class="text-input" 
                                placeholder="Enter quantity"
                                slot="end"
                                v-model="formData.goal"
                            ></ion-input>
                            <ion-badge v-if="v$.goal.$error" color="danger">Required</ion-badge> 
                        </ion-item>
                        <ion-item class='addHabitFormItem'>
                            <ion-select 
                                label="Habit Unit" 
                                placeholder="Choose unit"
                                v-model="formData.unit_id"
                            >
                                <ion-select-option v-for="unit in UI.habitUnits" :value="unit.id">{{ unit.name }}</ion-select-option>
                            </ion-select>
                            <ion-badge v-if="v$.unit_id.$error" color="danger">Required</ion-badge> 
                        </ion-item>
                    </template>
                    <ion-item class='submitItem'>
                        <ion-button
                            type="submit"
                            size='large'
                            class="submitAddEditHabit"
                            @click="handleSubmit"
                        >{{ habit == null ? 'Create' : 'Update' }}</ion-button>
                    </ion-item>
                </ion-list>
        </ion-content>
    </ion-modal>
</template>