<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :search="search"
    class="mt-6"
    density="compact"
    mobile-breakpoint="600"
    :items-per-page="itemsPerPage"
    :items-per-page-options="itemsPerPageOptions"
  >
    <template v-slot:top>
      <v-toolbar flat :color="toolbarColor">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          class="mr-4"
        ></v-text-field>
        <v-select
          v-model="itemsPerPage"
          :items="itemsPerPageOptions"
          label="Items per page"
          class="ml-4"
          style="max-width: 150px"
        ></v-select>
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'DataTable',
  props: {
    items: {
      type: Array,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      default: 'Data Table',
    },
    toolbarColor: {
      type: String,
      default: 'primary',
    },
  },
  setup() {
    const search = ref('')
    const itemsPerPage = ref(5)
    const itemsPerPageOptions = [5, 10, 15, 20]

    return {
      search,
      itemsPerPage,
      itemsPerPageOptions,
    }
  },
}
</script>
