/**
 * Created by bian17888 on 15/11/12.
 */

/**
 * require config
 */
require.config ({
	baseUrl : '/static/',
	paths: {
		"jquery": "libs/jquery/dist/jquery.min",
		"underscore": "libs/underscore/underscore-min",
		'bootstrap' : "libs/bootstrap/dist/js/bootstrap.min",
		'validate' : "libs/jquery-validation/dist/jquery.validate.min",
		'jqueryui' : "libs/jquery-ui-redmond/jquery-ui.min",
		'utils' : 'js/common/utils'
	},
	shim  : {
		'underscore':{
			exports: '_'
		}
	}
});


/**
 * 初始化页面库文件 + 工具类
 */
require(['utils'],function(utils){
	utils.init();
})

