/**
 * Created by alex on 26/04/16.
 */
'use strict';

angular.module('api-people-cinqtechnologies')
	.controller('PersonCtrl', ['$scope','$state','$stateParams','person','PersonService',
		function ($scope,$state,$stateParams,person,PersonService) {
			$scope.edit = $stateParams.saved;
			$scope.person = person||{};
			$scope.alert=false;
			$scope.saving = false;

			$scope.save = function() {
				$scope.saving = true;
                if ($scope.edit && $scope.person.id || $scope.person.id) {
                    PersonService.put($scope.person.id, $scope.person)
                        .then(function (res) {
                            // $scope.alert = {type: 'alert alert-success', msg: $scope.person.name+" was successfully updated."};
                            alert($scope.person.name+" was successfully updated.");
                            $("body, html").animate({scrollTop: 0}, "normal");
                            $scope.edit = true;
                        }, function() {
                            // $scope.alert = {type: 'alert alert-danger', msg: "Could not updated "+$scope.person.name+". Try again later."};
                            alert("Could not updated "+$scope.person.name+". Try again later.");
                            $("body, html").animate({scrollTop: 0}, "normal");
                        });
                }
                else {
                    PersonService.createPerson($scope.person)
                        .then(function (res) {
                            // $scope.alert = {type: 'alert alert-success', msg: $scope.person.name+" was successfully saved."};
                            alert($scope.person.name+" was successfully saved.");
                            $scope.edit = true;
                            $("body, html").animate({scrollTop: 0}, "normal");
                        }, function() {
                            // $scope.alert = {type: 'alert alert-danger', msg: "Could not saved "+$scope.person.name+". Try again later."};
                            alert("Could not updated "+$scope.person.name+". Try again later.");
                            $("body, html").animate({scrollTop: 0}, "normal");
                        });
                }
			};

			$scope.close = function() {
				delete $scope.alert;
			};

		}]);
