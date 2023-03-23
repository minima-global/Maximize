import * as React from 'react';
import TitleBar from "../../components/TitleBar";

const PendingTransactions = () => {
  return (
    <div>
      <div className="absolute top-0 left-0 w-full h-screen hidden">
        <div className="relative z-20 flex items-center h-full">
          <div className="bg-white rounded p-8 mx-auto text-center" style={{ maxWidth: '360px' }}>
            <h1 className="text-xl mb-8">Are you sure you want to cancel this stake?</h1>
            <div className="flex flex-col gap-3">
              <button className="bg-dark-grey py-4 text-white font-medium rounded-md">Yes</button>
              <div className="cursor-pointer mb-2"><span className="border-b border-black pb-0.5">No</span></div>
            </div>
          </div>
        </div>
        <div className="bg-black opacity-70 absolute top-0 left-0 w-full h-full z-10"></div>
      </div>
      <TitleBar />
      <div className="flex flex-col gap-5 p-5">
        <h1 className="text-2xl font-bold mb-2">Pending transactions</h1>
        <div className="bg-grey py-2 px-4 rounded-md text-center">No transactions pending</div>
        <div className="bg-grey py-3 px-4 rounded-md">
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-3 font-bold">Staked</div>
            <div className="col-span-9 flex justify-end">100 MINIMA</div>
            <div className="col-span-3 font-bold">Timeframe</div>
            <div className="col-span-9 flex justify-end">12 months</div>
            <div className="col-span-3 font-bold">Yield</div>
            <div className="col-span-9 flex justify-end">18%</div>
            <div className="col-span-3 font-bold">Receive</div>
            <div className="col-span-9 flex justify-end">118 MINIMA</div>
            <div className="col-span-3 font-bold">Unlocked</div>
            <div className="col-span-9 flex justify-end">11:47 UTC, 22 MAR 24</div>
            <div className="col-span-6 font-bold">Block position</div>
            <div className="col-span-6 flex justify-end"><span className="bg-main rounded px-1.5">3/10</span></div>
          </div>
          <div className="mt-3 bg-green px-4 py-3 rounded-md fs-15 text-center">
            Go to FutureCash to view your stake
          </div>
          <div className="pt-3">
            <button className="border-grey w-full py-2 px-3 rounded text-grey-two">Cancel stake</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingTransactions;
