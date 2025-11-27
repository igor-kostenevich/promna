<template>
  <div class="mb-16 px-2 sm:mb-[100px]">
    <div
      class="relative mx-auto w-full max-w-[1248px] rounded-2xl bg-gradient-to-b from-primary-additional via-primary-accent to-secondary pb-6 pt-6 sm:min-h-[976px] sm:pb-[104px] sm:pt-16"
    >
      <div class="flex flex-col items-center px-4">
        <div
          class="mb-2.5 rounded-full border border-primary-hover px-4 py-1 text-xs font-medium leading-5 text-white shadow-inner-white-strong sm:mb-5 sm:text-lg"
        >
          Book a Call
        </div>
        <h3
          class="mx-auto max-w-[1040px] text-center text-[32px] font-semibold leading-10 tracking-tight text-white sm:text-5xl sm:leading-[60px]"
          :class="description ? 'mb-2.5 sm:mb-6' : 'mb-6 sm:mb-[97px]'"
        >
          {{ title }}
        </h3>
        <p
          v-if="description"
          class="mx-auto mb-6 max-w-[694px] text-center font-semibold leading-5 text-white sm:mb-[61px] sm:text-2xl sm:leading-9"
        >
          {{ description }}
        </p>
        <form
          v-if="!isFormSubmitted"
          class="grid w-full max-w-[520px] gap-5"
          @submit.prevent="handleSubmit"
        >
          <Input v-model="form.name" placeholder="Enter your name" fullwidth>
            <template #topTextLeft>{{ String('Your Name') }}</template>
            <template v-if="validationErrors.name.message" #errorMessage>
              {{ validationErrors.name.message }}
            </template>
          </Input>
          <Input v-model="form.email" placeholder="Enter your email" fullwidth>
            <template #topTextLeft>{{ String('Your Work E-mail') }}</template>
            <template v-if="validationErrors.email.message" #errorMessage>
              {{ validationErrors.email.message }}
            </template>
          </Input>

          <div class="flex flex-col gap-5 sm:flex-row">
            <Input
              v-model="form.companyName"
              placeholder="Enter your company name"
              fullwidth
            >
              <template #topTextLeft>{{ String('Company Name') }}</template>
              <template
                v-if="validationErrors.companyName.message"
                #errorMessage
              >
                {{ validationErrors.companyName.message }}
              </template>
            </Input>
            <Input v-model="form.role" placeholder="Enter your role" fullwidth>
              <template #topTextLeft>{{ String('Your Role') }}</template>
              <template v-if="validationErrors.role.message" #errorMessage>
                {{ validationErrors.role.message }}
              </template>
            </Input>
          </div>
          <Textarea
            v-model="form.message"
            placeholder="Enter your message"
            fullwidth
          >
            <template #topTextLeft>{{ String('Message (Optional)') }}</template>
            <template v-if="validationErrors.message.message" #errorMessage>
              {{ validationErrors.message.message }}
            </template>
          </Textarea>
          <Button type="submit" fullwidth :loading="isLoading"
            >Book a 20-min Call</Button
          >
        </form>
        <div
          v-else
          class="flex min-h-[542px] w-full max-w-[520px] flex-col items-center justify-center rounded-2xl bg-white shadow-white-spread"
        >
          <div
            class="relative mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-gradient-to-t from-primary-accent to-primary-hover/0 shadow-button"
          >
            <div
              class="pointer-events-none absolute inset-[1px] rounded-full bg-gradient-to-b from-primary/50 to-primary"
            />
            <Icon name="finish" class="stroke-white text-white" :size="32" />
          </div>
          <div
            class="mb-4 text-4xl font-semibold tracking-tight text-dark-additional"
          >
            Form sent successfully
          </div>
          <p class="mb-8 text-2xl font-semibold text-dark">
            We’ll be in touch soon!
          </p>
          <div class="w-full max-w-[360px]">
            <Button fullwidth @click="isFormSubmitted = false"
              >Send Another Form</Button
            >
          </div>
        </div>
        <div
          v-if="!isFormSubmitted"
          class="mt-3 text-xs font-medium leading-[26px] text-dark-additional"
        >
          By submitting, you agree to our
          <nuxt-link
            class="text-primary-additional underline transition hover:text-primary hover:no-underline"
            to="/"
            >Privacy Policy.</nuxt-link
          >
        </div>
      </div>
      <div
        class="pointer-events-none absolute inset-0 hidden bg-[url('/images/form-bg.png')] bg-contain bg-no-repeat lg:block"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const Input = defineAsyncComponent(() => import('@/UIKit/Input.vue'));
const Textarea = defineAsyncComponent(() => import('@/UIKit/Textarea.vue'));
const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));
const Icon = defineAsyncComponent(() => import('@/UIKit/Icon.vue'));

defineProps<{
  title: string;
  description?: string;
}>();

const form = reactive({
  name: '',
  email: '',
  companyName: '',
  role: '',
  message: '',
});
const isFormSubmitted = ref(false);
const isLoading = ref(false);

const rules = computed(() => ({
  name: {
    required: helpers.withMessage(
      'This field is required!',
      validators.required
    ),
  },
  email: {
    required: helpers.withMessage(
      'This field is required!',
      validators.required
    ),
    email: helpers.withMessage('Enter valid e-mail', validators.email),
  },
  companyName: {
    required: helpers.withMessage(
      'This field is required!',
      validators.required
    ),
  },
  role: {
    required: helpers.withMessage(
      'This field is required!',
      validators.required
    ),
  },
  message: {
    required: helpers.withMessage(
      'This field is required!',
      validators.required
    ),
  },
}));

const { validationErrors, validateForm } = useValidation(form, rules.value);

const handleSubmit = async () => {
  try {
    const isValid = await validateForm();
    if (!isValid) return;

    isLoading.value = true;

    const textMessage = `
      Name: ${form.name}
      Email: ${form.email}
      Company name: ${form.companyName}
      Role: ${form.role}
      Message: ${form.message}
    `;
    const htmlMessage = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#333;">
        <h2>New Contact</h2>
        <p><strong>Name:</strong> ${form.name}</p>
        <p><strong>Email:</strong> ${form.email}</p>
        <p><strong>Company Name:</strong> ${form.companyName}</p>
        <p><strong>Role:</strong> ${form.role}</p>
        <p><strong>Message:</strong> ${form.message}</p>
      </div>
    `;

    const payload = {
      subject: `New Contact from ${form.name}`,
      text: textMessage,
      html: htmlMessage,
    };

    await $fetch('/api/send-form', {
      method: 'POST',
      body: payload,
    });

    isFormSubmitted.value = true;
    form.name = '';
    form.email = '';
    form.companyName = '';
    form.role = '';
    form.message = '';
  } catch (error: any) {
    //
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>
