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
    }
  }
})
