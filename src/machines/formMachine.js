import { createMachine, assign } from 'xstate';
import { validateEmail, validatePassword } from '@/validations/validations';

export const formMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGMAWZkGsD2BXALgHRS5z4DEAKgPIDitAMgKID6tAqkwMqUDaADAF1EoAA7ZYAS3yTsAOxEgAHogC0AFgCMANkIBmAJz9tADj3qArAZPat6gDQgAnmoO6ATCYDs679s16-HoWtgC+oY5oGDgExKSwFDT0zGxMlCzsAAoAIgCClEzZXALCSCDiUjLyiioIqpoG6oTqepru2h1emvz8miaOLggBukGefdrtXdpu4ZHoWHhEJGTkWXkFLEwAsrkAkgwlihXSsgpltZpa+kH8Bl4G7ura-CbqXgOuHt6+Xv6BwWEIiAogtYgAnMBQSQJMAQiBUOiMVgcbh8IRHCQnarnRAmAzNXyWW7uLrGdzuD4ILz8fTU9x3drqLTkryzYHzGJECFQmFw1Y5fKsbZ7A7osrHKpnUC1eoWEyEAx9X7uW56PTaCz8d7ORDtTQKgyGtx3S4tCxskGcwjc6H4WGQfnrViZXJcLgAdWoACVsodxZjJTVEN1dOogppTXp3BYAmZKXoTO5CDGQnovO5Ahn2uEgXJsBA4IpLYsMZVTkG6k8moZjGZLNZbJdKfUzIQvD5DcZbPdzOagcXYssEqWsVLlGo2vroz1NDHLG1PAZm55CL1bup2rXiQmLRzFtbIbb7RAR4GcXU015mu4GiqOiS1w4dQgmRYFXTDBYMy0AjnQkA */
  id: 'checkout',
  initial: 'guest',
  context: {
    formStep: 'step1',
    formSteps: {
      step1: {
        errors: {
          email: '',
          password: '',
        },
        isValid: false,
        showForgotPasswordModal: false,
        email: '',
        password: '',
        isGuest: true,
        getUpdates: false,
        completed: false,
      },
    },
  },
  states: {
    guest: {
      on: {
        TOGGLE_GUEST: {
          target: 'registered',
          actions: assign({
            formSteps: (ctx) => ({
              ...ctx.formSteps,
              step1: {
                ...ctx.formSteps.step1,
                isGuest: false,
                isValid: false,
              },
            }),
          }),
        },
        TOGGLE_GET_UPDATEDS: {
          actions: assign({
            formSteps: (ctx) => {
              const currentStep = ctx.formSteps[ctx.formStep];
              const getUpdates = !currentStep.getUpdates;

              return {
                ...ctx.formSteps,
                [ctx.formStep]: {
                  ...currentStep,
                  getUpdates,
                },
              };
            },
          }),
        },
        UPDATE_EMAIL: {
          actions: assign({
            formSteps: (ctx, event) => {
              const currentStep = ctx.formSteps[ctx.formStep];
              const email = event.value;
              const errors = validateEmail(email);
              const passwordError = currentStep.errors.password;
              const isValid = errors.email === '' && passwordError === '';

              return {
                ...ctx.formSteps,
                [ctx.formStep]: {
                  ...currentStep,
                  email,
                  errors: {
                    email: errors.email,
                    password: passwordError,
                  },
                  isValid: isValid,
                },
              };
            },
          }),
        },
        NEXT_STEP: {
          target: 'shipping',
          actions: assign({
            formStep: 'step2',
          }),
        },
      },
    },
    registered: {
      on: {
        TOGGLE_GUEST: {
          target: 'guest',
          actions: assign({
            formSteps: (ctx) => ({
              ...ctx.formSteps,
              step1: {
                ...ctx.formSteps.step1,
                isGuest: true,
                password: '',
              },
            }),
          }),
        },
        UPDATE_EMAIL: {
          actions: assign({
            formSteps: (ctx, event) => {
              const currentStep = ctx.formSteps[ctx.formStep];
              const email = event.value;
              const errors = validateEmail(email);
              const passwordError = currentStep.errors.password;
              const isValid = errors.email === '' && passwordError === '' && !currentStep.showForgotPasswordModal;
              return {
                ...ctx.formSteps,
                [ctx.formStep]: {
                  ...currentStep,
                  email,
                  errors: {
                    email: errors.email,
                    password: passwordError,
                  },
                  isValid: isValid,
                },
              };
            },
          }),
        },
        UPDATE_PASSWORD: {
          actions: assign({
            formSteps: (ctx, event) => {
              const currentStep = ctx.formSteps[ctx.formStep];
              const emailError = currentStep.errors.email;
              const password = event.value;
              const errors = validatePassword(password);
              const isValid = emailError === '' && errors.password === '';
              return {
                ...ctx.formSteps,
                [ctx.formStep]: {
                  ...currentStep,
                  password,
                  errors: {
                    email: emailError,
                    password: errors.password,
                  },
                  isValid: isValid,
                },
              };
            },
          }),
        },
        TOGGLE_FORGOT_PASSWORD_MODAL: {
          actions: assign({
            formSteps: (ctx, event) => {
              const currentStep = ctx.formSteps[ctx.formStep];
              return {
                ...ctx.formSteps,
                [ctx.formStep]: {
                  ...currentStep,
                  showForgotPasswordModal: !currentStep.showForgotPasswordModal,
                  password: '',
                  isValid: false,
                },
              };
            },
          }),
        },
        NEXT_STEP: {
          target: 'shipping',
          actions: assign({
            formStep: 'step2',
          }),
        },
      },
    },
    shipping: {
      on: {
        PREVIOUS_STEP: {
          target: 'guest',
          actions: assign({
            formStep: 'step1',
          }),
        },
      },
    },
  },
});
