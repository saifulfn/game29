var roomApp = angular.module('roomApp', []);
roomApp.controller('roomController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.gameStart = function () {
    $window.location.href = '/game';
    }

}]);