/**
 * Created by alex on 26/04/16.
 */
'use strict';
describe('PersonCtrl', function() {
    var $controller;
    var person;

    beforeEach(function() {
        module('api-people-cinqtechnologies');

        module(function($provide) {

            $provide.value('person', {
                client: function() {
                    return {};
                }
            });
            return null;
        });
    });


    beforeEach(inject(function(_$controller_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    // describe('$scope.close', function() {
    //     it('Cancel the alert', function() {
    //         var $scope = {};
    //         var controller = $controller('PersonCtrl', { $scope: $scope });
    //         $scope.alert = {};
    //         $scope.close();
    //         expect($scope.alert).toEqual(undefined);
    //     });
    // });
});
