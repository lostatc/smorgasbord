<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ to: string; target?: string }>();

const isExternalLink = computed(() => props.to.startsWith("https://"));
</script>

<template>
  <a v-if="isExternalLink" class="link-primary" :href="props.to" :target="props.target">
    <slot />
  </a>
  <router-link v-else class="link-primary" :to="props.to">
    <slot />
  </router-link>
</template>

<style scoped></style>
