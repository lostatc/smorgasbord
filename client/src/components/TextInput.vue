<script setup lang="ts">
import InputText from "primevue/inputtext";

const model = defineModel<string>();

const props = defineProps<{
  id: string;
  label: string;
  required?: boolean;
  errorMessage?: string;
}>();

defineExpose({ required: props.required });
</script>

<template>
  <div class="flex flex-col gap-2">
    <label :for="props.id" class="flex gap-2">
      <span>{{ props.label }}</span>
      <span v-if="props.required" class="text-bad">*</span>
    </label>
    <InputText
      :id="props.id"
      class="w-80"
      type="text"
      v-model="model"
      :required="props.required"
      :aria-describedby="`${props.id}-validation-message`"
    />
    <small
      v-if="props.errorMessage"
      :id="`${props.id}-validation-message`"
      class="text-bad"
      role="alert"
    >
      {{ props.errorMessage }}
    </small>
  </div>
</template>

<style scoped></style>
