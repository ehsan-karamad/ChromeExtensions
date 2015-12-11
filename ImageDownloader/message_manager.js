(function() {
  function MessageHandler() {
    this.portMap_ = {};
  }

  MessageHandler.prototype.registerPort = function(portName, handler) {
    this.portMap_[portName] = handler;
  };

  MessageHandler.prototype.getPort = function(name) {
    return this.portMap_[name];
  };


})();
