<script setup lang="ts"></script>

<template>
  <router-link class="m-5" to="/login">Go to Login</router-link>
  <router-link class="m-5" to="/account">Go to Account</router-link>
  <router-link class="m-5" to="/rdv">Go to RDV</router-link>
  <router-view></router-view>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
