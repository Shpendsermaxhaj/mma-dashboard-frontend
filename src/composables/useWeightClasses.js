import { ref, computed } from 'vue'

export function useWeightClasses(fightersRef) {
  const selectedWeightClass = ref(null)

  // Extract unique weight classes from fighters
  const availableWeightClasses = computed(() => {
    if (!fightersRef.value || !fightersRef.value.length) return []

    const weightClasses = new Set()
    fightersRef.value.forEach((fighter) => {
      if (fighter.weightClass) {
        weightClasses.add(fighter.weightClass)
      }
    })

    return Array.from(weightClasses).sort()
  })

  // Filtered fighters by weight class
  const filteredFighters = computed(() => {
    if (!selectedWeightClass.value) return fightersRef.value
    return fightersRef.value.filter((fighter) => fighter.weightClass === selectedWeightClass.value)
  })

  // Set weight class filter
  const setWeightClass = (weightClass) => {
    selectedWeightClass.value = weightClass
  }

  // Clear weight class filter
  const clearWeightClassFilter = () => {
    selectedWeightClass.value = null
  }

  return {
    selectedWeightClass,
    availableWeightClasses,
    filteredFighters,
    setWeightClass,
    clearWeightClassFilter,
  }
}
