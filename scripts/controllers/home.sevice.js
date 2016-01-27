var app = angular.module('Dashboard');

app.factory('homeService', function($http) {
	function getData(){
 		return $http.get('./data.json').then(function (response) {
            return response.data;
        }).catch(function (err) {
            throw err;
        });
    }

    return {getData:getData};
});