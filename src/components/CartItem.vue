<template>
  <div class="cart-item">
    <v-img class="cart-item__image" :src="item.flyerFront" height="200" width="350"/>
    <div class="cart-item__content">
      <h3 class="cart-item__title">{{item.title}}</h3>
      <div>
        <v-btn @click="removeFromCart(item)">Entfernen</v-btn>
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
    }
  }
}
</script>

<style lang="less">
.cart-item {
  display: flex;
  margin-bottom: 10px;
  border: 1px solid black;

  &__image {
    flex: inherit;
  }

  &__content {
    padding: 10px;
  }
}
</style>
