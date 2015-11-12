/**
 * Created by bian17888 on 15/10/20.
 */

require(['utils'], function (utils) {

	init();

	/**
	 * 初始化页面
	 */
	function init() {
		dataPicker();
		jqValidate();
		bindEvent();
	};
	function bindEvent() {
		$('#tab_bar').on('click', 'li', toggleTab);
	}

	/**
	 * 导航 Tab 切换
	 */
	function toggleTab() {
		var $this = $(this),
			type = $this.data('type'),
			tableName = $this.data('table'),
			url = $this.data('url'),
			template = $this.data('template');

		// 根据 tab 点击, 切换页面状态
		toogleStatus(type);

		// 根据 tab 点击情况, 发送 ajax 请求, 获取数据
		if (type !== 'logview') {
			var params = {};
			params.id = tableName;
			params.url = url;

			utils.gbAjax(params, function (data) {

				var tmp = $('#' + template).html(),
					compiled = _.template(tmp),
					doms = compiled(data);
				$('#' + tableName).html(doms);

			})
		}

		/**
		 * 根据 tab 点击, 切换页面状态
		 * @param type
		 */
		function toogleStatus(type) {

			// tab 按钮状态切换
			$('#tab_bar li').removeClass('active');
			$this.addClass('active');

			// 对应图层显隐
			if (type !== 'logview') {
				$('.table-container').hide();
				$('#' + tableName).show();
				$('#search_box').hide();
			} else {
				$('.table-container').hide();
				$('#' + tableName).show();
				$('#search_box').show();
			}
		}
	}

	/**
	 * 表单验证
	 */
	function jqValidate() {
		$('.home-wrap form').validate({
			onkeyup      : false,
			rules        : {
				time_from: {
					required: true
				},
				time_to  : {
					required: true
				},
				file     : {
					required: true
				},
				ip       : {
					required: true
				}
			},
			messages     : {},
			submitHandler: function (form) {

				var params = {};
				params.id = 'table_logview';
				params.url = '/logview/logsls.json';
				params.data = {};

				//
				var tempData = $(form).serializeArray();
				for (var i = 0; i < tempData.length; i++) {
					var item = tempData[i]
					if (item.name === 'time_from' || item.name === 'time_to') {
						var name = item.name,
							val = $('#' + name).datepicker('getDate').getTime();
						params.data[name] = val;
					} else {
						params.data[item.name] = item.value;
					}

				}

				// 调用公共方法
				utils.gbAjax(params, fnOk, fnError);

				function fnOk(data) {
					var tmp = $('#t_logview').html(),
						compiled = _.template(tmp),
						doms = compiled(data);

					$('#table_logview').html(doms);
				}

				function fnError(data) {
					console.log(data.status);
				}

			}
		})
	}

	/**
	 * Jquery UI 日历插件
	 */
	function dataPicker() {
		$.datepicker.setDefaults({
			showAnim       : 'slideDown',
			showButtonPanel: true,
			dateFormat     : 'yy/mm/dd'
		});

		$("#time_from").datepicker({
			onClose: function (selectedDate) {
				$("#time_to").datepicker("option", "minDate", selectedDate);
			}
		});
		$("#time_to").datepicker({
			onClose: function (selectedDate) {
				$("#time_from").datepicker("option", "maxDate", selectedDate);
			}
		});
	}

})