<template>
  <v-app-bar app color="teal darken-4" dark elevation="2">
    <v-text-field
      v-model="eventsStore.search"
      placeholder="Events durchsuchen"
      dense
      hide-details
      filled
    >
      <font-awesome-icon icon="magnifying-glass" size="sm" slot="prepend-inner" />
    </v-text-field>

    <v-spacer></v-spacer>

    <v-dialog v-model="cartOpen" width="800">
      <v-card>
        <v-card-title>Warenkorb ({{items}})</v-card-title>
        <v-card-text>
          <CartItem v-for="item in cartItems" :item="item" :key="item._id"/>
          <div v-if="cartItems.length === 0">Es befinden sich derzeit keine Events in deinem Warenkorb. <br />Um ein Event hinzuzufügen, wähle ein Event aus der Liste aus und klicke den "+"-Button.</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="teal darken-3" text
            @click="cartOpen=false">
            Schließen
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
