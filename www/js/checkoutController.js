angular.module('checkoutcontroller', [])

  .controller('checkoutCtrl',function($scope, $ionicModal, $timeout,$ionicPopup,$localstorage,$state,$filter,$addEvent,$stateParams,$translate,$ionicLoading,$commonFactory) 
  {
  	$scope.cardData = {};
    var nodeID = $stateParams.nodeID;
    var tabActiveEvent = $stateParams.activeTab;
    var langCode = $localstorage.get("DEVICELANGUAGE");
    $localstorage.set("DEVICELANGUAGE",langCode);
    $translate.use(langCode);
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
      });
    }; 

    $scope.showSuccessAlert = function(msg) {
      var alertPopup = $ionicPopup.alert({
        title: $translate.instant('SUCCESS_CONTANT'),
        template: $translate.instant(msg),
        buttons: [{
          text: $translate.instant('OK_CONSTANT'),
          type: 'button-positive',
          onTap: function(e) {
            $state.go('app.FamilyMemberLifeStory',{'nodeID':$stateParams.nodeID,'activeTab':tabActiveEvent});
          }
        }, ]
      });
    }; 

 $scope.showLoader = function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="spiral"></ion-spinner>',
      duration: 3000
    }).then(function(){
       
    });
  };
  $scope.hideLoader = function(){
    $ionicLoading.hide().then(function(){
       
    });
  };

  /*var successCallback = function(data) {

    myForm.token.value = data.response.token.token;

    myForm.submit();
  };

  var errorCallback = function(data) {
    if (data.errorCode === 200) {
    } else {
      alert(data.errorMsg);
    }
  };*/

    $scope.checkout = function() {

     // alert(JSON.stringify($scope.cardData));

      var args = {
        sellerId: "901368621",
        publishableKey: "538B5D9D-C9C6-49A7-B899-FFCFE11E3D8C",
        ccNo: $scope.cardData.number,
        cvv: $scope.cardData.number,
        expMonth: $scope.cardData.number,
        expYear: $scope.cardData.number
      };

      /*TCO.loadPubKey('sandbox', function() {
        TCO.requestToken(successCallback, errorCallback, args);
      });​*/

    // Make the token request
    //TCO.requestToken(successCallback, errorCallback, args);

      /*if(!$scope.eventData.title || !$scope.eventData.description || !$scope.eventData.location || !$scope.eventData.stodyDate )
      {
        $scope.showAlert($translate.instant('EMPTY_CONSTANT'));
      }
      else
      {
        var USERID = $localstorage.get("USERID");
        $scope.showLoader();
        $addEvent.addEvent($scope.eventData,nodeID).then(function(data,$ionicPopup) {
          $scope.result = data;
          if($scope.result.status == '1'){
            $scope.hideLoader();
            $scope.showSuccessAlert($scope.result.msg);
          }else{
            $scope.hideLoader();
            $scope.showAlert($scope.result.msg);
          }
        });
      }*/
    };
  
  });
