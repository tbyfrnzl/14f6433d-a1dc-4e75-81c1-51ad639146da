import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    events: []
  }),
  getters: {
    getEventCount: (state) => state.events.length
  },
  actions: {
    addEvent (event) {
      this.events.push(event)
    },
    removeEvent (event) {
      const index = this.events.findIndex(e => e._id === event._id)

      if (index > -1) {
        this.events.splice(index, 1)
      }
    }
  }
})
