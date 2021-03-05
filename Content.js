
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

   let po_start = iT.indexOf('Potential match');
   let po_end = iT.indexOf('"',po_start);
   let po_get = iT.substring(po_start,po_end);
   let potential = po_get.trim();

// console.log(potential);

// ---------------- Find Username ----------------

   let us_start = iT.indexOf('Username:') + 12;
   let us_end = iT.indexOf('\n',us_start);
   let us_get = iT.substring(us_start,us_end);
   let username = us_get.trim();

// ---------------- Find Account Number ----------------

   let ac_start = iT.indexOf('Account No:') + 12;
   let ac_end = iT.indexOf('\n',ac_start);
   let ac_get = iT.substring(ac_start,ac_end);
   let accno = ac_get.trim();

// ---------------- Find Group ---------------

  if (potential) {
    var b = iT.indexOf('URN CustomerMatching') + 48;
  } else {
    var b = iT.indexOf('URN CustomerMatching') + 30;
  }
   let group_start = b;
   let group_end = iT.indexOf('(',group_start);
   let group_get = iT.substring(group_start,group_end);
   let ExtCustGroup = group_get.trim();

// ---------------- Find Group Count ---------------

   let groupC_start = iT.indexOf('Linked Accounts:') + 16;
   let groupC_end = iT.indexOf(')',groupC_start);
   let groupC_get = iT.substring(groupC_start,groupC_end);
   let ExtCustGroupCount = groupC_get.trim();

// ---------------- find CustID ----------------

   let cust_start = iH.indexOf('CustId=') + 7;
   let cust_end = iH.indexOf('&',cust_start);
   let cust_get = iH.substring(cust_start,cust_end);
   let cust = cust_get.replace(/[^0-9]+/g,"");
//   let custID = cust.slice(0, -2);
   let custID = cust;

// ---------------- Find Current Status ---------------- 
  
   let cur_start = iH.indexOf('CurStatus') +18;
   let cur_end = iH.indexOf('"',cur_start);
   let cur_get = iH.substring(cur_start,cur_end);
   let currstat = cur_get;

// ---------------- Find ContactOK---------------- 

   let cok_start = iH.indexOf('ContactOK') +37;
   let cok_end = iH.indexOf(',',cok_start);
   let cok_get = iH.substring(cok_start,cok_end);
   let ContactOK = cok_get.slice(0, -1);

// ---------------- Find PtnrContactOK ----------------

   let ptr_start = iH.indexOf('PtnrContactOK') +41;
   let ptr_end = iH.indexOf(',',ptr_start);
   let ptr_get = iH.substring(ptr_start,ptr_end);
   let PtnrContactOK = ptr_get.slice(0, -1);

// ---------------- Find ContactOffers ----------------

   let coff_start = iH.indexOf('ContactOffers') +41;
   let coff_end = iH.indexOf(',',coff_start);
   let coff_get = iH.substring(coff_start,coff_end);
   let ContactOffers = coff_get.slice(0, -1);

// ---------------- Find ContactNewsltr ---------------- 

   let cnew_start = iH.indexOf('ContactNewsltr') +42;
   let cnew_end = iH.indexOf(',',cnew_start);
   let cnew_get = iH.substring(cnew_start,cnew_end);
   let ContactNewsltr = cnew_get.slice(0, -1);

// ---------------- Find GoodEmail ----------------

   let ge_start = iH.indexOf('GoodEmail') +52;
   let ge_end = iH.indexOf(',',ge_start);
   let ge_get = iH.substring(ge_start,ge_end);
   let GoodEmail = ge_get.slice(0, -1);

// ---------------- Find GoodMobile ----------------

   let gm_start = iH.indexOf('GoodMobile') +53;
   let gm_end = iH.indexOf(',',gm_start);
   let gm_get = iH.substring(gm_start,gm_end);
   let GoodMobile = gm_get.slice(0, -1);

// ---------------- Find GoodAddr ----------------

   let ga_start = iH.indexOf('GoodAddr') +51;
   let ga_end = iH.indexOf(',',ga_start);
   let ga_get = iH.substring(ga_start,ga_end);
   let GoodAddr = ga_get.slice(0, -1);

// ---------------- Find Contact How ----------------

   let co_start = iH.indexOf('<input type="hidden" name="contact_how"') +47;
   let co_end = iH.indexOf('>',co_start);
   let co_get = iH.substring(co_start,co_end);
   let contact_how = co_get.slice(0, -1);

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
