angular.module('entradas.controllers', [])

.controller('EntradasCtrl', ['$scope', '$http', '$state', function($scope, $state) {
  if(!localStorage.getItem("usuario_logado")){
    $state.go("login");
  }

  $scope.entrada = {
  	placa: "",
	emissao: "",
	descricao: "",
	numero: "",
	data_inicio: "",
	data_fim: "",
	vencimento: "",
	valor: "",
  }


  $scope.cadastrar = function(){
  	// if($scope.entrada.emissao === ""){
  	// 	alert("preencha a emissão");
  	// }
  	$http({
      method : "POST",
      headers: {
        'Accept': 'application/json; charset=utf-8',
        'Content-Type': 'application/json; charset=utf-8'
      },
      url : "http://localhost:3000/pedidos.json",
      data: {
      	nome: ""
      }
    }).then(function mySucces(response) {
      
    }, function myError(response){
      $scope.erro = "Login ou senha inválido"
    });
  }
  
}]);


