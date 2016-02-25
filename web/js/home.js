/* jQuery方法扩展: $.browser/$.fn */
(function($) {
	if (!$) return;
	// $.browser方法扩展
	var ua = navigator.userAgent.toLowerCase();
	if (!$.browser) {
		$.browser = {
			version: (ua.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1],
			safari: /webkit/.test(ua),
			opera: /opera/.test(ua),			
			mozilla: /mozilla/.test(ua) && !/(compatible|webkit)/.test(ua)
		};
	}
	// 增加了IE11的判断
	$.extend($.browser, {
		isIE6: ($.browser.msie && $.browser.version == 6) ? true: false,
		IEMode: (function() {
			if ($.browser.msie) {
				if (document.documentMode) {
					// >=IE8
					return document.documentMode;
				}
				if (document.compatMode && document.compatMode == 'CSS1Compat') {
					return 7;
				}
				// quirks mode
				return 5;
			}
			return 0;
		})(),
		isIPad: (/ipad/i).test(ua),
		isAndroid: (/android/i).test(ua),
		isIPhone: (/iphone/i).test(ua),
		isSymbian: (/symbianos/i).test(ua),
		isIPod: (/ipod/i).test(ua),
		isWin: (/windows/i).test(ua),
		isMac: (/mac os x/i).test(ua),
		isLinux: (/linux/i).test(ua),
		isWechat: (/micromessenger/i).test(ua),
		isPC: function () {
			var Agents = ['android', 'iphone', 'symbianos', 'windows phone', 'ipad', 'ipod'];
			var flag = true;
			for (var i = 0; i < Agents.length; i++) {
			   if (ua.indexOf(Agents[i]) > 0) { flag = false; break; }
			}
			return flag;
		},
		isMobile: function () {
			return (!this.isPC());
		}
	});
})(jQuery);
$(function () {
	/* header */

	// flexslider配置
	var fs_options = {
		def: {
			animation: 'slide',
			animationLoop: false,
			slideshow: false,
			controlNav: false,
			move: 1
		},
		// 首页底部
		footer: function () {
			var that = this.def;
			var b = $('body');
			that.itemWidth = 132;
			that.maxItems  = 7;
			that.maxItems  = b.hasClass('s-pad')? 5: 7;
			return that;
		},
		// 品牌列表
		brands: function () {
			var that = this.def;
			var b = $('body');
			//that.itemWidth = 184;
			that.itemWidth = b.hasClass('s-pad')? 160: 184;
			that.maxItems  = b.hasClass('s-pad')? 4: 5;
			return that;
		},
		// 商品列表
		products: function () {
			var that = this.def;
			var b = $('body');
			that.itemWidth = $.browser.isMobile()? 60: 70;
			that.maxItems  = b.hasClass('s-phone')? 4: 9;
			that.maxItems  = b.hasClass('s-pad')? 6: that.maxItems;
			that.move = $.browser.isMobile()? 0: 1;
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
			// 移动列表
			this.$mobileBtn = $('#mobileList');
			this.$mobileBox = $('.ml-box');
			// 搜索
			this.$searchBtn = $('#navSearch');
			this.$searchBox = $('.ns-box');
			// 排序
			this.$sortBtn   = $('#sortBtn');
			this.$sortBox   = $('.sort-box');

			this.$flexslider = $('.flexslider');

			this.screen();
			this.bindEvent();
			this.plug_in.flexslider();
		},
		// 事件绑定
		bindEvent: function () {
			var that = this;

			// 品牌展开||隐藏
			this.$brandBtn.bind('click', function () {
				that.ui.show(that.$brandBox, '.nb-box');
			});
			// 移动列表展开||隐藏
			this.$mobileBtn.bind('click', function () {
				that.ui.show(that.$mobileBox, '.ml-box');
			});
			// 搜索展开||隐藏
			this.$searchBtn.bind('click', function () {
				that.ui.show(that.$searchBox, '.ns-box');
			});
			// 排序展开||隐藏
			this.$sortBtn.bind('click', function () {
				that.ui.show(that.$sortBox, '.sort-box');
			});
			// 屏幕类型
			$(window).bind('resize', function () {
				that.screen();
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
					if (options && !(attr=='brands' && $('body').hasClass('s-phone'))) dom.flexslider(options);
				});
			}
		},
		screen: function () {
			var b = $('body');
			var w = $(window).width();
			if (w <= 480) {
				b.attr('class', 's-phone');
			} else if (w <= 1024 && w > 480) {
				b.attr('class', 's-pad');
			} else {
				b.attr('class', 's-web');
			}
		}
	}
	headerFn.init();
});