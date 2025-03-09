<template>
  <div>
    <v-row>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>Fighter Statistics</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" md="4" v-for="(stat, index) in fighterStats" :key="index">
                <StatsCard
                  :title="stat.title"
                  :value="stat.value"
                  :color="stat.color"
                  class="text-center"
                />
              </v-col>
            </v-row>

            <v-row v-if="showStats && fighter.stats">
              <v-col cols="12">
                <h3 class="text-h6 mb-2">Performance Stats</h3>
                <v-row>
                  <v-col cols="12" sm="6" md="4" v-for="(value, key) in fighter.stats" :key="key">
                    <StatsCard
                      :title="formatStatName(key)"
                      :value="value"
                      class="text-center pa-2"
                    />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import StatsCard from '@/components/common/StatsCard.vue'

const props = defineProps({
  fighter: {
    type: Object,
    required: true,
  },
  showRound: {
    type: Boolean,
    default: false,
  },
  enableOpponentLinks: {
    type: Boolean,
    default: true,
  },
  maxFights: {
    type: Number,
    default: 5,
  },
  showStats: {
    type: Boolean,
    default: true,
  },
})

const showAllFights = ref(false)

const fighterStats = computed(() => [
  {
    title: 'Wins',
    value: props.fighter.wins || 0,
    color: 'success',
  },
  {
    title: 'Losses',
    value: props.fighter.losses || 0,
    color: 'error',
  },
  {
    title: 'Draws',
    value: props.fighter.draws || 0,
    color: 'info',
  },
])

const formatStatName = (key) => {
  // Convert camelCase to Title Case with spaces
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())
}
</script>

<style scoped>
.text-success {
  color: #4caf50 !important;
}

.text-error {
  color: #f44336 !important;
}
</style>
