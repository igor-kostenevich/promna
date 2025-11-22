<template>
  <div
    class="relative w-full"
    :class="{
      'pointer-events-none': disabled,
    }"
  >
    <div
      v-if="$slots.topTextLeft || $slots.topTextRight"
      class="mb-0.5 flex items-center justify-between gap-2"
    >
      <span
        v-if="$slots.topTextLeft"
        class="leading-6 text-black/70"
        :class="{
          'text-gray-disabled': disabled,
        }"
      >
        <slot name="topTextLeft" />
      </span>
      <span
        v-if="$slots.topTextRight"
        class="leading-6 text-black/70"
        :class="{
          'text-gray-disabled': disabled,
        }"
      >
        <slot name="topTextRight" />
      </span>
    </div>

    <div
      class="relative flex h-[30px] w-full items-center border-b border-gray-secondary transition-colors hover:border-gray-additional active:border-gray-pressed"
      :class="{
        'border-red': $slots.errorMessage,
        'border-gray-disabled': disabled,
        '!border-gray-pressed': isFocused && !$slots.errorMessage && !disabled,
      }"
    >
      <input
        ref="input"
        v-model="value"
        v-bind="$attrs"
        class="h-full w-full border-none bg-transparent text-sm leading-6 placeholder-gray-opacity outline-none hover:placeholder-gray-text focus:placeholder-gray-opacity"
        :class="[
          {
            'text-black': !isFocused && !$slots.errorMessage,
            'text-gray-disabled placeholder:text-gray-disabled': disabled,
            'pr-6': !icon && !hideClearBtn,
            'pr-12': icon && !hideClearBtn,
          },
        ]"
        :type="computedType"
        :required="required"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :name="'input-' + value"
        :maxlength="maxlength"
        :pattern="pattern"
        :title="title"
        @click="selectAll"
        @focusin="(e: FocusEvent) => emit('focusin', e)"
        @focusout="(e: FocusEvent) => emit('focusout', e)"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />

      <div
        class="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-1.5"
      >
        <button
          v-if="value && !hideClearBtn && !disabled && !readonly"
          type="button"
          class="text-gray transition-colors hover:text-black"
          @click.stop="onClear"
        >
          <Icon type="cross" class="text-gray-opacity" :size="20" />
        </button>

        <Icon
          v-if="icon"
          class="pointer-events-none text-gray-opacity"
          :type="icon"
          :size="20"
        />

        <button
          v-if="type === 'password'"
          type="button"
          class="text-gray transition-colors hover:text-black"
          @click="passwordRevealed = !passwordRevealed"
        >
          <Icon
            class="text-gray-opacity"
            :type="passwordRevealed ? 'eye' : 'eye-closed'"
            :size="20"
          />
        </button>
      </div>

      <!-- <SlotButton v-if="$slots.default" /> -->
    </div>

    <span
      v-if="$slots.additionalMessage && !$slots.errorMessage"
      class="mt-1 block text-sm leading-5 text-gray-text"
    >
      <slot name="additionalMessage" />
    </span>
    <span
      v-if="$slots.errorMessage"
      class="mt-1 block text-sm leading-5 text-red"
    >
      <slot name="errorMessage" />
    </span>
    <span v-if="$slots.infoText" class="mt-3 block text-sm leading-5">
      <slot name="infoText" />
    </span>
  </div>
</template>

<script setup lang="ts">
import type { DirectiveNumber } from '~/directives/directive-number';
import type { TInputType } from '@/types/components';

const Icon = defineAsyncComponent(() => import('@/UIKit/Icon.vue'));

defineOptions({ inheritAttrs: false });

let DirectiveNumber: DirectiveNumber;

interface IInputProps {
  modelValue: any;
  placeholder?: string;
  type?: TInputType;
  icon?: string | null;
  coin?: string | null;
  maxlength?: number;
  required?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  hideClearBtn?: boolean;
  pattern?: string;
  title?: string;

  minus?: boolean; // for directive v-number
  point?: boolean; // for directive v-number
  min?: number; // for directive v-number
  max?: number; // for directive v-number
  allowStartZero?: boolean; // for directive v-number
}

const props = withDefaults(defineProps<IInputProps>(), {
  type: 'text',
  required: false,
  readonly: false,
  disabled: false,
  hideClearBtn: true,

  minus: false,
  point: false,
  min: -10000000000000000000,
  max: 10000000000000000000,
  allowStartZero: false,
});

const emit = defineEmits([
  'update:modelValue',
  'focusin',
  'focusout',
  'on-clear',
]);

const observer = ref();
const input = useTemplateRef<HTMLInputElement>('input');
const value = defineModel<string | number>({ default: '' });
const isFocused = ref<boolean>(false);

const passwordRevealed = ref<boolean>(false);
const computedType = computed<TInputType>(() => {
  switch (props.type) {
    case 'password':
      return passwordRevealed.value ? 'text' : 'password';
    case 'number':
      return 'text';
    default:
      return props.type;
  }
});

/**
 * Override the button props passed through the slot
 */

// const slots = useSlots();

// const SlotButton = defineComponent({
//   render: () => {
//       const data = slots.default?.()[0];

//       if (data) {
//           data.props = {
//               ...data.props,
//               color: 'primary',
//               disabled: props.disabled,
//               size: 'sm',
//           };
//       }

//       return data;
//   },
// });

const selectAll = () => {
  input.value?.select();
};

function onClear() {
  emit('update:modelValue', '');
  emit('on-clear');
}

function handleFocus() {
  input.value?.focus();

  nextTick(() => {
    input.value?.click();
  });
}

async function prepareDirective() {
  // Load directive
  DirectiveNumber = await import('~/directives/directive-number').then(
    (m) => m.default
  );

  // Apply directive
  DirectiveNumber.mounted(input.value!, {
    value: {
      min: props.min,
      max: props.max,
      allowStartZero: props.allowStartZero,
    },
    modifiers: { point: props.point, minus: props.minus },
  });
}

onMounted(async () => {
  if (props.type === 'number' && input.value) {
    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            prepareDirective();

            observer.value.unobserve(input.value);
          }
        });
      },
      { threshold: 0 }
    );

    observer.value.observe(input.value);
  }

  if(props.modelValue) {
    input.value?.focus();
    input.value?.blur();
  }
});

onBeforeUnmount(() => {
  if (DirectiveNumber && input.value) {
    // Destroy directive
    DirectiveNumber.beforeUnmount(input.value);
  }

  if (observer.value && input.value) {
    observer.value.unobserve(input.value);
  }
});

defineExpose({ handleFocus });
</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
