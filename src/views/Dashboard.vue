<template>
  <v-container>
    <h1 class="text-h4 font-weight-bold mb-4 text-center">MMA Stats Dashboard</h1>

    <v-row>
      <v-col cols="12" sm="6" md="4" v-for="stat in statsData" :key="stat.title">
        <stats-card :title="stat.title" :value="stat.value" :color="stat.color" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <data-table :items="fighters" :headers="tableHeaders" title="Fighter Statistics" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { onMounted, computed } from 'vue'
import { useFighters } from '@/composables/useFighters'
import DataTable from '@/components/common/DataTable.vue'
import StatsCard from '@/components/common/StatsCard.vue'

export default {
  components: {
    DataTable,
    StatsCard,
  },
  setup() {
    const { fighters, fetchFighters, totalWins, totalMatches } = useFighters()

    const statsData = computed(() => [
      {
        title: 'Total Fighters',
        value: fighters.value.length,
        color: 'primary',
      },
      {
        title: 'Total Wins',
        value: totalWins.value,
        color: 'green',
      },
      {
        title: 'Total Matches',
        value: totalMatches.value,
        color: 'orange',
      },
    ])

    const tableHeaders = [
      { title: 'Name', key: 'name' },
      { title: 'Wins', key: 'wins' },
      { title: 'Losses', key: 'losses' },
      { title: 'KOs', key: 'kos' },
      { title: 'Submissions', key: 'submissions' },
    ]

    onMounted(() => {
      fetchFighters()
    })

    return {
      fighters,
      statsData,
      tableHeaders,
    }
  },
}
</script>
