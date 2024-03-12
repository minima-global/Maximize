import * as React from 'react';
import help from '../../assets/help.svg';
import helpActive from '../../assets/help_active.svg';
import XBlack from '../../assets/x_black.svg';
import expandMore from '../../assets/expand_more.svg';
import TitleBar from '../../components/TitleBar';
import { useContext, useEffect, useState } from 'react';
import { appContext } from '../../AppContext';
import config from '../../config';
import { availableBalance, block } from '../../__minima__';
import { Link } from 'react-router-dom';
import PendingTransactions from '../PendingTransactions';
import { getEstimatedPayoutTime, toFixedIfNecessary } from '../../utilities';
import { lockedProviderContext } from '../../LockedProviderContext';
import Decimal from 'decimal.js';

const Dashboard = () => {
  const { checkIsLocked } = useContext(lockedProviderContext);
  const { currentBlockTime, currentBlock, balance, heavyLoad, showOnboarding } = useContext(appContext);

  const [price, setPrice] = React.useState('');
  const [step, setStep] = React.useState('form');
  const [isLoading, setIsLoading] = React.useState(false);
  const [showSelect, setShowSelect] = React.useState(false);
  const [percent, setPercent] = React.useState<null | { months: number; humanReadableRate: number; rate: number }>(null);
  const [showPendingTransactions, setShowPendingTransactions] = React.useState(false);
  const [typingOnFocus, setTypingOnFocus] = React.useState(false);
  const [showForHowLongTooltip, setShowForHowLongTooltip] = React.useState(false);
  const [confirm, setConfirm] = useState(false);
  const [showHeavyLoad, setShowHeavyLoad] = useState(false);
  const [showInsufficientBalance, setShowInsufficientBalance] = useState(false);
  const [showError, setShowError] = useState<string | boolean>(false);

  // reset confirm status if the step changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setConfirm(false);
  }, [step]);

  const notEnoughFunds = React.useMemo(() => {
    return Number(price) > balance;
  }, [price, balance]);

  const overMinAmount = React.useMemo(() => {
    if (price === '') {
      return false;
    }

    return Number(price) < Number(config.minPrice);
  }, [price]);

  const overMaxAmount = React.useMemo(() => {
    return Number(price) > Number(config.maxPrice);
  }, [price]);

  const isValidAmount = React.useMemo(() => {
    return !parseFloat(price);
  }, [price]);

  const predictedMinima = React.useMemo(() => {
    if (!percent || price === '') {
      return '-';
    }

    return toFixedIfNecessary(String(Number(price) * percent.rate));
  }, [price, percent]);

  const setAmount = (months: number, humanReadableRate: number, rate: number) => {
    setShowSelect(false);
    setConfirm(false);
    setPercent({
      rate,
      months,
      humanReadableRate,
    });
  };

  const createBond = async () => {
    try {
      setIsLoading(true);

      const balance = await availableBalance();
      const balanceAsDecimal = new Decimal(balance as string);
      const priceAsDecimal = new Decimal(price);

      if (priceAsDecimal.greaterThan(balanceAsDecimal)) {
        setIsLoading(false);
        return setShowInsufficientBalance(true);
      }

      await checkIsLocked(async (password) => {
        try {
          const currentBlock = await block();
          const response = await (window as any).requestBond(currentBlock, price, percent?.rate, password);
          setPrice('');
          setPercent(null);

          if (response === 2) {
            setIsLoading(false);
            return setStep('confirm');
          }

          setStep('form');
          setShowPendingTransactions(true);
          setIsLoading(false);
        } catch (e) {
          setIsLoading(false);

          if (e === 1) {
            return setShowError('An error occurred whilst creating the stake, could not get a valid address.');
          }

          setShowError(true);
        }
      });
    } catch (e) {
      setIsLoading(false);
      setShowError(true);
    }
  };

  if (showOnboarding) {
    return <div />;
  }

  if (showPendingTransactions) {
    return <PendingTransactions close={() => setShowPendingTransactions(false)} />;
  }

  return (
    <div className={`h-full bg-grey`}>
      <TitleBar home showPendingTransaction={() => setShowPendingTransactions(true)} />
      {showHeavyLoad && (
        <div className="fixed z-10 top-0 left-0 w-full h-screen">
          <div className="relative z-20 flex items-center h-full">
            <div className="bg-white rounded p-8 mx-auto text-center" style={{ maxWidth: '360px' }}>
              <h1 className="text-xl mb-2">We are currently experiencing a high demand for staking. Please try again later.</h1>
              <div className="flex flex-col gap-3">
                <button onClick={() => setShowHeavyLoad(false)} className="bg-dark-grey mt-4 py-4 text-white font-medium rounded-md">
                  Continue
                </button>
              </div>
            </div>
          </div>
          <div className="bg-black opacity-70 absolute top-0 left-0 w-full h-full z-10"></div>
        </div>
      )}
      {showError && (
        <div className="fixed z-10 top-0 left-0 w-full h-screen">
          <div className="relative z-20 flex items-center h-full">
            <div className="bg-white rounded p-8 mx-auto text-center" style={{ maxWidth: '360px' }}>
              <h1 className="text-xl mb-2">{typeof showError === 'string' ? showError : 'An error occurred whilst creating the stake, please try again later.'}</h1>
              <div className="flex flex-col gap-3">
                <button onClick={() => setShowError(false)} className="bg-dark-grey mt-4 py-4 text-white font-medium rounded-md">
                  Continue
                </button>
              </div>
            </div>
          </div>
          <div className="bg-black opacity-70 absolute top-0 left-0 w-full h-full z-10"></div>
        </div>
      )}
      {showInsufficientBalance && (
        <div className="fixed z-10 top-0 left-0 w-full h-screen">
          <div className="relative z-20 flex items-center h-full">
            <div className="bg-white rounded p-8 mx-auto text-center" style={{ maxWidth: '360px' }}>
              <h1 className="text-xl mb-2">Insufficient sendable balance. Please try again later.</h1>
              <div className="flex flex-col gap-3">
                <button onClick={() => setShowInsufficientBalance(false)} className="bg-dark-grey mt-4 py-4 text-white font-medium rounded-md">
                  Continue
                </button>
              </div>
            </div>
          </div>
          <div className="bg-black opacity-70 absolute top-0 left-0 w-full h-full z-10"></div>
        </div>
      )}
      {step === 'form' && (
        <div className="max-w-lg mx-auto lg:pt-10 lg:pb-10">
          <div className="flex flex-col gap-5 p-5">
            <p className="font-bold">Complete the fields below to stake your Native Minima (MINIMA)</p>
            {currentBlock && currentBlockTime && (
              <section className="bg-grey-three p-4 rounded text-sm">
                <p>
                  Top block: <strong>{currentBlock}</strong>
                </p>
                <p>
                  Top block time: <strong>{currentBlockTime}</strong>
                </p>
              </section>
            )}
            <p>How much would you like to stake?</p>
            <div className="bg-grey-three w-full rounded-md w-full relative">
              <input
                type="number"
                value={price}
                onFocus={() => setTypingOnFocus(true)}
                onBlur={() => setTypingOnFocus(false)}
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setPrice(evt.target.value)}
                className="bg-transparent input input-active input-white w-full px-4 py-3 pr-20 outline-none"
                placeholder={`Min ${config.minPrice} / Max ${config.maxPrice}`}
              />
              <div onClick={() => setPrice(config.maxPrice)} className="cursor-pointer text-grey-three absolute top-0 h-full flex items-center right-4">
                Max
              </div>
            </div>
            {notEnoughFunds && <div className="bg-red px-4 py-3 rounded-md fs-15">You do not have the funds</div>}
            {overMinAmount && !notEnoughFunds && <div className="bg-red px-4 py-3 rounded-md fs-15">Please enter a value over the minimum amount</div>}
            {overMaxAmount && !notEnoughFunds && <div className="bg-red px-4 py-3 rounded-md fs-15">Please enter a value under the max amount</div>}
            <div className="flex items-center gap-2">
              <p>For how long?</p>
              <span className="relative cursor-pointer" onClick={() => setShowForHowLongTooltip((prevState) => !prevState)}>
                {showForHowLongTooltip ? <img src={helpActive} alt="help" /> : <img src={help} alt="help" />}
                {showForHowLongTooltip ? <span className="tooltip-hook" /> : ''}
              </span>
            </div>
            {showForHowLongTooltip && (
              <div className=" relative">
                <div className="tooltip absolute z-20">
                  The approximate lock up duration of your stake. During this time, your total stake including yield will be visible on the Pending page in the FutureCash MiniDapp.
                  At the end of this period, it will be shown on the Ready page in FutureCash.
                </div>
                <div onClick={() => setShowForHowLongTooltip(false)} className="fixed w-full h-full z-10 left-0 top-0" />
              </div>
            )}
            <div className="cursor-pointer bg-white w-full rounded-md w-full relative select-none">
              <div onClick={() => setShowSelect((prevState) => !prevState)}>
                {!percent && <div className="bg-transparent w-full px-4 py-3 pr-20 outline-none">Select stake timeframe</div>}
                {percent && (
                  <div className="bg-transparent w-full px-4 py-3 pr-20 outline-none">
                    {(percent.months < 12 || percent.months > 12) && (
                      <>
                        {percent.months} month{percent.months > 1 ? 's' : ''}&nbsp;
                      </>
                    )}
                    {percent.months === 12 && <>1 year&nbsp;</>}@ {percent.humanReadableRate}%
                  </div>
                )}
                <div className="absolute top-0 h-full flex items-center right-4">
                  <img src={expandMore} alt="Expand" className={`transition-transform ${showSelect ? 'rotate-180' : ''}`} />
                </div>
              </div>
              {showSelect && (
                <div className="menu absolute w-full z-10">
                  <div onClick={() => setAmount(1, 1, 1.01)} className="menu__item bg-white px-4 py-3">
                    <div className="grid grid-cols-12">
                      <div className="col-span-6">1 month</div>
                      <div className="col-span-6 flex justify-end">1%</div>
                    </div>
                  </div>
                  <div onClick={() => setAmount(3, 3.5, 1.035)} className="menu__item bg-white px-4 py-3">
                    <div className="grid grid-cols-12">
                      <div className="col-span-6">3 month</div>
                      <div className="col-span-6 flex justify-end">3.5%</div>
                    </div>
                  </div>
                  <div onClick={() => setAmount(6, 8, 1.08)} className="menu__item bg-white px-4 py-3">
                    <div className="grid grid-cols-12">
                      <div className="col-span-6">6 month</div>
                      <div className="col-span-6 flex justify-end">8%</div>
                    </div>
                  </div>
                  <div onClick={() => setAmount(9, 13, 1.13)} className="menu__item bg-white px-4 py-3">
                    <div className="grid grid-cols-12">
                      <div className="col-span-6">9 month</div>
                      <div className="col-span-6 flex justify-end">13%</div>
                    </div>
                  </div>
                  <div onClick={() => setAmount(12, 18, 1.18)} className="menu__item bg-white px-4 py-3">
                    <div className="grid grid-cols-12">
                      <div className="col-span-6">1 year</div>
                      <div className="col-span-6 flex justify-end">18%</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="italic text-grey">
              Timeframe is shown in months but calculated on average block time, your final timeframe will vary slightly based on actual block times.
            </div>
            <div className={`bg-main w-full rounded-md w-full relative py-3 px-4 ${predictedMinima === '-' ? 'opacity-50' : ''}`}>
              <p className="mb-1">You will receive</p>
              <p className="font-bold">{predictedMinima} Minima</p>
            </div>
            {/*<p className="text-grey">*/}
            {/*  You must wait at least 10 blocks before your stake is processed. You may cancel at any time before that. Once processed, your stake will show in FutureCash app to*/}
            {/*  collect at the end of your lock up period.*/}
            {/*</p>*/}
            <div className={`${!typingOnFocus ? 'pb-40 lg:pb-0' : ''}`}></div>
            <div className={`fixed lg:relative w-full bottom-0 left-0 text-center ${typingOnFocus ? 'relative -mt-4 lg:mt-0' : ' bg-white lg:bg-transparent p-6 lg:p-0'}`}>
              <div className="flex flex-col gap-3">
                <button
                  disabled={notEnoughFunds || overMinAmount || isValidAmount || overMaxAmount || price === '' || !percent}
                  onClick={() => {
                    if (heavyLoad) {
                      return setShowHeavyLoad(true);
                    }

                    setStep('summary');
                  }}
                  className="bg-dark-grey disabled:bg-dark-grey disabled:cursor-not-allowed py-4 text-white font-medium rounded-md mb-2"
                >
                  Maximize my MINIMA
                </button>
                <Link to="/help" className="cursor-pointer mb-2">
                  How does Maximize work?
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {step === 'summary' && (
        <div className="max-w-lg mx-auto mt-0 lg:mt-12 h-full lg:h-fit flex flex-col">
          <div className="flex-grow flex flex-col gap-5 p-5">
            <h1 className="text-2xl font-bold mb-2">Summary</h1>
            <div className="bg-white py-3 px-4 rounded-md">
              <div className="grid grid-cols-12 gap-1">
                <div className="col-span-3 font-bold">Staked</div>
                <div className="col-span-9 flex justify-end">{price} MINIMA</div>
                <div className="col-span-3 font-bold">Timeframe</div>
                <div className="col-span-9 flex justify-end">
                  {percent && (
                    <>
                      {(percent.months < 12 || percent.months > 12) && (
                        <>
                          {percent.months} month{percent.months > 1 ? 's' : ''}&nbsp;
                        </>
                      )}
                      {percent.months === 12 && <>1 year&nbsp;</>}
                    </>
                  )}
                </div>
                <div className="col-span-3 font-bold">Yield</div>
                <div className="col-span-9 flex justify-end">{percent?.humanReadableRate}%</div>
                <div className="col-span-3 font-bold">Receive</div>
                <div className="col-span-9 flex justify-end">{predictedMinima} MINIMA</div>
                <div className="col-span-3 font-bold">Unlocked</div>
                <div className="col-span-9 flex justify-end">{getEstimatedPayoutTime(percent)}</div>
              </div>
            </div>
            <div className="bg-white px-4 py-3 rounded-md text-sm">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="checkbox" readOnly={true} checked={confirm} onClick={() => setConfirm((prevState) => !prevState)} />
                <span className="ml-4">
                  I understand that once my stake is processed, my staked Minima and the additional Minima yield I earn will be locked until the date shown above.
                </span>
              </label>
            </div>
          </div>
          <div>
            <div className="fixed lg:relative w-full p-6 bottom-0 left-0 text-center">
              <div className="flex flex-col gap-3">
                {isLoading && (
                  <button className="bg-gray-100 py-4 text-white font-medium rounded-md mb-2">
                    <div role="status" className="text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="800px"
                        height="800px"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-6 h-6 text-gray-400 animate-spin fill-gray-700 mx-auto"
                      >
                        <path
                          opacity="0.2"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                          fill="currentColor"
                        />
                        <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="currentFill" />
                        <span className="sr-only">Loading...</span>
                      </svg>
                    </div>
                  </button>
                )}
                {!isLoading && (
                  <button onClick={createBond} disabled={!confirm || isLoading} className="bg-dark-grey py-4 text-white font-medium rounded-md mb-2">
                    Confirm
                  </button>
                )}
                <div onClick={() => setStep('form')} className="cursor-pointer mb-2">
                  <span className="border-b border-black pb-0.5">Cancel</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {step === 'confirm' && (
        <div className="absolute z-50 top-0 left-0 h-full w-full bg-main p-8">
          <div className="w-full h-full flex flex-col">
            <div className="w-full flex justify-end mb-5">
              <img onClick={() => setStep('form')} className="cursor-pointer" src={XBlack} alt="close" />
            </div>
            <div className="flex justify-center items-center flex-grow text-center">
              <div className="mb-5">
                <h1 className="text-3xl font-bold mb-5">Action Required</h1>
                <p className="block lg:hidden max-w-md mx-auto px-2 mb-5 lg:mb-0">
                  To accept the transaction navigate to the Pending Minidapp on your Minihub and accept the pending action.
                </p>
                <p className="hidden lg:block max-w-md mx-auto px-2 mb-5 lg:mb-0">To accept the transaction, go to the Pending MiniDapp and accept Maximize command. That's it!</p>
                <p className="lg:mt-4">Once accepted, please wait for your stake to appear, it will only show after the next block</p>
                <div className="hidden lg:block mt-8 mb-10 max-w-sm mx-auto">
                  <button
                    onClick={() => {
                      setStep('form');
                      setShowPendingTransactions(true);
                    }}
                    className="w-full bg-dark-grey py-4 text-white font-medium rounded-md mb-3"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
            <div className="block lg:hidden w-full">
              <button
                onClick={() => {
                  setStep('form');
                  setShowPendingTransactions(true);
                }}
                className="w-full bg-dark-grey py-4 text-white font-medium rounded-md mb-3"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
