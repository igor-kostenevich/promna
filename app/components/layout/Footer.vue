<template>
  <footer class="border-t border-gray-border pt-6 sm:pt-8">
    <div class="container">
      <div
        class="flex flex-wrap justify-between gap-5 pb-6 sm:pb-[72px] md:flex-nowrap"
      >
        <div>
          <div class="mb-6 md:mb-3">
            <img src="/images/logo.png" alt="logo" />
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
              <li>
                <nuxt-link class="font-bold text-dark-additional" to="/"
                  >RevOps</nuxt-link
                >
              </li>
              <li>
                <nuxt-link class="font-bold text-dark-additional" to="/"
                  >CRM Hygiene</nuxt-link
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
                <nuxt-link class="font-bold text-dark-additional" to="/"
                  >Privacy Policy</nuxt-link
                >
              </li>
              <li>
                <nuxt-link class="font-bold text-dark-additional" to="/"
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
                <a
                  class="font-bold text-dark"
                  href="mailto:hello@processive.com"
                  >hello@processive.com</a
                >
                <span class="mx-4 inline-flex h-1 w-1 bg-dark" />
                <Icon name="linkedin" />
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
const Icon = defineAsyncComponent(() => import('@/UIKit/Icon.vue'));
const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));

function upToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>
