<template>
  <div
    class="entry relative flex min-h-[750px] flex-col items-center bg-gradient-to-b from-primary to-primary-accent pt-[84px] md:pt-[180px]"
  >
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(at_50%_0%,_white_0%,_transparent_25%)]"
    />
    <div
      class="container-wrapp flex flex-col items-center gap-5 text-center md:flex-row md:items-start md:text-left"
    >
      <div
        class="flex w-full max-w-[624px] flex-col items-center md:items-start"
      >
        <div
          class="mb-4 rounded-full border border-primary-hover px-4 py-1 text-xs font-medium leading-5 text-white shadow-inner-white-strong sm:mb-5 sm:text-lg sm:leading-7"
        >
          {{ service.badge }}
        </div>
        <h1
          class="mb-4 font-inter text-3xl font-semibold tracking-wide text-white sm:mb-6 lg:text-5xl lg:leading-[44px]"
        >
          {{ service.title }}
        </h1>
        <h2
          class="mb-4 text-base font-semibold leading-5 text-white sm:mb-12 sm:text-lg lg:text-2xl lg:leading-9"
        >
          {{ service.description }}
        </h2>
        <client-only
          ><Button color="secondary">Book a 20-min Call</Button></client-only
        >
      </div>
      <div>
        <img src="/images/services/service1.png" alt="service" />
      </div>
    </div>
    <Companies class="!mt-8 sm:!mt-[92px]" />
  </div>
  <div id="what-get" class="bg-gradient-to-b from-primary-accent to-light">
    <div class="container-wrapp mb-5 flex flex-col items-center sm:mb-8">
      <div
        class="mb-3 rounded-full bg-white px-4 py-1 text-xs font-medium text-dark-text shadow-subtle sm:text-base"
      >
        Quick Wins
      </div>
      <h3
        class="mb-3 max-w-[1020px] px-4 text-center text-[32px] font-semibold leading-10 tracking-tight text-dark-additional sm:text-4xl sm:leading-[44px]"
      >
        What you get in 30–60 days
      </h3>
    </div>
  </div>
  <div class="mx-auto mb-12 w-full max-w-[1248px] px-4 sm:mb-24">
    <div class="flex flex-wrap justify-center gap-4">
      <Card
        v-for="(card, idx) in service.cards"
        :key="idx"
        :title="card.title"
        :icon="card.icon"
        class="w-full sm:max-w-[394px]"
      />
    </div>
  </div>
  <section class="mb-12 sm:mb-[120px]">
    <div class="container-wrapp sm:px-8">
      <div
        class="relative rounded-2xl bg-gradient-to-b from-primary-accent/80 to-primary-accent/40 p-4 pb-6 text-center text-xl font-bold leading-6 tracking-tight text-dark-additional sm:px-[45px] sm:py-[30px] sm:text-[28px] sm:leading-9"
      >
        <div class="line" v-html="service.line1" />
        <img
          src="/images/stars.png"
          class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
          alt="stars"
        />
      </div>
    </div>
  </section>
  <section id="works" class="mb-12 sm:pt-9">
    <div class="container-wrapp grid">
      <div
        class="mx-auto mb-3 w-max rounded-full bg-white px-4 py-1 text-xs font-medium text-dark-text shadow-subtle sm:text-base"
      >
        Workflow
      </div>
      <h3
        class="order-1 mb-5 text-center text-[32px] font-semibold leading-10 tracking-tight text-dark-additional sm:order-2 sm:mb-8 sm:text-4xl sm:leading-[44px]"
      >
        How it works
      </h3>
      <div class="order-2 grid gap-4 sm:order-3 sm:px-4 lg:grid-cols-2">
        <div
          v-for="(item, idx) in service.howItWorks.cards"
          :key="idx"
          class="flex flex-col gap-4 rounded-2xl bg-secondary p-6 shadow-subtle sm:flex-row sm:items-center sm:gap-0 sm:py-8"
        >
          <span
            class="mr-5 text-5xl font-semibold leading-[48px] text-primary sm:text-[66px] sm:leading-[60px]"
            >0{{ idx + 1 }}</span
          >
          <p class="text-lg font-bold text-dark-additional">{{ item.title }}</p>
        </div>
      </div>
    </div>
  </section>
  <section class="decor mb-12 sm:mb-[120px] sm:pt-4">
    <div class="container-wrapp">
      <img
        :src="service.howItWorks.image"
        class="mx-auto h-[228px] w-[228px] sm:order-1 sm:h-[342px] sm:w-[342px]"
        alt=""
      />
      <h3
        class="line mx-auto max-w-[586px] text-center text-base font-bold sm:text-2xl"
        v-html="service.howItWorks.line"
      />
    </div>
  </section>
  <section class="mb-12 sm:mb-[100px]">
    <div class="container-wrapp">
      <div class="grid gap-4 md:grid-cols-2 md:gap-16 xl:gap-40">
        <div class="flex flex-col items-center sm:items-start">
          <div
            class="mb-3 inline-flex justify-center rounded-full bg-white px-4 py-1 text-xs font-medium text-dark-text shadow-subtle sm:w-max sm:justify-start sm:text-base"
          >
            The Bottlenecks
          </div>
          <h3
            class="mb-4 max-w-[576px] text-center text-[32px] font-semibold leading-10 tracking-tight text-dark-additional sm:mb-10 sm:text-4xl sm:leading-[44px] md:text-left"
          >
            {{ service.bottlenecks.title }}
          </h3>
          <div class="h-[290px] w-[290px] sm:h-[380px] sm:w-[380px]">
            <img
              :src="service.bottlenecks.imageUrl"
              class="h-full w-full object-cover"
              alt=""
            />
          </div>
        </div>
        <div class="grid gap-4">
          <div
            v-for="(item, idx) in service.bottlenecks.cards"
            :key="idx"
            class="flex flex-col rounded-2xl bg-secondary px-6 pb-4 pt-6 shadow-subtle sm:flex-row sm:items-center sm:py-4"
          >
            <div
              class="relative mb-4 mr-6 flex h-12 w-12 flex-[0_0_48px] items-center justify-center rounded-full bg-gradient-to-t from-primary-accent to-primary-hover/0 shadow-button sm:mb-0 lg:mr-10"
            >
              <div
                class="pointer-events-none absolute inset-[1px] rounded-full bg-gradient-to-b from-primary/50 to-primary"
              />
              <Icon
                :name="item.icon"
                :size="24"
                class="stroke-white text-white"
              />
            </div>
            <div>
              <p class="mb-1 text-lg font-bold text-dark-additional">
                {{ item.title }}
              </p>
              <p class="text-lg font-medium text-dark">{{ item.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="pricing" class="mb-12 sm:mb-[100px] sm:pt-9">
    <div class="container-wrapp grid">
      <div
        class="mx-auto mb-3 w-max rounded-full bg-white px-4 py-1 text-xs font-medium text-dark-text shadow-subtle sm:text-base"
      >
        Packages
      </div>
      <h3
        class="mb-12 text-center text-[32px] font-semibold leading-10 tracking-tight text-dark-additional sm:text-4xl sm:leading-[44px]"
      >
        Our Pricing
      </h3>
      <div
        class="flex flex-col justify-center gap-4 rounded-2xl bg-gradient-to-b from-secondary via-secondary to-primary-additional px-4 pb-4 pt-6 lg:flex-row"
      >
        <div
          v-for="(pack, idx) in service.packages"
          :key="idx"
          class="flex w-full flex-col rounded-2xl bg-white p-6 pt-4 lg:max-w-[394.67px]"
        >
          <span class="inline-flex text-lg font-bold text-dark-additional">{{
            pack.name
          }}</span>
          <div
            v-if="pack.price"
            :class="['mb-10', pack.isPriceFrom ? 'mt-7' : 'mt-[60px]']"
          >
            <p
              v-if="pack.isPriceFrom"
              class="text-2xl font-bold text-dark-text"
            >
              from
            </p>
            <p>
              <span
                class="mr-1.5 text-6xl font-bold leading-[72px] text-dark-additional"
                >{{ pack.price }}</span
              >
              <span class="text-[37px] font-medium leading-[44px] text-dark"
                >€/mo</span
              >
            </p>
          </div>
          <p
            v-else
            class="mb-10 mt-16 text-[37px] font-bold leading-[72px] text-dark-additional"
          >
            On Request
          </p>
          <p
            class="line mb-6 flex-1 text-lg font-medium text-dark"
            v-html="pack.description"
          />
          <ul class="grid gap-4 border-t border-gray-border pt-6">
            <li
              v-for="(feature, i) in pack.features"
              :key="i"
              class="font-medium text-dark"
            >
              <Icon
                name="check-circle-broken"
                :size="16"
                class="mr-4 inline-block text-primary"
              />
              <strong>{{ feature.title }}</strong> — {{ feature.text }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  <section class="mb-12 sm:mb-[100px]">
    <div class="container-wrapp">
      <div class="mx-auto h-16 w-[180px]">
        <img
          class="h-full w-full scale-125 transform object-cover object-top"
          src="/images/compliance.png"
          alt=""
        />
      </div>
      <h3
        class="mb-8 mt-5 text-center text-2xl font-semibold tracking-tight text-dark-additional sm:text-4xl"
      >
        Compliance
      </h3>
      <div class="mx-auto flex max-w-[1216px] flex-col gap-2 lg:flex-row">
        <div
          v-for="(item, idx) in service.compliances"
          :key="idx"
          class="flex w-full rounded-2xl bg-[#E0F0F4] p-4"
        >
          <Icon
            name="check-circle-broken"
            :size="16"
            class="mr-4 mt-1.5 inline-block text-primary"
          />
          <span class="text-lg font-semibold text-dark-additional">{{
            item
          }}</span>
        </div>
      </div>
    </div>
  </section>
  <section class="mb-12 sm:mb-[100px]">
    <div class="container-wrapp">
      <div
        class="mb-10 flex flex-col items-center justify-between gap-4 md:mb-16 md:flex-row"
      >
        <div class="text-center md:text-left">
          <div
            class="mb-3 inline-flex justify-center rounded-full bg-white px-4 py-1 text-center text-xs font-medium text-dark-text shadow-subtle sm:text-base md:text-left"
          >
            What Clients Say
          </div>
          <h3
            class="mb-4 text-center text-[32px] font-semibold leading-10 tracking-tight text-dark-additional sm:text-4xl sm:leading-[44px] md:text-left"
          >
            Don’t just take our word for it
          </h3>
          <p class="text-base font-semibold text-dark sm:text-xl">
            Hear from some of our amazing clients
          </p>
        </div>
        <client-only
          ><Button @click="scrollToElement('form')"
            >Book a 20-min Call</Button
          ></client-only
        >
      </div>
    </div>
    <div
      class="mx-auto ml-auto w-full max-w-full px-4 lg:max-w-[calc(100vw-((100vw-1280px)/2)-16px)] lg:p-0"
    >
      <div class="relative isolate">
        <client-only>
          <Swiper
            :items="service.testimonials"
            :slides-per-view="1"
            :autoplay="false"
            navigation
            loop
            :breakpoints="{ 1024: { slidesPerView: 1.63 } }"
          >
            <template #default="{ item }">
              <div class="rounded-2xl bg-secondary p-6 shadow-subtle">
                <div class="flex items-center">
                  <div class="flex flex-col sm:flex-row">
                    <div
                      class="mb-4 mr-6 h-[80] w-[80px] flex-[0_0_80px] overflow-hidden rounded-xl sm:mb-0 sm:h-[248px] sm:w-[248px] sm:flex-[0_0_248px]"
                    >
                      <img
                        v-if="item.image"
                        :src="item.image"
                        class="h-full w-full object-cover"
                        alt="user photo"
                      />
                      <div v-else class="h-full w-full bg-gray-50" />
                    </div>
                    <div class="flex flex-col justify-between">
                      <blockquote
                        class="mb-6 text-base font-bold text-dark-additional sm:mb-0 sm:text-2xl sm:leading-9"
                      >
                        {{ item.text }}
                      </blockquote>
                      <div class="flex items-center">
                        <img src="/images/vector2.png" alt="" />
                        <div class="ml-3">
                          <p class="font-bold text-dark-additional sm:text-lg">
                            {{ item.name }}
                          </p>
                          <p class="font-medium text-dark">
                            {{ item.position }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </Swiper>
        </client-only>
      </div>
    </div>
  </section>

  <Form
    title="Get More Reviews This Month"
    description="A steady flow of recent, credible reviews. We run the process so your team doesn’t have to."
  />

  <section id="faq" class="mb-16 sm:mb-[100px]">
    <div class="container-wrapp">
      <div
        class="mx-auto mb-3 w-max rounded-full bg-white px-4 py-1 text-xs font-medium text-dark-text shadow-subtle sm:text-base"
      >
        FAQ
      </div>
      <h3
        class="order-1 mb-5 text-center text-[32px] font-semibold leading-10 tracking-tight text-dark-additional sm:order-2 sm:mb-8 sm:text-4xl sm:leading-[44px]"
      >
        Frequently Asked Questions
      </h3>

      <Accordion :faqs="service.faqs" />
    </div>
  </section>
</template>

<script setup lang="ts">
import servicesData from '../../../public/data/services.json';

const Swiper = defineAsyncComponent(
  () => import('~/components/pages/Swiper.vue')
);
const Accordion = defineAsyncComponent(
  () => import('~/components/pages/Accordion.vue')
);
const Form = defineAsyncComponent(() => import('~/components/layout/Form.vue'));
const Companies = defineAsyncComponent(
  () => import('~/components/pages/Companies.vue')
);
const Card = defineAsyncComponent(() => import('~/components/pages/Card.vue'));
const Icon = defineAsyncComponent(() => import('@/UIKit/Icon.vue'));
const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));

const route = useRoute();
const { scrollToElement } = useScrollTo();

const service = computed(() => {
  const item = servicesData.find(
    (item: { slug: string }) => item.slug === route.params.slug
  );

  return item?.data || {};
});
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

.vector {
  position: relative;
}

.vector span:first-child {
  content: '';
  background-image: url('/images/vector.png');
  background-repeat: no-repeat;
  position: absolute;
  object-fit: cover;
  top: 50%;
  transform: translateY(-50%);
  right: 1px;
  left: 1px;
  width: 50%;
  height: 1px;
}
</style>

<style>
.line span {
  color: #0098c5;
}
</style>
