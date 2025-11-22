<template>
  <div class="flex flex-1 flex-col">
    <div class="flex min-h-screen flex-1">
      <main id="js-content" class="flex flex-1 flex-col overflow-x-auto p-2">
        <slot />
      </main>
    </div>
    <Footer hydrate-on-idle />
  </div>
</template>

<script setup lang="ts">
import Footer from '~/components/layout/Footer.vue';
</script>
