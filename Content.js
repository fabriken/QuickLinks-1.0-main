
function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 0);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

docReady(function() {

  console.log('------QLink 1.7------');
  let ta = document.getElementsByTagName("tbody");
 // let tb = document.getElementsByTagName("td");
  
  let tb = document.getElementsByTagName("body");
  let tg = tb[0].innerText;
  let th = tb[0].innerHTML;

  console.log(tb);
//  console.log(tg);

  // ---------------- Check for Potential match ----------------

  let poten = ta[1].childNodes[8].lastElementChild.innerText;
  let potential = poten.includes("Potential");
  let potcheck = potential;
 
//   let po = tg;
//   let po_start = po.indexOf('Potential match');
//   let po_end = po.indexOf('"',po_start);
//   let po_get = po.substring(po_start,po_end);
//   let potential = po_get.trim();

//console.log(potential);

// ---------------- Find username ----------------

   let us = tg;
   let us_start = us.indexOf('Username:') + 12;
   let us_end = us.indexOf('\n',us_start);
   let us_get = us.substring(us_start,us_end);
   let username = us_get.trim();

// // ---------------- Find account number ----------------

//   let accno = tb[1].childNodes[4].lastElementChild.textContent.trim();

   let ac = tg;
   let ac_start = ac.indexOf('Account No:') + 12;
   let ac_end = ac.indexOf('\n',ac_start);
   let ac_get = ac.substring(ac_start,ac_end);
   let accno = ac_get.trim();

//   // ---------------- Find Date ---------------- 

//   let datestr = tb[2].childNodes[2].lastElementChild.textContent;
//   let regdate = datestr.slice(0, -9); 

//   // ---------------- Find group ---------------

  let gr = ta[1].childNodes[8].innerHTML;
  let group_start = gr.indexOf('Group:') + 7;
  let group_end = gr.indexOf('(',group_start);
  let group_get = gr.substring(group_start,group_end);
  let group = group_get.trim();

//   let gr = ta[1].childNodes[8].innerHTML;

//  if (potcheck === true) {
//    var b = gr.indexOf('URN CustomerMatching') + 50;
//  } else {
//    var b = gr.indexOf('URN CustomerMatching') + 30;
//  }

//   let gr = tg;
//   let group_start = b;
//   let group_end = gr.indexOf('(',group_start);
//   let group_get = gr.substring(group_start,group_end);
 //  let group = group_get.trim();


//   // ---------------- find CustID ----------------

//   let cu = tb[1].childNodes[2].childNodes[2].innerHTML;
   let cu = th;
   let cust_start = cu.indexOf('CustId=') + 7;
   let cust_end = cu.indexOf('"',cust_start);
   let cust_get = cu.substring(cust_start,cust_end);
   let cust = cust_get.replace(/[^0-9]+/g,"");
   let custID = cust.slice(0, -2);

//   // ---------------- To find actual username, not custid: ----------------

//   let username = tb[1].childNodes[2].childNodes[2].textContent.trim();

//   // ---------------- Find Current Status ---------------- 
  
//   let currstat = tb[0].childNodes[10].defaultValue;

   let cur = th;
   let cur_start = cur.indexOf('CurStatus') +18;
   let cur_end = cur.indexOf('"',cur_start);
   let cur_get = cur.substring(cur_start,cur_end);
   let currstat = cur_get;

// ---------------- Find ContactOK---------------- 

   let cok = th;
   let cok_start = cok.indexOf('ContactOK') +37;
   let cok_end = cok.indexOf(',',cok_start);
   let cok_get = cok.substring(cok_start,cok_end);
   let ContactOK = cok_get.slice(0, -1);

// ---------------- Find PtnrContactOK ----------------

   let ptr = th;
   let ptr_start = ptr.indexOf('PtnrContactOK') +41;
   let ptr_end = ptr.indexOf(',',ptr_start);
   let ptr_get = ptr.substring(ptr_start,ptr_end);
   let PtnrContactOK = ptr_get.slice(0, -1);

// ---------------- Find ContactOffers ----------------

   let coff = th;
   let coff_start = coff.indexOf('ContactOffers') +41;
   let coff_end = coff.indexOf(',',coff_start);
   let coff_get = coff.substring(coff_start,coff_end);
   let ContactOffers = coff_get.slice(0, -1);

// ---------------- Find ContactNewsltr ---------------- 

   let cnew = th;
   let cnew_start = cnew.indexOf('ContactNewsltr') +42;
   let cnew_end = cnew.indexOf(',',cnew_start);
   let cnew_get = cnew.substring(cnew_start,cnew_end);
   let ContactNewsltr = cnew_get.slice(0, -1);

// ---------------- Find GoodEmail ----------------

   let ge = th;
   let ge_start = ge.indexOf('GoodEmail') +52;
   let ge_end = ge.indexOf(',',ge_start);
   let ge_get = ge.substring(ge_start,ge_end);
   let GoodEmail = ge_get.slice(0, -1);

// ---------------- Find GoodMobile ----------------

   let gm = th;
   let gm_start = gm.indexOf('GoodMobile') +53;
   let gm_end = gm.indexOf(',',gm_start);
   let gm_get = gm.substring(gm_start,gm_end);
   let GoodMobile = gm_get.slice(0, -1);

// ---------------- Find GoodAddr ----------------

   let ga = th;
   let ga_start = ga.indexOf('GoodAddr') +51;
   let ga_end = ga.indexOf(',',ga_start);
   let ga_get = ga.substring(ga_start,ga_end);
   let GoodAddr = ga_get.slice(0, -1);

// ---------------- Find Contact ----------------

   let co = th;
   let co_start = co.indexOf('<input type="hidden" name="contact_how"') +47;
   let co_end = co.indexOf('>',co_start);
   let co_get = co.substring(co_start,co_end);
   let contact_how = co_get.slice(0, -1);

// ---------------- Find Date ---------------- 

   let da = tg;
   let da_start = da.indexOf('Registered at:') +16;
   let da_end = da.indexOf('\nR',da_start);
   let da_get = da.substring(da_start,da_end);
   let regdate = da_get;

// ---------------- Log All ----------------

   console.log('Username: '+username);
   console.log('Account No: '+accno);
   console.log('Group: '+group);
   console.log('CustID: '+custID);
   console.log('Current Status: '+currstat);
   console.log('ContactOK: '+ContactOK);
   console.log('PtnrContactOK: '+PtnrContactOK);
   console.log('ContactOffers: '+ContactOffers);
   console.log('ContactNewsltr: '+ContactNewsltr);
   console.log('GoodEmail: '+GoodEmail);
   console.log('GoodMobile: '+GoodMobile);
   console.log('GoodAddr: '+GoodAddr);
   console.log('Contact: '+contact_how);
   console.log('Date: '+regdate);


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
