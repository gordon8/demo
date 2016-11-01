define("app",function (require) {
	var ToTop = require("to-top"),
	    StickUp = require("stick-up"),
	    LazyLoad = require("lazy-load");

	    ToTop.totop.init();
	    StickUp.init();
	    LazyLoad.init();
});