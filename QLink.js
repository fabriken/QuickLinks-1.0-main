// Linker 1.0 - by Mikael Oerberg

// Paste filter and open URL function:

let Account = document.getElementById('search');
Account.onpaste = account;

function account() {
  setTimeout(function() {
	let accno = document.getElementById('search').value.toUpperCase();
//	let accnumbers = accno.split(/\s/);
	let accnumbers = accno.split(/[,\t\s/]/gm);
	accnumbers = accnumbers.map(function(item,index){
	return item.replace(/[,(yY)]/g,'');
});

// Trim whitespaces
accnumbers = accnumbers.filter(e => String(e).trim());

// Filter out duplicates
accnumbers = [...new Set(accnumbers)];
console.log(accnumbers);
let test = new RegExp('^[\\s0-9 ,zZyYvV()]*$');

if(!accno.match(test)){
	console.log('Incorrect pattern: '+accno);
	document.getElementById('search').value = '';
	document.getElementById('output').innerHTML = 'Incorrect pattern: '+accno;
	return false;
}

const delayLoop = (fn, delay) => {
	return (x, i) => {
	setTimeout(() => { fn(x); }, i * delay);
};
};

accnumbers.forEach(delayLoop(openTab, 500));
  function openTab(item) {
	browser.tabs.create({url: "https://url="+item+""});
}
if (accnumbers.length == 1) {
	document.getElementById('output').innerHTML = 'Found '+accnumbers.length + ' account: ' + accnumbers[0];
	document.getElementById('search').value = '';
	document.getElementById('pickedGR').value = '';
	document.getElementById('pickedGR').innerHTML = '';
	document.getElementById('reason').value = '';
	document.getElementById('reason').innerHTML = '';
	document.getElementById('selected').value = '';
	document.getElementById('selected').innerHTML = '';
	document.getElementById('groupStatus').innerHTML = '';
//	document.getElementById('actionInfo').remove();
	document.querySelectorAll("p[id='actionInfo']").forEach( n => n.remove() );
	document.getElementById('flagText').remove();
	document.getElementById('flagLoader').remove();
	onceFlags = 0;
	onceDUP = 0;
	openTabs = [];
	stopTabs = [];
	count = 0;

} else {
	document.getElementById('output').innerHTML = 'Found '+accnumbers.length + ' accounts' + ' in batch: ' + accnumbers[0];
	document.getElementById('search').value = '';
	document.getElementById('pickedGR').value = '';
	document.getElementById('pickedGR').innerHTML = '';
	document.getElementById('reason').value = '';
	document.getElementById('reason').innerHTML = '';
	document.getElementById('selected').value = '';
	document.getElementById('selected').innerHTML = '';
	document.getElementById('groupStatus').innerHTML = '';
//	document.getElementById('actionInfo').remove();
	document.querySelectorAll("p[id='actionInfo']").forEach( n => n.remove() );
	document.getElementById('flagText').remove();
	document.getElementById('flagLoader').remove();
	onceFlags = 0;
	onceDUP = 0;
	openTabs = [];
	stopTabs = [];
	count = 0;
}
	console.log('Correct pattern, opening tabs.');
	return true;
});
}

// Handle incoming messages from content script: LinkerScript.js
onceFlags = 0;
onceDUP = 0;
openTabs = [];
stopTabs = [];
count = 0;
browser.runtime.onMessage.addListener(function(incoming, sender) {
	let fromWho = sender.tab.id;
	let potential = incoming.includes('pot');
	let clearFlagStop = incoming.includes('stop');
	let clearFlags = incoming.includes('clear');
	let noDUP = incoming.includes('noDUP');
	let splitArr = incoming.split(',');
	let acc = splitArr[0];
	let group = splitArr[1];

	console.log(incoming, fromWho);
	

//if (sortGr.includes(group) === false) {
//	sortGr.push(
//	{
//	group: group,
//	tab: fromWho
//	});
//}

if (openTabs.includes(fromWho) === false) {
	openTabs.push(fromWho);
}




if (clearFlags) {
 if (onceFlags === 0) {
	onceFlags = 1;
	var flagLoader = document.createElement('div');
	var flagText = document.createElement('p');
	flagLoader.className = 'loader';
	flagLoader.id = 'flagLoader';
	flagText.id = 'flagText';
	flagText.textContent = "Clearing Flags...";
	document.body.appendChild(flagText);
	document.body.appendChild(flagLoader);
}
}

if (clearFlagStop) {
browser.tabs.remove(fromWho);

//	stopTabs.push(fromWho);
	count++
//if (stopTabs.length === count) {
	closeTabs(count)
//}
}

if (noDUP) {
 if (onceDUP === 0) {
	onceDUP = 1;
	document.getElementById('groupStatus').innerHTML = 'All DUPs cleared.';
}
	console.log('Closing Tab ' + fromWho)
	browser.tabs.remove(fromWho);
	count++
	closeTabs(count)
}

sessionStorage.setItem(fromWho, acc);
sessionStorage.setItem('group-'+fromWho, group);

if (potential) {
	let stor = sessionStorage.getItem('pot'+fromWho);
if (acc === stor) {
	console.log('This item already exists in sessionStorage, no buttons created.');
} else {
	sessionStorage.setItem('pot'+fromWho, acc);
	console.log('Potential Match: '+acc+' From Tab: '+fromWho);
	let match = document.createElement('P');
	match.innerText = 'Potential Match: '+acc;
	match.setAttribute('id', 'match'+fromWho);
	match.style.fontSize = '14px';

btn1 = document.createElement('button');
	btn1.innerHTML = 'Accept Link';
	btn1.className = 'btn_class';
	btn1.style.backgroundColor = '#4CAF50'; // initial colour
//	btn1.style.backgroundColor = '#B3CC99'; // Greenish colour match
//	btn1.style.backgroundColor = '#99CCCC';
	btn1.style.border = 'none';
	btn1.style.fontSize = '14px';
	btn1.style.color = 'white';
	btn1.style.padding = '8px 16px';
	btn1.style.borderRadius = '6px';
	btn1.style.textDecoration = 'none';
	btn1.style.margin = '4px 2px';
	btn1.style.cursor = 'pointer';
	btn1.style.textAlign = 'center';
	btn1.setAttribute('id', 'btn1'+fromWho);

btn2 = document.createElement('button');
	btn2.innerHTML = 'Remove Link';
	btn2.className = 'btn_class';
//	btn2.style.backgroundColor = '#CC9999'; // Redish colour match
//	btn2.style.backgroundColor = '#4E9B9B'; // SB MATCH
	btn2.style.backgroundColor = 'red';
	btn2.style.border = 'none';
	btn2.style.fontSize = '14px';
	btn2.style.color = 'white';
	btn2.style.padding = '8px 16px';
	btn2.style.borderRadius = '6px';
	btn2.style.textDecoration = 'none';
	btn2.style.margin = '4px 2px';
	btn2.style.cursor = 'pointer';
	btn2.style.textAlign = 'center';
	btn2.setAttribute('id', 'btn2'+fromWho);

	document.body.appendChild(match);
	document.body.appendChild(btn1);
	document.body.appendChild(btn2);
}

btn1.onclick = function () {
	let actionInfo = document.createElement('P');
	actionInfo.innerHTML = 'Linked: '+acc;
	actionInfo.setAttribute('id', 'actionInfo');
	actionInfo.style.fontSize = '14px';
	document.body.appendChild(actionInfo);

	browser.tabs.sendMessage(+fromWho, 'link'+acc);
	console.log('Linked account ' +acc+ ' from tab: '+fromWho);

	document.getElementById('match'+fromWho).remove();
	document.getElementById('btn1'+fromWho).remove();
	document.getElementById('btn2'+fromWho).remove();
	sessionStorage.removeItem('pot'+fromWho);
};

btn2.onclick = function () {
	let actionInfo = document.createElement('P');
	actionInfo.innerHTML = 'Removed: '+acc;
	actionInfo.setAttribute('id', 'actionInfo');
	actionInfo.style.fontSize = '14px';
	document.body.appendChild(actionInfo);

	browser.tabs.sendMessage(+fromWho, 'remove'+acc);
	console.log('Removed account ' +acc+ ' from tab: '+fromWho);

	document.getElementById('match'+fromWho).remove();
	document.getElementById('btn1'+fromWho).remove();
	document.getElementById('btn2'+fromWho).remove();
	sessionStorage.removeItem('pot'+fromWho);
};
	browser.tabs.onRemoved.addListener(handleRemoved);
}

function handleRemoved(tabId, removeInfo) {
if (handleRemoved) {
if (document.getElementById('match'+tabId)) {
	console.log('Tab: ' + tabId + ' closed, removing buttons.');
	document.getElementById('match'+tabId).remove();
	document.getElementById('btn1'+tabId).remove();
	document.getElementById('btn2'+tabId).remove();
	sessionStorage.removeItem('pot'+tabId);
	sessionStorage.removeItem(tabId);
	sessionStorage.removeItem('group-'+tabId);

} else {

for (var attr in sessionStorage){
if (attr == tabId) {
	console.log("Tab: " + tabId + " is closing");
	console.log(sessionStorage[attr]);
	sessionStorage.removeItem(attr);
	sessionStorage.removeItem('group-'+attr);
	sessionStorage.removeItem('pot'+attr);
}
}
}
}
}
});
// End of incoming messages

document.getElementById('reason').addEventListener('input', clearSelected);
function clearSelected() {
	document.getElementById('selected').value = '';
	document.getElementById('selected').innerHTML = '';
}

document.getElementById('pickActive').addEventListener('click', getTab);
function getTab() {
  browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
	let activeTab = tabs[0].id;
	let pickedTabAcc = JSON.parse(sessionStorage.getItem(+activeTab));
	console.log('Tab: '+activeTab+' with account: '+pickedTabAcc+' is selected as active');
	document.getElementById('reason').value = '';
	document.getElementById('selected').value = +pickedTabAcc;
	document.getElementById('selected').innerHTML = +pickedTabAcc;
if (pickedTabAcc == null) {
	console.log('Incorrect tab selected');
	document.getElementById('selected').value = '';
	document.getElementById('selected').innerHTML = 'Incorrect Tab Selected';
}
});
}

document.getElementById('activate').addEventListener('click', activateTab);
function activateTab(){
  browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
	let activeTab = tabs[0].id;
	browser.tabs.sendMessage(+activeTab, 'activate');
	console.log('Sending activate to tab '+activeTab);
});
}

document.getElementById('suspend').addEventListener('click', suspendTab);
function suspendTab(){
  browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
	let activeTab = tabs[0].id;
	let reason = document.getElementById('reason').value;
if (reason) {
	browser.tabs.sendMessage(+activeTab, 'suspend'+reason);
	console.log('Sending suspend to tab '+activeTab);
} else {
	console.log('No reason given for suspending.');
}
});
}

document.getElementById('close').addEventListener('click', closeReason);
function closeReason(){
  browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
	let activeTab = tabs[0].id;
	let reason = document.getElementById('reason').value;
	let selected = document.getElementById('selected').value;
if (reason) {
	document.getElementById('selected').value = '';
	browser.tabs.sendMessage(+activeTab, 'reasoncl'+reason);
	console.log('Sending close to tab with reason'+activeTab);
} if (selected) {
	browser.tabs.sendMessage(+activeTab, 'close'+selected);
	console.log('Sending DUP close to tab '+activeTab);
}
});
}

document.getElementById('closeDEP').addEventListener('click', closeDEP);
function closeDEP(){
  browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
	let activeTab = tabs[0].id;
	let selected = document.getElementById('selected').value;
if (selected) {
	browser.tabs.sendMessage(+activeTab, 'depcl'+selected);
	console.log('Sending DEP close to tab '+activeTab);
}
});
}

document.getElementById('closeDMA').addEventListener('click', closeDMA);
function closeDMA(){
  browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
	let activeTab = tabs[0].id;
	let selected = document.getElementById('selected').value;
if (selected) {
	browser.tabs.sendMessage(+activeTab, 'dmacl'+selected);
	console.log('Sending DMA close to tab '+activeTab);
}
});
}

document.getElementById('pickGroup').addEventListener('click', pickedGrTab);
function pickedGrTab(){
  browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
	let activeTab = tabs[0].id;
	let pickedTabGroup = sessionStorage.getItem('group-'+activeTab);
	console.log(pickedTabGroup);
	document.getElementById('pickedGR').value = pickedTabGroup;
	document.getElementById('pickedGR').innerHTML = pickedTabGroup;
if (pickedTabGroup == null) {
	console.log('Incorrect tab selected');
	document.getElementById('pickedGR').value = '';
	document.getElementById('pickedGR').innerHTML = 'Incorrect Tab Selected';
}
});
}

document.getElementById('assign').addEventListener('click', assignTab);
function assignTab(){
  browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
	let activeTab = tabs[0].id;
	let group = document.getElementById('pickedGR').value;
if (group !== undefined) {
	browser.tabs.sendMessage(+activeTab, 'group'+group);
	console.log('Assigning tab: '+activeTab+' to group: '+group);
	document.getElementById('groupStatus').innerHTML = 'Assigned to: '+group;
}
});
}

document.getElementById('removeGr').addEventListener('click', removeGrTab);
function removeGrTab(){
  browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
	let activeTab = tabs[0].id;
	let removeGroup = sessionStorage.getItem('group-'+activeTab);
	browser.tabs.sendMessage(+activeTab, 'remgr'+removeGroup);
	console.log('Removing tab: '+activeTab+' from group: '+removeGroup);
	document.getElementById('groupStatus').innerHTML = 'Removed from group: '+removeGroup;
});
}

document.getElementById('clearFlags').addEventListener('click', clearFlags);
function clearFlags(){
	console.log('Clearing all flags');
	openTabs.forEach(element => {
		browser.tabs.sendMessage(element, 'clearAllFlags');
	});
onceFlags = 0;
onceDUP  = 0
count = 0;
}

function closeTabs(count){
//setTimeout(() => {

if (count === openTabs.length) {
document.getElementById('flagText').remove();
document.getElementById('flagLoader').remove();
document.getElementById('groupStatus').innerHTML = 'All DUPs cleared.';
}

//stopTabs.forEach(element => {
//	console.log('Closing Tab ' + element)
//	browser.tabs.remove(element);

//});


//}, 1000)
}





//setTimeout(() => {
//sort = sortGr.sort((a, b) => a.group.localeCompare(b.group));

//setTimeout(() => {
//count = 0;
//sort.forEach(element => {
//	console.log(count)
//	browser.tabs.move(element.tab, {index: count});
//	count++
//});
//}, 1000);
//	console.log(sort);
//}, 3000);

