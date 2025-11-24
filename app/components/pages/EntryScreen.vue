<template>
  <div
    class="entry min-h-[750px] relative flex flex-col items-center bg-gradient-to-b from-primary to-primary-accent pt-[180px]"
  >
    <div class="entry-bg"></div>
    <div class="absolute inset-0 bg-[radial-gradient(at_50%_0%,_white_0%,_transparent_25%)] pointer-events-none"></div>
    <div class="flex flex-col items-center w-full max-w-[624px] text-center">
        <div class="text-lg font-medium text-white py-1 px-4 border border-primary-hover rounded-full shadow-inner-white-strong mb-5">Meet Proccessive</div>
        <h1 class="text-white text-5xl font-semibold font-inter mb-6">Operational services that power your revenue engine</h1>
        <h2 class="text-white text-2xl font-semibold leading-9 mb-12">We handle the operational side of your marketing and sales — so your team can focus on growth</h2>
        <Button color="secondary">Book a 20-min Call</Button>
    </div>
  </div>
</template>

<script setup langs="ts">
const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));
</script>

<style scoped>
.entry::after,
.entry::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.entry::after {
  background: url('/images/decor6.png') no-repeat;
  background-position: top left;
}

.entry::before {
  background: url('/images/decor5.png') no-repeat;
  background-position: top right;
}

.entry-bg {
  position: absolute;
  inset: 0;
  background: url('/images/entry-bg.png') no-repeat;
  background-position: center 156px;
  background-size: contain;
  pointer-events: none;
}
</style>