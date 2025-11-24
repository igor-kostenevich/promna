<template>
  <div class="flex flex-1 flex-col">
    <Header />
    <div class="flex min-h-screen flex-1">
      <main id="js-content" class="flex flex-1 flex-col overflow-x-auto">
        <slot />
      </main>
    </div>
    <Footer hydrate-on-idle />
  </div>
</template>

<script setup lang="ts">
import Header from '~/components/layout/Header.vue';
import Footer from '~/components/layout/Footer.vue';
</script>
