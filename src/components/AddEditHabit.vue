<script setup lang="ts">
    import { ref } from 'vue'
    import { IonModal, IonHeader, IonContent, IonTitle, IonButtons, IonButton, IonToolbar, IonList, IonItem, IonSelect, IonSelectOption, IonToggle, IonLabel, IonInput, IonNote } from '@ionic/vue';
    import { useUIStore } from '@/stores/ui'

    const props = defineProps(['habitCategories'])

    const UI = useUIStore()
    const habit = ref(null)
    const measurable = ref(false)

    function onModalClose(){
        console.log('modal closing...');
        UI.setAddEditHabitModalOpened(false);
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log('form submitted...');
    }

    function toggleMeasurable(){
        measurable.value = ! measurable.value;
    }

    console.log('props.habitCategories', props.habitCategories);
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
                    <form v-on:submit="handleSubmit">
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
                        ></IonInput>
                        <!-- { errors.name && <IonBadge color="danger">Required</IonBadge> } -->
                    </IonItem>
                    <IonItem class='addHabitFormItem'>
                        <IonSelect 
                            label="Habit Category" 
                            placeholder="Choose category"
                        >
                            <IonSelectOption v-for="category in props.habitCategories" key="category.id" value="category.id">{{ category.name }}</IonSelectOption>
                        </IonSelect>
                        <!-- { errors.category_id && <IonBadge color="danger">Required</IonBadge> } -->
                    </IonItem>
                    <IonItem class='addHabitFormItem'>
                        <IonToggle
                            :checked="measurable" 
                            @ion-change="toggleMeasurable"
                        >
                            <IonLabel>Is habit Measurable?</IonLabel>
                            <IonNote color="medium">(leave unchecked for "Yes / No")</IonNote>
                        </IonToggle>
                    </IonItem>
                    <template v-if="measurable">
                        <IonItem class='addHabitFormItem'>
                            <IonLabel>Goal</IonLabel>
                            <IonInput
                                class="text-input" 
                                placeholder="Enter quantity"
                                slot="end"
                            ></IonInput>
                            <!-- { errors.goal && <IonBadge color="danger">Required</IonBadge> } -->
                        </IonItem>
                        <IonItem class='addHabitFormItem'>
                            <IonSelect 
                                label="Habit Unit" 
                                placeholder="Choose unit"
                            >
                                <IonSelectOption v-for="unit in UI.habitUnits" key="unit.id" value="unit.id">{{ unit.name }}</IonSelectOption>
                            </IonSelect>
                            <!-- { errors.unit_id && <IonBadge color="danger">Required</IonBadge> } -->
                        </IonItem>
                    </template>
                    <IonItem class='submitItem'>
                        <IonButton
                            type="submit"
                            size='large'
                            class="submitAddEditHabit"
                        >{{ habit == null ? 'Create' : 'Update' }}</IonButton>
                    </IonItem>
                    </form>
                </IonList>
        </IonContent>
    </IonModal>
</template>