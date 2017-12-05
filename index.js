module.exports = function(obj) {
	if (!obj) obj = this;
	obj.events = {};

	obj.emit = obj.trigger = function(event, id, p) {
		if (!p && id instanceof Array) {
			p = id;
			id = null;
		}
		if (!(p instanceof Array)) p = [p];
		if (obj.events[event]) {
			for(var i=0; i < obj.events[event].length; i++) {
				obj.events[event][i].done = false;
				// nur eine Bestimmte id ausführen
				if (id && obj.events[event][i].id !== id) continue;

				if (obj.events[event][i].fn) {
					if (p.length == 0) obj.events[event][i].fn();
					else if (p.length == 1) obj.events[event][i].fn(p[0]);
					else if (p.length == 2) obj.events[event][i].fn(p[0], p[1]);
					else if (p.length == 3) obj.events[event][i].fn(p[0], p[1], p[2]);
					else if (p.length == 4) obj.events[event][i].fn(p[0], p[1], p[2], p[3]);
					else if (p.length == 5) obj.events[event][i].fn(p[0], p[1], p[2], p[3], p[4], p[5]);
					else if (p.length == 6) obj.events[event][i].fn(p[0], p[1], p[2], p[3], p[4], p[5], p[6]);
					else if (p.length == 7) obj.events[event][i].fn(p[0], p[1], p[2], p[3], p[4], p[5], p[6], p[7]);
					else if (p.length == 8) obj.events[event][i].fn(p[0], p[1], p[2], p[3], p[4], p[5], p[6], p[7], p[8]);
					else if (p.length == 9) obj.events[event][i].fn(p[0], p[1], p[2], p[3], p[4], p[5], p[6], p[7], p[8], p[9]);
					else if (p.length == 10) obj.events[event][i].fn(p[0], p[1], p[2], p[3], p[4], p[5], p[6], p[7], p[8], p[9], p[10]);
				}
				obj.events[event][i].done = true;
			}

			// Ereignisse aufräumen
			for(var i=obj.events[event].length-1; i >=0 ; i--) {
				if (!obj.events[event][i].multiple && obj.events[event][i].done) obj.events[event].splice(i, 1);
			}
		}
	};

	var uniq = function(event) {
		var id = (new Date()).getTime()+''+(Math.floor((Math.random() * 1000) + 1));
		return id;
	};

	obj.once = obj.one = function(event, id, cb) {
		if (!cb) {
			cb = id;
			id = uniq(event);
		}
		if (!obj.events[event]) obj.events[event] = [];
		obj.events[event].push({fn: cb, multiple: false, id: id});
	};

	obj.on = function(event, id, cb) {
		if (!cb) {
			cb = id;
			id = uniq(event);
		}
		if (!obj.events[event]) obj.events[event] = [];
		obj.events[event].push({fn: cb, multiple: true, id: id});
	};

	obj.off = function(event, id) {
		if (obj.events[event]) {
			if (typeof id != 'undefined' && id !== null) {
				for(var i=obj.events[event].length-1; i >= 0; i--) {
					if (obj.events[event][i].id === id) obj.events[event].splice(i, 1);
				}
			} else {
				delete obj.events[event];
			}
		}
	};

	return obj;
};
