<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/css/autoplay';
import 'swiper/css';

const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  slidesPerView: {
    type: Number,
    default: 1,
  },
  loop: {
    type: Boolean,
    default: false,
  },
  autoplay: {
    type: [Object, Boolean],
    default: () => ({ delay: 1000, pauseOnMouseEnter: false }),
  },
  spaceBetween: {
    type: Number,
    default: 20,
  },
  speed: {
    type: Number,
    default: 500,
  },
  slidesPerGroup: {
    type: Number,
    default: 1,
  },
  allowTouchMove: {
    type: Boolean,
    default: true,
  },
  navigation: {
    type: Boolean,
    default: false,
  },
  pagination: {
    type: Boolean,
    default: false,
  },
  breakpoints: {
    type: Object,
    default: () => ({}),
  },
});

const swiperInstance = ref(null);
const modules = [Autoplay];
const currentSlide = ref(1);

function onSwiper(swiper: any) {
  swiperInstance.value = swiper;
}

function onSlideChange(swiper: any) {
  currentSlide.value = Math.ceil(swiper.realIndex / props.slidesPerGroup) + 1;
}

function prevSlide() {
  if (swiperInstance.value) {
    swiperInstance.value.slidePrev();
  }
}

function nextSlide() {
  if (swiperInstance.value) {
    swiperInstance.value.slideNext();
  }
}
</script>

<template>
  <div class="relative">
    <swiper
      :slides-per-view="slidesPerView"
      :loop="loop"
      :autoplay="autoplay"
      :modules="modules"
      :space-between="spaceBetween"
      :speed="speed"
      :navigation="navigation"
      :pagination="pagination"
      :slides-per-group="slidesPerGroup"
      :allow-touch-move="allowTouchMove"
      :breakpoints="breakpoints"
      class="swiper-container"
      @swiper="onSwiper"
      @slide-change="onSlideChange"
    >
      <swiper-slide
        v-for="(item, idx) in items"
        :key="idx"
        class="!h-auto p-px text-white"
      >
        <slot :item="item" />
      </swiper-slide>
    </swiper>
    <div
      class="pointer-events-none absolute right-0 top-0 z-10 hidden h-full w-40 bg-gradient-to-l from-white via-white/40 to-transparent lg:block"
    />
  </div>

  <div
    v-if="navigation"
    class="swiper-navigation mt-6 flex items-center justify-center sm:mt-8 sm:justify-start"
  >
    <button class="mr-4 rotate-180 transform" @click="prevSlide">
      <Button color="neutral" icon-before="arrow-right" />
    </button>
    <button @click="nextSlide">
      <Button color="neutral" icon-before="arrow-right" />
    </button>
  </div>
</template>
