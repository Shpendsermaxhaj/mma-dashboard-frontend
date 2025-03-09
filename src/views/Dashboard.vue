<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">MMA Fighter Statistics Dashboard</h1>
      </v-col>
    </v-row>

    <!-- Stats Cards Row -->
    <v-row>
      <v-col cols="12" sm="6" md="4" v-for="(stat, index) in statsCards" :key="index">
        <StatsCard :title="stat.title" :value="stat.value" :color="stat.color" :icon="stat.icon" />
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
            :debounce-delay="UI_CONSTANTS.DEBOUNCE_DELAY"
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
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFighters } from '@/composables/useFighters'
import DataTable from '@/components/common/DataTable.vue'
import StatsCard from '@/components/common/StatsCard.vue'
import { UI_CONSTANTS } from '@/config/constants'

const router = useRouter()
const { fighters, loading, error, fetchFighters, totalWins, totalMatches } = useFighters()

// Create a computed property for stats cards data
const statsCards = computed(() => [
  {
    title: 'Total Fighters',
    value: fighters.value.length,
    color: 'primary',
    icon: 'mdi-account-group',
  },
  {
    title: 'Total Wins',
    value: totalWins.value,
    color: 'success',
    icon: 'mdi-trophy',
  },
  {
    title: 'Total Matches',
    value: totalMatches.value,
    color: 'info',
    icon: 'mdi-mixed-martial-arts',
  },
])

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
