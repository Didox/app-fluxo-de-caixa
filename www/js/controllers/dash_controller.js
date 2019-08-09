angular.module('dash.controllers', [])

.controller('DashCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {

  if(!localStorage.getItem("usuario_logado")){
    $state.go("login");
  }

  $scope.sair = function(){
    localStorage.clear();
    $state.go("login");
  }

}]);
