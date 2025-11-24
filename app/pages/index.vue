<template>
  <EntryScreen />
  <div class="bg-gradient-to-b from-primary-accent to-light">
    <Companies />
    <div class="container flex flex-col items-center mb-8">
      <img src="/images/business.png" alt="decor image" class="max-w-[342px] max-h-[342px] mb-3">
      <h3 class="text-dark-additional text-4xl mb-3 font-semibold leading-[44px] max-w-[1020px] px-4">Why outsourcing GTM operations works</h3>
      <p class="max-w-[1020px] px-4 text-center font-semibold text-xl">Every GTM team has secondary functions — things like SLA monitoring, CRM hygiene, review management, or attribution setup.
        Outsourcing these functions helps solve common operational challenges, such as:</p>
    </div>
  </div>
  <div class="max-w-[1248px] mx-auto px-4 w-full mb-24">
    <div class="flex flex-wrap justify-center gap-4">
      <Card
        v-for="(card, idx) in cards"
        :key="idx"
        :title="card.title"
        :icon="card.icon"
        class="max-w-[394px] w-full"
      ></Card>
    </div>
  </div>
</template>

<script setup lang="ts">
const EntryScreen = defineAsyncComponent(() => import('~/components/pages/EntryScreen.vue'));
const Companies = defineAsyncComponent(() => import('~/components/pages/Companies.vue'));
const Card = defineAsyncComponent(() => import('~/components/pages/Card.vue'));

const cards = [
  {
    title: 'Limited attention to supporting processes',
    icon: 'info-hexagon',
  },
  {
    title: 'Lack of ownership and accountability',
    icon: 'face-sad',
  },
  {
    title: 'Inconsistent execution of routine tasks ',
    icon: 'speedometer-04',
  },
  {
    title: 'Inconsistent execution of routine tasks ',
    icon: 'currency-dollar-circle',
  },
];
</script>
