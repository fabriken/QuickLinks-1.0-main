// QuickLinks 1.6

browser.runtime.onMessage.addListener(function(incoming, sender) {
  let fromWho = sender.tab.id;
  let message = incoming;
  let potential = message.includes('pot');
  const splitArr = message.split(',');
  let group = splitArr[4];
  let acc = splitArr[0];

  sessionStorage.setItem(fromWho, acc);
  sessionStorage.setItem('group-'+fromWho, group);

  if (potential) {
    let stor = sessionStorage.getItem('pot'+fromWho);

    if (acc === stor) {
      console.log('This item already exists in sessionStorage, no buttons created.');
    } else {
      sessionStorage.setItem('pot'+fromWho, acc);
      // console.log('Lets create buttons!');
      console.log('Potential Match: '+acc+' From Tab: '+fromWho);

      let match = document.createElement('P');
      match.innerText = 'Potential Match: '+acc;
      match.setAttribute('id', 'match'+fromWho);

      btn1 = document.createElement('button');
        btn1.innerHTML = 'Accept Link';
        btn1.className = 'btn_class';
        btn1.style.backgroundColor = '#4CAF50';
        btn1.style.border = 'none';
        btn1.style.fontSize = '16px';
        btn1.style.color = 'white';
        btn1.style.padding = '8px 16px';
        btn1.style.textDecoration = 'none';
        btn1.style.margin = '4px 2px';
        btn1.style.cursor = 'pointer';
        btn1.style.textAlign = 'center';
        btn1.setAttribute('id', 'btn1'+fromWho);

      btn2 = document.createElement('button');
        btn2.innerHTML = 'Remove Link';
        btn2.className = 'btn_class';
        btn2.style.backgroundColor = 'red';
        btn2.style.border = 'none';
        btn2.style.fontSize = '16px';
        btn2.style.color = 'white';
        btn2.style.padding = '8px 16px';
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
    document.getElementById('linkablesAction').innerHTML = 'Linked: '+acc;
    browser.tabs.sendMessage(+fromWho, 'link'+acc);
    console.log('Linked account ' +acc+ ' from tab: '+fromWho);

    document.getElementById('match'+fromWho).remove();
    document.getElementById('btn1'+fromWho).remove();
    document.getElementById('btn2'+fromWho).remove();
    sessionStorage.removeItem('pot'+fromWho);
  };

  btn2.onclick = function () {
    document.getElementById('linkablesAction').innerHTML = 'Removed: '+acc;
    browser.tabs.sendMessage(+fromWho, 'remove'+acc);
    console.log('Removed account ' +acc+ ' from tab: '+fromWho);

    document.getElementById('match'+fromWho).remove();
    document.getElementById('btn1'+fromWho).remove();
    document.getElementById('btn2'+fromWho).remove();
    sessionStorage.removeItem('pot'+fromWho);
  };

    browser.tabs.onRemoved.addListener(handleRemoved);
  }

  function handleRemoved(fromWho, removeInfo) {
    if (handleRemoved) {
      if (document.getElementById('match'+fromWho)) {
        console.log('Tab: ' + fromWho + ' closed, removing buttons.');
        document.getElementById('match'+fromWho).remove();
        document.getElementById('btn1'+fromWho).remove();
        document.getElementById('btn2'+fromWho).remove();
        sessionStorage.removeItem('pot'+fromWho);
      }
    }
  }

});

document.getElementById('reason').addEventListener('input', clearSelected);
function clearSelected() {
  document.getElementById('selected').value = '';
  document.getElementById('selected').innerHTML = '';
}

document.getElementById('pickActive').addEventListener('click', getTab);
function getTab() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
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
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    let activeTab = tabs[0].id;
    browser.tabs.sendMessage(+activeTab, 'activate');
    console.log('Sending activate to tab '+activeTab);
  });
}

document.getElementById('suspend').addEventListener('click', suspendTab);
function suspendTab(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
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
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
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

document.getElementById('pickGroup').addEventListener('click', pickedGrTab);
function pickedGrTab(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    let activeTab = tabs[0].id;
    let pickedTabGroup = JSON.parse(sessionStorage.getItem('group-'+activeTab));
    document.getElementById('pickedGR').value = +pickedTabGroup;
    document.getElementById('pickedGR').innerHTML = +pickedTabGroup;
    if (pickedTabGroup == null) {
      console.log('Incorrect tab selected');
      document.getElementById('pickedGR').value = '';
      document.getElementById('pickedGR').innerHTML = 'Incorrect Tab Selected';
    }
  });
}

document.getElementById('assign').addEventListener('click', assignTab);
function assignTab(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    let activeTab = tabs[0].id;
    let group = document.getElementById('pickedGR').value;
    browser.tabs.sendMessage(+activeTab, 'group'+group);
    console.log('Assigning tab: '+activeTab+' to group: '+group);
    document.getElementById('assignedGR').innerHTML = 'Assigned to: '+group;
  });
}

// Paste filter and open URL function:

let Account = document.getElementById('search');
Account.onpaste = account;

function account() {
  setTimeout(function() {
    let accno = document.getElementById('search').value.toUpperCase();
    let accnumbers = accno.split(/\s/);
    accnumbers = accnumbers.map(function(item,index){
      return item.replace(/[,(yY)]/g,'');
    });

    // Trim whitespaces
    accnumbers = accnumbers.filter(e => String(e).trim());

    // Filter out duplicates
    accnumbers = [...new Set(accnumbers)];
    console.log(accnumbers);
    let test = new RegExp('^[\\s0-9 ,zZyY()]*$');

    if(!accno.match(test)){
      console.log('Incorrect pattern: '+accno);
      document.getElementById('search').value = '';
      document.getElementById('output').innerHTML = 'Incorrect pattern: '+accno;
      return false;
    }

    const delayLoop = (fn, delay) => {
      return (x, i) => {
        setTimeout(() => {
          fn(x);
        }, i * delay);
      };
    };

    accnumbers.forEach(delayLoop(openTab, 500));
    function openTab(item) {
      browser.tabs.create({url: 'https://duckduckgo.com/?q='+item+'&t=canonical&atb=v223-1&ia=web'});
    }
    if (accnumbers.length == 1) {
      document.getElementById('output').innerHTML = 'Found: '+accnumbers.length + ' account' + ' in batch ' + accnumbers[0];
      document.getElementById('search').value = '';
      document.getElementById('pickedGR').value = '';
      document.getElementById('pickedGR').innerHTML = '';
      document.getElementById('reason').value = '';
      document.getElementById('reason').innerHTML = '';
      document.getElementById('selected').value = '';
      document.getElementById('selected').innerHTML = '';
      document.getElementById('linkablesAction').innerHTML = '';
      document.getElementById('assignedGR').innerHTML = '';
    } else {
      document.getElementById('output').innerHTML = 'Found: '+accnumbers.length + ' accounts' + ' in batch ' + accnumbers[0];
      document.getElementById('search').value = '';
      document.getElementById('pickedGR').value = '';
      document.getElementById('pickedGR').innerHTML = '';
      document.getElementById('reason').value = '';
      document.getElementById('reason').innerHTML = '';
      document.getElementById('selected').value = '';
      document.getElementById('selected').innerHTML = '';
      document.getElementById('linkablesAction').innerHTML = '';
      document.getElementById('assignedGR').innerHTML = '';
    }
    console.log('Correct');
    return true;
  });
}
