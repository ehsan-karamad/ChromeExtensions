var index = 0;
// Extension Messages to Content Scripts
var MSG_SEND_IMAGE_LIST = index++;
var MSG_INFO_READY = index++;

// Content Script to Extension
var MSG_IMAGE_LIST = index++;


function Image(url, id) {
  this.url = url;
  this.id = id;
}

function Message(msgType, msgArgs) {
  this.header = msgType;
  this.args = msgArgs;
}
