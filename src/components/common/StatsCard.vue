<template>
  <v-card :color="color" dark class="mb-4">
    <v-card-title class="text-h5">
      {{ value }}
      <v-icon v-if="icon" class="ml-2">{{ icon }}</v-icon>
    </v-card-title>
    <v-card-subtitle>{{ title }}</v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  name: 'StatsCard',
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      required: true,
    },
    color: {
      type: String,
      default: 'primary',
    },
    icon: {
      type: String,
      default: '',
    },
  },
}
</script>
