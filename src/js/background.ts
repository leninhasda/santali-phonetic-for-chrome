let iconPath = 'images/icon-128.png';
let iconDimPath = 'images/icon-128-dim.png';

chrome.runtime.onMessage.addListener((request, sender) => {
    console.log("request received", request)
    if (request.isOn) {
        console.log("switching to color icon");
        chrome.action.setIcon({ tabId: sender.tab.id, path: iconPath });
    } else {
        console.log("switching to dim icon");
        chrome.action.setIcon({ tabId: sender.tab.id, path: iconDimPath });
    }
});