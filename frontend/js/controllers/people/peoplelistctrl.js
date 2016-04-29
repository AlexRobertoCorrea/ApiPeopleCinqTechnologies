/**
 * Created by alex on 26/04/16.
 */
'use strict';

angular.module('api-people-cinqtechnologies')
	.controller('PeopleListCtrl', ['$scope','$rootScope','$state','$stateParams','PersonService',
		function ($scope,$rootScope,$state,$stateParams,PersonService) {
			$scope.searchQuery = "";
			//paginação
			$scope.limit = 15;
			$scope.start = 0;
			$scope.currentPage = 1;

			$scope.main = function() {
				_getPeople();
			};

			function _getPeople() {
                PersonService.list({name: $scope.searchQuery})
					.then(function(res) {
						$scope.total = res.headers()['x-list-total'] || 1;
						$scope.pageNumber = Math.ceil(res.headers()['x-list-total'] / $scope.limit) || 1;
						$scope.people = Array.isArray(res.data) ? res.data : [res.data];
					}, function() {

					});
			}

			$scope.deleteUser = function(person) {
                PersonService.deletePerson(person.id)
					.then(function(res) {
						_getPeople();
						// $scope.alert = {type: 'success', msg: person.name+" was successfully deleted."};
                        alert(person.name+" was successfully deleted.");
						$("body, html").animate({scrollTop: 0}, "normal");
					}, function() {
						// $scope.alert = {type: 'danger', msg: "Could not delete "+person.name+". Try again later."};
                        alert("Could not delete "+person.name+". Try again later.");
						$("body, html").animate({scrollTop: 0}, "normal");
					});
			};

			$scope.search = function() {
				_getPeople();
			};

			// $scope.close = function() {
			// 	delete $scope.alert;
			// };

			$scope.prevPage = function() {
				if ($scope.currentPage > 1) {
					$scope.currentPage = $scope.currentPage - 1;
					$scope.start = ($scope.currentPage - 1) * $scope.limit;
					$scope.selectedAll = false;
					$scope.marginleft = '';
					_getPeople();
				}
			};
			$scope.nextPage = function() {
				if ($scope.currentPage < $scope.pageNumber) {
					$scope.currentPage = $scope.currentPage + 1;
					$scope.start = ($scope.currentPage - 1) * $scope.limit;
					$scope.selectedAll = false;
					$scope.marginleft = '';
					_getPeople();
				}
			};

		}]);
