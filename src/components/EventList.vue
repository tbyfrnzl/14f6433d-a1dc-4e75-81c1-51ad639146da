<template>
    <v-container app>
        <h1 class="mb-5">Events in London ({{ eventCount }})</h1>
        <Filters />
        <section v-for="group in events" :key="group.group">
            <h2 class="mb-3 mt-3 event-list__section-header" >{{ getHeading(group.group) }}</h2>
            <v-row>
                <v-col cols="4" v-for="(event) in group.events" :key="event._id">
                  <Event :event="event.details" />
                </v-col>
            </v-row>
        </section>
        <div v-if="eventCount === 0" class="event-list__loading-indicator">
          <font-awesome-icon icon="spinner" class="fa-spin" />
          Loading events
        </div>
    </v-container>
</template>

<script>
import Event from './Event.vue'
import { mapStores } from 'pinia'
import { GroupOptions, useEventStore } from '../store/eventStore'
import Filters from './Filters.vue'

export default {
  name: 'EventList',
  components: {
    Event,
    Filters
  },
  computed: {
    ...mapStores(useEventStore),

    events () {
      return this.eventsStore.getFilteredEvents
    },
    eventCount () {
      if (this.events === undefined) return 0
      return this.events.flatMap(e => e.events).length
    }
  },
  mounted () {
    this.eventsStore.fetchEvents()
  },
  methods: {
    getHeading (item) {
      if (this.eventsStore.groupBy === GroupOptions.DATE) {
        const date = new Date(item)

        return date.toDateString().toUpperCase()
      } else {
        return item.toUpperCase()
      }
    }
  }
}
</script>

<style lang="less">
.event-list {
  &__loading-indicator {
    font-size: 1.5rem;
    text-align: center;
  }

  &__section-header {
    position: sticky;
    position: -webkit-sticky;
    top: 64px;
    z-index: 2;
    background-color: rgba(255, 255, 255, 0.8);
  }
}
</style>
