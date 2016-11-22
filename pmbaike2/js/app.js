define(function (require) {
	var $ = require('jquery'),
        ToTop = require("to-top"),
	    StickUp = require("stick-up"),
	    LazyLoad = require("lazy-load"),
        Tab = require("tab");

	    ToTop.init();
	    StickUp.init();
	    LazyLoad.init();
        Tab.init($('.tab'));
});