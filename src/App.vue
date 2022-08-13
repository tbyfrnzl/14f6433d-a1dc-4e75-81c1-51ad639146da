<template>
  <v-app>
    <Header />
    <v-main>
      <EventList/>
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header.vue'
import EventList from './components/EventList.vue'

export default {
  name: 'App',

  components: {
    Header,
    EventList
  }
}
</script>
