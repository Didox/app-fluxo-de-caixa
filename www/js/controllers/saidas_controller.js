angular.module('saidas.controllers', [])

.controller('SaidasCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
  if(!localStorage.getItem("usuario_logado")){
    $state.go("login");
  }
  
}]);
