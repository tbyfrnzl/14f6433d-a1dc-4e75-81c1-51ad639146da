<template>
  <v-app>
    <Header
      :item-count="items"
      @search-events="logSearch"
      />
    <v-main>
      TODO: Add events list here
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',

  components: {
    Header
  },

  data: () => ({
    items: 0,
    search: ''
  }),
  methods: {
    logSearch: function (search) {
      console.log('searching for', search)
    }
  }
}
</script>
