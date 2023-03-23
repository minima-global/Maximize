import * as React from 'react';
import { Link } from 'react-router-dom';
import help from '../../assets/help.svg';
import XBlack from '../../assets/x_black.svg';
import expandMore from '../../assets/expand_more.svg';
import TitleBar from '../../components/TitleBar';
import { useContext } from 'react';
import { appContext } from '../../AppContext';
import config from '../../config';
import { block } from "../../__minima__";

const Dashboard = () => {
  const { balance } = useContext(appContext);
  const [showSelect, setShowSelect] = React.useState(false);
  const [step, setStep] = React.useState('form');
  const [price, setPrice] = React.useState('');
  const [percent, setPercent] = React.useState<null | { months: number; humanReadableRate: number; rate: number }>(null);

  const notEnoughFunds = React.useMemo(() => {
    return Number(price) > balance;
  }, [price, balance]);

  const overMaxAmount = React.useMemo(() => {
    return Number(price) > Number(config.maxPrice);
  }, [price]);

  const predictedMinima = React.useMemo(() => {
    if (!percent || price === '') {
      return '-';
    }

    return (Number(price) * percent.rate).toFixed(6);
  }, [price, percent]);

  const setAmount = (months: number, humanReadableRate: number, rate: number) => {
    setShowSelect(false);
    setPercent({
      rate,
      months,
      humanReadableRate,
    });
  };

  const createBond = async () => {
    try {
      const currentBlock = await block();
      await (window as any).requestBond(currentBlock, price, percent?.rate);
      setStep('confirm');
    } catch (e) {
      console.log(e);
      alert('An unknown error occurred');
    }
  }

  return (
    <div className="h-full bg-grey-two">
      <div className="absolute top-0 left-0 w-full h-screen hidden">
        <div className="relative z-20 flex items-center h-full">
          <div className="bg-white rounded p-8 mx-auto text-center" style={{ maxWidth: '360px' }}>
            <h1 className="text-xl mb-8">We are currently experiencing a high demand for staking. Please try again later.</h1>
            <div className="flex flex-col gap-3">
              <button className="bg-dark-grey py-4 text-white font-medium rounded-md">Continue</button>
            </div>
          </div>
        </div>
        <div className="bg-black opacity-70 absolute top-0 left-0 w-full h-full z-10"></div>
      </div>
      <TitleBar home />
      {step === 'form' && (
        <div>
          <div className="flex flex-col gap-5 p-5">
            <h1 className="text-2xl font-bold">Maximize your Minima</h1>
            <p>Request a Loyalty Reward for your Native Minima (MINIMA) below.</p>
            <p>How much would you like to lock?</p>
            <div className="bg-grey-three w-full rounded-md w-full relative">
              <input
                type="text"
                value={price}
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setPrice(evt.target.value)}
                className="bg-transparent w-full px-4 py-3 pr-20 outline-none"
                placeholder={`Min ${config.minPrice} / Max ${config.maxPrice}`}
              />
              <div onClick={() => setPrice(config.maxPrice)} className="cursor-pointer absolute top-0 h-full flex items-center right-4">
                Max
              </div>
            </div>
            {notEnoughFunds && <div className="bg-red px-4 py-3 rounded-md fs-15">Not do not have the funds</div>}
            {overMaxAmount && !notEnoughFunds && <div className="bg-red px-4 py-3 rounded-md fs-15">Please enter a value under the max amount</div>}
            <div className="flex gap-2">
              <p>For how long?</p>
              <img src={help} alt="help" />
            </div>
            <div className="cursor-pointer bg-grey-three w-full rounded-md w-full relative select-none">
              <div onClick={() => setShowSelect((prevState) => !prevState)}>
                {!percent && <div className="bg-transparent w-full px-4 py-3 pr-20 outline-none">Select lock up duration</div>}
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
            <div className="bg-main w-full rounded-md w-full relative py-3 px-4">
              <p className="mb-1">You will receive</p>
              <p className="font-bold">{predictedMinima} Minima</p>
            </div>
            <p className="text-grey">
              You may cancel before 10 blocks. Once processed, your total returns will show in your FutureCash MiniDapp to collect at the end of your lock up period.
            </p>
            <div className="pb-56 lg:pb-0"></div>
            <div className="fixed w-full bg-white p-6 bottom-0 left-0 text-center">
              <div className="flex flex-col gap-3">
                <button
                  disabled={notEnoughFunds || overMaxAmount || price === '' || !percent}
                  onClick={() => setStep('summary')}
                  className="bg-dark-grey disabled:opacity-70 disabled:cursor-not-allowed py-4 text-white font-medium rounded-md mb-2"
                >
                  Maximise my MINIMA
                </button>
                <Link to="/help" className="mb-2">
                  How does Maximize work?
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {step === 'summary' && (
        <div className="h-full bg-white flex flex-col">
          <div className="flex-grow flex flex-col gap-5 p-5">
            <h1 className="text-2xl font-bold">Summary</h1>
            <div className="bg-grey py-3 px-4 rounded-md">
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
                {/*<div className="col-span-3 font-bold">Unlocked</div>*/}
                {/*<div className="col-span-9 flex justify-end">11:47 UTC, 22 MAR 24</div>*/}
              </div>
            </div>
            <div className="bg-red px-4 py-3 rounded-md fs-15">
              Once you confirm, you will NOT be able to unlock your staked MINIMA until the Unlocked time and date specified above.
            </div>
          </div>
          <div>
            <div className="fixed w-full bg-white p-6 bottom-0 left-0 text-center">
              <div className="flex flex-col gap-3">
                <button onClick={createBond} className="bg-dark-grey py-4 text-white font-medium rounded-md mb-2">
                  Confirm
                </button>
                <div onClick={() => setStep('form')} className="cursor-pointer mb-2">
                  <span className="border-b border-black pb-0.5">Cancel</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {step === 'confirm' && (
        <div className="absolute top-0 left-0 h-full w-full bg-main p-8">
          <div className="w-full h-full flex flex-col">
            <div className="w-full flex justify-end mb-5">
              <img onClick={() => setStep('summary')} className="cursor-pointer" src={XBlack} alt="close" />
            </div>
            <div className="flex justify-center items-center flex-grow text-center">
              <div className="mb-5">
                <h1 className="text-3xl font-bold mb-5">Confirm</h1>
                <p className="px-2">
                  To complete the transaction, you just need to go to the APK home screen and look for the pending actions icon in the top right corner. Simply click on it and
                  choose whether to accept or deny the pending action. That's it!
                </p>
              </div>
            </div>
            <div className="w-full">
              <button onClick={() => setStep('form')} className="w-full bg-dark-grey py-4 text-white font-medium rounded-md mb-3">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
