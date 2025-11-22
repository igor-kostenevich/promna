<template>
  <label
    :for="id"
    class="relative flex w-max items-center"
    :class="disabled ? 'cursor-not-allowed' : 'cursor-pointer'"
  >
    <input
      :id="id"
      type="checkbox"
      :disabled="disabled"
      :checked="modelValue"
      class="peer sr-only"
      @change="
        emit('update:modelValue', ($event.target as HTMLInputElement).checked)
      "
    />
    <div
      class="flex h-5 w-5 items-center justify-center border border-gray-secondary bg-white transition-colors hover:bg-black/10 active:border-gray-pressed active:bg-transparent"
      role="checkbox"
      :aria-checked="modelValue"
      aria-hidden="false"
      :class="{
        '!border-gray-disabled-light !bg-gray-disabled-light': disabled,
      }"
    >
      <Icon
        name="checkmark"
        class="text-primary-dark transition-transform duration-200"
        :size="20"
        :class="[
          {
            '!text-gray-disabled-dark': disabled && modelValue,
          },
          modelValue ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
        ]"
      />
    </div>
    <div v-if="$slots.default" class="ml-4">
      <slot />
    </div>
  </label>
</template>

<script setup lang="ts">
import Icon from './Icon.vue';

defineProps<{
  id: string;
  modelValue: boolean;
  disabled?: boolean;
}>();

const emit = defineEmits(['update:modelValue']);
</script>
