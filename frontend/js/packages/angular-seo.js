/**
 * Created by alex on 26/04/16.
 */
!function(window, document, undefined) {
	var getModule = function(angular) {
		return angular.module('seo', [])
			.run([
				'$rootScope',
				function($rootScope) {
					$rootScope.htmlReady = function() {
						$rootScope.$evalAsync(function() { // fire after $digest
							setTimeout(function() { // fire after DOM rendering
								if (typeof window.callPhantom == 'function') {
									window.callPhantom();
								}
							}, 0);
						});
					};
				}
			]);
	};
	if (typeof define == 'function' && define.amd)
		define(['../../bower_components/angular/angular'], getModule);
	else
		getModule(angular);
}(window, document);
