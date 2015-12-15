
var MIN_IMAGE_WIDTH = 0;
var MIN_IMAGE_HEIGHT = 0;

function ImageMap() {
  var nextImageId = 0;
  var idToImage = {}
  this.registerImage = function(image) {
    var index = nextImageId++;
    idToImage[index] = image;
    return index;
  };
  this.getImageById = function(id) {
    return !!idToImage[id] ? idToImage[id] : null;
  };
  this.removeById = function(id) {
    if (!!idToImage[id]) {
      idToImage[id] = null;
    }
  }
}

var imageMapInstance  = new ImageMap();


function sendAllImagesToBackgroundPage() {
  var imgs = document.querySelectorAll('img');
  for (var index = 0; index < imgs.length; ++index) {
    encloseElementInDiv(imgs[index]);
  }
  var imgList = [];
  for (var index = 0; index < imgs.length; ++index) {
    var imgToSend = imgs[index];
    if (imgToSend.width > MIN_IMAGE_WIDTH && imgToSend.height > MIN_IMAGE_HEIGHT) {
      var image = new Image(imgToSend.src, imageMapInstance.registerImage(imgToSend));
      imgList.push(image);
    }
  }
  if (imgList.length) {
    chrome.runtime.sendMessage(new Message(MSG_IMAGE_LIST, imgList));
  }
}

function getEnclosingDiv(el) {
  var d = document.createElement('div');
  d.appendChild(el);
  return d;
}

function encloseElementInDiv(el) {
  var parent = el.parentElement;
  nodeList = [];
  if (parent) {
    while(parent.firstChild) {
      var child = parent.firstChild;
      parent.removeChild(child);
      if (child === el) {
        nodeList.push(getEnclosingDiv(child));
      } else {
        nodeList.push(child);
      }
    }
    for (var index = 0; index < nodeList.length; ++index) {
      parent.appendChild(nodeList[index]);
    }
  }
}

function addInfoToImage(img, date) {
  var p = img.parentElement;
  var span = document.createElement('span');
  span.innerHTML = date;
  p.appendChild(span);
}

chrome.runtime.onMessage.addListener(function(msg, sender, response) {
  switch (msg.header) {
    case MSG_SEND_IMAGE_LIST:
      sendAllImagesToBackgroundPage();
      break;
    case MSG_INFO_READY:
      var imgId = msg.args.image.id;
      var date = new Date(msg.args.result.date);
      var img = imageMapInstance.getImageById(imgId);
      if (img) {
        imageMapInstance.removeById(imgId);
        addInfoToImage(img, date);
      }
      break;
  }
});
