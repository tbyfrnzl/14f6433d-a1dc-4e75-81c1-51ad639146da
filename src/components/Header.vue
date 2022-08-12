<template>
    <v-app-bar app color="primary" dark elevation="2">
        <v-text-field
            v-model="search" @input="$emit('search-events', search)"
            placeholder="Events durchsuchen"
            dense hide-details filled>
            <!-- <font-awesome-icon icon="magnifying-glass" size="sm" slot="prepend-inner" /> -->
        </v-text-field>

        <v-spacer></v-spacer>

        <!-- https://vuetifyjs.com/en/components/badges/ -->
        <v-badge :content="itemCount" :value="itemCount" color="red">
            <font-awesome-icon size="lg" icon="cart-shopping"></font-awesome-icon>
        </v-badge>
    </v-app-bar>
</template>

<script>
export default {
  name: 'Header',
  props: ['itemCount'],
  data () {
    return {
      search: ''
    }
  }
}
</script>
