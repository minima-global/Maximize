import * as React from 'react';
import { useContext, useState } from 'react';
import { appContext } from '../../AppContext';
import TitleBar from '../../components/TitleBar';
import { cleanPercentages, lib } from '../../lib';
import { getPayoutTimeSimplified, toFixedIfNecessary } from '../../utilities';
import XBlack from '../../assets/x_black.svg';
import { lockedProviderContext } from '../../LockedProviderContext';

const PendingTransactions: React.FC<{ close?: Function }> = ({ close }) => {
  const { currentBlock, transactions } = useContext(appContext);
  const { checkIsLocked, password } = useContext(lockedProviderContext);

  const [showConfirm, setShowConfirm] = useState(false);
  const [cancelBondId, setCancelBondId] = useState(null);
  const [showWriteConfirm, setShowWriteConfirm] = useState(false);
  const [cancelBondAmount, setCancelBondAmount] = useState(null);
  const [cancelBondPublicKey, setCancelBondPublicKey] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState<string | boolean>(false);

  const cancelBond = async () => {
    try {
      setIsLoading(true);
      const response = await (window as any).cancelBond(cancelBondId, cancelBondAmount, cancelBondPublicKey, password);
      setCancelBondId(null);
      setCancelBondAmount(null);
      setCancelBondPublicKey(null);

      if (response === 2) {
        return setShowConfirm(true);
      }

      setShowWriteConfirm(true);
    } catch (e) {
      if (e === 1) {
        return setShowError('An error occurred whilst cancelling the stake, could not get a valid address.');
      }

      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-grey lg:pb-20">
      <TitleBar back={close} />
      {showWriteConfirm && (
        <div className="fixed z-10 top-0 left-0 w-full h-screen">
          <div className="relative z-20 flex items-center h-full">
            <div className="bg-white rounded p-8 mx-auto text-center" style={{ maxWidth: '360px' }}>
              <h1 className="text-xl mb-3">Your cancel request will be processed in the next block.</h1>
              <div className="flex flex-col gap-3">
                <button onClick={() => setShowWriteConfirm(false)} className="bg-dark-grey mt-4 py-4 text-white font-medium rounded-md">
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
              <h1 className="text-xl mb-2">{typeof showError === 'string' ? showError : 'An error occurred whilst cancelling the stake, please try again later.'}</h1>
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
      {showConfirm && (
        <div className="fixed z-50 top-0 left-0 h-full w-full bg-main p-8">
          <div className="w-full h-full flex flex-col">
            <div className="w-full flex justify-end mb-5">
              <img onClick={() => setShowConfirm(false)} className="cursor-pointer" src={XBlack} alt="close" />
            </div>
            <div className="flex justify-center items-center flex-grow text-center">
              <div className="mb-5">
                <h1 className="text-3xl font-bold mb-5">Action Required</h1>
                <p className="block lg:hidden max-w-md mx-auto px-2 mb-5 lg:mb-0">
                  To accept the transaction navigate to the Pending Minidapp on your Minihub and accept the pending action.
                </p>
                <p className="hidden lg:block max-w-md mx-auto px-2 mb-5 lg:mb-0">To accept the transaction, go to the Pending MiniDapp and accept Maximize command. That's it!</p>
                <p className="lg:mt-4">Once accepted, your cancellation will be processed in the next block.</p>
                <div className="hidden lg:block mt-8 mb-10 max-w-sm mx-auto">
                  <button onClick={() => setShowConfirm(false)} className="w-full bg-dark-grey py-4 text-white font-medium rounded-md mb-3">
                    OK
                  </button>
                </div>
              </div>
            </div>
            <div className="block lg:hidden w-full">
              <button onClick={() => setShowConfirm(false)} className="w-full bg-dark-grey py-4 text-white font-medium rounded-md mb-3">
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      {cancelBondId && (
        <div className="fixed z-10 top-0 left-0 w-full h-screen">
          <div className="relative z-20 flex items-center h-full">
            <div className="bg-white rounded p-8 mx-auto text-center" style={{ maxWidth: '360px' }}>
              <h1 className="text-xl mb-8">Are you sure you want to cancel this stake?</h1>
              <div className="flex flex-col gap-3">
                {isLoading && (
                  <button className="bg-gray-100 py-4 text-white font-medium rounded-md">
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
                  <button onClick={cancelBond} className="bg-dark-grey py-4 text-white font-medium rounded-md mb-2">
                    Yes
                  </button>
                )}
                <div onClick={() => setCancelBondId(null)} className="cursor-pointer mb-0 lg:mb-1">
                  <span className="border-b border-black pb-0.5">No</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-black opacity-70 absolute top-0 left-0 w-full h-full z-10"></div>
        </div>
      )}
      <div className="max-w-xl mx-auto lg:mt-10 flex flex-col gap-5 p-5">
        <h1 className="text-2xl font-bold -mb-1">Your unconfirmed stakes</h1>
        <p className="mb-3">
          You must wait at least 10 blocks before your stake is processed. You may cancel at any time before that. Once processed, your stake will show in FutureCash app to collect
          at the end of your lock up period.
        </p>
        {transactions && transactions.length === 0 && (
          <div>
            <div className="bg-white py-2 px-4 rounded-md text-left">
              <ul>
                <li>No unconfirmed stakes yet.</li>
              </ul>
            </div>
          </div>
        )}
        {transactions && transactions.length > 0 && (
          <>
            {transactions.map((transaction: any) => {
              const payoutTime = getPayoutTimeSimplified(transaction);

              return (
                <div key={transaction.coinid} className="bg-white py-3 px-4 rounded-md">
                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-3 font-bold">Staked</div>
                    <div className="col-span-9 flex justify-end">{transaction.amount} MINIMA</div>
                    <div className="col-span-3 font-bold">Timeframe</div>
                    <div className="col-span-9 flex justify-end">{lib[transaction.state[4].data]}</div>
                    <div className="col-span-3 font-bold">Yield</div>
                    <div className="col-span-9 flex justify-end">{cleanPercentages[transaction.state[4].data]}%</div>
                    <div className="col-span-3 font-bold">Receive</div>
                    <div className="col-span-9 flex justify-end">{toFixedIfNecessary(String(Number(transaction.amount) * Number(transaction.state[4].data)))} MINIMA</div>
                    <div className="col-span-3 font-bold">Unlocked</div>
                    <div className="col-span-9 flex justify-end">{payoutTime}</div>
                    <div className="col-span-6 font-bold">Block position</div>
                    <div className="col-span-6 flex justify-end">
                      {currentBlock && <span className="bg-main rounded px-1.5">{currentBlock - Number(transaction.created)}/10</span>}
                    </div>
                  </div>
                  {/*{(*/}
                  {/*  <div className="mt-5 bg-green px-4 py-3 rounded-md fs-15 text-center">Go to FutureCash to view your stake</div>*/}
                  {/*)}*/}
                  <div
                    className="pt-3"
                    onClick={() => {
                      checkIsLocked(async () => {
                        setCancelBondId(transaction.coinid);
                        setCancelBondAmount(transaction.amount);
                        setCancelBondPublicKey((window as any).MDS.util.getStateVariable(transaction, '100'));
                      });
                    }}
                  >
                    <button className="bg-black w-full py-2 px-3 rounded text-white">Cancel stake</button>
                  </div>
                </div>
              );
            })}
          </>
        )}
        <p className="text-grey mt-1 mb-3">Unconfirmed stakes will only appear after 1 block.</p>
      </div>
    </div>
  );
};

export default PendingTransactions;
