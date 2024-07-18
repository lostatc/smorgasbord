<script setup lang="ts">
import NavLink from "@/components/NavLink.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <header class="mb-4">
    <!--
        This is deliberately not marked as a `<nav>` because it's just a single
        link to the homepage. Signaling it as a navigation landmark might be
        misleading unless we add more links up there.
    -->
    <div class="d-flex align-items-baseline gap-2">
      <nav-link class="fs-5 fw-bold" to="/">Discuss.love</nav-link>
      <span class="text-muted">A tool for negotiating relationships</span>
    </div>
  </header>
  <div class="d-flex justify-content-center">
    <router-view />
  </div>
</template>

<style scoped></style>
