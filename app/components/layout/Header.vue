<template>
  <header
    class="fixed left-1/2 top-6 z-50 mx-auto flex w-full max-w-[1232px] -translate-x-1/2 items-center justify-between gap-4 rounded-full bg-white p-2.5 pl-8"
  >
    <img src="/images/logo.png" alt="logo" />
    <nav>
      <ul class="flex gap-[26px]">
        <li>
          <NuxtLink to="/" class="text-sm font-semibold text-dark-additional"
            >Proof</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            to="/about"
            class="text-sm font-semibold text-dark-additional"
            >Services</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            to="/contact"
            class="text-sm font-semibold text-dark-additional"
            >How We Work</NuxtLink
          >
        </li>
      </ul>
    </nav>
    <Button>Book a 20-min Call</Button>
  </header>
</template>

<script setup langs="ts">
const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));
</script>
