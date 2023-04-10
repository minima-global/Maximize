/**
 * Base Values
 */
var BOND_SCRIPT  = "LET yourkey=PREVSTATE(100) IF SIGNEDBY(yourkey) THEN RETURN TRUE ENDIF LET maxblock=PREVSTATE(101) LET youraddress=PREVSTATE(102) LET maxcoinage=PREVSTATE(104) LET yourrate=PREVSTATE(105) LET fcfinish=STATE(1) LET fcpayout=STATE(2) LET fcmilli=STATE(3) LET fccoinage=STATE(4) LET rate=STATE(5) ASSERT yourrate EQ rate ASSERT fcpayout EQ youraddress ASSERT fcfinish LTE maxblock ASSERT fccoinage LTE maxcoinage LET fcaddress=0xEA8823992AB3CEBBA855D68006F0D05B0C4838FE55885375837D90F98954FA13 LET fullvalue=@AMOUNT*rate RETURN VERIFYOUT(@INPUT fcaddress fullvalue @TOKENID TRUE)";
var BOND_ADDRESS = "MxG0861MPQ3ZQTM4GFTZ0UJA74Y48A4GDPYM1NTVKDTU0B34BFDV86G5A0PD21N";

/**
 * Config Values
 */
var MIN_BOND 	= 1;
var MAX_BOND 	= 25000;
var HEAVY_LOAD 	= 50;
// How many blocks in a day
var DAY_OF_BLOCKS = 1728;

function requestBond(currentblock, amount, bondtype, password = null){
  return new Promise((resolve, reject) => {

    //Calculate the max values - these are all double checked on the server
    var days = 365;
    if(bondtype == "1.01"){
      days = 30;
    }else if(bondtype == "1.035"){
      days = 90;
    }else if(bondtype == "1.08"){
      days = 180;
    }else if(bondtype == "1.13"){
      days = 270;
    }else if(bondtype == "1.18"){
      days = 365;
    }else{
      alert("Invalid Rate amount!");
      return;
    }

    //Now calculate the max coin age - with a day extra for leeway
    var maxcoinage = (days * DAY_OF_BLOCKS) + DAY_OF_BLOCKS;

    //The max block
    var maxblock = +currentblock + maxcoinage;

    //MDS.log("CurrentBlock:"+currentblock+" MAXCOINAGE:"+maxcoinage+" MAXblock:"+maxblock);
    //return;

    //Get one of your addresses
    MDS.cmd("getaddress",function(resp){
      //MDS.log(JSON.stringify(resp));

      if (!resp.status) {
        return reject(1);
      }

      var address 	= resp.response.miniaddress;
      var pubkey  	= resp.response.publickey;

      var statevars = "{\"100\":\""+pubkey+"\","
        +"\"101\":\""+maxblock+"\","
        +"\"102\":\""+address+"\","
        +"\"104\":\""+maxcoinage+"\","
        +"\"105\":\""+bondtype+"\""
        +"}";

      var cmd = "send amount:"+amount
        +" address:"+BOND_ADDRESS
        +" state:"+statevars;

      if (password) {
        cmd += ' password:' + password;
      }

      MDS.cmd(cmd,function(resp){
        if(resp.pending){
          resolve(2);
        }else if(!resp.status){
          reject(0);
        }else if(resp.status){
          resolve(1);
        }
      });
    });
  })
}

function cancelBond(coinid,amount,pubkey,password = null){
  return new Promise((resolve, reject) => {
    MDS.cmd("getaddress",function(resp){

      if (!resp.status) {
        return reject(1);
      }

      //Get an address
      var address = resp.response.miniaddress;

      //Random ID
      var randid = Math.floor(Math.random() * 1000000000)+"";

      //Construct and spend back txn..
      var txn = "txncreate  id:"+randid
        +";txninput  id:"+randid+" coinid:"+coinid
        +";txnoutput id:"+randid+" address:"+address+" amount:"+amount+" storestate:false"
        +";txnsign   id:"+randid+" publickey:"+pubkey + ' txnpostauto:true txndelete:true';

      if (password) {
        txn += ' password:' + password;
      }

      MDS.cmd(txn,function(resp){
        console.log(JSON.stringify(resp));
        const lastItem = resp[resp.length - 1];
        if (lastItem.pending) {
          return resolve(2);
        }
        resolve(1);
      });
    });
  })
}

function getCoins() {
  return new Promise((resolve, reject) => {
    MDS.cmd("coins address:"+BOND_ADDRESS,function(resp){
      var allcoins = resp.response;
      var totalsize = allcoins.length;

      if(totalsize>HEAVY_LOAD){
        reject('HEAVY_LOAD');
      }

      resolve(allcoins);
    });
  });
}

function getMyCoins() {
  return new Promise((resolve, reject) => {
    MDS.cmd("coins order:asc relevant:true address:"+BOND_ADDRESS,function(resp){
      var coins = resp.response;

      resolve(coins);
    });
  });
}

function isLocked() {
  return new Promise((resolve, reject) => {
    MDS.cmd('status', function(r) {
      if (r.response.locked) {
        return resolve('locked');
      }

      resolve('not_locked');
    })
  });
}
