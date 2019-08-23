angular.module('entradas.controllers', [])

.controller('EntradasCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
  if(!localStorage.getItem("usuario_logado")){
    $state.go("login");
  }

  $scope.entrada = {
    placa: "DOU1234",
    data_emissao_fatura: new Date(),
    descricao: "teste",
    numero_fatura: 1234,
    data_inicio: new Date(),
    data_fim: new Date(),
    vencimento: new Date(),
    valor: 399,
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
      	pedido: $scope.entrada
      }
    }).then(function mySucces(response) {
      alert("Cadastrado com sucesso")
    }, function myError(response){
      $scope.erro = JSON.stringify(response.data);
    });
  }
  
}]);


