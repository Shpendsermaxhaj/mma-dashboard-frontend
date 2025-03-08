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
      <!-- Expand Button only on desktop -->
      <v-list-item v-if="!isMobile">
        <v-btn icon @click="toggleSidebar" class="flat" aria-label="Toggle Sidebar">
          <v-icon>{{ isCollapsed ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
        </v-btn>


        <span v-show="!isCollapsed" class="sidebar-text">MMA Stats</span>
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
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

export default {
  setup() {
    const drawer = ref(window.innerWidth >= 960);
    const isCollapsed = ref(false);
    const isMobile = ref(window.innerWidth < 960);

    // Update screen size
    const updateScreenSize = () => {
      isMobile.value = window.innerWidth < 960;
      drawer.value = window.innerWidth >= 960;
    };

    // Toggle sidebar width
    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    // Add resize event listener
    onMounted(() => {
      window.addEventListener("resize", updateScreenSize);
    });

    // Cleanup resize event listener
    onBeforeUnmount(() => {
      window.removeEventListener("resize", updateScreenSize);
    });

    return { drawer, isCollapsed, isMobile, toggleSidebar };
  },
};
</script>

<style scoped>
.custom-sidebar {
  background-color: #1e1e2d;
  color: white;
  transition: width 0.3s ease-in-out;
}

.sidebar-text {
  display: inline-block;
  opacity: 1;
  transition: opacity 1s ease-in-out;
  white-space: nowrap;
}

.v-list-item .v-icon {
  margin-right: 12px;
}


.v-btn.flat {
  background: transparent !important;
  box-shadow: none !important;
}

.v-btn.flat .v-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}


</style>
