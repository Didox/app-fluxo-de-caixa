angular.module('login.controllers', [])

.controller('LoginCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {

  if(localStorage.getItem("usuario_logado")){
    $state.go("tab.home");
  }

  $scope.login = {email:"danilo.aparecido.santos@gmail.com", senha: "123456"}
  $scope.erro = "";

  $scope.logar = function(){
    $http({
      method : "POST",
      headers: {
        'Accept': 'application/json; charset=utf-8',
        'Content-Type': 'application/json; charset=utf-8'
      },
      url : "http://localhost:3000/administradores/login.json",
      data:{
        email: $scope.login.email,
        senha: $scope.login.senha
      }
    }).then(function mySucces(response) {
      if(!response.data.message){
        var usuario = response.data;
        var usuario_logado = {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email
        }

        localStorage.setItem("usuario_logado", JSON.stringify(usuario_logado));
        $state.go("tab.home");
      }
      else{
        $scope.erro = response.data.message
      }
    }, function myError(response){
      if(response.data.message){
        $scope.erro = response.data.message
      }
      else{
        $scope.erro = "Login ou senha inválido"
      }
    });
  }
  
}]);
