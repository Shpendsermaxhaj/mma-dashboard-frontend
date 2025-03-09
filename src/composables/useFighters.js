import { ref, computed, onMounted } from 'vue'
import { getFighters, getFighterById } from '@/api'

export function useFighters() {
  const fighters = ref([])
  const selectedFighter = ref(null)
  const loading = ref(false)
  const error = ref(null)
  // Fetch all fighters
  const fetchFighters = async () => {
    loading.value = true

    try {
      const response = await getFighters()
      fighters.value = response.data
    } catch (err) {
      console.error('Error fetching fighters:', err)
      error.value = 'Failed to load data'
    } finally {
      loading.value = false
    }
  }

  // Fetch a single fighter by ID
  const fetchFighterById = async (id) => {
    loading.value = true
    error.value = null

    try {
      const response = await getFighterById(id)
      selectedFighter.value = response.data
      return response.data
    } catch (err) {
      console.error(`Error fetching fighter with ID ${id}:`, err)
      error.value = 'Failed to load fighter details. Please try again later.'
      return null
    } finally {
      loading.value = false
    }
  }
  // Statistics calculations
  const totalWins = computed(() => {
    return fighters.value.reduce((acc, fighter) => acc + (fighter.wins || 0), 0)
  })

  const totalMatches = computed(() => {
    return fighters.value.reduce((acc, fighter) => {
      return acc + (fighter.wins || 0) + (fighter.losses || 0) + (fighter.draws || 0)
    }, 0)
  })

  // Fighter sorting and filtering
  const sortFightersByWins = () => {
    fighters.value = [...fighters.value].sort((a, b) => (b.wins || 0) - (a.wins || 0))
  }

  const filterByWeightClass = (weightClass) => {
    if (!weightClass) return fighters.value
    return fighters.value.filter((fighter) => fighter.weightClass === weightClass)
  }

  return {
    fighters,
    selectedFighter,
    loading,
    error,
    fetchFighters,
    fetchFighterById,
    totalWins,
    totalMatches,
    sortFightersByWins,
    filterByWeightClass,
  }
}
