myRequire = function(what) {
	switch(what) {
		case 'famous/views/Scrollview': return famous.views.Scrollview;
		default:
			throw new Error('New require of ' + what);
	}
};

module = {};
libDefine = null;

define = function(func) {
	libDefine = func;
};
