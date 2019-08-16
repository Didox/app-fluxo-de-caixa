angular.module('home.controllers', [])

.controller('HomeCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {

  if(!localStorage.getItem("usuario_logado")){
    $state.go("login");
  }

  $http({
    method : "GET",
    headers: {
      'Accept': 'application/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8'
    },
    url : "http://localhost:3000/fluxo-de-caixa.json"
  }).then(function mySucces(response) {
    $scope.caixa = response.data;
  });

  $scope.sair = function(){
    localStorage.clear();
    $state.go("login");
  }

}]);
