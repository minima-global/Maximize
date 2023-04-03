import { createContext, useRef, useState } from "react";
import * as React from 'react';
import visibility from './assets/visibility.svg';
import visibilityOff from './assets/visibility_off.svg';

export const lockedProviderContext = createContext<{
  password: string | null;
  clearPassword: Function;
  checkIsLocked: (callback: (password: string | null) => void) => Promise<boolean>;
}>({
  password: null,
  clearPassword: Function,
  checkIsLocked: async (callback) => false,
});

export const LockedProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [password, setPassword] = useState('');
  const callbackRef = useRef<Function | undefined>();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [callback, setCallback] = useState<boolean>(false);

  /**
   * Clears the password
   */
  const clearPassword = () => {
    setPassword('');
  };

  /**
   * Checks to see if the node is locked with password
   * @returns {Promise<boolean>}
   */
  const checkIsLocked = async (cb: Function) => {
    const response = await (window as any).isLocked();
    const isLocked = response === 'locked';

    if (!isLocked) {
      cb(null);
      return false;
    }

    callbackRef.current = cb;
    setPassword('');
    setVisiblePassword(false);
    setCallback(true);

    return true;
  };

  const handleOnSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    if (callbackRef.current) {
      callbackRef.current(password);
      callbackRef.current = undefined;
      setCallback(false);
    }
  }

  const value = {
    checkIsLocked,
    clearPassword,
    password: password !== '' ? password : null,
  };

  return (
    <lockedProviderContext.Provider value={value}>
      <form onSubmit={handleOnSubmit} className={`${callback ? '' : 'hidden'}`}>
        <div className="fixed z-30 top-0 left-0 w-full h-screen">
          <div className="relative z-20 flex items-center h-full">
            <div className="bg-grey-three rounded p-8 mx-auto text-center" style={{ maxWidth: '360px' }}>
              <h1 className="text-xl mb-7">Enter your vault password</h1>
              <div className="relative">
                <input type={visiblePassword ? 'text' : 'password'} className="input input-active input-white bg-grey-three w-full px-4 py-3 pr-14 lg:mr-10 outline-none" value={password} onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setPassword(evt.target.value)} />
                {visiblePassword && <img onClick={() => setVisiblePassword(false)} src={visibility} alt="visible" className="cursor-pointer w-6 h-6 absolute flex items-center top-3.5 right-4" />}
                {!visiblePassword && <img onClick={() => setVisiblePassword( true)} src={visibilityOff} alt="visible off" className="cursor-pointer w-6 h-6 absolute flex items-center top-3.5 right-4" />}
              </div>
              <div className="flex flex-col gap-3">
                <button type="submit" disabled={password === ''} className="bg-dark-grey mt-4 py-4 text-white font-medium rounded-md">
                  Continue
                </button>
              </div>
              <div onClick={() => setCallback(false)} className="cursor-pointer mt-4">
                <span className="border-b border-black pb-0.5">Cancel</span>
              </div>
            </div>
          </div>
          <div className="bg-black opacity-70 absolute top-0 left-0 w-full h-full z-10"></div>
        </div>
      </form>
      {children}
    </lockedProviderContext.Provider>
  );
};

export default LockedProvider;
