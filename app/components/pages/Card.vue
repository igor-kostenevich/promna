<template>
  <div class="rounded-2xl bg-secondary p-6 shadow-subtle">
    <div
      class="relative mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-t from-primary-accent to-primary-hover/0 shadow-button"
    >
      <div
        class="pointer-events-none absolute inset-[1px] rounded-full bg-gradient-to-b from-primary/50 to-primary"
      />
      <Icon :name="icon" class="stroke-white text-white" />
    </div>
    <p class="text-lg font-bold text-dark-additional">{{ title }}</p>
  </div>
</template>

<script setup lang="ts">
const Icon = defineAsyncComponent(() => import('@/UIKit/Icon.vue'));

defineProps<{
  title: string;
  icon: string;
}>();
</script>
