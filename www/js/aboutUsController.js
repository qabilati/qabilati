angular.module('aboutUscontroller', [])

.controller('aboutUsCtrl',function($scope, $ionicModal, $timeout,$howaboutUs,$ionicPopup,$localstorage,
  $state,$filter,$translate,$ionicLoading,$commonFactory, $ionicSlideBoxDelegate,$stateParams, $timeout,$window) 
  {
    $scope.aboutUsData = {};
    $scope.howToUseData = {};
    var langCode = $localstorage.get("DEVICELANGUAGE");
    $localstorage.set("DEVICELANGUAGE",langCode);
    $translate.use(langCode);

    $nodeID = $localstorage.get("userNodeId");
    var deviceLanguage = navigator.language; 
    var language_code = (navigator.language).split("-")[0];

    $commonFactory.getNotificationCount().then(function(data){
      var result = data; 
      if(result.status == 1)
      {
        cordova.plugins.notification.badge.set(result.data.noticount);
        $scope.hidenoti_count = true;
        $localstorage.set("notification_Count",result.data.noticount);
        $scope.NotiCount = result.data.noticount;
      }
      else
      {
        cordova.plugins.notification.badge.clear();
        $scope.hidenoti_count = false;
        $localstorage.set("notification_Count",0);
        $scope.NotiCount = 0;
      }
    })

    $scope.showLoader = function() {
      $ionicLoading.show({
        template: '<ion-spinner icon="spiral"></ion-spinner>'
      }).then(function(){

      });
    };

    $scope.hideLoader = function(){
      $ionicLoading.hide().then(function(){

      });
    };

    $scope.showAlert = function(msg) {
      var alertPopup = $ionicPopup.alert({
        title: $translate.instant('ERROR_CONSTANT'),
        template: $translate.instant(msg),
        buttons: [{
          text: $translate.instant('OK_CONSTANT'),
          type: 'button-positive',
          onTap: function(e) {
          }
        }, ]
      }).then(function(data){
        $scope.modal.hide();
      });
    };

    $howaboutUs.aboutUs().then(function(data,$ionicPopup){
      $scope.result = data;
      if($scope.result.status == 1){
        $scope.aboutUsData = {
          description:$scope.result.data.description,
          title:$scope.result.data.title
        }
      }else{
        //$scope.showAlert($scope.result.msg);
      }
    });

    $howaboutUs.howtouse().then(function(data,$ionicPopup){
      $scope.showLoader();
      $scope.result = data;
      if($scope.result.status == 1){
        $scope.hideLoader();
        $scope.howToUseData = {
          description:$scope.result.data.description,
          title:$scope.result.data.title
        }
      }else{
        $scope.hideLoader();
        //$scope.showAlert($scope.result.msg);
      }
    });

    $scope.viewTutorial = function() {

      if (langCode == 'en') 
      {
        $state.go('launch',{'redirectScreen':'howtouse'}, {reload: true, notify: false});
      }
      else
      {
        $state.go('launch-arabic',{'redirectScreen':'howtouse'}, {reload: true, notify: false});
      }

      $timeout(function () {
        $window.location.reload(true);
      }, 100);
      //$window.location.reload(true);
    }
});
