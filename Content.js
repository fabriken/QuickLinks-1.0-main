
function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 0);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

docReady(function() {

   console.log('------QLink 1.7------');
 
// let ta = document.getElementsByTagName("tbody");
// let tb = document.getElementsByTagName("td");
  
   let tb = document.getElementsByTagName("body");
   let iT = tb[0].innerText;
   let iH = tb[0].innerHTML;

//  console.log(tb);
//  console.log(iH);

// ---------------- Check For Potential Match ----------------
   let potfind = "//b[contains(text(),'Potential match')]";
   let potential = document.evaluate(potfind, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
//   console.log(potential);

// ---------------- Find Current Status ---------------- 

   let selects = document.querySelectorAll('select[name="Status"], [name="ContactOK"], [name="PtnrContactOK"], [name="ContactOffers"], [name="ContactNewsltr"], [name="GoodEmail"], [name="GoodMobile"], [name="GoodAddr"]');
   let Username = document.querySelector('input[name="Username"]').value;
   let CustId = document.querySelector('input[name="CustId"]').value;
   let AcctNo = document.querySelector('input[name="AcctNo"]').value;
   let ExtCustGroup = document.querySelector('input[name="ExtCustGroup"]').value;
   let ExtCustGroupCount = document.querySelector('input[name="ExtCustGroupCount"]').value;
   let contact_how = document.querySelector('input[name="contact_how"]').value;
   let CurStatus = selects[0].value;
   let ContactOK = selects[1].value;
   let PtnrContactOK = selects[2].value;
   let ContactOffers = selects[3].value;
   let ContactNewsltr = selects[4].value;
   let GoodEmail = selects[5].value;
   let GoodMobile = selects[6].value;
   let GoodAddr = selects[7].value;

// ---------------- Find Date ---------------- 

   let da_start = iT.indexOf('Registered at:') +16;
   let da_end = iT.indexOf('\nR',da_start);
   let da_get = iT.substring(da_start,da_end);
   let regdate = da_get;

// ---------------- Get OBJ_CATS ---------------- 

   const cats = document.querySelectorAll("input[name='OBJ_CATS']:checked");

   var catIn = [];

   for (var i = 0, l = cats.length; i < l; ++i) {
       if (cats[i].value.length) {
           catIn.push('&OBJ_CATS='+cats[i].value);
       }
   }

   var OBJ_CATS = catIn.join("");

// ---------------- Check balance on closed accounts ----------------

   let ba_start = iT.indexOf('Account balance:') +19;
   let ba_end = iT.indexOf('(',ba_start);
   let ba_get = iT.substring(ba_start,ba_end);
   let balance = ba_get.trim();

  if (CurStatus == "C" && balance >0) {
   console.log('Account is closed, but has balance. Please review.');
   alert('Account is closed, but has balance. Please review.');
  }


// ---------------- Log All ----------------

   console.log('Username: '+username);
   console.log('CustID: '+custID);
   console.log('Account No: '+accno);
   console.log('Group: '+ExtCustGroup);
   console.log('Date: '+regdate);
   console.log('ExtCustGroupCount: '+ExtCustGroupCount);
   console.log('Current Status: '+currstat);
   console.log('ContactOK: '+ContactOK);
   console.log('PtnrContactOK: '+PtnrContactOK);
   console.log('ContactOffers: '+ContactOffers);
   console.log('ContactNewsltr: '+ContactNewsltr);
   console.log('GoodEmail: '+GoodEmail);
   console.log('GoodMobile: '+GoodMobile);
   console.log('GoodAddr: '+GoodAddr);
   console.log('Contact How: '+contact_how);
   console.log('OBJ_CATS: '+OBJ_CATS);


  let pot = 'pot';
  let sendInfo = ''+accno+','+group+','+custID+','+pot+'';


  if (potential === true) {

    console.log('Found Potential Match!');

    browser.runtime.sendMessage(sendInfo);
  } else {
    let sendInfo2 = ''+accno+','+group+','+custID+'';
    browser.runtime.sendMessage(sendInfo2);
  }
  browser.runtime.onMessage.addListener(function(getAction) {
    let str = getAction;
    let activate = str.includes("activate");
    let suspendDo = str.includes("suspend");
    let reasonClose = str.includes("reasoncl");
    let dupClose = str.includes("close");
    let groupAss = str.includes("group");
    let linkacc = str.includes("link");
    let removeacc = str.includes("remove");
    let removeGr = str.includes("remgr");
    
    if (activate) {
      console.log('Activating After Suspension');
      let link = '';
      fetchAction(link);
    }
    if (suspendDo) {
      let suspendInfo = str;
      let strippedSusp = suspendInfo.replace('suspend','');
      console.log('Suspending with reason: '+strippedSusp);
      let link = '';
      fetchAction(link);
    }
    if (dupClose) {
      let accnums = str.replace(/[^0-9]+/g,"");
      console.log('Closing account with DUP: '+accnums);
      let link = '';
      fetchAction(link);
    }
    if (reasonClose) {
      let closeStrip = str.replace('reasoncl','');
      console.log('Closing account with reason: '+closeStrip);
      let link = '';
      fetchAction(link);
    }
    if (groupAss) {
      let groupAssInfo = str.replace('group','');
      console.log('Assigning to group: '+groupAssInfo);
      let link = '';
      fetchAction(link);
    }
    if (removeGr) {
      let groupRemInfo = str.replace('remgr','');
      console.log('Removing from group: '+groupRemInfo);
      let link = '';
      fetchAction(link);
    }
    if (linkacc) {
      let linkaccno = str.replace(/[^0-9]+/g,"");
      console.log('Linking account: '+linkaccno);
      let link = '';
      fetchAction(link);
    }
    if (removeacc) {
      let removeaccno = str.replace(/[^0-9]+/g,"");
      console.log('Unlinking account: '+removeaccno);
      let link = '';
      fetchAction(link);
    }
    });
  
    async function fetchAction(link) {
      const response = await location.assign(link);
      console.log(link);
    }

    async function fetchLink(link) {
      const response = await fetch(link);
      console.log('fetch completed');
      console.log(link);
      location.reload();
    }
  });
