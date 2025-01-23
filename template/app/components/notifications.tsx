import { AnimatePresence, motion } from 'framer-motion';
import React, { ReactNode } from 'react';
import * as Icons from '@radix-ui/react-icons';
import * as ToastPrimitive from '@radix-ui/react-toast';

// Toast Types
type ToastType = 'success' | 'error';

interface Toast {
  title: string;
  message?: string;
  type: ToastType;
}

interface ToastsProps {
  position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  children: ReactNode;
}

interface ToastContextType {
  success: (props: { title: string; message?: string }) => void;
  danger: (props: { title: string; message?: string }) => void;
}

// Create Toast Context
const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

const ToastsProvider: React.FC<ToastsProps> = ({ position, children }) => {
  const [notifications, setToasts] = React.useState<Map<string, Toast>>(new Map());
  const isPositionedTop = position === 'topLeft' || position === 'topRight';

  const handleAddToast = React.useCallback((toast: Toast) => {
    setToasts((prev) => {
      const newMap = new Map(prev);
      newMap.set(String(Date.now()), { ...toast });
      return newMap;
    });
  }, []);

  const handleRemoveToast = React.useCallback((key: string) => {
    setToasts((prev) => {
      const newMap = new Map(prev);
      newMap.delete(key);
      return newMap;
    });
  }, []);

  const handleDispatchSuccess = React.useCallback(
    ({ title, message }) => handleAddToast({ title, type: 'success', message }),
    [handleAddToast]
  );

  const handleDispatchError = React.useCallback(
    ({ title, message }) => handleAddToast({ title, type: 'error', message }),
    [handleAddToast]
  );

  return (
    <ToastContext.Provider
      value={{
        success: handleDispatchSuccess,
        danger: handleDispatchError,
      }}
    >
      <ToastPrimitive.Provider>
        {children}
        <AnimatePresence>
          {Array.from(notifications).map(([key, notification]) => (
            <ToastPrimitive.Root
              duration={1500}
              onOpenChange={(open) => {
                if (!open) handleRemoveToast(key);
              }}
              key={key}
              forceMount
            >
              <motion.li
                initial={{
                  y: isPositionedTop ? -100 : 100,
                  scale: 0.6,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  scale: 1,
                  opacity: 1,
                  transition: { duration: 0.3 },
                }}
                exit={{
                  scale: 0.9,
                  opacity: 0,
                  transition: { duration: 0.15 },
                }}
                className="dark:bg-whiteA-12 rounded-2 shadow-3 mb-4 flex w-[300px] items-center justify-between rounded-lg px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full ${
                      notification.type === 'success'
                        ? 'bg-green-7 text-greenA-12'
                        : 'bg-red-7 text-redA-12'
                    }`}
                    aria-hidden
                  >
                    {notification.type === 'success' ? <Icons.CheckIcon /> : <Icons.Cross2Icon />}
                  </div>
                  <div>
                    <h4 className="text-gray-9 text-sm font-medium capitalize">
                      {notification.title}
                    </h4>
                    <p className="text-gray-6 text-xs capitalize">{notification.message}</p>
                  </div>
                </div>
                <button
                  className="text-gray-6 hover:bg-gray-1 hover:text-whiteA-8 flex h-6 w-6 items-center justify-center rounded-full"
                  onClick={() => handleRemoveToast(key)}
                >
                  <Icons.Cross2Icon />
                </button>
              </motion.li>
            </ToastPrimitive.Root>
          ))}
        </AnimatePresence>
        <ToastPrimitive.Viewport
          className={`fixed flex flex-col gap-3 p-6 ${
            position === 'bottomRight'
              ? 'right-0 bottom-0'
              : position === 'bottomLeft'
                ? 'bottom-0 left-0'
                : position === 'topRight'
                  ? 'top-0 right-0'
                  : 'top-0 left-0 flex-col-reverse'
          }`}
        />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
};

/* -----------------------------------------------------------------------------------------------*/

function useToast(): ToastContextType {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within Toasts');
  }
  return context;
}

/* -----------------------------------------------------------------------------------------------*/

export { ToastsProvider, useToast };
