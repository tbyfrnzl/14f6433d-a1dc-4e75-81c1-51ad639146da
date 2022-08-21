<template>
  <v-container>
    <v-row>
      <v-col sm="8">
        <v-autocomplete
          color="teal"
          item-color="teal darken-1"
          v-model="eventsStore.filterByVenues"
          label="Select venues"
          :items="venues"
          item-text="name"
          multiple
          filled
          dense
        />
      </v-col>
      <v-col sm="2" class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on" color="teal darken-3">
              Group by
            </v-btn>
          </template>

          <v-list>
            <v-list-item-group v-model="eventsStore.groupBy" mandatory>
            <v-list-item v-for="(key, i) in groupOptions" :key="i" :value="key">
              <v-list-item-title>{{ key }}</v-list-item-title>
            </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </v-col>

      <v-col sm="2" class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on" color="teal darken-3">
              Sort
            </v-btn>
          </template>

          <v-list>
            <v-list-item-group v-model="eventsStore.sort" mandatory>
            <v-list-item v-for="(key, i) in sortOptions" :key="i" :value="key">
              <v-list-item-title>{{ key  }}</v-list-item-title>
            </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapStores } from 'pinia'
import { useEventStore, GroupOptions, SortOptions } from '../store/eventStore'

export default {
  name: 'Filters',
  computed: {
    ...mapStores(useEventStore),
    venues () {
      return this.eventsStore.getVenues
    }
  },
  mounted () {
    this.groupOptions = GroupOptions
    this.sortOptions = SortOptions
  },
  data () {
    return {
      groupOptions: {},
      sortOptions: {}
    }
  }
}
</script>
