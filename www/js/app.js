angular.module('starter', [
  'ionic', 
  'login.controllers', 
  'saidas.controllers', 
  'entradas.controllers', 
  'home.controllers', 
  'starter.services'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.Keyboard) {
      window.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('login', {
    url: '/login',
    controller: 'LoginCtrl',
    templateUrl: 'templates/login.html'
  })

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tab.entradas', {
      url: '/entradas',
      views: {
        'tab-entradas': {
          templateUrl: 'templates/tab-entradas.html',
          controller: 'EntradasCtrl'
        }
      }
    })

  .state('tab.saidas', {
    url: '/saidas',
    views: {
      'tab-saidas': {
        templateUrl: 'templates/tab-saidas.html',
        controller: 'SaidasCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/tab/home');

});
