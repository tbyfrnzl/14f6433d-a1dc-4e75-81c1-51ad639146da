<template>
    <v-container app>
      {{eventsStore.search}}
        <h1>Public Events</h1>
        <div v-for="(day, index) in events" :key="index">
            <h3>{{getDateString(day.day).toUpperCase()}}</h3>
            <v-row class="css-grid">
                <v-col v-for="(event, indexx) in day.events" :key="indexx">
                  <Event :event="event.details" />
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script>
import Event from './Event.vue'
import { mapStores } from 'pinia'
import { useEventStore } from '../store/eventStore'

export default {
  name: 'EventList',
  components: {
    Event
  },
  computed: {
    ...mapStores(useEventStore),

    events () {
      console.log('got events')
      return this.eventsStore.filtered
    }
  },
  mounted () {
    this.eventsStore.fetchEvents()
  },
  methods: {
    getDateString (day) {
      const date = new Date(day)

      return date.toDateString()
    }
  }
}

</script>

<style>
.css-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}
</style>
