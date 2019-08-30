angular.module('entradas.controllers', [])

.controller('EntradasCtrl', ['$scope', '$http', '$state', '$ionicPopup', function($scope, $http, $state, $ionicPopup) {
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

  $scope.showForm = false;

  $scope.alterar = function(entrada){
    $scope.entrada = entrada;
    $scope.entrada.numero_fatura = parseInt($scope.entrada.numero_fatura);
    $scope.entrada.data_emissao_fatura = new Date($scope.entrada.data_emissao_fatura);
    $scope.entrada.data_inicio = new Date($scope.entrada.data_inicio);
    $scope.entrada.data_fim = new Date($scope.entrada.data_fim);
    $scope.entrada.vencimento = new Date($scope.entrada.vencimento);
    $scope.showForm = true;
  }

  $scope.showCadastro = function(){
    $scope.showForm = true;
  }

  $scope.voltar = function(){
    $scope.showForm = false;
  }

  $scope.excluir = function(entrada){
    $ionicPopup.confirm({
      title: 'Exclusão',
      template: "Confirma?",
      cancelText: 'Cancelar',
      okText: 'Confirmar'
    }).then(function(res) {
      if(res){
        $http({
          method : "DELETE",
          headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json; charset=utf-8'
          },
          url : "http://localhost:3000/pedidos/" + entrada.id + ".json"
        }).then(function mySucces(response) {
          // $ionicPopup.alert({
          //   title: 'Exclusão',
          //   template: "Entrada excluida com sucesso",
          //   okText: 'Fechar'
          // })
          $scope.lista();
        }, function myError(response){
          $scope.erro = JSON.stringify(response.data);
        });
      }
    });
  }

  $scope.cadastrar = function(){
    if(!$scope.entrada.id){
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
        // alert("Cadastrado com sucesso")
        $scope.lista();
      }, function myError(response){
        $scope.erro = JSON.stringify(response.data);
      });
    }
    else{
      $http({
        method : "PUT",
        headers: {
          'Accept': 'application/json; charset=utf-8',
          'Content-Type': 'application/json; charset=utf-8'
        },
        url : "http://localhost:3000/pedidos/" + $scope.entrada.id + ".json",
        data: {
          pedido: $scope.entrada
        }
      }).then(function mySucces(response) {
        $scope.lista();
      }, function myError(response){
        $scope.erro = JSON.stringify(response.data);
      });
    }
  }

  $scope.lista = function(){
    $scope.showForm = false;

    $http({
      method : "GET",
      headers: {
        'Accept': 'application/json; charset=utf-8',
        'Content-Type': 'application/json; charset=utf-8'
      },
      url : "http://localhost:3000/pedidos.json"
    }).then(function mySucces(response) {
      $scope.entradas = response.data
    });
  }

  $scope.lista();
  
}]);


