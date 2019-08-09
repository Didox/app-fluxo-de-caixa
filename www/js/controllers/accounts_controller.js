angular.module('account.controllers', [])

.controller('AccountCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
  if(!localStorage.getItem("usuario_logado")){
    $state.go("login");
  }

  $scope.settings = {
    enableFriends: true
  };
}]);
