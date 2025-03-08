<template>
  <v-container>
    <h1 class="text-h4 font-weight-bold mb-4 text-center">MMA Stats Dashboard</h1>

    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-card color="primary" dark>
          <v-card-title>Total Users</v-card-title>
          <v-card-text class="text-h4">{{ users.length }}</v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-card color="green" dark>
          <v-card-title>Active Users</v-card-title>
          <v-card-text class="text-h4">{{ activeUsers }}</v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card color="orange" dark>
          <v-card-title>Total Matches</v-card-title>
          <v-card-text class="text-h4">{{ totalMatches }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- User data table -->
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="users"
          class="mt-6"
          density="compact"
          mobile-breakpoint="600"
        >
          <template v-slot:top>
            <v-toolbar flat color="primary">
              <v-toolbar-title>User Statistics</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import api from '@/services/axios';


export default {
  setup() {
    const users = ref([]);
    const totalMatches = ref(120);

    onMounted(async () => {
      try {
        const response = await api.get("/users");
        users.value = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    });

    const activeUsers = computed(() => users.value.filter(user => user.active).length);

    return {
      users,
      activeUsers,
      totalMatches,
      headers: [
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Role", value: "role" },
      ],
    };
  },
};
</script>
