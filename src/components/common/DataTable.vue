<template>
  <div>
    <v-card-title v-if="showCustomHeader" class="table-header d-flex align-center">
      <span>{{ title }}</span>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchInput"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        :color="searchTextColor"
        density="compact"
        style="max-width: 250px"
        class="ml-4"
      ></v-text-field>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="items"
      :search="debouncedSearch"
      :class="tableClasses"
      density="compact"
      mobile-breakpoint="600"
      :items-per-page="itemsPerPage"
      :items-per-page-options="itemsPerPageOptions"
      :loading="loading"
      loading-text="Loading data..."
      no-data-text="No data found"
      @click:row="handleRowClick"
    >
      <template v-if="!showCustomHeader" v-slot:top>
        <v-toolbar flat :color="toolbarColor">
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="searchInput"
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

      <!-- Pass through all custom slots -->
      <template v-for="(_, slotName) in $slots" v-slot:[slotName]="slotData">
        <slot :name="slotName" v-bind="slotData"></slot>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
import { useDebounce } from '@/composables/useDebounce'
import { UI_CONSTANTS } from '@/config/constants'

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
    loading: {
      type: Boolean,
      default: false,
    },
    showCustomHeader: {
      type: Boolean,
      default: false,
    },
    searchTextColor: {
      type: String,
      default: 'white',
    },
    enableRowClick: {
      type: Boolean,
      default: true,
    },
    customClass: {
      type: String,
      default: '',
    },
    debounceDelay: {
      type: Number,
      default: UI_CONSTANTS.DEBOUNCE_DELAY,
    },
    initialSearch: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const searchInput = ref(props.initialSearch)
    const itemsPerPage = ref(5)
    const itemsPerPageOptions = [5, 10, 15, 20]

    // Use the debounce composable
    const { debounce } = useDebounce({ delay: props.debounceDelay })
    const debouncedSearch = debounce(searchInput)

    // Emit search changes
    watch(debouncedSearch, (newValue) => {
      emit('update:search', newValue)
    })

    // Combine classes
    const tableClasses = computed(() => {
      return ['elevation-1', props.enableRowClick ? 'clickable-rows' : '', props.customClass]
        .filter(Boolean)
        .join(' ')
    })

    const handleRowClick = (event, { item }) => {
      if (props.enableRowClick) {
        emit('click:row', event, item)
      }
    }

    return {
      searchInput,
      debouncedSearch,
      itemsPerPage,
      itemsPerPageOptions,
      tableClasses,
      handleRowClick,
    }
  },
}
</script>

<style scoped>
.table-header {
  background-color: #1976d2;
  color: white;
}

.clickable-rows :deep(tbody tr) {
  cursor: pointer;
  transition: background-color 0.2s;
}

.clickable-rows :deep(tbody tr:hover) {
  background-color: #f5f5f5;
}
</style>
