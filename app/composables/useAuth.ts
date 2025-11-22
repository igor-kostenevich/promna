import { useStorage } from '@vueuse/core';
import { useApi } from '@/composables/useApi';
import { useAppCookie } from '@/composables/useAppCookie';
import { COOKIE_NAMES } from '@/types/composables/cookies';
import { ERegisterSteps, type ERole } from '~/types';
import type {
  IChooseRoleResponse,
  ILoginCredentialsPayload,
  ILoginResponse,
  IRegisterStep1Payload,
  IRegisterStepResponse,
  IRegisterStep2Payload,
  IResendOtpResponse,
} from '~/types/auth';

export default function useAuth() {
  const api = useApi();
  const { setToken, setCookie, removeCurrentUserSession } = useAppCookie();
  const router = useRouter();

  const error = ref('')
  const emailAvailable = ref(false)

  // === Storage ===
  const step1 = useStorage('register_step1', {
    email: '',
    password: '',
    password_confirmation: '',
    role: '',
    terms: false,
  })

  const step2 = useStorage('register_step2', {
    first_name: '',
    last_name: '',
    company: '',
    position: '',
    phone: '',
  })

  const step3 = useStorage('register_step3', {
    code: '',
  })

  const activeStep = useStorage<number>(
    'registration_step',
    ERegisterSteps.ENTRY
  )

  const registrationToken = useStorage<string | null>(
    'registration_token',
    null
  );

  function clearRegistrationData() {
    step1.value = {
      email: '',
      password: '',
      password_confirmation: '',
      role: '',
      terms: false,
    }
    step2.value = {
      first_name: '',
      last_name: '',
      company: '',
      position: '',
      phone: '',
    }
    step3.value = { code: '' }
    activeStep.value = ERegisterSteps.ENTRY
  }


  // === Handlers ===
  async function loginByCredentials(payload: ILoginCredentialsPayload) {
    const res = await api.post<ILoginResponse>('/auth/login', payload);

    if (!res?.success) {
      console.error('[Auth] Login failed:', res?.message);
      return;
    }

    const { user, roles, token } = res.data;

    setToken(token);
    setCookie(COOKIE_NAMES.USER, JSON.stringify(user));
    setCookie(COOKIE_NAMES.ROLES, JSON.stringify(roles));

    return res.data;
  }

  async function selectRole(role: ERole) {
    const res = await api.post<IChooseRoleResponse>('/auth/choose-role', {
      role,
    });
    if (!res?.success) throw new Error('Role selection failed');

    return res.data;
  }

  async function logout() {
    await api.post('/auth/logout');
    removeCurrentUserSession();
    await router.push('/auth/login');
  }

  // TODO: wait for OAuth implementation
  async function loginByOAuth() {
    console.warn('OAuth not implemented yet');
  }

  // TODO: wait for OAuth implementation
  async function registerByOAuth() {
    console.warn('OAuth registration not implemented yet');
  }

  async function registerStep1(payload: IRegisterStep1Payload) {
    const res = await api.post<IRegisterStepResponse>(
      '/auth/register',
      payload
    );

    if (!res?.success) {
      console.error('[Auth] Register step 1 failed:', res?.message);
      throw new Error(res?.message || 'Register step 1 failed');
    }

    const { registration_token } = res.data;

    if (!registration_token) return new Error('No registration token received');

    registrationToken.value = registration_token;

    return res.data;
  }

  async function registerStep2(payload: IRegisterStep2Payload) {
    if (!registrationToken.value) return;

    const res = await api.post<IRegisterStepResponse>('/auth/register/step2', {
      ...payload,
      registration_token: registrationToken.value,
    });

    if (!res?.success) {
      registrationToken.value = null;
      console.error('[Auth] Register step 2 failed:', res?.message);
      throw new Error(res?.message || 'Register step 2 failed');
    }
  }

  async function verifyEmailCode() {
    if (!registrationToken.value) return;

    const res = await api.post<IRegisterStepResponse>('/auth/register/verify', {
      registration_token: registrationToken.value,
      code: step3.value.code,
    });

    if (!res?.success) error.value = api.rqstError.value || res.message;

    const { completion_token } = res.data;
    if (!completion_token) throw new Error('No completion token received');

    useStorage('completion_token', completion_token);
  }

  async function resendEmailCode() {
    if (!registrationToken.value) return;

    const res = await api.post<IResendOtpResponse>('/auth/register/resend', {
      registration_token: registrationToken.value,
    });

    if (!res?.success) throw new Error(res?.message || 'Resend failed');

    return res;
  }

  async function forgotPassword(email: string) {
    const res = await api.post<IRegisterStepResponse>('/auth/forgot-password', {
      email,
    });

    if (!res?.success) {
      throw new Error(res?.message || 'Forgot password failed');
    }

    return res;
  }

  const checkEmailRole = async (email: string, role: string) => {
    const response = await api.post('/auth/register/check-email-role', {
      email,
      role
    })

    if(response.status == 'same_role_exists' || api.rqstError.value) {
      error.value = response.message
    } else {
      error.value = ''
      emailAvailable.value = true
    }

    return response
  }

  return {
    // State
    step1,
    step2,
    step3,
    activeStep,
    emailAvailable,
    error,

    // Actions
    clearRegistrationData,
    loginByCredentials,
    selectRole,
    logout,
    loginByOAuth,
    registerByOAuth,
    registerStep1,
    registerStep2,
    verifyEmailCode,
    resendEmailCode,
    forgotPassword,
    checkEmailRole
  };
}
