let iconPath = 'images/icon-128.png';
let iconDimPath = 'images/icon-128-dim.png';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // console.log(request)
    if (request.isOn) {
        console.log('on')
        chrome.pageAction.setIcon({ tabId: sender.tab.id, path: iconPath });
    } else {
        chrome.pageAction.setIcon({ tabId: sender.tab.id, path: iconDimPath });
    }
    chrome.pageAction.show(sender.tab.id);
    // sendResponse({})
});