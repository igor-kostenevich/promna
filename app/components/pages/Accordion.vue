<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';

interface FAQ {
  question: string;
  answer: string;
}

defineProps<{
  faqs: FAQ[];
}>();

const openIndex = ref<number | null>(null);

function handleToggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index;
}

function beforeEnter(el: Element) {
  const elH = el as HTMLElement;
  elH.style.maxHeight = '0';
  elH.style.overflow = 'hidden';
}

function enter(el: Element) {
  const elH = el as HTMLElement;
  elH.style.transition = 'max-height 0.3s ease';
  elH.style.maxHeight = elH.scrollHeight + 'px';
}

function leave(el: Element) {
  const elH = el as HTMLElement;
  elH.style.transition = 'max-height 0.3s';
  elH.style.maxHeight = '0';

  requestAnimationFrame(() => {
    elH.style.maxHeight = '0';
  });
}
</script>

<template>
  <Disclosure
    v-for="(item, index) in faqs"
    :key="index"
    class="mx-auto mb-2 max-w-[616px] rounded-2xl bg-secondary shadow-subtle last:mb-0 hover:bg-secondary/90"
    as="div"
  >
    <DisclosureButton
      class="text-dark-secondary flex h-full w-full cursor-pointer items-center justify-between p-6 text-left text-base font-bold focus:outline-none sm:text-lg"
      as="div"
      @click="handleToggle(index)"
    >
      <span>{{ item.question }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="ml-6 h-5 w-5 min-w-5 text-dark transition-transform"
        :class="openIndex === index ? 'rotate-180 text-dark' : 'rotate-0'"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 0 1 1.414 0l3.293 3.293
            3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414
            0l-4-4a1 1 0 0 1 0-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </DisclosureButton>
    <DisclosurePanel static>
      <transition @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div
          v-show="openIndex === index"
          class="spoller max-w-[90%] overflow-hidden px-6 leading-relaxed text-dark sm:text-base"
        >
          <div class="pb-6 text-base sm:text-lg" v-html="item.answer" />
        </div>
      </transition>
    </DisclosurePanel>
  </Disclosure>
</template>
