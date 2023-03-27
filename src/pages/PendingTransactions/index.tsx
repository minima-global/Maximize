import * as React from 'react';
import { useContext, useState } from "react";
import { appContext } from '../../AppContext';
import TitleBar from '../../components/TitleBar';
import { lib } from "../../lib";
import { getPayoutTime } from "../../utilities";

const PendingTransactions: React.FC<{ close?: Function }> = ({ close }) => {
  const { currentBlock, transactions } = useContext(appContext);
  const [cancelBondId, setCancelBondId] = useState(null);
  const [cancelBondAmount, setCancelBondAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const cancelBond = async () => {
    try {
      setIsLoading(true);
      await (window as any).cancelBond(cancelBondId, cancelBondAmount);
      setCancelBondId(null);
      setCancelBondAmount(null);
    } catch {
      alert('An error occurred whilst cancelling the bond, please try again later...');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white lg:pb-20">
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
      <TitleBar back={close} />
      <div className="max-w-xl mx-auto lg:mt-14 flex flex-col gap-5 p-5">
        <h1 className="text-2xl font-bold mb-2">Your pending stakes</h1>
        {transactions && transactions.length === 0 && <div className="bg-grey py-2 px-4 rounded-md text-center">No transactions pending</div>}
        {transactions && transactions.length > 0 && (
          <>
            {transactions.map((transaction: any) => {
              const payoutTime = getPayoutTime(transaction);

              return (
                <div key={transaction.coinid} className="bg-grey py-3 px-4 rounded-md">
                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-3 font-bold">Staked</div>
                    <div className="col-span-9 flex justify-end">{transaction.amount} MINIMA</div>
                    <div className="col-span-3 font-bold">Timeframe</div>
                    <div className="col-span-9 flex justify-end">{lib[transaction.state[4].data]}</div>
                    <div className="col-span-3 font-bold">Yield</div>
                    <div className="col-span-9 flex justify-end">{transaction.state[4].data}%</div>
                    <div className="col-span-3 font-bold">Receive</div>
                    <div className="col-span-9 flex justify-end">{Number(transaction.amount) * Number(transaction.state[4].data)} MINIMA</div>
                    <div className="col-span-3 font-bold">Unlocked</div>
                    <div className="col-span-9 flex justify-end">{payoutTime}</div>
                    <div className="col-span-6 font-bold">Block position</div>
                    <div className="col-span-6 flex justify-end">
                      {currentBlock && <span className="bg-main rounded px-1.5">{currentBlock - Number(transaction.created)}/10</span>}
                    </div>
                  </div>
                  {/*{currentBlock - Number(transaction.created) >= 10 && (*/}
                  {/*  <div className="mt-5 bg-green px-4 py-3 rounded-md fs-15 text-center">Go to FutureCash to view your stake</div>*/}
                  {/*)}*/}
                  <div
                    className="pt-3"
                    onClick={() => {
                      setCancelBondId(transaction.coinid);
                      setCancelBondAmount(transaction.amount);
                    }}
                  >
                    <button className="border-grey w-full py-2 px-3 rounded text-grey-two">Cancel stake</button>
                  </div>
                </div>
              )
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default PendingTransactions;
