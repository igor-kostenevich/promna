<template>
  <header class="fixed left-0 right-0 top-2 z-50 px-1.5 lg:top-6">
    <div
      class="mx-auto flex w-full max-w-[1232px] items-center justify-between gap-4 rounded-full bg-white p-2 pl-4 lg:p-2.5 lg:pl-8"
    >
      <nuxt-link to="/">
        <img
          class="max-w-[108px] lg:max-w-[145px]"
          src="/images/logo.png"
          alt="logo"
        />
      </nuxt-link>
      <nav class="hidden lg:block">
        <ul class="flex items-center gap-[26px]">
          <li class="border-r border-[#EFEFEF] pr-[26px]">
            <div
              to="/about"
              class="group relative inline-flex cursor-pointer items-center text-sm font-semibold text-dark-additional"
            >
              Services
              <Icon
                name="chevron-down"
                :size="12"
                class="ml-1.5 inline-block rotate-180 group-hover:rotate-0"
              />

              <div
                v-if="isOpen"
                class="pointer-events-none absolute left-20 top-0 -translate-x-1/2 pt-[45px] opacity-0 transition-[opacity,transform] group-hover:pointer-events-auto group-hover:opacity-100 group-hover:duration-300"
              >
                <div
                  class="w-[576px] translate-y-0 transform rounded-2xl bg-white p-6 shadow-sm transition-[opacity,transform] group-hover:translate-y-[7px] group-hover:duration-300"
                >
                  <nav class="grid grid-cols-2 gap-2">
                    <nuxt-link
                      v-for="link in services"
                      :key="link.slug"
                      :to="'/services/' + link.slug"
                      class="group/icon flex items-center rounded-2xl p-2 transition-all hover:bg-secondary hover:shadow-subtle"
                      @click="closeMenu"
                    >
                      <div
                        class="mr-4 inline-flex rounded-full border border-gray p-2.5 group-hover/icon:border-transparent group-hover/icon:bg-white"
                      >
                        <Icon
                          :name="link.icon"
                          class="text-primary"
                          :size="24"
                        />
                      </div>
                      <p class="font-bold">{{ link.title }}</p>
                    </nuxt-link>
                  </nav>
                </div>
              </div>
            </div>
          </li>
          <li
            v-for="item in blocksList"
            :key="item.name"
            class="z-20 cursor-pointer"
            @click="scrollToElement(item.link)"
          >
            <div to="/" class="text-sm font-semibold text-dark-additional">
              {{ item.name }}
            </div>
          </li>
        </ul>
      </nav>
      <div class="hidden lg:block">
        <Button @click="scrollToElement('form')">Book a 20-min Call</Button>
      </div>
      <div class="flex items-center gap-2 lg:!hidden">
        <Button class="h-[36px] text-sm" @click="scrollToElement('form')"
          >Book a Call</Button
        >
        <Button
          color="neutral"
          :icon-before="isMobileMenuOpen ? 'cross' : 'menu'"
          :icon-size="20"
          class="h-[36px] w-[36px] rounded-full p-0 lg:!hidden"
          @click="toggleMobileMenu"
        />
      </div>

      <nav
        v-if="isMobileMenuOpen"
        class="absolute left-2 right-2 top-[62px] rounded-[28px] bg-white p-6 shadow-lg lg:hidden"
      >
        <div
          class="border-b border-[#EFEFEF] py-4 text-sm font-semibold text-dark-additional"
        >
          <div
            class="flex w-full items-center justify-between"
            @click="isMobileSubmenuOpened = !isMobileSubmenuOpened"
          >
            Services
            <icon
              name="chevron-down"
              :size="12"
              class="ml-1.5 inline-block"
              :class="isMobileSubmenuOpened ? 'rotate-0' : 'rotate-180'"
            />
          </div>

          <nav
            class="grid grid-cols-1 gap-2"
            :class="[
              'overflow-hidden transition-all duration-300 ease-in-out',
              isMobileSubmenuOpened
                ? 'mt-4 max-h-[500px] opacity-100'
                : 'max-h-0 opacity-0',
            ]"
          >
            <nuxt-link
              v-for="link in services"
              :key="link.slug"
              :to="'/services/' + link.slug"
              class="group/icon flex items-center rounded-2xl p-2 transition-all hover:bg-secondary hover:shadow-subtle"
              @click="toggleMobileMenu"
            >
              <div
                class="mr-4 inline-flex rounded-full border border-gray p-2.5 group-hover/icon:border-transparent group-hover/icon:bg-white"
              >
                <Icon :name="link.icon" class="text-primary" :size="24" />
              </div>
              <p class="font-bold">{{ link.title }}</p>
            </nuxt-link>
          </nav>
        </div>
        <div
          v-for="item in blocksList"
          :key="item.name"
          class="border-b border-[#EFEFEF] py-4 text-sm font-semibold text-dark-additional last:border-none last:pb-0"
          @click="scrollToElement(item.link)"
        >
          {{ item.name }}
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup langs="ts">
import servicesData from '../../public/data/services.json';

const Icon = defineAsyncComponent(() => import('@/UIKit/Icon.vue'));
const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));

const isMobileMenuOpen = ref(false);
const isMobileSubmenuOpened = ref(false);
const isOpen = ref(true);
const { scrollToElement } = useScrollTo();

const route = useRoute();

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

const services = ref(servicesData);

const mainPageList = [
  { name: 'Proof', link: 'proof' },
  { name: 'How We Work', link: 'how-work' },
];

const templatePageList = [
  { name: 'What You Get', link: 'what-get' },
  { name: 'How It Works', link: 'works' },
  { name: 'Pricing', link: 'pricing' },
  { name: 'FAQ', link: 'faq' },
];

const blocksList = computed(() => {
  return route.path === '/' ? mainPageList : templatePageList;
});

function closeMenu() {
  isOpen.value = false;

  setTimeout(() => {
    isOpen.value = true;
  }, 300);
}
</script>
