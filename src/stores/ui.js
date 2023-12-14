import { defineStore } from 'pinia'

export const useUIStore = defineStore('UI', {
    state: () => {
        return { 
            addEditHabitModalOpened: false,
            habitCategories: [],
            habitUnits: []
        }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        setAddEditHabitModalOpened(isOpen) {
            this.addEditHabitModalOpened = isOpen;
        },
        setHabitCategories(habitCategories) {
            this.habitCategories = habitCategories;
        },
        setHabitUnits(habitUnits) {
            this.habitUnits = habitUnits;
        },
    },
})