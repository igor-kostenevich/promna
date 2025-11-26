<template>
  <label
    class="relative min-h-[144px] w-full rounded-2xl bg-white px-5 py-3 pb-[15px] shadow-white-spread"
  >
    <div
      v-if="$slots.topTextLeft || $slots.topTextRight"
      class="flex items-center justify-between gap-2"
    >
      <span
        v-if="$slots.errorMessage"
        :id="errorId"
        class="text-xs font-semibold leading-5 text-red"
      >
        <slot name="errorMessage" />
      </span>
      <span
        v-if="!$slots.errorMessage && $slots.topTextLeft"
        class="text-xs font-semibold leading-5 text-gray-dark"
        :class="{
          'text-gray-disabled': disabled,
        }"
      >
        <slot name="topTextLeft" />
      </span>
      <span
        v-if="$slots.topTextRight"
        class="text-xs font-semibold leading-5 text-gray-dark"
        :class="{
          'text-gray-disabled': disabled,
        }"
      >
        <slot name="topTextRight" />
      </span>
    </div>

    <div class="relative flex w-full transition-colors">
      <textarea
        v-bind="$attrs"
        :id="textareaId"
        ref="textarea"
        v-model="value"
        class="w-full resize-none bg-transparent font-semibold leading-6 placeholder-dark/60 outline-none"
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
        v-if="showCounter && typeof maxlength === 'number'"
        class="text-gray-text ml-auto block text-sm leading-5"
      >
        {{ (value || '').length }} / {{ maxlength }}
      </span>
    </div>
  </label>
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
