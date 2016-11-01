define('stick-up',['jquery'],function (require,exports,module) {
	var $ = require('jquery');
	var StickUp = {
		init : function () {
			this.attachEl();
			this.bind();
		},
		attachEl : function () {
			this.$el = $('nav');
			this.$c = $(document);
			this.elTop = this.$el.offset().top;
		},
		bind : function () {
			var me = this;
			this.$c.on('scroll',function () {
				me.do();
			});
		},
		do : function () {
			var scrollTop = this.$c.scrollTop();
			if (scrollTop > this.elTop) {
				this.stick();
			} else {
				this.unstick();
			}
		},
		stick : function () {
			if (this.$el.hasClass('sticked')) {
				return;
			}
			this.$el.addClass('sticked');
			this.$el.css('position','fixed');
			var $temp = $('<div class="temp"></div>');
			$temp.height(this.$el.outerHeight(true));
			this.$el.before($temp);
		},
		unstick : function () {
			this.$el.removeClass('sticked');
			this.$el.prev('.temp').remove();
			this.$el.css('position','static');
		}

	};
	module.exports = StickUp;
});









/**
var stickUp = {
	init : function () {
		this.attachEl();
		this.bind();
	},
	attachEl : function (){
		this.$el = $('nav');
		this.$c = $(document);
		this.elHeight = this.$el.offset().top;
	},
	bind : function () {
		var me = this;
		this.$c.on('scroll',function () {
			me.do();
		});
	},
	do : function () {
		if (this.$c.scrollTop()>this.elHeight) {
			this.stick();
		} else {
			this.unstick();
		}
	},
	stick : function () {
		if (this.$el.hasClass('sticked')) {
			return;
		}
		this.$el.addClass('sticked');
		this.$el.css('position','fixed');
		var $temp = $('<div class="temp"></div>');
		$temp.height(this.$el.outerHeight(true));
		this.$el.before($temp);
	},
	unstick : function () {
		this.$el.removeClass('sticked');
		this.$el.css('position','static');
		this.$el.prev('.temp').remove();
	}
};
stickUp.init();
*/