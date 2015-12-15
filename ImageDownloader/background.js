
function sendParsePageRequest(finishedCallback) {
  var tab = chrome.tabs.getCurrent();
  chrome.tabs.query({active: true, currentWindow:true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, ['parse-document', ''], function(response) {
      finishedCallback();
    });
  })
}

function randomInt(l, r) {
  return Math.floor(Math.random() * (r - l) + l);
}

function randomDate() {
  var now = new Date(Date.now());
  var fullYear = now.getFullYear();
  var yearBefore = randomInt(0, 10);
  var month = randomInt(0, 12) + 1;
  if (yearBefore === 0) {
    month = now.getMonth() - randomInt(0, now.getMonth());
  }
  var day = randomInt(0, 28) + 1;
  if (month === now.getMonth() && yearBefore === 0) {
    day = now.getDate() - randomInt(0, now.getDate());
  }
  var d = new Date(fullYear - yearBefore, month, day);
  return d.toDateString();
}

function ImageRequestJob(image, tabId) {
  this.image = image;
  this.tabId = tabId;
}

ImageRequestJob.prototype.run = function() {
  // simply call back and tell the tab that the job completed.
  var args = {
    "image": this.image,
    "result": {
      "date": randomDate()
    }
  };
  chrome.tabs.sendMessage(this.tabId, new Message(MSG_INFO_READY, args));
};

chrome.runtime.onMessage.addListener(function(msg, sender) {
  if (msg.header === MSG_IMAGE_LIST) {
    var list = msg.args;
    for (var i = 0; i < list.length; ++i) {
      var image = list[i];
      var job = new ImageRequestJob(image, sender.tab.id);
      job.run();
    }
  }
});


chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id, new Message(MSG_SEND_IMAGE_LIST, null));
});
