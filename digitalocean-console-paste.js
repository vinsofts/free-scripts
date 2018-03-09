var sendString = (function(rfb, force, sendDelay) { 
sendDelay = sendDelay || 25;
var _q = [];
var _qStart = function() {
var chr = _q.shift();
if (chr) {
  rfb.sendKey(chr);
  setTimeout(_qStart, sendDelay);
}
};
var _qStop = function() { _q.length = 0; };
var fn = function sendString(str) {
_qStop();
str = str || '';
var chr;
for (var i=0; i < str.length; i++) {
  chr = str[i].charCodeAt();
  _q.push(chr);
}
_qStart();
};
if (rfb.sendString && true !== force) {
console.warn('rfb.sendString not installed because it already exists.  Use force if you\'d like');
}
else {
rfb.sendString = fn;
}
return fn;
})(rfb);
