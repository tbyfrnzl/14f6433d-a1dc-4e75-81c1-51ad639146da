<template>
    <v-container app>
        <h1 class="mb-5">Public Events</h1>
        <section v-for="(day) in events" :key="day.day">
            <h2 class="mb-3 mt-3 event-section__header" >{{getDateString(day.day).toUpperCase()}}</h2>
            <v-row>
                <v-col cols="4" v-for="(event) in day.events" :key="event._id">
                  <Event :event="event.details" />
                </v-col>
            </v-row>
        </section>
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

<style lang="less">
.event-section__header {
  position: sticky;
  position: -webkit-sticky;
  top: 64px;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.795);
}
</style>
