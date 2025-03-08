<template>
  <v-app>
    <Sidebar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from "@/components/Sidebar/Sidebar.vue";

export default {
  components: {
    Sidebar,
  },
};
</script>
