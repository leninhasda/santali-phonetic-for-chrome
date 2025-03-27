let iconPath = 'images/icon-128.png';
let iconDimPath = 'images/icon-128-dim.png';

chrome.runtime.onMessage.addListener((request, sender) => {
    console.log(request)
    if (request.isOn) {
        console.log('on');
        chrome.action.setIcon({ tabId: sender.tab.id, path: iconPath });
    } else {
        console.log('off');
        chrome.action.setIcon({ tabId: sender.tab.id, path: iconDimPath });
    }
});