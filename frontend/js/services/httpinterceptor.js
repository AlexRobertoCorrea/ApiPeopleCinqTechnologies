/**
 * Created by alex on 26/04/16.
 */
'use strict';

angular.module('api-people-cinqtechnologies')
	.factory('HttpInterceptor', ['$q', '$window', '$injector', '$location', function ($q, $window, $injector, $location) {

		return {
			request: function(config) {
				if(config.method=='GET' && config.params){//coloca timestamp em todas chamadas GET a api para evitar cache
					//console.log(config.params);
					config.params =  _.extend({timestamp: new Date().getTime()}, config.params);
				}
				return config;
			}

		}

	}]);
