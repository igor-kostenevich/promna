<template>
  <IconSymbols />

  <div class="flex min-h-screen flex-col">
    <div class="flex flex-1 flex-col">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>

  <div id="teleports" class="relative z-[600]" />
</template>

<script lang="ts" setup>
const IconSymbols = defineAsyncComponent(
  () => import('@/UIKit/IconSymbols.vue')
);
const { initApp } = useApp();

onMounted(() => {
  initApp();
});
</script>
