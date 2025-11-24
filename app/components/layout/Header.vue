<template>
  <header class="flex items-center justify-between gap-4 max-w-[1232px] mx-auto p-2.5 pl-8 bg-white rounded-full w-full fixed top-8 left-1/2 -translate-x-1/2 z-50">
    <img src="/images/logo.png" alt="logo">
    <nav>
      <ul class="flex gap-[26px]">
        <li><NuxtLink to="/" class="text-sm font-semibold text-dark-additional">Proof</NuxtLink></li>
        <li><NuxtLink to="/about" class="text-sm font-semibold text-dark-additional">Services</NuxtLink></li>
        <li><NuxtLink to="/contact" class="text-sm font-semibold text-dark-additional">How We Work</NuxtLink></li>
      </ul>
    </nav>
    <Button>Book a 20-min Call</Button>
  </header>
</template>

<script setup langs="ts">
const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));
</script>