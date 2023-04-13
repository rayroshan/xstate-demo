import { useMachine } from '@xstate/react';
import { formMachine } from '../../machines/formMachine';

export function useFormFieldMachine() {
  const [state, send] = useMachine(formMachine, {
    context: { isValid: false },
  });

  const handleChange = (event) => {
    // handle input change
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    send('SUBMIT');
  };

  return {
    state,
    send,
    handleChange,
    handleSubmit,
  };
}
