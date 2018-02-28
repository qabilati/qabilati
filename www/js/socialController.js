angular.module('socialController', [])

  .controller('socialController',function($scope, $ionicModal, $timeout, $ionicPopup,$localstorage, $state, $filter, $translate)     
  {
  	$scope.twitterShare = function(msg){
    window.plugins.socialsharing
            .shareViaTwitter(msg, '', );
  };

  $scope.whatsappShare = function(msg){
    window.plugins.socialsharing
            .shareViaWhatsApp(msg, '', );
  };

  $scope.facebookShare = function(msg){
    window.plugins.socialsharing
            .shareViaFacebook(msg, '', );
  }

  $scope.emailShare = function(msg){
    window.plugins.socialsharing
            .shareViaEmail(msg, '', );
  }
  });