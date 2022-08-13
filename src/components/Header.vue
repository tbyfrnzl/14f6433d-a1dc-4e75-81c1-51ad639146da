<template>
  <v-app-bar app color="grey darken-3" dark elevation="2">
    <v-text-field
      v-model="eventsStore.search"
      placeholder="Events durchsuchen"
      dense
      hide-details
      filled
    >
      <!-- <font-awesome-icon icon="magnifying-glass" size="sm" slot="prepend-inner" /> -->
    </v-text-field>

    <v-spacer></v-spacer>

    <!-- https://vuetifyjs.com/en/components/badges/ -->
    <v-dialog v-model="cartOpen" width="400">
      <v-card>
        <v-card-title>Deine Events</v-card-title>
        <v-card-text>
          {{cartItems}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey darken-1"
            text
            @click="cartOpen=false"
          >
            Warenkorb schließen
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-badge :content="items" :value="items" color="red" @click.native="cartOpen=true">
      <font-awesome-icon size="lg" icon="cart-shopping"></font-awesome-icon>
    </v-badge>

  </v-app-bar>
</template>

<script>
import { mapStores } from 'pinia'
import { useCartStore } from '../store/cartStore'
import { useEventStore } from '../store/eventStore'

export default {
  name: 'Header',
  computed: {
    ...mapStores(useCartStore, useEventStore),
    items: function () {
      return this.cartStore.items
    },
    cartItems () {
      return this.cartStore.events
    }
  },
  data () {
    return {
      search: '',
      cartOpen: false
    }
  }
}
</script>
