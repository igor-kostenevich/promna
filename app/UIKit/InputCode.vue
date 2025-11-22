<template>
  <div
    class="inline-flex flex-col"
    :class="{
      'input-code--has-error': $slots.default || props?.hasError,
      'input-code--disabled': disabled,
    }"
  >
    <div class="flex justify-center" :style="{ gap: `${gap}px` }">
      <template v-for="(v, index) in values" :key="index">
        <input
          :ref="
            (el) => {
              if (el) {
                inputs[index + 1] = el as HTMLInputElement;
              }
            }
          "
          type="number"
          pattern="[0-9]"
          :style="{
            width,
            height: `${props.fieldHeight}px`,
          }"
          :autoFocus="autoFocus && index === autoFocusIndex"
          :data-id="index"
          class="appearance-none rounded-md border border-gray-secondary text-center outline-none transition-all hover:border-gray-additional active:border-gray-pressed"
          :value="v"
          maxlength="1"
          :required="props.required"
          :disabled="props.disabled"
          @input="onValueChange"
          @focus="onFocus"
          @keydown="onKeyDown"
        />
      </template>
    </div>
    <span class="mt-1 text-sm text-gray-text"
      >Enter the {{ fields }}-digit code from your email</span
    >

    <div
      v-if="$slots.errorMessage"
      class="mt-1 block text-sm leading-5 text-red"
    >
      <slot name="errorMessage" />
    </div>
  </div>
</template>

<script lang="ts" setup>
// https://github.com/zlayine/vue3-verification-code-input

import { defineProps, defineEmits, ref, toRef, onBeforeUpdate } from 'vue';

interface IInputCodeProps {
  fields?: number;
  fieldWidth?: number | null;
  fieldHeight?: number;
  gap?: number;
  disabled?: boolean;
  required?: boolean;
  hasError?: boolean;
}

const props = withDefaults(defineProps<IInputCodeProps>(), {
  fields: 6,
  fieldWidth: 56,
  fieldHeight: 56,
  gap: 8,
  disabled: false,
  required: true,
});

const emit = defineEmits(['change', 'complete']);

const KEY_CODE = {
  backspace: 8,
  delete: 46,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
};

const values = ref<string[]>([]);
const iRefs = ref<number[]>([]);
const inputs = ref<Record<number, HTMLInputElement | null>>({});
const fields = toRef(props, 'fields');
const autoFocusIndex = ref(0);
const autoFocus = true;

const width = computed(() =>
  props.fieldWidth ? `${props.fieldWidth}px` : '100%'
);

const initVals = () => {
  let vals;
  if (values.value && values.value.length) {
    vals = [];
    for (let i = 0; i < fields.value; i++) {
      vals.push(values.value[i] || '');
    }
    autoFocusIndex.value =
      values.value.length >= fields.value ? 0 : values.value.length;
  } else {
    vals = Array(fields.value).fill('');
  }

  iRefs.value = [];

  for (let i = 0; i < fields.value; i++) {
    iRefs.value.push(i + 1);
  }
  values.value = vals;
};

const onFocus = (e: FocusEvent) => {
  const target = e.target as HTMLInputElement;
  target.select();
};

const onValueChange = (e: Event) => {
  const target = e.target as HTMLInputElement;

  const index = parseInt(target.dataset.id || '0', 10);
  target.value = target.value.replace(/[^\d]/gi, '');
  if (target.value === '' || !target.validity.valid) {
    return;
  }

  let next: number | undefined;
  const value = target.value;
  values.value = Object.assign([], values.value);

  if (value.length > 1) {
    let nextIndex = value.length + index - 1;
    if (nextIndex >= fields.value) {
      nextIndex = fields.value - 1;
    }
    next = iRefs.value[nextIndex];
    const split = value.split('');
    split.forEach((item, i) => {
      const cursor = index + i;
      if (cursor < fields.value) {
        values.value[cursor] = item;
      }
    });
  } else {
    next = iRefs.value[index + 1];
    values.value[index] = value;
  }

  if (next !== undefined) {
    const element = inputs.value[next];
    element?.focus();
    element?.select();
  }

  triggerChange(values.value);
};

const onKeyDown = (e: KeyboardEvent) => {
  const target = e.target as HTMLInputElement;
  const index = parseInt(target.dataset.id || '0', 10);
  const prevIndex = index - 1;
  const nextIndex = index + 1;
  const prev = iRefs.value[prevIndex];
  const next = iRefs.value[nextIndex];

  // TODO: replace keyCode with key
  switch (e.keyCode) {
    case KEY_CODE.backspace: {
      e.preventDefault();
      const vals = [...values.value];
      if (values.value[index]) {
        vals[index] = '';
        values.value = vals;
        triggerChange(vals);
      } else if (prev) {
        vals[prevIndex] = '';
        inputs.value[prev]?.focus();
        values.value = vals;
        triggerChange(vals);
      }
      break;
    }
    case KEY_CODE.delete: {
      e.preventDefault();
      const vals = [...values.value];
      if (values.value[index]) {
        vals[index] = '';
        values.value = vals;
        triggerChange(vals);
      } else if (next) {
        vals[nextIndex] = '';
        inputs.value[next]?.focus();
        values.value = vals;
        triggerChange(vals);
      }
      break;
    }
    case KEY_CODE.left:
      e.preventDefault();
      if (prev) {
        inputs.value[prev]?.focus();
      }
      break;
    case KEY_CODE.right:
      e.preventDefault();
      if (next) {
        inputs.value[next]?.focus();
      }
      break;
    case KEY_CODE.up:
    case KEY_CODE.down:
      e.preventDefault();
      break;
    default:
      // this.handleKeys[index] = true;
      break;
  }
};

const triggerChange = (val: string[] = values.value) => {
  const joined = val.join('');

  emit('change', joined);
  emit('complete', joined.length >= fields.value);
};

initVals();

onBeforeUpdate(() => {
  inputs.value = [];
});
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
