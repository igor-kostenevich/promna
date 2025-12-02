<template>
  <footer class="border-t border-gray-border pt-6 sm:pt-8">
    <div class="container-wrapp">
      <div
        class="flex flex-wrap justify-between gap-5 pb-6 sm:pb-[72px] md:flex-nowrap"
      >
        <div>
          <div class="mb-6 md:mb-3">
            <img class="max-w-[145px]" src="/images/logo.png" alt="logo" />
          </div>
          <p
            class="max-w-[405px] text-base font-bold leading-6 text-dark-additional sm:text-xl sm:leading-7"
          >
            © 2025 Processive — Ongoing review management for B2B companies
          </p>
        </div>
        <div class="flex flex-wrap gap-8 md:flex-nowrap lg:gap-[53px]">
          <nav>
            <p
              class="mb-4 text-sm font-bold uppercase tracking-wider text-dark-light"
            >
              SERVICES
            </p>
            <ul class="grid gap-2">
              <li v-for="link in links" :key="link.name">
                <nuxt-link
                  class="font-bold text-dark-additional"
                  :to="link.to"
                  >{{ link.name }}</nuxt-link
                >
              </li>
            </ul>
          </nav>
          <nav>
            <p
              class="mb-4 text-sm font-bold uppercase tracking-wider text-dark-light"
            >
              Legal
            </p>
            <ul class="grid gap-2">
              <li>
                <nuxt-link
                  class="font-bold text-dark-additional"
                  to="/privacy-policy"
                  >Privacy Policy</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  class="font-bold text-dark-additional"
                  to="/terms-and-conditions"
                  >Terms & Conditions</nuxt-link
                >
              </li>
            </ul>
          </nav>
          <nav>
            <p
              class="mb-4 text-sm font-bold uppercase tracking-wider text-dark-light"
            >
              Get in touch
            </p>
            <ul class="grid gap-2">
              <li class="flex items-center">
                <a class="font-bold text-dark" href="mailto:info@processive.com"
                  >info@processive.com</a
                >
              </li>
              <li>
                <a target="_blank" href="https://linkedin.com">
                  <Icon name="linkedin" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div
        class="flex flex-wrap items-center justify-between gap-6 border-t border-gray-border py-7"
      >
        <p class="font-semibold text-gray-light">
          Processive is a brand of Promna OU, registered in Estonia. Reg. No.
          1234567, Tallinn, Estonia.
        </p>
        <div class="flex items-center">
          <span class="mr-4 font-semibold text-gray-light">Back to Top</span>
          <Button
            color="neutral"
            icon-before="arrow-top"
            :icon-size="20"
            @click="upToTop"
          />
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import servicesData from '../../../public/data/services.json';

const Icon = defineAsyncComponent(() => import('@/UIKit/Icon.vue'));
const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));

function upToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const links = servicesData.map((service: any) => ({
  name: service.footerName,
  to: `/services/${service.slug}`,
}));
</script>
