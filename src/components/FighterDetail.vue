<template>
  <div>
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="mb-4">
          <v-card-title class="text-h4">{{ fighter.name }}</v-card-title>
          <v-card-subtitle>{{ fighter.nickname || 'No Nickname' }}</v-card-subtitle>
          <v-card-text>
            <v-list density="compact">
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-weight"></v-icon>
                </template>
                <v-list-item-title>Weight Class</v-list-item-title>
                <v-list-item-subtitle>{{ fighter.weightClass || 'Unknown' }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-map-marker"></v-icon>
                </template>
                <v-list-item-title>From</v-list-item-title>
                <v-list-item-subtitle>{{ fighter.country || 'Unknown' }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-human-male-height"></v-icon>
                </template>
                <v-list-item-title>Height</v-list-item-title>
                <v-list-item-subtitle>{{ fighter.height || 'Unknown' }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item v-if="fighter.age">
                <template v-slot:prepend>
                  <v-icon icon="mdi-calendar"></v-icon>
                </template>
                <v-list-item-title>Age</v-list-item-title>
                <v-list-item-subtitle>{{ fighter.age }} years</v-list-item-subtitle>
              </v-list-item>

              <v-list-item v-if="fighter.team">
                <template v-slot:prepend>
                  <v-icon icon="mdi-account-group"></v-icon>
                </template>
                <v-list-item-title>Team</v-list-item-title>
                <v-list-item-subtitle>{{ fighter.team }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>Fighter Statistics</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-card class="text-center" color="success" dark>
                  <v-card-title class="text-h4">{{ fighter.wins || 0 }}</v-card-title>
                  <v-card-subtitle>Wins</v-card-subtitle>
                </v-card>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-card class="text-center" color="error" dark>
                  <v-card-title class="text-h4">{{ fighter.losses || 0 }}</v-card-title>
                  <v-card-subtitle>Losses</v-card-subtitle>
                </v-card>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-card class="text-center" color="info" dark>
                  <v-card-title class="text-h4">{{ fighter.draws || 0 }}</v-card-title>
                  <v-card-subtitle>Draws</v-card-subtitle>
                </v-card>
              </v-col>
            </v-row>

            <v-divider class="my-4"></v-divider>

            <v-row v-if="winMethodsVisible">
              <v-col cols="12">
                <h3 class="text-h6 mb-2">Win Methods</h3>
                <v-row>
                  <v-col v-if="fighter.koTKO" cols="12" sm="6" md="4">
                    <v-card class="text-center pa-2">
                      <div class="text-h5">{{ fighter.koTKO }}</div>
                      <div class="text-caption">KO/TKO</div>
                    </v-card>
                  </v-col>
                  <v-col v-if="fighter.submission" cols="12" sm="6" md="4">
                    <v-card class="text-center pa-2">
                      <div class="text-h5">{{ fighter.submission }}</div>
                      <div class="text-caption">Submission</div>
                    </v-card>
                  </v-col>
                  <v-col v-if="fighter.decision" cols="12" sm="6" md="4">
                    <v-card class="text-center pa-2">
                      <div class="text-h5">{{ fighter.decision }}</div>
                      <div class="text-caption">Decision</div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row v-if="fighter.fightHistory && fighter.fightHistory.length">
              <v-col cols="12">
                <h3 class="text-h6 mb-2">Recent Fights</h3>
                <v-table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Opponent</th>
                      <th>Result</th>
                      <th>Method</th>
                      <th v-if="showRound">Round</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(fight, index) in displayFightHistory" :key="index">
                      <td>{{ fight.date }}</td>
                      <td>
                        <router-link
                          v-if="fight.opponentId && enableOpponentLinks"
                          :to="{ name: 'fighter-profile', params: { id: fight.opponentId } }"
                        >
                          {{ fight.opponent }}
                        </router-link>
                        <template v-else>{{ fight.opponent }}</template>
                      </td>
                      <td :class="getResultClass(fight.result)">{{ fight.result }}</td>
                      <td>{{ fight.method }}</td>
                      <td v-if="showRound">{{ fight.round || 'N/A' }}</td>
                    </tr>
                  </tbody>
                </v-table>

                <div v-if="fighter.fightHistory.length > maxFights" class="text-center mt-2">
                  <v-btn size="small" variant="text" @click="showAllFights = !showAllFights">
                    {{ showAllFights ? 'Show Less' : 'Show All Fights' }}
                  </v-btn>
                </div>
              </v-col>
            </v-row>

            <v-row v-if="showStats && fighter.stats">
              <v-col cols="12">
                <h3 class="text-h6 mb-2">Performance Stats</h3>
                <v-row>
                  <v-col cols="12" sm="6" md="4" v-for="(value, key) in fighter.stats" :key="key">
                    <v-card class="text-center pa-2">
                      <div class="text-h5">{{ value }}</div>
                      <div class="text-caption">{{ formatStatName(key) }}</div>
                    </v-card>
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

const displayFightHistory = computed(() => {
  if (!props.fighter.fightHistory) return []

  return showAllFights.value
    ? props.fighter.fightHistory
    : props.fighter.fightHistory.slice(0, props.maxFights)
})

const winMethodsVisible = computed(() => {
  const fighter = props.fighter
  return fighter.koTKO || fighter.submission || fighter.decision
})

const getResultClass = (result) => {
  if (!result) return ''

  const lowerResult = result.toLowerCase()
  if (lowerResult.includes('win')) return 'text-success'
  if (lowerResult.includes('loss')) return 'text-error'
  return ''
}

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
