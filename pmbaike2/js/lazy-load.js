define(function (require) {
	var $ = require('jquery');
	var LazyLoad = {
		init : function () {
			this.attachEl();
			this.bind();
		},
		attachEl : function () {
			this.$loading = $('.loading');
			this.$c = $(document);
			this.dataReady = true;
		},
		bind : function () {
			var me = this;
			this.$c.on('scroll',function () {
				var scrollTop = me.$c.scrollTop(),
				    elTop = me.$loading.offset().top,
				    winHeight = $(window).height();
				if (scrollTop+winHeight>elTop) {
					me.load();
				}
			});
		},
		load : function () {
			if (!this.dataReady) {
				return;
			}
			this.dataReady = false;
			var me = this;
			var opts = {
				url : 'http://kejian.jirengu.com/data/fe/%E8%AF%BE%E4%BB%B6/30-jquery%E7%BB%83%E4%B9%A0/code/getData.php',
				type : 'GET',
				dataType : 'jsonp',
				data : {
					start : me.$loading.index(),
					len : 3
				},
				success : function (data) {
					if (data&&data.status === 'success') {
						var items = data.items;
						for (var i = 0; i < items.length; i++) {
							me.render(items[i]);
						}
					} else {
						alert('error');
					}
				},
				error : function () {
					//alert('error');
					console.log(arguments);
				},
				complete : function () {
					me.dataReady = true;
				}

			};
			$.ajax(opts);
		},
		render : function (data) {
			/*jshint multistr: true */
			var art = '<article><img src="img/1.jpg" alt="团队合作">\
				<div class="article-a clearfix">\
				<h2><a href="#">'+data.title+'</a></h2>\
				<p>\
					<span>发布日期：<time>2016年08月17日</time></span>\
					<span>|</span>\
					<span><i>标签：</i><a href="#">张小龙</a>,<a href="#">微信</a></span>\
					<span>|</span>\
					<span>点击：<i>11,109 次</i></span>\
				</p>\
				<p>'+data.content+
				'</p>\
				</div>\
			</article>';
			this.$loading.before(art);
		}


	};
	return LazyLoad;
});