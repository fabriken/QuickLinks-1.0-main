
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
 // let tb = document.getElementsByTagName("td");
// console.log(tb);

  // ---------------- Check for Potential match ----------------

  let potential = tb[1].childNodes[8].lastElementChild.firstElementChild.color;

  // ---------------- Find account number ----------------

  let accno = tb[1].childNodes[4].lastElementChild.textContent.trim();

  // ---------------- Find group ---------------

  let gr = tb[1].childNodes[8].innerHTML;
  let group_start = gr.indexOf('Group:') + 7;
  let group_end = gr.indexOf('(',group_start);
  let group_get = gr.substring(group_start,group_end);
  let group = group_get.trim();

  // ---------------- find CustID ----------------

  let cu = tb[1].childNodes[2].childNodes[2].innerHTML;
  let cust_start = cu.indexOf('CustId') + 1;
  let cust_end = cu.indexOf('"',cust_start);
  let cust_get = cu.substring(cust_start,cust_end);
  let cust = cust_get.replace(/[^0-9]+/g,"");
  let custID = cust;

  // ---------------- To find actual username, not custid: ----------------

  let username = tb[1].childNodes[2].childNodes[2].textContent.trim();

  // ---------------- Find Current Status ---------------- 
  
  let currstat = tb[0].childNodes[10].defaultValue;

  if (tb.length == 37) {
    var a = tb[7].childNodes[8].childNodes[3].childNodes[3].value;
  } else {
    var a = tb[8].childNodes[8].childNodes[3].childNodes[3].value;
  }
  if (tb.length == 37) {
    var b = tb[7].childNodes[8].childNodes[3].childNodes[7].value;
  } else {
    var b = tb[8].childNodes[8].childNodes[3].childNodes[7].value;
  }
  if (tb.length == 37) {
    var c = tb[7].childNodes[10].childNodes[3].childNodes[3].value;
  } else {
    var c = tb[8].childNodes[10].childNodes[3].childNodes[3].value;
  }
  if (tb.length == 37) {
    var d = tb[7].childNodes[10].childNodes[3].childNodes[7].value;
  } else {
    var d = tb[8].childNodes[10].childNodes[3].childNodes[7].value;
  }
  if (tb.length == 37) {
    var e = tb[9].childNodes[0].lastElementChild.lastElementChild.value;
  } else {
    var e = tb[10].childNodes[0].lastElementChild.lastElementChild.value;
  }
  if (tb.length == 37) {
    var f = tb[9].childNodes[2].lastElementChild.lastElementChild.value;
  } else {
    var f = tb[10].childNodes[2].lastElementChild.lastElementChild.value;
  }
  if (tb.length == 37) {
    var g = tb[9].childNodes[4].lastElementChild.lastElementChild.value;
  } else {
    var g = tb[10].childNodes[4].lastElementChild.lastElementChild.value;
  }
  if (tb.length == 37) {
    var h = tb[8].lastElementChild.value;
  } else {
    var h = tb[9].lastElementChild.value;
  }

  let ContactOK = a;
  let PtnrContactOK = b;
  let ContactOffers = c;
  let ContactNewsltr = d;
  let GoodEmail = e;
  let GoodMobile = f;
  let GoodAddr = g;
  let contact = h;

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


  if (potential === "red") {

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
