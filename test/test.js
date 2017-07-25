var myModule = {
    test: 'abc',
    doSomthing: function() {
        this.trigger('event1', ['arg 1', 'arg 2', 'arg 3']);
        this.trigger('event1', 'testid', [9,8,7]);
        this.trigger('event2');
    }
};
require('../')(myModule);

myModule.on('event1', function(arg1, arg2, arg3) {
    console.info(arg1, arg2, arg3)
});
myModule.on('event1', 'testid', function(arg1, arg2, arg3) {
	console.info(arg1, arg2, arg3)
});
// single event will be removed after call
myModule.one('event2', function(arg1, arg2, arg3) {
    console.info(arg1, arg2, arg3)
});
// unbind event
myModule.off('event1', function(arg1, arg2, arg3) {
	console.info(arg1, arg2, arg3)
});

myModule.doSomthing();