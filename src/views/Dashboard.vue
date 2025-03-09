<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">MMA Fighter Statistics Dashboard</h1>
      </v-col>
    </v-row>

    <!-- Stats Cards Row -->
    <v-row>
      <!-- Total Fighters Card -->
      <v-col cols="12" sm="6" md="4">
        <v-card class="mb-4" color="primary" dark>
          <v-card-title class="text-h5">
            {{ fighters.length }}
            <v-icon class="ml-2">mdi-account-group</v-icon>
          </v-card-title>
          <v-card-subtitle>Total Fighters</v-card-subtitle>
        </v-card>
      </v-col>

      <!-- Total Wins Card -->
      <v-col cols="12" sm="6" md="4">
        <v-card class="mb-4" color="success" dark>
          <v-card-title class="text-h5">
            {{ totalWins }}
            <v-icon class="ml-2">mdi-trophy</v-icon>
          </v-card-title>
          <v-card-subtitle>Total Wins</v-card-subtitle>
        </v-card>
      </v-col>

      <!-- Total Matches Card -->
      <v-col cols="12" sm="6" md="4">
        <v-card class="mb-4" color="info" dark>
          <v-card-title class="text-h5">
            {{ totalMatches }}
            <v-icon class="ml-2">mdi-mixed-martial-arts</v-icon>
          </v-card-title>
          <v-card-subtitle>Total Matches</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <!-- Fighters Table -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <DataTable
            :headers="headers"
            :items="fighters"
            :loading="loading"
            title="Fighters"
            show-custom-header
            enable-row-click
            @update:search="searchUpdated"
            @click:row="(event, item) => navigateToFighter(item.id)"
          >
            <template v-slot:item.wins="{ item }">
              <span class="text-success font-weight-bold">{{ item.wins }}</span>
            </template>
            <template v-slot:item.losses="{ item }">
              <span class="text-error">{{ item.losses }}</span>
            </template>
          </DataTable>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFighters } from '@/composables/useFighters'
import DataTable from '@/components/common/DataTable.vue'

const router = useRouter()
const { fighters, loading, error, fetchFighters, totalWins, totalMatches } = useFighters()

// Headers for the data table
const headers = [
  { title: 'Name', key: 'name' },
  { title: 'Wins', key: 'wins' },
  { title: 'Losses', key: 'losses' },
]

// Function to navigate to fighter profile
const navigateToFighter = (fighterId) => {
  router.push({ name: 'fighter-profile', params: { id: fighterId } })
}

// Fetch fighters when component mounts
onMounted(() => {
  fetchFighters()
})
</script>

<style scoped>
.text-success {
  color: #4caf50 !important;
}

.text-error {
  color: #f44336 !important;
}
</style>
