//The build will inline common dependencies into this file.

//For any third party dependencies, like jQuery, place them in the lib folder.

//Configure loading modules from the lib directory,
//except for 'app' ones, which are in a sibling
//directory.
requirejs.config({
	baseUrl: 'lib',
	paths  : {
		app        : '../js/app',
		page       : '../js/page',
		utils      : '../js/app/common/utils',
		init       : '../js/app/common/init',
		/*
		 * third libs : AMD
		 * */
		jquery     : 'jquery/dist/jquery',
		validate   : 'jquery-validation/dist/jquery.validate',
		'jquery.ui': 'jquery-ui/jquery-ui',
		/*
		 * third libs : not AMD
		 * */
		underscore : 'underscore/underscore',
	},
	shim   : {
		'underscore': {exports: '_'}
	}
});
