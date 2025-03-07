<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/users">Users</router-link>
  </nav>
  <router-view></router-view>
</template>

<style>
nav {
  display: flex;
  gap: 20px;
  padding: 10px;
  background: black;
}
nav a {
  color: white;
  text-decoration: none;
}
</style>
