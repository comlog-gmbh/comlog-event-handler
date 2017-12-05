# Integrate event handler into your module

Installation via
```sh
$ npm install -s comlog-event-handler
```
# Usage
Module integration
```javascript
var myModule = {
    test: 'abc',
    doSomthing: function() {
        this.trigger('event1', ['arg 1', 'arg2', 'arg3']);
        this.trigger('event1', 'testid');
        this.trigger('event2');
    }
};
require('comlog-event-handler')(myModule);
module.exports = myModule
```

Module usage
```javascript
var myModule = require('myModule');

// bind event
myModule.on('event1', function(arg1, arg2, arg3) {
    console.info(arg1, arg2, arg3)
});

// bind event with id
myModule.on('event1', 'testid', function(arg1, arg2, arg3) {
    console.info(arg1, arg2, arg3);
});

// bind single event (will be removed after call)
myModule.one('event2', function(arg1, arg2, arg3) {
    console.info(arg1, arg2, arg3)
});
// OR
myModule.once('event3', function(arg1, arg2, arg3) {
    console.info(arg1, arg2, arg3)
});

// unbind event by id
myModule.off('event1', 'testid', function(arg1, arg2, arg3) {
	console.info(arg1, arg2, arg3)
});

// unbind all events
myModule.off('event1', function(arg1, arg2, arg3) {
	console.info(arg1, arg2, arg3)
});

myModule.trigger('event1', [arg1, arg2, arg3]);
// OR
myModule.emit('event1', [arg1, arg2, arg3]);

```
