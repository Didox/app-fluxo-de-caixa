angular.module('starter.controllers', [])

.controller('DashCtrl', ['$scope', '$http', function($scope, $http) {

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
      alert('ok')
    }, function myError(response){
      $scope.erro = "Login ou senha inválido"
    });
  }
}])

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
