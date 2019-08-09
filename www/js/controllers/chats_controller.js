angular.module('chats.controllers', [])

.controller('ChatsCtrl', ['$scope', '$http', '$state', function($scope, Chats, $state) {
  if(!localStorage.getItem("usuario_logado")){
    $state.go("login");
  }
  
}]);