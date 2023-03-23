import * as React from 'react';
import { createContext, useEffect, useState } from "react";
import { availableBalance, sql } from "./__minima__";

export const appContext = createContext({} as any);

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [loaded, setLoaded] = useState(false);
  const [balance, setBalance] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [_notification, _setNotification] = useState<any>({
    display: false,
    message: '',
    callback: null,
  });

  useEffect(() => {
    (window as any).MDS.init(() => {
      setLoaded(true);
    }, []);
  });

  useEffect(() => {
    (async () => {
      await sql(`CREATE TABLE IF NOT EXISTS cache (name varchar(255), data longtext);`);
      const showOnboarding = await sql(`SELECT * FROM cache WHERE name = 'SHOW_ONBOARDING'`);

      if (!showOnboarding) {
        setShowOnboarding(true);
      }

      // get balance
      availableBalance().then((response: any) => {
        setBalance(Number(response));
      });
    })();
  }, []);

  const dismissOnboarding = async () => {
    setShowOnboarding(false);
    await sql(`INSERT INTO cache (name, data) VALUES ('SHOW_ONBOARDING', '1')`);
  };

  const promptNotification = (message: string, callback: unknown) => {
    _setNotification({ display: true, message, callback });
  };

  const dismissNotification = () => {
    _setNotification({ display: false, message: '', callback: null });
  };

  const value = {
    loaded,
    balance,
    _notification,
    showOnboarding,
    dismissOnboarding,
    promptNotification,
    dismissNotification,
  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default AppProvider;
