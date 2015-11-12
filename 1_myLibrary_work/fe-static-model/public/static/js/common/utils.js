/**
 * Created by bian17888 on 15/10/22.
 */

define(['jquery', 'underscore', 'validate', 'jqueryui'], function ($, _) {

	/**
	 * 初始化页面, 加载所需框架 + 各配置参数
	 */
	function init(){
		// jquery validate 配置参数
		initValidate();
	}

	/**
	 * 通用 ajax 方法
	 * @param params
	 * @param fnOk
	 * @param fnError
	 * @constructor
	 */
	function gbAjax (params, fnOk, fnError) {
		$.ajax({
			type      : params.type || 'get',
			url       : params.url,
			dataType  : 'json',
			data      : params.data || {},
			success   : fnOk,
			error     : function () {
				console.log('ajax error!')
			},
			beforeSend: function () {
				$('#' + params.id).html('<span class="ajax-loading">加载远程数据中......</span>')
			},
			complete  : function () {
				$('.ajax-loading').remove();
			}
		})
	}


	/**
	 * 初始化 jQuery validate 组件
	 */
	function initValidate(){
		jQuery.extend(jQuery.validator.messages, {
			required   : "必须填写",
			remote     : "请修正此栏位",
			minlength  : jQuery.validator.format("最少{0}个字符"),
			maxlength  : jQuery.validator.format("最多{0}个字符"),
			rangelength: jQuery.validator.format("请输入长度为 {0} 至 {1} 之间的字符"),
			min        : jQuery.validator.format("请输入不小于 {0} 的数值"),
			max        : jQuery.validator.format("请输入不大于 {0} 的数值"),
			range      : jQuery.validator.format("请输入 {0} 至 {1} 之间的数值"),
			email      : "请输入有效的电子邮件",
			url        : "请输入有效的网址",
			date       : "请输入有效的日期",
			dateISO    : "请输入有效的日期 (YYYY-MM-DD)",
			number     : "请输入正确的数字",
			digits     : "只可输入数字",
			creditcard : "请输入有效的信用卡号码",
			equalTo    : "两次输入密码不一致",
			extension  : "请输入有效的后缀"
		});
	}

	return {
		init : init,
		gbAjax : gbAjax
	}

})