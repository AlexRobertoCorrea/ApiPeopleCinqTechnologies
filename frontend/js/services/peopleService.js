/**
 * Created by alex on 26/04/16.
 */
angular.module('api-people-cinqtechnologies')
	.factory('PersonService', ['$q','$http','$window','$state', function($q, $http){
		var baseEndpoint='/api/v1/people';
		var canceler;

		function createPerson(client) {
			return $http.post(baseEndpoint, client).then(function(res){
				return res.data;
			}, function(res){
				return $q.reject([res.data, res.status]);
			});
		}

		function get(id) {
			return $http.get(baseEndpoint+'/'+id).then(function(res){
				return res.data;
			}, function(res){
				return $q.reject([res.data, res.status]);
			});
		}

		function list(queryParams) {
		    if (canceler) canceler.resolve();
		    canceler = $q.defer();
		    return $http.get(baseEndpoint, {params: queryParams}).then(function(res){
		        return res;
		    }, function(res){
		        return $q.reject([res.data, res.status]);
		    });
		}

		function put(id, client) {
			return $http.put(baseEndpoint+'/'+id, client).then(function(res){
				return res.data;
			}, function(res){
				return $q.reject([res.data, res.status]);
			});
		}

		function deletePerson(id) {
			return $http.delete(baseEndpoint+'/'+id).then(function(res){
				return res.status;
			}, function(res){
				return $q.reject([res.data, res.status]);
			});
		}

		return {
            createPerson:createPerson,
			get:get,
			list:list,
			put:put,
            deletePerson:deletePerson
		};
	}]);
