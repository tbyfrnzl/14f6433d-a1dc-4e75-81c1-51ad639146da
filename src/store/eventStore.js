import { defineStore } from 'pinia'

export const GroupOptions = {
  DATE: 'Date',
  VENUE: 'Venue'
}

export const SortOptions = {
  ASC: 'Ascending',
  DESC: 'Descending'
}

export const useEventStore = defineStore('events', {
  state: () => ({
    events: [],
    search: '',
    filterByVenues: [],
    groupBy: GroupOptions.DATE,
    sort: SortOptions.ASC
  }),
  getters: {
    getFilteredEvents (state) {
      const flatMap = state.events.flatMap(event => event.events)

      let filteredMap = flatMap.filter(e => !e.addedToCart)

      if (state.search.length > 0) {
        const filteredTitles = filteredMap.filter(e => e.details.title.toLowerCase().includes(state.search.toLowerCase()))

        filteredMap = filteredTitles
      }

      if (state.filterByVenues.length > 0) {
        const filteredVenues = filteredMap.filter(e => state.filterByVenues.indexOf(e.details.venue.name) > -1)
        filteredMap = filteredVenues
      }

      const sorted = this.sortEvents(filteredMap, false)

      const groupedData = this.groupEventsBy(sorted, state.groupBy, false)

      return groupedData
    },
    getVenues (state) {
      const unsortedEvents = state.events.flatMap(event => event.events)

      const venues = unsortedEvents.map(e => e.details.venue)

      const uniqueVenues = [...new Map(venues.map(v => [v.id, v])).values()]

      return uniqueVenues
    }
  },
  actions: {
    async fetchEvents () {
      const response = await fetch('https://tlv-events-app.herokuapp.com/events/de/berlin')

      if (!response.ok) {
        throw new Error(`An error occured loading events: ${response.status}`)
      }

      const data = await response.json()

      const sortedEvents = this.sortEvents(data, true)

      const groupedEvents = this.groupEventsBy(sortedEvents, this.groupBy, true)

      this.events = groupedEvents
    },
    sortEvents (events, initial) {
      let sortedEvents
      const { compare } = Intl.Collator('en')

      if (this.groupBy === GroupOptions.DATE) {
        if (this.sort === SortOptions.ASC) {
          sortedEvents = events.sort((a, b) => {
            const dateA = initial ? a.startTime : a.details.startTime
            const dateB = initial ? b.startTime : b.details.startTime

            return compare(dateA, dateB)
          })

          return sortedEvents
        } else {
          sortedEvents = events.sort(function (a, b) {
            const eventA = initial ? a : a.details
            const eventB = initial ? b : b.details

            return compare(eventB.date, eventA.date) || compare(eventA.startTime, eventB.startTime)
          })

          return sortedEvents
        }
      } else if (this.groupBy === GroupOptions.VENUE) {
        sortedEvents = events.sort((a, b) => {
          const venueA = initial ? a.venue.name : a.details.venue.name
          const venueB = initial ? b.venue.name : b.details.venue.name

          return compare(venueA, venueB)
        })

        return this.sort === SortOptions.ASC ? sortedEvents : sortedEvents.reverse()
      }
    },
    groupEventsBy (events, groupOption, initial) {
      if (events.length === 0) return

      const list = events.map(e => {
        if (groupOption === GroupOptions.DATE) {
          return initial ? e.date : e.details.date
        } else if (groupOption === GroupOptions.VENUE) {
          return initial ? e.venue.name : e.details.venue.name
        }
      })

      const uniqueList = [...new Set(list)]

      const groupedEvents = uniqueList.map(item => {
        let eventsInGroup = events.filter(e => {
          if (groupOption === GroupOptions.DATE) {
            return initial ? e.date === item : e.details.date === item
          } else if (groupOption === GroupOptions.VENUE) {
            return initial ? e.venue.name === item : e.details.venue.name === item
          }
        })

        if (initial) {
          eventsInGroup = eventsInGroup.map(event => {
            return {
              details: event,
              addedToCart: false
            }
          })
        }

        return {
          group: item,
          events: eventsInGroup
        }
      })

      return groupedEvents
    },
    markAsAdded (event, addToCart) {
      const flattenedEvents = this.events.flatMap(event => event.events)

      const eventToAdd = flattenedEvents.find(e => e.details._id === event._id)

      eventToAdd.addedToCart = addToCart
    }
  }
})
