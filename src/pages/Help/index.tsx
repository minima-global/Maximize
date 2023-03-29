import * as React from 'react';
import { useState } from 'react';
import whiteX from '../../assets/x_white.svg';
import TitleBar from "../../components/TitleBar";

const Help = () => {
  const [displaySmartContract, setDisplaySmartContract] = useState(false);

  const toggleDisplaySmartContract = () => {
    setDisplaySmartContract((prevState) => !prevState);
  };

  return (
    <div>
      <TitleBar />
      {displaySmartContract && (
        <div className="absolute top-0 left-0 h-full w-full bg-black text-white text-sm p-8 z-50">
          <div className="h-full flex flex-col">
            <div className="w-full flex justify-end mb-5">
              <img onClick={toggleDisplaySmartContract} className="cursor-pointer" src={whiteX} alt="close" />
            </div>
            <p className="mb-4">Here is the contract for the more technically minded:</p>
            <pre className="w-full break-word overflow-y-scroll pr-3 custom-scollbar">
              {`/* Escape */
LET yourkey = PREVSTATE(100)
IF SIGNEDBY(yourkey) THEN RETURN TRUE ENDIF

/* Max block you will accept */
LET maxblock = PREVSTATE(101)

/* Where to send the Future Cash */
LET youraddress = PREVSTATE(102)

/* Max coinage wait */
LET maxcoinage = PREVSTATE(104)

/* what rate you want */
LET yourrate = PREVSTATE(105)

/* Check that the FC Details are available */
LET fcfinish = STATE(1)
LET fcpayout = STATE(2)
LET fcmilli = STATE(3)
LET fccoinage = STATE(4)
LET rate = STATE(5)

/* Make sure you are getting the correct rate */
ASSERT yourrate EQ rate

/* Check we are sending to the right address */
ASSERT fcpayout EQ youraddress
ASSERT fcfinish LTE maxblock
ASSERT fccoinage LTE maxcoinage

/* The actual FC Contract address */
LET fcaddress = 0xEA8823992AB3CEBBA855D68006F0D05B0C4838FE55885375837D90F98954FA13

/* The amount that needs to be sent */
LET fullvalue = @AMOUNT * rate

/* Check Valid */
RETURN VERIFYOUT(@INPUT fcaddress fullvalue @TOKENID TRUE)`}
            </pre>
          </div>
        </div>
      )}
      <div className="max-w-xl mx-auto lg:mt-14 flex flex-col gap-5 p-5">
        <h1 className="text-2xl font-bold mb-2">How does Maximize work?</h1>
        <p>Maximize is a completely non-custodial yield product.</p>
        <p>You stake Native Minima (MINIMA) for a set period of time and in return get more MINIMA sent back to you via FutureCash.</p>
        <p>At no stage do you 'send' your coins to anyone who can take them. Instead, you send coins to a contract that will only allow your stake to be sent back to you with the correct Yield and Timeframe.</p>
        <p>Before your stake is confirmed, you can cancel it if you wish.</p>
        <p onClick={toggleDisplaySmartContract} className="cursor-pointer">
          <span className="border-b border-black pb-1">View the contract</span>
        </p>
      </div>
    </div>
  );
};

export default Help;
