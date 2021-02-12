
console.log('QuickLinks 1.6 Loaded!');

$(document).ready(function(){

  // Live version:

  let potential = $('td:contains("Potential match")').html();

  // ---------------- Find account number ----------------

  let acc = $('td:contains("Account No:")').find("td:eq(3)").text();
  // Trim whitespaces
  let accno = acc.trim();

  // ---------------- Find group ---------------

  let g = $('td:contains("Group:")').find("td:eq(7)").text();
  let group_start = g.indexOf(':') + 1;
  let group_end = g.indexOf('(',group_start);
  let group_get = g.substring(group_start,group_end);
  let group = group_get.trim();
//  let grr = group_get.replace(/[^0-9]+/g,"");
//  let group = grr.trim();


  // ---------------- find CustID ----------------

  let c = $('td:contains("Username:")').find("td:eq(1)").html();
  let cust_start = c.indexOf('"') + 1;
  let cust_end = c.indexOf('"',cust_start);
  let cust_get = c.substring(cust_start,cust_end);
  let cust = cust_get.replace(/[^0-9]+/g,"");
  let custID = cust;

  // ---------------- To find actual username, not custid: ----------------
  // let user = $('td:contains("Username")').find("td:eq(1)").text();

  console.log('Account No: '+accno);
  console.log('Group: '+group);
  console.log('CustID: '+custID);

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
      const response = await fetch(link);
      // waits until the request completes...
      // console.log(response);
      console.log('fetch completed');
      location.reload();
    }
  });


//   async function fetchAction(action) {
//     let response = await fetch(action);
//
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     } else {
//       let myBlob = await response.blob();
//       console.log('Fetching: '+action);
//       location.reload();
//     }
//   }
//
//   fetchAction(action)
//   .catch(e => {
//     console.log('Linkables unavailable: ' + e.message);
//     return action;
//   });
// });
