// Linker 1.0 by Mikael Oerberg

function docReady(fn) {
	if (document.readyState === "complete" || document.readyState === "interactive") {
	setTimeout(fn, 0);
} else {
	document.addEventListener("DOMContentLoaded", fn);
}
}
docReady(function() {
	console.log('------Linker 1.0------');
	let tb = document.getElementsByTagName("body");
	let iT = tb[0].innerText;
	let url = window.location.href;
	let curl = url.includes('SubmitName=DoCustStatusFlags');

// ---------------- If On Customer Status Flags Page, Do: ----------------

if (curl === true) {
	console.log('---Status flags---');

/*   Disabled clearing flags on landing at statusflags page

// ---------------- Find CustId ----------------

let cid = document.querySelectorAll("input[name='CustId']");
var custId = cid[0].value;

// ---------------- Find cust_flag_id for 'Possible duplicate accounts' Only ----------------

let trActive = document.querySelectorAll("tr.active");
let cfIn = [];
for (var i = 0, l = trActive.length; i < l; ++i) {
if (trActive[i].innerText.includes('Possible duplicate account') === true) {
	cfIn.push(trActive[i].lastElementChild.lastElementChild.href);
}
}

let cflag = cfIn.join("");
let cfr = cflag.replace(/[^0-9;]/g, "");
let cfsplit = cfr.split(';');
var cust_flag_id = cfsplit.slice(0, -1);

// ---------------- Clear Flag Dialog ----------------

async function cflagFetch(item) {
	let link = "https://url/?";
	const response = await fetch(link);
	console.log(link);
}

if (cust_flag_id.length > 0) {
	console.log('Found '+cust_flag_id.length+' DUP flags');
	loadDialog();
}
function loadDialog(item) {
//if (confirm('Clear '+cust_flag_id.length+' possible duplicate account flag(s)? \n (about 0.5 sec/flag, wait for page to refresh.)')) {
	console.log('OK, clearing flags');
//	let flagLength = cust_flag_id.length;
	browser.runtime.sendMessage('clear');
	let i = 0;
let interval = setInterval(function(){
	let item = cust_flag_id[i];
	cflagFetch(item);
	i++;
if(i === cust_flag_id.length) {
	clearInterval(interval);
	console.log('All possible duplicate flags cleared!');
	browser.runtime.sendMessage('stop');
	setTimeout(locReload, 1000);
}
}, 500);
//} else {
//	console.log('Cancelled, not clearing flags');
//}
}

function locReload(){
	location.reload();
//	window.close();
}

*/

} else {

// ---------------- If Not On Status Flag Page, Run Main Page Action: ----------------

// ---------------- Check For Potential Match ----------------

let potfind = "//b[contains(text(),'Potential match')]";
let potential = document.evaluate(potfind, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

// ---------------- Find Current Status ---------------- 

let selects = document.querySelectorAll('select[name="Status"], [name="ContactOK"], [name="PtnrContactOK"], [name="ContactOffers"], [name="ContactNewsltr"], [name="GoodEmail"], [name="GoodMobile"], [name="GoodAddr"]');
let Username = document.querySelector('input[name="Username"]').value;
let CustId = document.querySelector('input[name="CustId"]').value;
let AcctNo = document.querySelector('input[name="AcctNo"]').value;
ExtCustGroup = document.querySelector('input[name="ExtCustGroup"]').value;
let ExtCustGroupCount = document.querySelector('input[name="ExtCustGroupCount"]').value;
let contact_how = document.querySelector('input[name="contact_how"]').value;
CurStatus = selects[0].value;
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
balance = ba_get.trim();

// ---------------- Log All ----------------

console.log('Username: '+Username);
console.log('CustID: '+CustId);
console.log('Account No: '+AcctNo);
console.log('Group: '+ExtCustGroup);
console.log('Date: '+regdate);
console.log('ExtCustGroupCount: '+ExtCustGroupCount);
console.log('Current Status: '+CurStatus);
console.log('ContactOK: '+ContactOK);
console.log('PtnrContactOK: '+PtnrContactOK);
console.log('ContactOffers: '+ContactOffers);
console.log('ContactNewsltr: '+ContactNewsltr);
console.log('GoodEmail: '+GoodEmail);
console.log('GoodMobile: '+GoodMobile);
console.log('GoodAddr: '+GoodAddr);
console.log('Contact How: '+contact_how);
console.log('OBJ_CATS: '+OBJ_CATS);
console.log('Balance: '+balance);

// ---------------- Check For DMA ----------------

let checkDMA = sessionStorage.getItem('checkDMA');
let DMA = sessionStorage.getItem('DMA');

if (CurStatus == "C" && checkDMA === 'yes') {
	console.log('Already checked for DMA');
} else {
	fetch("https://url/?";)
	.then(function(response) {
if (!response.ok) {
	throw Error(response.statusText);
}
	return response.text();
})
.then(function(responseAsText) {
	sessionStorage.setItem('checkDMA', 'yes');
	let dm_start = responseAsText.indexOf('DMA');
	let dm_end = responseAsText.indexOf('<',dm_start);
	let dm_get = responseAsText.substring(dm_start,dm_end);
if (CurStatus == "C" && dm_get){
	document.body.style.border = '5px solid #A746B9';
	document.title = 'DMA - ' + ExtCustGroup;
	DMA = 'yes';
	console.log('DMA found in History');
	sessionStorage.setItem('DMA', 'yes');
}
})
.catch(function(error) {
	console.log('Looks like there was a problem: \n', error);
});
}

// ---------------- Check For Deposit Limit ----------------

let dep = document.querySelectorAll('select[name="dep_limit"], select[name="limit_period"]');
deplim = dep[0].value || dep[0].nextElementSibling.value;
let deperiod = dep[1].selectedOptions[0].text;
let perstr = deperiod.replace(/^[\s\d]+/, '');
let deperiodCut = perstr.charAt(0);
let limper = deperiod.replace(/[^0-9]+/g,"");
let depl = Math.floor(deplim);
depcombined = ''+depl+'/'+limper+deperiodCut+'';

// ---------------- Set Document Title ----------------

document.title = CurStatus + ' - ' + ExtCustGroup;

if (CurStatus == "C" && balance >0 && DMA !== 'yes') {
	document.body.style.border = '5px solid green';
//	document.title = CurStatus + ' - ' + ExtCustGroup + ' $$$';
	document.title = CurStatus + ' $$$ - ' + ExtCustGroup;
//	alert('Account is closed, but has balance. Please review.');
} 
if (deplim) {
	console.log('Account has a deposit limit of: '+ '$'  +depcombined);
	document.title =  CurStatus + ' - $'  +depcombined + ' - ' + ExtCustGroup;
}

// ---------------- Action If Potential Match ----------------

if (potential !== null) {
	console.log('Found Potential Match!');
	let pot = 'pot';
	let sendInfo = ''+AcctNo+','+ExtCustGroup+','+CustId+','+pot+'';
	browser.runtime.sendMessage(sendInfo);
} else {
	let sendInfo = ''+AcctNo+','+ExtCustGroup+','+CustId+'';
	browser.runtime.sendMessage(sendInfo);
}
browser.runtime.onMessage.addListener(function(getAction) {
	let str = getAction;
	let activate = str.includes("activate");
	let suspendDo = str.includes("suspend");
	let reasonClose = str.includes("reasoncl");
	let dupClose = str.includes("close");
	let closeDEP = str.includes("depcl");
	let closeDMA = str.includes("dmacl");
	let groupAss = str.includes("group");
	let linkacc = str.includes("link");
	let removeacc = str.includes("remove");
	let removeGr = str.includes("remgr");
	let clearAllFlags = str.includes("clearAllFlags");

	console.log(str);

if (activate && CurStatus !== "A") {
	console.log('Activating After Suspension');
	let aas = 'Reopening+after+link';
	let link = "https://url/?";
	fetchAction(link);
}
if (suspendDo) {
	let suspendInfo = str;
	let strippedSusp = suspendInfo.replace('suspend','');
	console.log('Suspending with reason: '+strippedSusp);
	let link = "https://url/?";
	fetchAction(link);
}
if (dupClose) {
	let accnums = str.replace(/[^0-9]+/g,"");
	console.log('Closing account with DUP: '+accnums);
	let closeReason = 'DUP+'+accnums;
	let link = "https://url/?";
	fetchAction(link);
}
if (reasonClose) {
	let closeStrip = str.replace('reasoncl','');
	console.log('Closing account with reason: '+closeStrip);
	let link = "https://url/?";
	fetchAction(link);
}
if (closeDEP) {
	let accnums = str.replace(/[^0-9]+/g,"");
	console.log('Closing account with DEP limit');
	let closeReason = 'Refer the customer to Dup account: '+accnums+'. Customer has a Deposit Limit.';
	let link = "https://url/?";
	fetchAction(link);
}
if (closeDMA) {
	let accnums = str.replace(/[^0-9]+/g,"");
	console.log('Closing account with DMA');
	let closeReason = 'Refer the customer to DMA Dup account: '+accnums+'.';
	let link = "https://url/?";
	fetchAction(link);
}
if (groupAss) {
	let groupAssInfo = str.replace('group','');
	console.log('Assigning to group: '+groupAssInfo);
	let link = "https://url/?";
	fetchAction(link);
}
if (removeGr) {
	let groupRemInfo = str.replace('remgr','');
	console.log('Removing from group: '+groupRemInfo);
	let link = "https://url/?";
	fetchAction(link);
}
if (linkacc) {
	let linkAcctNo = str.replace(/[^0-9]+/g,"");
	console.log('Linking account: '+linkAcctNo);
	let link = "https://url/?";
	fetchLink(link);
}
if (removeacc) {
	let removeAcctNo = str.replace(/[^0-9]+/g,"");
	console.log('Unlinking account: '+removeAcctNo);
	let link = "https://url/?";
	fetchLink(link);
}

if (clearAllFlags) {
fetch("https://url/?").then(function (response) {
	return response.text();
}).then(function (html) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(html, 'text/html');

// ---------------- Find cust_flag_id for 'Possible duplicate accounts' Only ----------------

let trActive = doc.querySelectorAll("tr.active");
let cfIn = [];
for (var i = 0, l = trActive.length; i < l; ++i) {
if (trActive[i].innerText.includes('Possible duplicate account') === true) {
	cfIn.push(trActive[i].lastElementChild.lastElementChild.href);
}
}

let cflag = cfIn.join("");
let cfr = cflag.replace(/[^0-9;]/g, "");
let cfsplit = cfr.split(';');
var cust_flag_id = cfsplit.slice(0, -1);

async function cflagFetch(item) {
	let link = "https://url/?";
	const response = await fetch(link);
	console.log(link);
}

if (cust_flag_id.length > 0) {
	console.log('Found '+cust_flag_id.length+' DUP flags');
	loadDialog();
} else {
	console.log('No DUP');
	browser.runtime.sendMessage('noDUP');
}

function loadDialog(item) {
	console.log('OK, clearing flags');
	browser.runtime.sendMessage('clear');
	let i = 0;
let interval = setInterval(function(){
	let item = cust_flag_id[i];
	cflagFetch(item);
	i++;
if(i === cust_flag_id.length) {
	clearInterval(interval);
	console.log('All possible duplicate flags cleared!');
	browser.runtime.sendMessage('stop');
}
}, 500);
}

}).catch(function (err) {
	console.warn('Unable to clear flag.', err);
});
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
}
});
