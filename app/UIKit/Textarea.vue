<template>
  <div
    class="relative w-full"
    :class="{
      'pointer-events-none opacity-40': disabled,
      'text-red': $slots.errorMessage,
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
      class="relative flex w-full border border-gray-secondary transition-colors hover:border-gray-additional active:border-gray-pressed"
      :class="{
        'border-red': $slots.errorMessage,
        'border-gray-light': disabled,
        '!border-gray-pressed': isFocused && !$slots.errorMessage && !disabled,
      }"
    >
      <textarea
        v-bind="$attrs"
        :id="textareaId"
        ref="textarea"
        v-model="value"
        class="min-h-[156px] w-full resize-none bg-transparent px-3 py-1.5 leading-6 placeholder-gray-opacity outline-none hover:placeholder-gray-text focus:placeholder-gray-opacity"
        :class="[
          {
            'text-black': !isFocused && !$slots.errorMessage,
          },
        ]"
        :required="required"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :title="title"
        :name="name"
        :aria-invalid="Boolean($slots.errorMessage)"
        :aria-describedby="errorId"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @focusin="(e: FocusEvent) => emit('focusin', e)"
        @focusout="(e: FocusEvent) => emit('focusout', e)"
      />

      <button
        v-if="value && !hideClearBtn && !disabled && !readonly"
        type="button"
        class="absolute right-4 top-3 text-gray transition-colors hover:text-black"
        aria-label="Clear textarea"
        @click.stop="onClear"
      >
        <Icon name="cross" :size="20" />
      </button>
    </div>

    <div class="mt-1 flex items-center justify-between">
      <span
        v-if="$slots.errorMessage"
        :id="errorId"
        class="block text-sm leading-5 text-red"
      >
        <slot name="errorMessage" />
      </span>

      <span
        v-if="showCounter && typeof maxlength === 'number'"
        class="ml-auto block text-sm leading-5 text-gray-text"
      >
        {{ (value || '').length }} / {{ maxlength }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const generatedId = useId();
const Icon = defineAsyncComponent(() => import('@/UIKit/Icon.vue'));
defineOptions({ inheritAttrs: false });

interface ITextareaProps {
  modelValue: string;
  placeholder?: string;
  maxlength?: number;
  required?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  hideClearBtn?: boolean;
  id?: string;
  title?: string;
  name?: string;
  showCounter?: boolean;
}

const props = withDefaults(defineProps<ITextareaProps>(), {
  required: false,
  readonly: false,
  disabled: false,
  hideClearBtn: true,
  showCounter: false,
});

const emit = defineEmits([
  'update:modelValue',
  'focusin',
  'focusout',
  'on-clear',
]);

const textarea = useTemplateRef<HTMLTextAreaElement>('textarea');
const textareaId = computed(() => props.id || `textarea-${generatedId}`);
const value = defineModel<string>({ default: '' });
const isFocused = ref(false);
const errorId = computed(() => `${textareaId.value}-error`);

function onClear() {
  emit('update:modelValue', '');
  emit('on-clear');
}

defineExpose({ focus: () => textarea.value?.focus() });
</script>
