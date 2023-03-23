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
      {displaySmartContract && (
        <div className="absolute top-0 left-0 h-full w-full bg-black text-white text-sm p-8 z-10">
          <div className="h-full flex flex-col">
            <div className="w-full flex justify-end mb-5">
              <img onClick={toggleDisplaySmartContract} className="cursor-pointer" src={whiteX} alt="close" />
            </div>
            <p className="mb-4">Here is the contract for the more technically minded</p>
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
      <TitleBar />
      <div className="flex flex-col gap-5 p-8">
        <h1 className="text-2xl font-bold mb-2">How does Maximize work?</h1>
        <p>Minima Bonds are a completely non-custodial yield mechanism.</p>
        <p>
          You lock up funds for a period of time, and in return get more sent back to you after a certain delay via Future Cash. At no stage do you 'send' the funds to anyone who
          can take them.
        </p>
        <p>You send funds to a contract that will ONLY allow the funds to be sent back to you with the correct Rate and Duration.</p>
        <p>The values are checked at the client and the server.</p>
        <p>At any stage - before your request is accepted - you can cancel and send the funds back to yourself" </p>
        <p onClick={toggleDisplaySmartContract} className="cursor-pointer">
          <span className="border-b border-black pb-1">View smart contract</span>
        </p>
      </div>
    </div>
  );
};

export default Help;
