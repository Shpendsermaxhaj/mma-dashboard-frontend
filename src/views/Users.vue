<template>
  <div>
    <h1>User List</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} - {{ user.email }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const users = ref([]);

    onMounted(async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        users.value = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    });

    return { users };
  },
};
</script>
