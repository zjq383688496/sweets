$(function () {
	/* header */

	// flexslider配置
	var fs_options = {
		// 首页底部
		footer: {
			animation: 'slide',
			animationLoop: false,
			slideshow: false,
			itemWidth: 132,
			maxItems: 7,
			controlNav: false
		},
		// 品牌列表
		brands: {
			animation: 'slide',
			animationLoop: false,
			slideshow: false,
			itemWidth: 184,
			maxItems: 5,
			controlNav: false
		}
	}
	if (!window.headerFn) window.headerFn = {};
	window.headerFn = {
		// 初始化
		init: function () {
			// 品牌
			this.$brandBtn  = $('#navBrand');
			this.$brandBox  = $('.nb-box');
			// 搜索
			this.$searchBtn = $('#navSearch');
			this.$searchBox = $('.ns-box');
			// 排序
			this.$sortBtn   = $('#sortBtn');
			this.$sortBox   = $('.sort-box');

			this.$flexslider = $('.flexslider');

			this.bindEvent();
			this.plug_in.flexslider();
		},
		_init: function () {
			
		},
		// 事件绑定
		bindEvent: function () {
			var that = this;

			// 品牌展开||隐藏
			this.$brandBtn.bind('click', function () {
				that.ui.show(that.$brandBox, '.nb-box');
			});
			// 搜索展开||隐藏
			this.$searchBtn.bind('click', function () {
				that.ui.show(that.$searchBox, '.ns-box');
			});
			// 排序展开||隐藏
			this.$sortBtn.bind('click', function () {
				that.ui.show(that.$sortBox, '.sort-box');
			});
		},
		// UI展示
		ui: {
			show: function (dom, name) {
				var parent = dom.parent();
				if (!parent.find('.dialog-mask-close').length) {
					parent.append('<div class="dialog-mask-close" data-hide="'+name+'" onclick="headerFn.ui.close(this);"></div>');
				}
				dom.show();
			},
			close: function (obj, e) {
				headerFn.stopEvent(e);
				var attr = $(obj).attr('data-hide');
				var dom  = $(attr);
				dom.hide();
				$(obj).remove();
			}
		},
		// 阻止默认事件
		stopEvent: function (e) {
			var e = e || window.event;
			if ( e.stopPropagation ) {
				e.stopPropagation();
			} else {
				e.cancelBubble = true;
				return false;
			}
		},
		// 插件
		plug_in: {
			flexslider: function () {
				headerFn.$flexslider.each(function (i, e) {
					var dom     = $(e);
					var attr    = dom.attr('data-options');
					var options = fs_options[attr];
					if (options) dom.flexslider(options);
				});
			}
		}
	}
	headerFn.init();
	/*$('.flexslider').flexslider({
		animation: "slide",
		animationLoop: false,
		slideshow: false,
		itemWidth: 132,
		itemMargin: 0,
		minItems: 1,
		maxItems: 7,
		controlNav: false
		//directionNav: false
		// pausePlay: true
	});*/
	/*$('.flexslider').flexslider({
		animation: 'slide',
		animationLoop: false,
		slideshow: false,
		itemWidth: 184,
		maxItems: 5,
		controlNav: false
	});*/
});