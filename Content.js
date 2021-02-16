console.log('QLink 1.6 Loaded!');

$(document).ready(function(){

  // Live version:

  let potential = $('td:contains("Potential match")').html();

  // ---------------- Find account number ----------------

  let acc = $('td:contains("Account No:")').find("td:eq(3)").text();
  // Trim whitespaces
  let accno = acc.trim();

  // ---------------- Find group ---------------

 // let g = $('td:contains("Group:")').find("td:eq(7)").text();
 // let group_start = g.indexOf(':') + 1;
  //let group_end = g.indexOf('(',group_start);
 // let group_get = g.substring(group_start,group_end);
//  let group = group_get.trim();

 // let groo = $('a[name ="Group"]').find('ext_cust_id=').val();

  var g = $('td:contains("Account No:")').find("td:eq(7)").text();
  // Remove all characters except numbers
  var gr = g.replace(/[^0-9]+/g,"");
  var group = gr.slice(0, -1);


  // ---------------- find CustID ----------------

  let c = $('td:contains("Username:")').find("td:eq(1)").html();
  let cust_start = c.indexOf('"') + 1;
  let cust_end = c.indexOf('"',cust_start);
  let cust_get = c.substring(cust_start,cust_end);
  let cust = cust_get.replace(/[^0-9]+/g,"");
  let custID = cust;

  // ---------------- To find actual username, not custid: ----------------
  
  let user = $('td:contains("Username")').find("td:eq(1)").text();
  let username = user.trim();

// ---------------- Find Current Status ---------------- 

  let sel = $('tbody:contains("Customer Attributes")').html();

//  let currstat = $('tbody:contains("Customer Attributes")').find('option[selected]').val();

  let currstat = $(sel).find('option[selected]').val();

  let ContactOK = $('select[name ="ContactOK"]').find('option[selected]').val();
  let PtnrContactOK = $('select[name ="PtnrContactOK"]').find('option[selected]').val();
  let ContactOffers = $('select[name ="ContactOffers"]').find('option[selected]').val();
  let ContactNewsltr = $('select[name ="ContactNewsltr"]').find('option[selected]').val();
  let GoodEmail = $('select[name ="GoodEmail"]').find('option[selected]').val();
  let GoodMobile = $('select[name ="GoodMobile"]').find('option[selected]').val();
  let GoodAddr = $('select[name ="GoodAddr"]').find('option[selected]').val();
  let contact = $('input[name ="contact_how"]').val();

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
 // console.log('groo: '+groo);

  let pot = 'pot';
  let sendInfo = ''+accno+','+group+','+custID+','+pot+'';

  if (potential) {
    console.log('Found Potential Match!');
    console.log(pot);
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
