import { ref } from 'vue'

export const useSidebar = () => {
  const isCollapsed = ref(localStorage.getItem('sidebarCollapsed') === 'true')

  const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value
    localStorage.setItem('sidebarCollapsed', isCollapsed.value)
  }

  return {
    isCollapsed,
    toggleSidebar,
  }
}
