import { ref, watch, onUnmounted } from 'vue'

//  debounce the search to avoid too many rerenders
export function useDebounce(options = {}) {
  const { delay = 300, immediate = false } = options

  let timeout = null

  onUnmounted(() => {
    if (timeout) clearTimeout(timeout)
  })

  const debounce = (sourceRef) => {
    const debouncedRef = ref(sourceRef.value)

    watch(sourceRef, (newValue) => {
      if (timeout) clearTimeout(timeout)

      if (immediate && debouncedRef.value === sourceRef.value) {
        debouncedRef.value = newValue
        return
      }

      timeout = setTimeout(() => {
        debouncedRef.value = newValue
        timeout = null
      }, delay)
    })

    return debouncedRef
  }

  return { debounce }
}
