<template>
  <v-app-bar app color="teal darken-4" dark elevation="2">
    <v-text-field
      v-model="eventsStore.search"
      placeholder="Search events..."
      dense
      hide-details
      filled
      class="shrink"
    >
      <font-awesome-icon icon="magnifying-glass" size="sm" slot="prepend-inner" />
    </v-text-field>

    <v-spacer></v-spacer>

    <v-dialog v-model="cartOpen" width="800">
      <v-card>
        <v-card-title>Cart ({{items}})</v-card-title>
        <v-card-text>
          <CartItem v-for="item in cartItems" :item="item" :key="item._id"/>
          <div v-if="cartItems.length === 0">There are currently no events in your cart. <br />To add an event to your cart, select one from the list and click the "+" button.</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="teal darken-3" text
            @click="cartOpen=false">
            Close cart
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-badge :content="items" :value="items" color="red lighten-1" @click.native="cartOpen=true">
      <font-awesome-icon size="lg" icon="cart-shopping"></font-awesome-icon>
    </v-badge>

  </v-app-bar>
</template>

<script>
import CartItem from './CartItem.vue'
import { mapStores } from 'pinia'
import { useCartStore } from '../store/cartStore'
import { useEventStore } from '../store/eventStore'

export default {
  name: 'Header',
  components: {
    CartItem
  },
  computed: {
    ...mapStores(useCartStore, useEventStore),
    items: function () {
      return this.cartStore.getEventCount
    },
    cartItems () {
      return this.cartStore.events
    }
  },
  data () {
    return {
      cartOpen: false
    }
  }
}
</script>

<style lang="less">
.v-toolbar {
  &__content {
    padding: 4px 25px;

    .v-text-field--enclosed.v-input--dense:not(.v-text-field--solo).v-text-field--single-line .v-input__prepend-inner {
      margin-top: 12px;
      margin-right: 5px;
    }

    .v-badge:hover {
      cursor: pointer;
    }
  }
}
</style>
