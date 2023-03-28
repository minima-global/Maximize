import * as React from 'react';
import { createContext, useEffect, useState } from 'react';
import { availableBalance, sql, block } from './__minima__';

export const appContext = createContext({} as any);

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [loaded, setLoaded] = useState(false);
  const [balance, setBalance] = useState(0);
  const [currentBlock, setCurrentBlock] = useState<number | null>(null);
  const [heavyLoad, setHeavyLoad] = useState(false);
  const [transactions, setTransactions] = useState();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [_notification, _setNotification] = useState<any>({
    display: false,
    message: '',
    callback: null,
  });

  useEffect(() => {
    if (!loaded) {
      (window as any).MDS.init(async (msg: any) => {

        if(msg.event === "inited"){
          // hard reset
          // await sql(`DROP TABLE cache IF EXISTS;`);

          await sql(`CREATE TABLE IF NOT EXISTS cache (name varchar(255), data longtext);`);
          const showOnboarding = await sql(`SELECT * FROM cache WHERE name = 'SHOW_ONBOARDING'`);

          if (!showOnboarding) {
            setShowOnboarding(true);
          }

          // get balance
          availableBalance().then((response: any) => {
            setBalance(Number(response));
          });

          // get current block
          block().then((response: any) => {
            setCurrentBlock(Number(response));
          });

          // get all coins
          (window as any)
            .getCoins()
            .catch((reason: any) => {
              if (reason === 'HEAVY_LOAD') {
                setHeavyLoad(true);
              }
            });

          // get my coins
          (window as any)
            .getMyCoins()
            .then((response: any) => {
              setTransactions(response);
            })
            .catch(() => {
              // do nothing
            });

          setLoaded(true);
        }

        if(msg.event === "NEWBLOCK"){
          setCurrentBlock(Number(msg.data.txpow.header.block));
        }

        if (msg.event === "NEWBALANCE") {
          // get balance
          availableBalance().then((response: any) => {
            setBalance(Number(response));
          });

          // get all coins
          (window as any)
            .getCoins()
            .catch((reason: any) => {
              if (reason === 'HEAVY_LOAD') {
                setHeavyLoad(true);
              }
            });

          // get my coins
          (window as any)
            .getMyCoins()
            .then((response: any) => {
              setTransactions(response);
            })
            .catch(() => {
              // do nothing
            });
        }
      });
    }
  }, [loaded]);

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
    heavyLoad,
    currentBlock,
    transactions,
    _notification,
    showOnboarding,
    dismissOnboarding,
    promptNotification,
    dismissNotification,
  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default AppProvider;
