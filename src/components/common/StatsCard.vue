<template>
  <v-card :color="color" dark>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text class="text-h4">{{ value }}</v-card-text>
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
  },
}
</script>
