<template>
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
      'inline-flex items-center justify-center font-bold transition-colors duration-200 disabled:cursor-not-allowed rounded-[45px] gap-2',

      // size
      props.size === 'md' && slots.default && 'text-sm px-4 py-2.5 leading-5',
      props.size === 'lg' && slots.default && 'text-base px-5 py-3 leading-6',

      // color (feel free to adjust to your palette)
      props.color === 'primary' &&
        'bg-primary text-green-light hover:bg-primary-hover active:bg-primary-pressed disabled:bg-gray disabled:text-white',
      props.color === 'secondary' &&
        'bg-green text-primary hover:text-primary-text active:text-primary hover:bg-green-hover active:bg-green-pressed disabled:bg-gray disabled:text-white',
      props.color === 'neutral' &&
        'bg-white text-dark outline outline-gray-dark text-black hover:bg-gray-hover active:bg-white active:outline-gray-pressed disabled:bg-gray-light disabled:outline-none disabled:text-gray-opacity',
      props.color === 'accent' &&
        'bg-light hover:bg-light-hover active:bg-light-pressed disabled:bg-gray-light text-secondary hover:text-secondary-hover active:text-secondary-pressed disabled:text-gray-opacity',
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
