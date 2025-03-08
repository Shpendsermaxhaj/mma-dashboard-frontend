<template>
  <!-- Mobile app bar hamburger menu -->
  <v-app-bar v-if="isMobile" color="primary" dark app>
    <v-app-bar-nav-icon @click="drawer = !drawer">
      <v-icon>mdi-menu</v-icon>
    </v-app-bar-nav-icon>
    <v-toolbar-title>MMA Stats Dashboard</v-toolbar-title>
  </v-app-bar>

  <!-- Sidebar always visible on desktop, toggles on mobile -->
  <v-navigation-drawer
    v-model="drawer"
    app
    :permanent="!isMobile"
    :temporary="isMobile"
    :rail="isCollapsed && !isMobile"
    class="custom-sidebar"
  >
    <v-list>
      <!-- Expand Button with icon and text on desktop -->
      <v-list-item @click="toggleSidebar" v-if="!isMobile">
        <v-icon>{{ isCollapsed ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
        <span v-show="!isCollapsed" class="sidebar-text ml-3">MMA Stats</span>
      </v-list-item>

      <v-divider></v-divider>

      <!-- Navigation items -->
      <v-list-item to="/">
        <v-icon>mdi-view-dashboard</v-icon>
        <span v-if="!isCollapsed || isMobile" class="ml-3">Home</span>
      </v-list-item>

      <v-list-item to="/about">
        <v-icon>mdi-account-group</v-icon>
        <span v-if="!isCollapsed || isMobile" class="ml-3">About</span>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { useScreenSize } from '@/composables/useScreenSize'
import { useSidebar } from '@/composables/useSidebar'

export default {
  setup() {
    const { isMobile, drawer } = useScreenSize()
    const { isCollapsed, toggleSidebar } = useSidebar()

    return {
      drawer,
      isCollapsed,
      isMobile,
      toggleSidebar,
    }
  },
}
</script>

<style scoped>
.custom-sidebar {
  background-color: #1e1e2d;
  color: white;
  transition: width 0.3s ease-in-out;
}

.v-list-item {
  position: relative;
}

.v-list-item span {
  position: absolute;
  left: 40px;
  opacity: 1;
  transition: all 0.5s ease-in-out;
  white-space: nowrap;
  overflow: hidden;
}

.v-navigation-drawer--rail .v-list-item span {
  opacity: 0;
  visibility: hidden;
  transform: translateX(-10px);
  transition: all 0.5s ease-in-out;
}

.v-list-item .v-icon {
  position: relative;
  z-index: 1;
}
</style>
