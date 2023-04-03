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
    } catch {
      alert('An error occurred whilst cancelling the bond, please try again later...');
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
                  To accept the transaction, go to the Minima app Home screen and press{' '}
                  <svg className="inline lg:ml-1 mr-1 lg:mr-2 mb-1" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.9998 17.5025C7.82045 17.5025 6.71387 17.2796 5.68005 16.8338C4.64623 16.388 3.74685 15.7826 2.9819 15.0177C2.21696 14.2528 1.61158 13.3534 1.16578 12.3196C0.719973 11.2857 0.49707 10.1791 0.49707 8.9998C0.49707 7.82045 0.719973 6.71387 1.16578 5.68005C1.61158 4.64623 2.21696 3.74685 2.9819 2.9819C3.74685 2.21696 4.64623 1.61158 5.68005 1.16578C6.71387 0.719973 7.82045 0.49707 8.9998 0.49707C10.1791 0.49707 11.2857 0.719973 12.3196 1.16578C13.3534 1.61158 14.2528 2.21696 15.0177 2.9819C15.7826 3.74685 16.388 4.64623 16.8338 5.68005C17.2796 6.71387 17.5025 7.82045 17.5025 8.9998C17.5025 9.36816 17.4825 9.72957 17.4425 10.084C17.4025 10.4385 17.3372 10.786 17.2466 11.1266C17.0223 10.8745 16.7609 10.6687 16.4624 10.5093C16.164 10.3499 15.842 10.2524 15.4966 10.2167C15.535 10.0217 15.5629 9.82234 15.5804 9.61867C15.5979 9.41502 15.6067 9.20873 15.6067 8.9998C15.6067 7.15198 14.9675 5.58888 13.6891 4.31049C12.4107 3.03211 10.8476 2.39292 8.9998 2.39292C7.15198 2.39292 5.58888 3.03211 4.31049 4.31049C3.03211 5.58888 2.39292 7.15198 2.39292 8.9998C2.39292 10.8476 3.03211 12.4107 4.31049 13.6891C5.58888 14.9675 7.15198 15.6067 8.9998 15.6067C9.69817 15.6067 10.3636 15.5058 10.9962 15.3042C11.6287 15.1025 12.2125 14.8191 12.7475 14.4541C12.9175 14.7367 13.1365 14.984 13.4045 15.1961C13.6724 15.4082 13.9652 15.5695 14.2829 15.68C13.5612 16.2528 12.7528 16.6998 11.8576 17.0209C10.9624 17.342 10.0098 17.5025 8.9998 17.5025ZM15.1511 14.1642C14.8295 14.1642 14.5564 14.0519 14.3318 13.8273C14.1071 13.6026 13.9948 13.3295 13.9948 13.0079C13.9948 12.6864 14.1071 12.4133 14.3318 12.1887C14.5564 11.964 14.8295 11.8517 15.1511 11.8517C15.4726 11.8517 15.7457 11.964 15.9704 12.1887C16.195 12.4133 16.3073 12.6864 16.3073 13.0079C16.3073 13.3295 16.195 13.6026 15.9704 13.8273C15.7457 14.0519 15.4726 14.1642 15.1511 14.1642ZM11.6751 12.9464L8.09174 9.36303V4.85805H9.90786V8.62661L12.9563 11.6751L11.6751 12.9464Z"
                      fill="#08090B"
                    />
                  </svg>
                  Long press the command and select 'Accept'. That's it!
                </p>
                <p className="hidden lg:block max-w-md mx-auto px-2 mb-5 lg:mb-0">
                  To accept the transaction, go to the MiniDapp hub and click Pending Actions. Click Accept for the Maximize command, then click OK. That's it!
                </p>
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
