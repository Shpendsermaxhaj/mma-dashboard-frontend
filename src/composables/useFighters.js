import { ref, computed } from 'vue'
import api from '@/services/axios'

export function useFighters() {
  const fighters = ref([])

  const fetchFighters = async () => {
    try {
      const response = await api.get('/fighters')
      fighters.value = response.data
    } catch (error) {
      console.error('Error fetching fighters:', error)
    }
  }

  const totalWins = computed(() => fighters.value.reduce((sum, fighter) => sum + fighter.wins, 0))

  const totalMatches = computed(() =>
    fighters.value.reduce((sum, fighter) => sum + fighter.wins + fighter.losses, 0),
  )

  return {
    fighters,
    fetchFighters,
    totalWins,
    totalMatches,
  }
}
