$(function(){
	/*  ===== 导航菜单 ====== */
	$('.navMain-in>ul>li').hover(
		function(){
			var hasSubUl = $(this).find('.sub-ul').hasClass('sub-ul');
			if(hasSubUl){
				$(this).find('a:first-child').addClass('active');
				$(this).find('.sub-ul').stop(true,true).slideDown({duration:'fast',easing:'easeOutCubic'});
			}
		},
		function(){
			$(this).find('a:first').removeClass('active');  
			$(this).find('.sub-ul').stop(true,true).fadeOut('fast');
		}
	);
	/*  ===== 视图切换 ====== */
	$('.filter-bar .btn-filter').click(function(){
		var btnId = $(this).attr('id');
		$('.filter-bar .btn-filter').removeClass('active')
		$(this).addClass('active');
		if(btnId == 'btn-viewList'){
			$('.products').removeClass('prd-thumb').addClass('prd-list');
		}
		else if(btnId == 'btn-viewPic'){
			$('.products').removeClass('prd-list').addClass('prd-thumb');
		}
		return false;
	});
	/*  ===== 标签上升 ====== */
	$('.fm-runway li .tip-bar').css('bottom','-24px');
	$('.fm-runway li').hover(
		function(){
			$(this).find('.tip-bar').stop(true,true).animate({bottom:0},'fast');
		},
		function(){
			$(this).find('.tip-bar').stop(true,true).animate({bottom:'-24px'},'fast');
		}
	);
	/*  ===== 轮转模块 ====== */
	$.fn.cycle.updateActivePagerLink = function(pager, currSlideIndex) { 
		$(pager).find('a').removeClass('active').filter('a:eq('+currSlideIndex+')').addClass('active'); 
	}; 
	$('.slide').not($('.slide-features')).hover(
		function(){
			$(this).find('.slide-btns').css('display','block');
		},
		function(){
			$(this).find('.slide-btns').css('display','none');
		}
	);
	//首页大轮转
	$('.slide-main .slide-cont ul').cycle({
		fx: 'scrollHorz',
		easeIn:'easeOutCirc',
		timeout:5000,
		speed:600,
		prev:'.slide-main .sbtn-prev',
		next:'.slide-main .sbtn-next',
		pagerEvent: 'mouseover',
		pager:  '.slide-main .slide-pages p', 
		pagerAnchorBuilder: function(idx, slide) { 
			return '.slide-main .slide-pages p a:eq(' + idx + ')'; 
		} 
	});
	//主打 Spotlight
	$('.slide-spotlight .slide-cont ul').cycle({
		fx: 'scrollHorz',
		easeIn:'easeOutCirc',
		timeout:0,
		speed:600,
		prev:'.slide-spotlight .sbtn-prev',
		next:'.slide-spotlight .sbtn-next'
	});
	//明星款 Celeb Style
	$('.slide-celeb .slide-cont ul').cycle({
		fx: 'scrollHorz',
		easeIn:'easeOutCirc',
		timeout:0,
		speed:600,
		pagerEvent: 'mouseover',
		pager:  '.slide-celeb .slide-pages p', 
		pagerAnchorBuilder: function(idx, slide) { 
			return '.slide-celeb .slide-pages p a:eq(' + idx + ')'; 
		} 
	});
	//编辑推荐 Editor's Pick
	$('.slide-features .slide-cont').cycle({
		fx: 'fade',
		easeOut:'easeOutCirc',
		timeout:0,
		speed:2000,
		prev:'.slide-features .sbtn-prev',
		next:'.slide-features .sbtn-next'
	});
	//详情页 编辑推荐穿搭
	$('.slide-editor-show .slide-cont ul').cycle({
		fx: 'scrollHorz',
		easeIn:'easeOutCirc',
		timeout:0,
		speed:600,
		prev:'.slide-editor-show .sbtn-prev',
		next:'.slide-editor-show .sbtn-next'
	});
	
	/*  ===== 其他 ====== */
	//购物 Shopping - 边框
	$('.idx-shopping .ul-wrap li').hover(
		function(){
			$(this).addClass('li-hover');
		},
		function(){
			$(this).removeClass('li-hover');
		}
	);
	
	/*  ===== IE6 ====== */
	if (($.browser.msie) && ($.browser.version == "6.0")){
		var ieHTML = ' <!--[if lt IE 7]> <div style=" clear: both; width:960px; height: 59px; padding:0 0 0 15px; position: relative; margin:20px auto; text-align:center;"> <a href="http://windows.microsoft.com/en-US/internet-explorer/products/ie/home?ocid=ie6_countdown_bannercode"><img src="http://storage.ie6countdown.com/assets/100/images/banners/warning_bar_0027_Simplified Chinese.jpg" border="0" height="42" width="820" alt="You are using an outdated browser. For a faster, safer browsing experience, upgrade for free today." /></a></div> <![endif]--> ';
		$('body').html(ieHTML);
	}
});


	