import { defineStore } from 'pinia'

export const useEventStore = defineStore('events', {
  state: () => ({
    events: [],
    search: ''
  }),
  getters: {
    filtered (state) {
      const flatMap = state.events.flatMap(event => event.events)

      let filteredMap = flatMap.filter(e => !e.addedToCart)

      if (state.search.length > 0) {
        const filteredTitles = filteredMap.filter(e => e.details.title.toLowerCase().includes(state.search.toLowerCase()))

        filteredMap = filteredTitles
      }

      const groupedData = this.groupFlatMap(filteredMap)

      return groupedData
    }
  },
  actions: {
    async fetchEvents () {
      const response = await fetch('https://tlv-events-app.herokuapp.com/events/uk/london')

      if (!response.ok) {
        throw new Error(`An error occured loading events:  ${response.status}`)
      }

      const data = await response.json()

      // Sort
      const { compare } = Intl.Collator('de')
      data.sort((a, b) => compare(a.date, b.date))
      data.sort((a, b) => compare(a.startTime, b.startTime))

      const groupedEvents = this.groupEventsByDate(data)

      this.events = groupedEvents
    },
    groupFlatMap (events) {
      const listOfDates = events.map(e => e.details.date)

      const uniqueDates = [...new Set(listOfDates)]

      const groupedEvents = uniqueDates.map(date => {
        const eventsOnDay = events.filter(event => event.details.date === date)

        return {
          day: date,
          events: eventsOnDay
        }
      })

      return groupedEvents
    },
    groupEventsByDate (events) {
      const listOfDates = events.map(e => e.date)

      const uniqueDates = [...new Set(listOfDates)]

      const groupedEvents = uniqueDates.map(date => {
        const eventsOnDay = events
          .filter(event => event.date === date)
          .map(event => {
            return {
              details: event,
              addedToCart: false
            }
          })

        return {
          day: date,
          events: eventsOnDay
        }
      })

      return groupedEvents
    },
    markAs (event, addToCart) {
      const flattenedEvents = this.events.flatMap(event => event.events)

      const eventToAdd = flattenedEvents.find(e => e.details._id === event._id)

      eventToAdd.addedToCart = addToCart
    }
  }
})
