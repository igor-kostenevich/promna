<template>
  <label
    :for="props.id"
    class="flex w-max items-center gap-3"
    :class="disabled ? 'cursor-not-allowed' : 'cursor-pointer'"
  >
    <span
      class="flex h-5 w-5 items-center justify-center rounded-full border border-gray-secondary transition-colors hover:bg-black/10 active:border-gray-pressed active:bg-transparent"
      :class="{
        '!border-gray-disabled-light !bg-gray-disabled-light': disabled,
      }"
    >
      <span
        class="h-3 w-3 rounded-full"
        :class="[
          {
            '!bg-gray-disabled-dark': disabled && modelValue === value,
          },
          modelValue === value ? 'bg-primary-dark' : 'bg-transparent',
        ]"
      />
    </span>

    <input
      :id="props.id"
      type="radio"
      :name="props.name"
      :value="props.value"
      :checked="modelValue === value"
      :disabled="disabled"
      class="sr-only"
      @change="emit('update:modelValue', props.value)"
    />

    <span v-if="$slots.default" :class="{ 'text-gray-disabled': disabled }">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: string;
  name: string;
  value: string;
  modelValue: string;
  disabled?: boolean;
}>();

const emit = defineEmits(['update:modelValue']);
</script>
