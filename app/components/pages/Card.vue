<template>
  <div class="bg-secondary p-6 rounded-2xl">
    <div class="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-t from-primary-accent to-primary-hover/0 shadow-button relative mb-4">
      <div class="absolute inset-[1px] bg-gradient-to-b from-primary/30 to-primary rounded-full pointer-events-none"></div>
      <Icon :name="icon" class="text-white stroke-white"/>
    </div>
    <p class="text-dark-additional font-bold text-lg">{{ title }}</p>
  </div>
</template>

<script setup lang="ts">
const Icon = defineAsyncComponent(
  () => import('@/UIKit/Icon.vue')
);

defineProps<{
  title: string;
  icon: string;
}>();
</script>
