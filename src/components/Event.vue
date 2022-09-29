<template>
  <v-card class="event-card">
    <v-card-title class="event-card__title">{{ event.title }}</v-card-title>
    <v-img :src="getRandomEventImage()" height="400" v-on:error="event.flyerFront ='https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'"/>
    <v-card-text class="event-card__content">
      <p class="text-body-1 font-weight-bold event-card__location">
        <font-awesome-icon icon="location-dot" color="teal" class="event-card__location-icon" />
        <a target="_blank" :href="mapsUrl" class="event-card__location-link">{{ event.venue.name }}</a>
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
        <v-btn fab color="teal darken-3" elevation="2" small @click="addToCart(event)">
          <font-awesome-icon color="white" size="lg" icon="plus" />
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
    getEventImage () {
      if (this.event.flyerFront !== null) return this.event.flyerFront
      else {
        if (this.event.images.length > 0) {
          return this.event.images[0].filename
        } else {
          return 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'
        }
      }
    },
    getRandomEventImage () {
      const images = []

      if (!!this.event.flyerFront) images.push(this.event.flyerFront)

      if (this.event.images.length > 0) {
        this.event.images.forEach(i => images.push(i.filename))
      }

      if (images.length === 0) {
        return 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'
      } else {
        const random = Math.floor(Math.random() * (images.length - 1))

        return images[random]
      }
    },
    getTimeString (time) {
      if (time === undefined) {
        return 'N/A'
      }

      const date = new Date(time)

      // Pad result of get functions for seconds and minutes with zeros when < 10
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')

      return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}, ${date.getHours()}:${minutes}:${seconds}`
    },
    addToCart (event) {
      this.cartStore.addEvent(event)
      this.eventsStore.markAsAdded(event, true)
    }
  },
  computed: {
    ...mapStores(useCartStore, useEventStore),
    // The API returns the same link for all venues no matter the name, therefore build our own link for each venue.
    mapsUrl () {
      // Link returned from API looks like https://www.google.com/maps/dir//Colour+Factory+london
      const searchLocation = this.event.venue.name
        .toString()
        .trim()
        .replace(/\s/g, '+')

      return `https://www.google.com/maps/dir//${searchLocation}+${this.event.city}`
    }
  }
}
</script>

<style lang="less">
.event-card {
  &__title {
    height: 120px;
  }

  &__content {
    .event-card__location {
        &-icon {
            margin-right: 5px;
        }

        &-link {
            color: #0A000A;
            text-decoration: none;
        }
    }
  }
}
</style>
