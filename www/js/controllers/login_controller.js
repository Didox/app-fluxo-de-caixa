angular.module('login.controllers', [])

.controller('LoginCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {

  if(localStorage.getItem("usuario_logado")){
    $state.go("tab.home");
  }

  $scope.login = {email:'', senha: ''}
  $scope.erro = "";

  $scope.logar = function(){
    $http({
      method : "GET",
      headers: {
        'Accept': 'application/json; charset=utf-8',
        'Content-Type': 'application/json; charset=utf-8'
      },
      url : "http://localhost:3000/administradores.json?email=" + $scope.login.email + '&senha=' + $scope.login.senha
    }).then(function mySucces(response) {
      if(response.data.length > 0){
        var usuario = response.data[0];
        var usuario_logado = {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email
        }

        localStorage.setItem("usuario_logado", JSON.stringify(usuario_logado));
        $state.go("tab.dash");
      }
      else{
        $scope.erro = "Login ou senha inválido"
      }
    }, function myError(response){
      $scope.erro = "Login ou senha inválido"
    });
  }
  
}]);
