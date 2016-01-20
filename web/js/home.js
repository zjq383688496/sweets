$(function () {
	/* header */

	// flexslider配置
	var fs_options = {
		def: {
			animation: 'slide',
			animationLoop: false,
			slideshow: false,
			controlNav: false
		},
		// 首页底部
		footer: function () {
			var that = this.def;
			that.itemWidth = 132;
			that.maxItems  = 7;
			return that;
		},
		// 品牌列表
		brands: function () {
			var that = this.def;
			that.itemWidth = 184;
			that.maxItems  = 5;
			return that;
		},
		// 商品列表
		products: function () {
			var that = this.def;
			that.itemWidth = 70;
			that.maxItems  = 9;
			return that;
		}
	}
	if (!window.headerFn) window.headerFn = {};
	window.headerFn = {
		// 初始化
		init: function () {
			// 导航
			this.$nav       = $('.header-nav>li');
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
					parent.append('<div class="dialog-mask-close" data-hide="'+name+'" onclick="headerFn.ui.close(this, event);"></div>');
				}
				dom.parent().addClass('s-active');
				dom.show();
			},
			close: function (obj, e) {
				var e = e || window.event;
				headerFn.stopEvent(e);
				var attr = $(obj).attr('data-hide');
				var dom  = $(attr);
				dom.hide();
				$(obj).remove();
				headerFn.$nav.removeClass('s-active');
			}
		},
		// 阻止默认事件
		stopEvent: function (e) {
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
					var options = typeof(fs_options[attr]) === 'function'? fs_options[attr](): '';
					if (options) dom.flexslider(options);
				});
			}
		}
	}
	headerFn.init();
});