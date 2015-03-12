var lobbyApp = angular.module('lobbyApp', []);
lobbyApp.controller('lobbyController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $http.get('/rooms/get')
        .success(function (data, status, headers, config) {
            $scope.rooms = data;
        }).
        error(function (data, status, headers, config) {
            $scope.rooms = [];
        });
    $scope.joinRoom = function (id) {
        $http.post('/room/join', {id:id})
            .success(function (data, status, headers, config) {
                $window.location.href = '/room';
            }).
            error(function (data, status, headers, config) {

            });
    }
}]).directive('lobbyList', function () {
    return {
        templateUrl: 'lobby-list.html',
        replace: true
    }
});
