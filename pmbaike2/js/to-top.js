define(['jquery'],function ($) {
	// body...
	var ToTop = {
		init : function () {
			this.attachEl();
			this.bind();
		},
		attachEl : function () {
			this.$el = $('#to-top');
			this.$c = $(document);
		},
		bind : function () {
			var me = this;
			this.$el.on('click',function () {
				me.goToTop();
			});
			this.$c.on('scroll',$.proxy(this.scroll,this));
		},
		goToTop : function () {
			this.$c.scrollTop(0);
		},
		scroll : function () {
			if (this.$c.scrollTop()>100) {
				this.$el.show();
			} else {
				this.$el.hide();
			}
		}
	};
	return ToTop;
});
