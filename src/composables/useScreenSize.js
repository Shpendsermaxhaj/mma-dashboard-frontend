import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useScreenSize() {
  const isMobile = ref(window.innerWidth < 960)
  const drawer = ref(window.innerWidth >= 960)

  const updateScreenSize = () => {
    isMobile.value = window.innerWidth < 960
    drawer.value = window.innerWidth >= 960
  }

  onMounted(() => {
    window.addEventListener('resize', updateScreenSize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateScreenSize)
  })

  return { isMobile, drawer }
}
