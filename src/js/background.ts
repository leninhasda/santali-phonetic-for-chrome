chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // console.log(request)
    if (request.isOn) {
        console.log('on')
        chrome.pageAction.setIcon({ tabId: sender.tab.id, path: 'images/icon-48.png' });
    } else {
        chrome.pageAction.setIcon({ tabId: sender.tab.id, path: 'images/icon-48-dim.png' });
    }
    chrome.pageAction.show(sender.tab.id);
    // sendResponse({})
});