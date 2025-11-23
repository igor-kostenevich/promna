<template>
  <div
    v-if="color === 'primary'"
    class="p-px rounded-[60px] bg-gradient-to-t from-primary-hover to-primary-hover/0 shadow-button relative"
  >
      <component :is="as" v-bind="buttonAttrs" ref="btn-ref">
        <Icon
          v-if="loading"
          class="animate-spin"
          :size="iconSizeComp"
          name="loading"
        />
        <Icon
          v-if="iconBefore"
          :type="iconBefore"
          :size="iconSizeComp"
          :color="iconColor"
        />

        <span v-if="slots.default" class="relative z-20" >
          <slot />
        </span>

        <Icon
          v-if="iconAfter && slots.default"
          :type="iconAfter"
          :size="iconSizeComp"
          :color="iconColor"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-primary to-primary/30 rounded-[60px] pointer-events-none"></div>
        <div
          class="absolute inset-0 rounded-[60px] bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 group-active:bg-black/20 z-10 pointer-events-none"
        ></div>
      </component>
  </div>
  <div
    v-if="color === 'secondary'"
    class="rounded-full shadow-button-secondary relative"
  >
      <component :is="as" v-bind="buttonAttrs" ref="btn-ref">
        <Icon
          v-if="loading"
          class="animate-spin"
          :size="iconSizeComp"
          name="loading"
        />
        <Icon
          v-if="iconBefore"
          :type="iconBefore"
          :size="iconSizeComp"
          :color="iconColor"
        />

        <span v-if="slots.default" class="relative z-20" >
          <slot />
        </span>

        <Icon
          v-if="iconAfter && slots.default"
          :type="iconAfter"
          :size="iconSizeComp"
          :color="iconColor"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-primary to-primary/0 rounded-[60px] pointer-events-none z-[-1]"></div>
        <div
          class="absolute inset-0 rounded-[60px] bg-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-active:bg-black/5 z-10 pointer-events-none"
        ></div>
      </component>
  </div>
  <component v-else :is="as" v-bind="buttonAttrs" ref="btn-ref">
    <Icon
      v-if="loading"
      class="animate-spin"
      :size="iconSizeComp"
      name="loading"
    />
    <Icon
      v-if="iconBefore"
      :type="iconBefore"
      :size="iconSizeComp"
      :color="iconColor"
    />

    <span v-if="slots.default">
      <slot />
    </span>

    <Icon
      v-if="iconAfter && slots.default"
      :type="iconAfter"
      :size="iconSizeComp"
      :color="iconColor"
    />
  </component>
</template>

<script lang="ts" setup>
import type { TButtonColor, TButtonSize } from '~/types/components';
const Icon = defineAsyncComponent(() => import('@/UIKit/Icon.vue'));

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();
const slots = useSlots();

type TButtonProps = {
  type?: 'button' | 'submit';
  to?: string | object;
  disabled?: boolean;
  external?: boolean;
  size?: TButtonSize;
  color?: TButtonColor;
  loading?: boolean;
  iconBefore?: string;
  iconAfter?: string;
  fullwidth?: boolean;
  iconSize?: number;
  iconColor?: string;
  rel?: 'noopener' | 'noreferrer' | 'nofollow';
};
const props = withDefaults(defineProps<TButtonProps>(), {
  type: 'button',
  size: 'md',
  color: 'primary',
  external: false,
  iconSize: 0,
  disabled: false,
  loading: false,
  fullwidth: false,
});

const as = computed(() => {
  return props.to ? resolveComponent('NuxtLink') : 'button';
});

interface IButtonAttrs {
  style?: unknown;
  class: unknown;
  to?: string | object;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: (e: MouseEvent) => void;
}

// 🟢 For access to <Button ref="btn" /> by ref
const btn = useTemplateRef('btn-ref');
defineExpose({
  btn,
});

const buttonAttrs = computed<IButtonAttrs>(() => {
  const baseAttrs: IButtonAttrs = {
    disabled: props.disabled,
    style: attrs?.style,
    class: [
      attrs.class,
      'inline-flex items-center justify-center font-semibold transition-all duration-200 disabled:cursor-not-allowed gap-2',

      // size
      props.size === 'md' && slots.default && 'px-7 py-[14px]',

      // color (feel free to adjust to your palette)
      props.color === 'primary' && 'group text-white inline-flex items-center bg-primary py-[14px] px-7 rounded-[60px]',
      props.color === 'secondary' && 'group text-primary py-4 px-[55px] bg-white/80 rounded-[60px] text-lg',
      // loading state
      props.loading && 'opacity-50 pointer-events-none',
      !slots.default && props.size === 'lg' && 'p-3.5',
      !slots.default && props.size === 'md' && 'p-3',

      // fullwidth
      props.fullwidth && 'w-full',
    ],
    onClick: attrs?.onClick as (e: MouseEvent) => void,
  };

  if (props.to) {
    baseAttrs.to = props.to;
    if (props.external) baseAttrs.target = '_blank';
    if (props.rel) baseAttrs.rel = props.rel;
  } else {
    baseAttrs.type = props.type;
  }
  return baseAttrs;
});

const iconSizeComp = computed(() => {
  const sizes = {
    md: 16,
    lg: 20,
  };

  return props.iconSize || sizes[props.size || 'md'];
});
</script>
