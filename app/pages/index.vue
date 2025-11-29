<template>
  <div
    class="entry relative flex min-h-[750px] flex-col items-center bg-gradient-to-b from-primary to-primary-accent pt-[84px] md:pt-[180px]"
  >
    <div class="entry-bg hidden lg:block" />
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(at_50%_0%,_white_0%,_transparent_25%)]"
    />
    <div class="flex w-full max-w-[624px] flex-col items-center text-center">
      <div
        class="mb-4 rounded-full border border-primary-hover px-4 py-1 text-xs font-medium leading-5 text-white shadow-inner-white-strong sm:mb-5 sm:text-lg sm:leading-7"
      >
        Meet Proccessive
      </div>
      <h1
        class="mb-4 font-inter text-4xl font-semibold leading-[44px] tracking-wide text-white sm:mb-6 sm:text-5xl sm:leading-[60px]"
      >
        Operational services that power your revenue engine
      </h1>
      <h2
        class="mb-4 text-base font-semibold leading-5 text-white sm:mb-12 sm:text-2xl sm:leading-9"
      >
        We handle the operational side of your marketing and sales — so your
        team can focus on growth
      </h2>
      <Button color="secondary">Book a 20-min Call</Button>
    </div>
    <div class="mb-6 lg:hidden">
      <img src="/images/entry-arrows.png" alt="" />
    </div>
    <div class="max-h-[360px] w-full max-w-[360px] lg:hidden">
      <img
        class="h-full w-full object-cover"
        src="/images/sm-bg.png"
        alt="bg"
      />
    </div>
    <Companies />
  </div>
  <section id="proof" class="bg-gradient-to-b from-primary-accent to-light">
    <div class="container-wrapp mb-5 flex flex-col items-center sm:mb-8">
      <img
        src="/images/business.png"
        alt="decor image"
        class="mb-3 max-h-[342px] max-w-[342px]"
      />
      <h3
        class="mb-3 max-w-[1020px] px-4 text-center text-[32px] font-semibold leading-10 tracking-tight text-dark-additional sm:text-4xl sm:leading-[44px]"
      >
        Why outsourcing GTM operations works
      </h3>
      <p
        class="max-w-[1020px] px-4 text-center text-base font-semibold sm:text-xl"
      >
        Every GTM team has secondary functions — things like SLA monitoring, CRM
        hygiene, review management, or attribution setup. Outsourcing these
        functions helps solve common operational challenges, such as:
      </p>
    </div>
  </section>
  <div class="mx-auto mb-12 w-full max-w-[1248px] px-4 sm:mb-24">
    <div class="flex flex-wrap justify-center gap-4">
      <Card
        v-for="(card, idx) in cards"
        :key="idx"
        :title="card.title"
        :icon="card.icon"
        class="w-full sm:max-w-[394px]"
      />
    </div>
  </div>
  <div class="container-wrapp mb-12 sm:mb-[103px]">
    <h3
      class="mb-5 text-center text-[32px] font-semibold leading-10 tracking-tight text-dark-additional sm:mb-12 sm:text-4xl sm:leading-[44px]"
    >
      Our Services
    </h3>
    <ul class="grid gap-4 sm:px-4">
      <li
        v-for="(service, idx) in services"
        :key="idx"
        class="flex flex-col gap-10 rounded-2xl bg-secondary p-6 shadow-subtle sm:flex-row sm:items-center sm:p-12"
      >
        <Icon :name="service.icon" :size="48" class="text-primary" />
        <div class="flex-1">
          <h4 class="mb-2 text-lg font-bold text-primary">
            {{ service.title }}
          </h4>
          <p class="text-lg font-semibold">{{ service.description }}</p>
        </div>
        <Button
          :to="`/services/${service.slug}`"
          color="neutral"
          icon-after="arrow-right"
          >Learn More</Button
        >
      </li>
    </ul>
  </div>
  <section id="how-work" class="decor mb-12 sm:pt-9">
    <div class="container-wrapp grid">
      <img
        src="/images/success.png"
        class="order-3 mx-auto h-[228px] w-[228px] sm:order-1 sm:h-[342px] sm:w-[342px]"
        alt=""
      />
      <h3
        class="order-1 mb-5 text-center text-[32px] font-semibold leading-10 tracking-tight text-dark-additional sm:order-2 sm:mb-8 sm:text-4xl sm:leading-[44px]"
      >
        How we work
      </h3>
      <div class="order-2 grid gap-4 sm:order-3 sm:px-4 lg:grid-cols-3">
        <div
          class="flex flex-col gap-4 rounded-2xl bg-secondary p-6 shadow-subtle sm:flex-row sm:items-center sm:gap-0 sm:py-8"
        >
          <span class="mr-5 text-5xl font-semibold leading-[48px] text-primary"
            >01</span
          >
          <p class="text-lg font-medium">
            <span class="font-bold text-dark-additional">Audit</span> — We map
            your GTM systems and identify bottlenecks.
          </p>
        </div>
        <div
          class="flex flex-col gap-4 rounded-2xl bg-secondary p-6 shadow-subtle sm:flex-row sm:items-center sm:gap-0 sm:py-8"
        >
          <span class="mr-5 text-5xl font-semibold leading-[48px] text-primary"
            >02</span
          >
          <p class="text-lg font-medium">
            <span class="font-bold text-dark-additional">Fix & Align</span> — We
            clean, structure, and set up repeatable processes.
          </p>
        </div>
        <div
          class="flex flex-col gap-4 rounded-2xl bg-secondary p-6 shadow-subtle sm:flex-row sm:items-center sm:gap-0 sm:py-8"
        >
          <span class="mr-5 text-5xl font-semibold leading-[48px] text-primary"
            >03</span
          >
          <p class="text-lg font-medium">
            <span class="font-bold text-dark-additional">Operate</span> — We
            maintain, monitor, and provide transparent monthly reports.
          </p>
        </div>
      </div>
    </div>
  </section>
  <section class="mb-12 sm:mb-[120px]">
    <div class="container-wrapp sm:px-8">
      <div
        class="relative rounded-2xl bg-gradient-to-b from-primary-accent/80 to-primary-accent/40 p-4 pb-6 text-center text-xl font-bold leading-6 tracking-tight text-dark-additional sm:px-[45px] sm:py-[30px] sm:text-[28px] sm:leading-9"
      >
        A systematic approach that combines
        <span class="text-primary">consulting precision</span> with
        <span class="text-primary">operational consistency.</span>
        <img
          src="/images/stars.png"
          class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
          alt="stars"
        />
      </div>
    </div>
  </section>
  <Form
    :title="'Book a 20-min call to discuss which processes could be delegated for higher efficiency.'"
  />
</template>

<script setup lang="ts">
import servicesData from '../../public/data/services.json';

const Form = defineAsyncComponent(() => import('~/components/layout/Form.vue'));
const Companies = defineAsyncComponent(
  () => import('~/components/pages/Companies.vue')
);
const Card = defineAsyncComponent(() => import('~/components/pages/Card.vue'));
const Icon = defineAsyncComponent(() => import('@/UIKit/Icon.vue'));
const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));

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

const services = ref(servicesData);
</script>

<style scoped>
.decor {
  position: relative;
}

.decor::before {
  content: '';
  position: absolute;
  background: url('/images/decor-left.png') no-repeat;
  background-position: top left;
  background-size: contain;
  pointer-events: none;
  z-index: -1;
  width: 100%;
  height: 100%;
  max-height: 500px;
  left: 0;
  top: 0;
  max-width: 50%;
}

.decor::after {
  content: '';
  position: absolute;
  background: url('/images/decor-right.png') no-repeat;
  background-position: top right;
  background-size: contain;
  pointer-events: none;
  z-index: -1;
  width: 100%;
  height: 100%;
  max-height: 500px;
  right: 0;
  top: 0;
  margin-left: auto;
  max-width: 50%;
}

.entry::after {
  content: '';
  position: absolute;
  background: url('/images/decor.png') no-repeat top center;
  background-size: contain;
  pointer-events: none;
  z-index: 0;
  height: 100%;
  right: 0;
  top: 0;
  left: 0;
}

.entry-bg {
  position: absolute;
  inset: 0;
  background: url('/images/entry-bg.png') no-repeat;
  background-position: center 146px;
  background-size: contain;
  pointer-events: none;
  z-index: 1;
}

@media (width <= 612px) {
  .decor::before {
    background-position: -75px 88%;
    max-height: 100%;
  }

  .decor::after {
    background-position: 75px 88%;
    max-height: 100%;
  }
}
</style>
