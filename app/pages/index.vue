<template>
  <div
    class="entry relative flex min-h-[750px] flex-col items-center bg-gradient-to-b from-primary to-primary-accent pt-[180px]"
  >
    <div class="entry-bg" />
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(at_50%_0%,_white_0%,_transparent_25%)]"
    />
    <div class="flex w-full max-w-[624px] flex-col items-center text-center">
      <div
        class="mb-5 rounded-full border border-primary-hover px-4 py-1 text-lg font-medium text-white shadow-inner-white-strong"
      >
        Meet Proccessive
      </div>
      <h1 class="mb-6 font-inter text-5xl font-semibold text-white">
        Operational services that power your revenue engine
      </h1>
      <h2 class="mb-12 text-2xl font-semibold leading-9 text-white">
        We handle the operational side of your marketing and sales — so your
        team can focus on growth
      </h2>
      <Button color="secondary">Book a 20-min Call</Button>
    </div>
    <Companies />
  </div>
  <div class="bg-gradient-to-b from-primary-accent to-light">
    <div class="container mb-8 flex flex-col items-center">
      <img
        src="/images/business.png"
        alt="decor image"
        class="mb-3 max-h-[342px] max-w-[342px]"
      />
      <h3
        class="mb-3 max-w-[1020px] px-4 text-4xl font-semibold leading-[44px] text-dark-additional"
      >
        Why outsourcing GTM operations works
      </h3>
      <p class="max-w-[1020px] px-4 text-center text-xl font-semibold">
        Every GTM team has secondary functions — things like SLA monitoring, CRM
        hygiene, review management, or attribution setup. Outsourcing these
        functions helps solve common operational challenges, such as:
      </p>
    </div>
  </div>
  <div class="mx-auto mb-24 w-full max-w-[1248px] px-4">
    <div class="flex flex-wrap justify-center gap-4">
      <Card
        v-for="(card, idx) in cards"
        :key="idx"
        :title="card.title"
        :icon="card.icon"
        class="w-full max-w-[394px]"
      />
    </div>
  </div>
  <div class="container mb-[103px]">
    <h3 class="mb-12 text-center text-4xl font-semibold text-dark-additional">
      Our Services
    </h3>
    <ul class="grid gap-4 px-4">
      <li
        v-for="(service, idx) in services"
        :key="idx"
        class="flex items-center gap-10 rounded-2xl bg-secondary p-12 shadow-subtle"
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
  <section class="decor mb-12 pt-9">
    <div class="container">
      <img
        src="/images/success.png"
        class="mx-auto h-[342px] w-[342px]"
        alt=""
      />
      <h3 class="mb-12 text-center text-4xl font-semibold text-dark-additional">
        How we work
      </h3>
      <div class="flex gap-4 px-4">
        <div
          class="flex items-center rounded-2xl bg-secondary px-6 py-8 shadow-subtle"
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
          class="flex items-center rounded-2xl bg-secondary px-6 py-8 shadow-subtle"
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
          class="flex items-center rounded-2xl bg-secondary px-6 py-8 shadow-subtle"
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
  <section class="mb-[120px]">
    <div class="container px-8">
      <div
        class="relative rounded-2xl bg-gradient-to-b from-primary-accent/80 to-primary-accent/40 px-[45px] py-[30px] text-[28px] font-bold leading-9 tracking-tight text-dark-additional"
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
    description="We’ll review your current setup, identify weak points, and show how better structure can unlock more revenue."
  />
</template>

<script setup lang="ts">
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

const services = [
  {
    slug: 'crm-hygiene',
    icon: 'featured-icon',
    title: 'ReviewOps / Customer Advocacy',
    description:
      'Get fresh G2, Clutch, and Capterra reviews and proof materials consistently.',
  },
  {
    slug: 'pipeline-setup',
    icon: 'hugeicons-clean',
    title: 'CRM Hygiene & Pipeline Setup',
    description:
      'Clean data, align stages, and create reliable reporting foundations.',
  },
];
</script>

<style scoped>
.decor {
  position: relative;
}

.decor::before {
  content: '';
  position: absolute;
  background: url('/images/decor-left.png') no-repeat;
  background-size: contain;
  pointer-events: none;
  z-index: -1;
  width: 100%;
  height: 100%;
  max-height: 500px;
  left: 0;
  top: 0;
}

.decor::after {
  content: '';
  position: absolute;
  background: url('/images/decor-right.png') no-repeat right;
  background-size: contain;
  pointer-events: none;
  z-index: -1;
  width: 100%;
  height: 100%;
  max-height: 500px;
  right: 0;
  top: 0;
}

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
  background-position: center 126px;
  background-size: contain;
  pointer-events: none;
}
</style>
