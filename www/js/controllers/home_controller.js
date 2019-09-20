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

  $scope.gps = function(){
     var onSuccess = function(position) {
      alert('Latitude: '          + position.coords.latitude          + '\n' +
            'Longitude: '         + position.coords.longitude         + '\n' +
            'Altitude: '          + position.coords.altitude          + '\n' +
            'Accuracy: '          + position.coords.accuracy          + '\n' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
            'Heading: '           + position.coords.heading           + '\n' +
            'Speed: '             + position.coords.speed             + '\n' +
            'Timestamp: '         + position.timestamp                + '\n');
    };

    function onError(error) {
      alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }

  $scope.camera = function(){

    /*$cordovaCamera.getPicture({
      quality: 80,
      destinationType: Camera.DestinationType.DATA_URL,
      // sourceType: Camera.PictureSourceType.CAMERA,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: Camera.EncodingType.JPEG,
      saveToPhotoAlbum: false,
      allowEdit: false,
      correctOrientation:true
    }).then(function(imageData) {
      var file = "data:image/JPEG;base64," + imageData;
      alert(file)
    }, function(err) { 
      alert(JSON.stringify(err))
    });*/

    try{
      var srcType = Camera.PictureSourceType.PHOTOLIBRARY;
      var options = setOptions(srcType);
   
      navigator.camera.getPicture(function cameraSuccess(imageUri) {
          alert(imageUri);
      }, function cameraError(error) {
          alert("Unable to obtain picture: " + error, "app");
      }, options);
    }
    catch(e){
      alert(JSON.stringify(e));
    }
  }

  var setOptions = function(srcType) {
    var options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
  }

  $scope.sair = function(){
    localStorage.clear();
    $state.go("login");
  }

}]);
