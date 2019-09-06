angular.module('saidas.controllers', [])

.controller('SaidasCtrl', ['$scope', '$http', '$state', '$ionicPopup', function($scope, $http, $state, $ionicPopup) {
  if(!localStorage.getItem("usuario_logado")){
    $state.go("login");
  }

  $scope.saida = {
    placa: "Teste",
    data_emissao_fatura: new Date(),
    descricao: "teste",
    numero_fatura: 1234,
    vencimento: new Date(),
    valor: 100,
  }

  $scope.showForm = false;

  $scope.alterar = function(saida){
    $scope.saida = saida;
    $scope.saida.numero_fatura = parseInt($scope.saida.numero_fatura);
    $scope.saida.data_emissao_fatura = new Date($scope.saida.data_emissao_fatura);
    $scope.saida.data_inicio = new Date($scope.saida.data_inicio);
    $scope.saida.data_fim = new Date($scope.saida.data_fim);
    $scope.saida.vencimento = new Date($scope.saida.vencimento);
    $scope.showForm = true;
  }

  $scope.showCadastro = function(){
    $scope.showForm = true;
  }

  $scope.voltar = function(){
    $scope.showForm = false;
  }

  $scope.aprovar = function(saida){
    $ionicPopup.confirm({
      title: 'Aprovação',
      template: "Confirma a aprovação do valor R$ " + saida.valor + " ?",
      cancelText: 'Cancelar',
      okText: 'Confirmar'
    }).then(function(res) {
      if(res){
        $http({
          method : "PATCH",
          headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json; charset=utf-8'
          },
          url : "http://localhost:3000/saidas/" + saida.id + ".json",
          data: {
            saida:{
              status: 1
            }
          }
        }).then(function mySucces(response) {
          $scope.lista();
        }, function myError(response){
          $scope.erro = JSON.stringify(response.data);
        });
      }
    });
  }

  $scope.excluir = function(saida){
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
          url : "http://localhost:3000/saidas/" + saida.id + ".json"
        }).then(function mySucces(response) {
          $scope.lista();
        }, function myError(response){
          $scope.erro = JSON.stringify(response.data);
        });
      }
    });
  }

  $scope.cadastrar = function(){
    if(!$scope.saida.id){
      $http({
        method : "POST",
        headers: {
          'Accept': 'application/json; charset=utf-8',
          'Content-Type': 'application/json; charset=utf-8'
        },
        url : "http://localhost:3000/saidas.json",
        data: {
          saida: $scope.saida
        }
      }).then(function mySucces(response) {
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
        url : "http://localhost:3000/saidas/" + $scope.saida.id + ".json",
        data: {
          saida: $scope.saida
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
      url : "http://localhost:3000/saidas.json"
    }).then(function mySucces(response) {
      $scope.saidas = response.data
    });
  }

  $http({
    method : "GET",
    headers: {
      'Accept': 'application/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8'
    },
    url : "http://localhost:3000/tipos_saidas.json"
  }).then(function mySucces(response) {
    $scope.tipos_saidas = response.data
  });

  $scope.lista();
  
}]);
