import React, { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Button from '@/components/button/Button';

const ModalBox = (props) => {
  const {
    open = false,
    setOpen,
    title = '',
    description = '',
    submitHandler,
    children,
    loading,
    large = false,
    submitButtonTitle,
    reset,
    disabled,
  } = props;

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={
          !reset
            ? setOpen
            : () => {
                setOpen();
                reset();
              }
        }
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity print:bg-white print:bg-opacity-100" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`relative transform bg-white rounded-lg text-left shadow-xl print:shadow-none transition-all sm:my-8 sm:w-full ${
                  large ? 'sm:w-2/3' : 'sm:max-w-lg'
                }`}
              >
                <div className="bg-white rounded-lg px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div>
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base uppercase text-center font-bold leading-6 text-gray-900 print:hidden"
                      >
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{description}</p>
                        {children}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 rounded-lg items-center">
                  {submitHandler && (
                    <Button
                      disabled={disabled}
                      label={submitButtonTitle ? submitButtonTitle : title}
                      onClick={() => submitHandler()}
                    ></Button>
                  )}

                  <button
                    type="button"
                    className="mt-3 
                    inline-flex 
                    w-full 
                    justify-center 
                    rounded-md border
                     border-gray-300
                      bg-white px-4 
                      py-2 
                      text-base font-medium text-gray-700 shadow-sm"
                    onClick={() => {
                      setOpen(false);

                      if (reset) {
                        reset();
                      }
                    }}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalBox;
