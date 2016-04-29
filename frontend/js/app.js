/**
 * Created by alex on 26/04/16.
 */
'use strict';

angular.module('api-people-cinqtechnologies', [
	'ngRoute',
	// 'ngCookies',
	'ui.router',
	'ui.utils',
	'ui.mask',
	'angularMoment',
	'seo',
	'slugifier',
	'autocomplete',
	'toastr',
	'ng.deviceDetector',
	'ngSanitize'
]).config(['$stateProvider','$urlRouterProvider','$locationProvider', '$httpProvider',
	function($stateProvider,$urlRouterProvider,$locationProvider, $httpProvider){
		$stateProvider
			.state('personnew', {
				url:'/person',
				templateUrl: 'templates/people/person.html',
				controller: 'PersonCtrl',
				resolve: {
					person: _.noop
				}
			})
			.state('personedit', {
				url:'/person/:id?saved',
				templateUrl: 'templates/people/person.html',
				controller: 'PersonCtrl',
				resolve: {
                    person: ['PersonService','$stateParams', function(PersonService, $stateParams){
						if($stateParams.id) {
							return PersonService.get($stateParams.id).then(function(client){
								return client;
							}, function(err){
								console.log(err);
							});
						}
					}]
				}
			})
			.state('peoplelist', {
				url:'/people',
				templateUrl: 'templates/people/peoplelist.html',
				controller: 'PeopleListCtrl'
			})
		;

		// use the HTML5 History API
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});

		//Configurando interceptor para todas requisicoes http
		$httpProvider.interceptors.push('HttpInterceptor');

		$urlRouterProvider.otherwise('/people');
	}]).run(['$rootScope','$q','amMoment','$state','$window','$location','$route',
	function($rootScope,$q,amMoment,$state,$window,$location,$route) {
		$q.resolve=function(val){
			var d=$q.defer();
			d.resolve(val);
			return d.promise;
		};

		var original = $location.path;
		$location.path = function (path, reload) {
			if (reload === false) {
				var lastRoute = $route.current;
				var un = $rootScope.$on('$locationChangeSuccess', function () {
					$route.current = lastRoute;
					un();
				});
			}
			return original.apply($location, [path]);
		};

		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
			$window.scrollTo(0, 0);
			$rootScope.lastState = fromState;
			$rootScope.lastStateParams = fromParams;
		});

	}]);
