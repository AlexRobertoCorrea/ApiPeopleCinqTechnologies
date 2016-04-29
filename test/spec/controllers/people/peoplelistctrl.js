/**
 * Created by alex on 26/04/16.
 */
describe('PeopleListCtrl', function() {
	beforeEach(module('api-people-cinqtechnologies'));

	var $controller;

	beforeEach(inject(function(_$controller_){
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$controller = _$controller_;
	}));

	// describe('$scope.close', function() {
	// 	it('Cancel the alert', function() {
	// 		var $scope = {};
	// 		var controller = $controller('PeopleListCtrl', { $scope: $scope });
	// 		$scope.alert = {};
	// 		$scope.close();
	// 		expect($scope.alert).toEqual(undefined);
	// 	});
	// });

	describe('$scope.nextPage', function() {
		it('Forward one page', function() {
			var $scope = {};
			var controller = $controller('PeopleListCtrl', { $scope: $scope });
			$scope.limit = 15;
			$scope.start = 0;
			$scope.currentPage = 1;
			$scope.pageNumber = 1;
			$scope.nextPage();
			expect($scope.limit).toEqual(15);
			expect($scope.start).toEqual(0);
			expect($scope.currentPage).toEqual(1);
			$scope.pageNumber = 2;

			$scope.nextPage();
			expect($scope.limit).toEqual(15);
			expect($scope.start).toEqual(15);
			expect($scope.currentPage).toEqual(2);
		});
	});

	describe('$scope.prevPage', function() {
		it('Back one page', function() {
			var $scope = {};
			var controller = $controller('PeopleListCtrl', { $scope: $scope });
			$scope.limit = 15;
			$scope.start = 0;
			$scope.currentPage = 1;
			$scope.pageNumber = 1;
			$scope.nextPage();
			expect($scope.limit).toEqual(15);
			expect($scope.start).toEqual(0);
			expect($scope.currentPage).toEqual(1);

			$scope.pageNumber = 2;
			$scope.nextPage();
			expect($scope.limit).toEqual(15);
			expect($scope.start).toEqual(15);
			expect($scope.currentPage).toEqual(2);

			$scope.pageNumber = 1;
			$scope.prevPage();
			expect($scope.limit).toEqual(15);
			expect($scope.start).toEqual(0);
			expect($scope.currentPage).toEqual(1);
		});
	});
});
