import { computed } from 'vue'

export function useFighterStats(fighter) {
  // Win percentage calculation
  const winPercentage = computed(() => {
    const total =
      (fighter.value?.wins || 0) + (fighter.value?.losses || 0) + (fighter.value?.draws || 0)

    if (!total) return 0
    return Math.round(((fighter.value?.wins || 0) * 100) / total)
  })

  // Win method distribution
  const winMethods = computed(() => {
    if (!fighter.value) return { ko: 0, submission: 0, decision: 0 }

    return {
      ko: fighter.value.koTKO || 0,
      submission: fighter.value.submission || 0,
      decision: fighter.value.decision || 0,
    }
  })

  // Get fight history sorted by date (most recent first)
  const recentFights = computed(() => {
    if (!fighter.value?.fightHistory) return []

    return [...fighter.value.fightHistory].sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })
  })

  // Win/loss streak calculation
  const currentStreak = computed(() => {
    if (!recentFights.value.length) return { type: 'none', count: 0 }

    let count = 1
    const firstResult = recentFights.value[0].result.toLowerCase()
    const isWin = firstResult.includes('win')
    const isLoss = firstResult.includes('loss')

    if (!isWin && !isLoss) return { type: 'other', count: 0 }

    for (let i = 1; i < recentFights.value.length; i++) {
      const result = recentFights.value[i].result.toLowerCase()
      if ((isWin && result.includes('win')) || (isLoss && result.includes('loss'))) {
        count++
      } else {
        break
      }
    }

    return {
      type: isWin ? 'win' : 'loss',
      count,
    }
  })

  return {
    winPercentage,
    winMethods,
    recentFights,
    currentStreak,
  }
}
