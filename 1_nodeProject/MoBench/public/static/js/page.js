/**
 * Created by bian17888 on 15/10/20.
 */
$(function () {
	/* validate config */
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

	$('.home-wrap form').validate({
		onkeyup      : false, //turn off auto validate whilst typing
		rules        : {
			task_uid: {
				required: true
			},
			type_url: {
				required: true
			},
			type_tcp: {
				required: true
			},
			type_dns: {
				required: true
			},
			type_ping : {
				required: true
			}

		},
		messages     : {},
		submitHandler: function (form) {
			// todo
			var postedData = {params :{}},
				formData = $(form).serializeArray();

			$.each(formData, function (index, item) {
				// 区分结构 { uid : '', params : {'web10':true}}
				if(item.name === 'uid' || item.name ==='type' || item.name==='target'){
					postedData[item.name] = item.value;
				} else if (item.name === 'login' || item.name ==='password' || item.name==='runs') {
					postedData.params[item.name] = item.value;
				}
				else {
					postedData.params[item.name] = true;
				}
			})

			$.ajax({
				type    : 'post',
				url     : '/',
				dataType: 'json',
				data    : postedData,
				success : function (data) {
					if(data.status ='ok'){
						var uid = postedData.uid;
						window.location.href = '/task/' + uid;
					} else {
						alert('创建失败')
					}
				}
			})

		}
	})

	$('#task_type').on('change', function () {
		var selectedType = $(this).val().toLocaleLowerCase();
		$('#target_url').attr({
			'name' :taskTypeMap[selectedType].name,
			'placeholder' :taskTypeMap[selectedType].placeholder,
		});
	})

	var taskTypeMap = {
		http: {
			name       : 'type_url',
			placeholder: '请输入URL, 例如:http://www.taobao.com'
		},
		tcp: {
			name       : 'type_tcp',
			placeholder: '请输入tcp地址, 例如:10.0.0.1:8080'
		},
		dns: {
			name       : 'type_dns',
			placeholder: '请输入域名, 例如:www.taobao.com'
		},
		ping: {
			name       : 'type_ping',
			placeholder: '请输入IP地址, 例如:192.168.1.1'
		}
	}
})