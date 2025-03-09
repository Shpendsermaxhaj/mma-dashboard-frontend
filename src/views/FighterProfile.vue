<template>
  <v-container>
    <v-row v-if="loading">
      <v-col>
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
        <span class="ml-2">Loading fighter data...</span>
      </v-col>
    </v-row>

    <v-row v-else-if="error">
      <v-col>
        <v-alert type="error">{{ error }}</v-alert>
      </v-col>
    </v-row>

    <template v-else-if="fighter">
      <v-row>
        <v-col cols="12">
          <v-btn prepend-icon="mdi-arrow-left" variant="text" @click="$router.back()">
            Back to Dashboard
          </v-btn>
        </v-col>
      </v-row>

      <fighter-detail :fighter="fighter" :show-round="true" :max-fights="5" />
    </template>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useFighters } from '@/composables/useFighters'
import FighterDetail from '@/components/FighterDetail.vue'

const route = useRoute()
const { fetchFighterById, loading, error } = useFighters()
const fighter = ref(null)

const fetchFighter = async () => {
  console.log('FighterProfile: Fetching fighter data...')
  const fighterId = route.params.id
  console.log(`Fighter ID from route: ${fighterId}`)
  const data = await fetchFighterById(fighterId)
  fighter.value = data
}

onMounted(() => {
  console.log('FighterProfile component mounted')
  fetchFighter()
})
</script>
