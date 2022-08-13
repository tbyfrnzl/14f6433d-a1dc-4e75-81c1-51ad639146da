<template>
  <v-card class="event_card__card">
    <v-card-title class="event_card__title">{{ event.title }}</v-card-title>
    <v-img :src="event.flyerFront" height="400"></v-img>
    <v-card-text>
      <p class="text-body-1 text--primary font-weight-bold">
        <font-awesome-icon icon="location-dot" color="darkblue" />
        <a target="_blank" :href="mapsUrl">{{ event.venue.name }}</a>
      </p>
      <p class="text-body-2 text--primary">
        Starts: {{ getTimeString(event.startTime) }}
      </p>
      <p class="text-body-2 text--primary">
        Ends: {{ getTimeString(event.endTime) }}
      </p>
    </v-card-text>
    <v-card-actions>
      <v-col class="text-right">
        <v-btn fab color="primary" elevation="2" small @click="addToCart(event)">
          <font-awesome-icon size="lg" icon="plus" />
        </v-btn>
      </v-col>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapStores } from 'pinia'
import { useCartStore } from '../store/cartStore'
import { useEventStore } from '../store/eventStore'

export default {
  name: 'Event',
  props: {
    event: {
      required: true,
      type: Object
    }
  },
  methods: {
    getTimeString (time) {
      const date = new Date(time)

      // Pad result of get functions for seconds and minutes with zeros when < 10
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')

      return `${date.getDate()}.${
        date.getMonth() + 1
      }.${date.getFullYear()}, ${date.getHours()}:${minutes}:${seconds}`
    },
    addToCart (event) {
      // Store item in list of items in cart
      this.cartStore.add(event)
      // Remove event from the list --> remove from store
      this.eventsStore.markAsAdded(event)

      // Show some snackbar with undo button ?
    }
  },
  computed: {
    ...mapStores(useCartStore, useEventStore),
    // The API returns the same link for all venues no matter the name, therefore build our own link for each venue.
    mapsUrl () {
      // Link looks like https://www.google.com/maps/dir//Colour+Factory+london
      const searchLocation = this.event.venue.name
        .toString()
        .trim()
        .replace(/\s/g, '+')

      return `https://www.google.com/maps/dir//${searchLocation}+london`
    }
  }
}
</script>

<style>
.event_card__card {
  width: 400px;
}

.event_card__title {
  height: 100px;
}
</style>
