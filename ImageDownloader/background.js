
function sendParsePageRequest(finishedCallback) {
  var tab = chrome.tabs.getCurrent();
  chrome.tabs.query({active: true, currentWindow:true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, ['parse-document', ''], function(response) {
      finishedCallback();
    });
  })
}



chrome.runtime.onMessage.addListener(function(msg) {

});


chrome.browserAction.onClicked.addListener(function(tab) {
  tab.sendMessage
});
