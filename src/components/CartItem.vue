<template>
  <div class="cart-item">
    <v-img class="cart-item__image" :src="item.flyerFront" max-height="200" max-width="300"/>
    <div class="cart-item__content">
      <h3 class="cart-item__title">{{item.title}}</h3>
      <p class="text-body-1 text--primary">
        <font-awesome-icon icon="location-dot" color="teal" size="lg" />
        {{ item.venue.name }}
      </p>
      <p class="text-body-1 text--primary">
        <font-awesome-icon icon="calendar-day" color="teal" size="lg" />
        {{ getDate(item.date) }}
      </p>
      <div>
        <v-btn @click="removeFromCart(item)" plain block>
          Event entfernen
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useCartStore } from '../store/cartStore'
import { useEventStore } from '../store/eventStore'

export default {
  name: 'CartItem',
  props: ['item'],
  computed: {
    ...mapStores(useCartStore, useEventStore)
  },
  methods: {
    removeFromCart (event) {
      this.cartStore.remove(event)
      this.eventsStore.markAs(event, false)
    },
    getDate (dateOfEvent) {
      const date = new Date(dateOfEvent)
      return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    }
  }
}
</script>

<style lang="less">
.cart-item {
  display: flex;
  margin-bottom: 10px;
  background: #FFFFFF;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  &__content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 15px;
  }

  &__title {
    height: 50px;
    color: #0A000A;
  }
}
</style>
