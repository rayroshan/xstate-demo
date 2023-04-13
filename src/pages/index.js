import React, { useState } from 'react';
import Text from '../components/text/Text';
import { Inter } from 'next/font/google';
import { useFormFieldMachine } from '../shared/hooks/useFormFieldMachine';
import Collapsable from '@/components/collapsable/Collapsable';
import CartItem from '@/components/cart/CartItem';
import { products } from '@/data/data';
import Button from '@/components/button/Button';
import ToggleSwitch from '@/components/toggle/Toggle';
import { useMachine } from '@xstate/react';
import { formMachine } from '@/machines/formMachine';
import Console from '@/components/console/Console';
import Modal from '@/components/modal/Modal';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [state, send] = useMachine(formMachine);
  const { formStep, formSteps } = state.context;

  const handleGuestToggle = () => {
    send('TOGGLE_GUEST');
  };

  const handleForgotPasswordToggle = () => {
    send('TOGGLE_FORGOT_PASSWORD_MODAL');
  };

  const handleGetUpdatesToggle = () => {
    send('TOGGLE_GET_UPDATEDS');
  };

  const handleEmailChange = (event) => {
    send({
      type: 'UPDATE_EMAIL',
      value: event.target.value,
    });
  };

  const handleNextStep = () => {
    send('NEXT_STEP');
  };

  const handlePreviousStep = () => {
    send({
      type: 'PREVIOUS_STEP',
    });
  };

  const handlePasswordChange = (event) => {
    send({
      type: 'UPDATE_PASSWORD',
      value: event.target.value,
    });
  };

  const currentFormStep = formSteps[formStep];

  return (
    <main>
      <div className="bg-white py-14 px-24 rounded-md w-full">
        <div className="grid grid-cols-3 gap-16">
          <div className="col-span-2">
            <div className="text-base font-bold mb-4">CHECKOUT</div>
            <Collapsable step={1} title="welcome" open={formStep === 'step1'} onClick={handlePreviousStep}>
              <p className="font-light my-1">Continue as a guest or sign in for a faster checkout experience</p>
              <Text
                id="email"
                type="text"
                name="email"
                label="Email Address"
                placeholder="bird@arcteryx.com"
                value={currentFormStep?.email}
                error={currentFormStep?.errors.email}
                onChange={handleEmailChange}
              />
              {!currentFormStep?.isGuest && (
                <>
                  <Text
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="*********"
                    value={currentFormStep?.password}
                    error={currentFormStep?.errors.password}
                    onChange={handlePasswordChange}
                  />
                  <p
                    className="italic text-gray-500 underline text-sm mt-1 cursor-pointer hover:text-gray-400"
                    onClick={handleForgotPasswordToggle}
                  >
                    Forgot your password?
                  </p>
                </>
              )}
              <div className="flex justify-between gap-4 items-center">
                <div className="w-3/5">
                  {currentFormStep?.isGuest ? (
                    <Button label="Continue as a guest" onClick={handleNextStep} disabled={!currentFormStep?.isValid} />
                  ) : (
                    <Button label="SIGN IN" onClick={handleNextStep} disabled={!currentFormStep?.isValid} />
                  )}
                </div>
                <div className="w-1/5 text-center mt-3">OR</div>
                <div
                  className="w-2/5 text-center mt-3 font-semibold underline cursor-pointer text-xs"
                  onClick={handleGuestToggle}
                >
                  {currentFormStep?.isGuest ? 'SIGN IN' : 'CONTINUE AS A GUEST'}
                </div>
              </div>
              {currentFormStep?.isGuest && (
                <div>
                  <div className="flex mt-3">
                    <ToggleSwitch isActive={currentFormStep?.getUpdates} onChange={handleGetUpdatesToggle} />
                    <p className="ml-3">Keep me updated on new releases, exclusive offers, and more.</p>
                  </div>
                </div>
              )}
            </Collapsable>
            <hr className="my-4" />
            <Collapsable
              step={2}
              title="shipping or pick up location"
              open={formStep === 'step2'}
              disabled={!currentFormStep?.completed && formStep !== 'step2'}
            >
              text
            </Collapsable>
            <hr className="my-4" />
            <Collapsable step={3} title="payment" collapsed={true} disabled={true}>
              text
            </Collapsable>
          </div>
          <div>
            <div className="text-base font-bold mb-4">ORDER SUMMARY</div>
            <div>
              {products?.map((product) => (
                <CartItem
                  key={product?.id}
                  title={product?.title}
                  description={product?.description}
                  label={product?.label}
                  price={product?.price}
                  quantity={product?.quantity}
                  img={product?.img}
                />
              ))}
            </div>
            <hr className="my-4" />
            <div>
              <div className="flex justify-between text-sm">
                <div>Subtotal:</div>
                <div>$1590.00</div>
              </div>
              <div className="flex justify-between text-sm">
                <div>Shipping:</div>
                <div>Free</div>
              </div>
              <div className="flex justify-between text-sm">
                <div>Tax:</div>
                <div>$0.00</div>
              </div>
              <div className="flex justify-between text-md font-semibold">
                <div>Estimated Total:</div>
                <div>$1590.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="FORGOT YOUR PASSWORD"
        open={currentFormStep?.showForgotPasswordModal}
        setOpen={handleForgotPasswordToggle}
        submitButtonTitle="SEND ME A RESET LINK"
        submitHandler={() => {}}
        disabled={!currentFormStep?.isValid}
      >
        <Text
          id="email"
          type="text"
          name="email"
          label="Email Address"
          placeholder="bird@arcteryx.com"
          value={currentFormStep?.email}
          error={currentFormStep?.errors.email}
          onChange={handleEmailChange}
        />
      </Modal>
      <Console title="Step 1" data={formSteps[formStep]} />
    </main>
  );
}
