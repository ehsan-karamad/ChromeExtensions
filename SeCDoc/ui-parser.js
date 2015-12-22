

function Item(itemName, itemType, itemURLs) {
  var name = itemName;
  var type = itemType;
  var urls = itemURLs;
  this.URLs = function() {
    return urls;
  };
  this.type() = function() {
    return type;
  };
  this.name() = function() {
    return name;
  };
}


function currentPath() {

  var re = new RegExp("codesearch#chromium/src/*\.[cpp|h|cc|js]");

}

function getAllItems() {
}

