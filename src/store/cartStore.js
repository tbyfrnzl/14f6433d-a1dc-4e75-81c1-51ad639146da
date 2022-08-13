import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    events: []
  }),
  getters: {
    items: (state) => state.events.length
  },
  actions: {
    add (event) {
      this.events.push(event)
    },
    remove (event) {
      const index = this.events.findIndex(e => e._id === event._id)

      if (index > -1) {
        this.events.splice(index, 1)
      }
    }
  }
})
