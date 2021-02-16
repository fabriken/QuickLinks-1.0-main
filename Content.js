
function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 0);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

docReady(function() {

  console.log('------QLink 1.7------');
  let tb = document.getElementsByTagName("tbody");

  // ---------------- Check for Potential match ----------------

  let potential = tb[1].childNodes[8].lastElementChild.firstElementChild;

  // ---------------- Find account number ----------------

  let accno = tb[1].childNodes[4].lastElementChild.textContent.trim();

  // ---------------- Find group ---------------

  let g = tb[1].childNodes[8].innerHTML;
  let group_start = g.indexOf('Group:') + 7;
  let group_end = g.indexOf('(',group_start);
  let group_get = g.substring(group_start,group_end);
  let group = group_get.trim();

  // ---------------- find CustID ----------------

  let c = tb[1].childNodes[2].childNodes[2].innerHTML;
  let cust_start = c.indexOf('CustId') + 1;
  let cust_end = c.indexOf('"',cust_start);
  let cust_get = c.substring(cust_start,cust_end);
  let cust = cust_get.replace(/[^0-9]+/g,"");
  let custID = cust;

  // ---------------- To find actual username, not custid: ----------------

  let username = tb[1].childNodes[2].childNodes[2].textContent.trim();

  // ---------------- Find Current Status ---------------- 
  
  let currstat = tb[0].childNodes[10].defaultValue;

  let ContactOK = tb[7].childNodes[8].childNodes[3].childNodes[3].value;
  let PtnrContactOK = tb[7].childNodes[8].childNodes[3].childNodes[7].value;
  let ContactOffers = tb[7].childNodes[10].childNodes[3].childNodes[3].value;
  let ContactNewsltr = tb[7].childNodes[10].childNodes[3].childNodes[7].value;
  let GoodEmail = tb[9].childNodes[0].lastElementChild.lastElementChild.value;
  let GoodMobile = tb[9].childNodes[2].lastElementChild.lastElementChild.value;
  let GoodAddr = tb[9].childNodes[4].lastElementChild.lastElementChild.value;
  let contact = tb[8].lastElementChild.value;

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
  console.log('Contact: '+contact);

  let pot = 'pot';
  let sendInfo = ''+accno+','+group+','+custID+','+pot+'';

  if (potential !== null) {
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
