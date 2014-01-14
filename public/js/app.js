'use strict';

angular.module('telltale', [
	'ngCookies', 
	'ngResource', 
	'ngRoute', 
	'ui.bootstrap', 
	'ui.route', 
	'telltale.system', 
	'telltale.articles', 
	'telltale.summa', 
	'telltale.directives'
	]);

angular.module('telltale.system', []);
angular.module('telltale.articles', []);
angular.module('telltale.summa', []);