<script setup lang="ts">
    import { computed, reactive, ref } from 'vue'
    import { IonModal, IonHeader, IonContent, IonTitle, IonButtons, IonButton, IonToolbar, IonList, IonItem, 
        IonSelect, IonSelectOption, IonToggle, IonLabel, IonInput, IonNote, IonBadge } from '@ionic/vue';
    import { useUIStore } from '@/stores/ui'
    import useVuelidate from '@vuelidate/core'
    import { required, integer, minValue } from '@vuelidate/validators'

    const UI = useUIStore()
    const habit = ref(null)
    const emit = defineEmits(['onSubmit'])

 //   const measurable = ref(false)

    function onModalClose(){
        console.log('modal closing...');
        UI.setAddEditHabitModalOpened(false);
    }

    const handleSubmit = async() => {
        // e.preventDefault();
        console.log('form submitted...');

        const result = await v$.value.$validate();

        console.log('result', result);
        console.log('v$', v$);

        if (result){
            emit('onSubmit', formData)
        }
    }

    const formData = reactive({
        measurable: false,
        title: "",
        category_id: null,
        goal: "",
        unit_id: null
    });

    const rules = computed(() => {
        const localRules = {
            measurable: { required },
            title: { required },
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
    <IonModal 
        :is-open="UI.addEditHabitModalOpened" 
        onDidDismiss="onDidDismiss"
    >
        <IonHeader>
            <IonToolbar>
                <IonTitle>{{ habit == null ? 'Create New Habit' : 'Edit Habit' }}</IonTitle>
                <IonButtons slot="end">
                    <IonButton @click="onModalClose">Close</IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent class="ion-padding">
            <IonList lines="none">
                    <!-- <form v-on:submit="handleSubmit"> -->
                    <input 
                        value="0"
                        type="hidden"
                        name="measurable"
                    />
                    <IonItem class='addHabitFormItem'>
                        <IonLabel>Habit Title</IonLabel>
                        <IonInput
                            class="text-input"
                            placeholder="Enter habit title"
                            slot="end"
                            v-model="formData.title"
                        ></IonInput>
                        <IonBadge v-if="v$.title.$error" color="danger">Required</IonBadge> 
                    </IonItem>
                    <IonItem class='addHabitFormItem'>
                        <IonSelect 
                            label="Habit Category" 
                            placeholder="Choose category"
                            v-model="formData.category_id"
                        >
                            <IonSelectOption v-for="category in UI.habitCategories" :value="category.id">{{ category.name }}</IonSelectOption>
                        </IonSelect>
                        <IonBadge v-if="v$.category_id.$error" color="danger">Required</IonBadge> 
                    </IonItem>
                    <IonItem class='addHabitFormItem'>
                        <IonToggle
                            v-model="formData.measurable"
                        >
                            <IonLabel>Is habit Measurable?</IonLabel>
                            <IonNote color="medium">(leave unchecked for "Yes / No")</IonNote>
                        </IonToggle>
                    </IonItem>
                    <template v-if="formData.measurable">
                        <IonItem class='addHabitFormItem'>
                            <IonLabel>Goal</IonLabel>
                            <IonInput
                                class="text-input" 
                                placeholder="Enter quantity"
                                slot="end"
                                v-model="formData.goal"
                            ></IonInput>
                            <IonBadge v-if="v$.goal.$error" color="danger">Required</IonBadge> 
                        </IonItem>
                        <IonItem class='addHabitFormItem'>
                            <IonSelect 
                                label="Habit Unit" 
                                placeholder="Choose unit"
                                v-model="formData.unit_id"
                            >
                                <IonSelectOption v-for="unit in UI.habitUnits" :value="unit.id">{{ unit.name }}</IonSelectOption>
                            </IonSelect>
                            <IonBadge v-if="v$.unit_id.$error" color="danger">Required</IonBadge> 
                        </IonItem>
                    </template>
                    <IonItem class='submitItem'>
                        <IonButton
                            type="submit"
                            size='large'
                            class="submitAddEditHabit"
                            @click="handleSubmit"
                        >{{ habit == null ? 'Create' : 'Update' }}</IonButton>
                    </IonItem>
                    <!-- </form> -->
                </IonList>
        </IonContent>
    </IonModal>
</template>