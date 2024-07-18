<script setup lang="ts">
const model = defineModel<string>();

const props = defineProps<{
  id: string;
  label: string;
}>();
</script>

<template>
  <div class="mb-3">
    <label :for="`name-input-${props.id}`" class="form-label">{{ props.label }}</label>
    <input
      :id="`name-input-${props.id}`"
      class="form-control"
      type="text"
      v-model="model"
      required
    />
  </div>
</template>

<style scoped></style>
