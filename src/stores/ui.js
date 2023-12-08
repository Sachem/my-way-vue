import { defineStore } from 'pinia'

export const useUIStore = defineStore('UI', {
    state: () => {
        return { 
            addEditHabitModalOpened: false,
            habitUnits: [
                {
                    id: 1,
                    name: "sets"
                },
                {
                    id: 2,
                    name: "reps"
                },
                {
                    id: 3,
                    name: "minutes"
                },
                {
                    id: 3,
                    name: "kilometers"
                },
            ]
        }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        setAddEditHabitModalOpened(isOpen) {
            this.addEditHabitModalOpened = isOpen;
        },
    },
})