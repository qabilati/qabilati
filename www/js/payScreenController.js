angular.module('payScreencontroller',[])

  .controller('payScreenCtrl',function($scope, $ionicModal, $cordovaActionSheet,$timeout,$ionicPopup,$localstorage,$state,$filter,$stateParams,$translate,$ionicPopup,$getContactFactory,$payPalFactory,$login,$ionicLoading,$paymentFactory,$commonFactory) {

    var langCode = $localstorage.get("DEVICELANGUAGE");
    $localstorage.set("DEVICELANGUAGE",langCode);
    $translate.use(langCode);
    var deviceLanguage = navigator.language; 
    var language_code = (navigator.language).split("-")[0];
    var userNodeId = $localstorage.get("userNodeId");

    $scope.paymentData = {};
    $scope.getContactData = {};

    var nodeID = $stateParams.nodeID;
    var type = $stateParams.type;

    var redirectScreen = $stateParams.redirectScreen;
    if ($stateParams.userData) 
    {
      var userData = JSON.parse($stateParams.userData);

      $scope.getContactData.firstname = userData.firstName;
      $scope.getContactData.lastname = userData.lastName;
      $scope.getContactData.email = userData.email;
      $scope.getContactData.phoneNumber = userData.phoneNumber;
      $scope.getContactData.address = userData.address;
      $scope.getContactData.birthDate = userData.dob;
      $scope.getContactData.clan = userData.clan;
    }

    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDay();
    var today = month+1 +"/" + year;
	
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

  $scope.loadImage = function() {
    var options = {
      title: $translate.instant('SELECT_PAYMENT_METHOD'),
      buttonLabels: [$translate.instant('SELECT_PAYPAL'),$translate.instant('SELECT_InApp')],
      addCancelButtonWithLabel: $translate.instant('CANCEL_CONSTANT'),
      androidEnableCancelButton : true,
    };
    $cordovaActionSheet.show(options).then(function(btnIndex) {
      var type = null;
      if (btnIndex === 1 || btnIndex === 2) {

        $state.go('app.InAppPurchaseForm',{'payType':btnIndex,'nodeID':$stateParams.nodeID,'redirectScreen':$stateParams.redirectScreen});
      } 

      if (type !== null) {
        alert("Select Payment Option");
        //$scope.selectPicture(type);
      }
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
         $state.go('app.FamilyMemberLifeStory',{'nodeID':userNodeId,'activeTab':'a'});
        }
      }, ]
    });
  };
  
    $scope.showSuccessAlertForTree = function(msg) {
      var alertPopup = $ionicPopup.alert({
        title: $translate.instant('SUCCESS_CONTANT'),
        template: $translate.instant('SUCCESS'),
        buttons: [{
          text: $translate.instant('OK_CONSTANT'),
          type: 'button-positive',
          onTap: function(e) {
            $state.go('app.FamilyMemberLifeStory',{'nodeID':userNodeId,'activeTab':'a'});
          }
        }, ]
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

  	$scope.load = function(){
  		$scope.paymentData.expirationDate = today;
  	}

    $scope.cancelbtn = function() {

      if(redirectScreen == 'notificationScreen')
      {
            $state.go('app.notificationScreen')
      }
      else if(redirectScreen == 'searchScreen')
      {
          $state.go('app.searchScreen')
      }
      else 
      {
          //var userNodeId = $localstorage.get("userNodeId");
          $state.go('app.FamilyMemberLifeStory',{'nodeID':userNodeId,'activeTab':'a'})
      }
    }

    $scope.doPayment = function() {

      $payPalFactory.initPaymentUI().then(function() {

        $payPalFactory.makePayment(1, "Total Amount").then(function (data) {

          $scope.paymentData.paymentID = data.response.id;
          $scope.paymentData.paymentState = data.response.state;
          $scope.paymentData.paymentResponse_type = data.response_type;
          $scope.paymentData.nodeID = $stateParams.nodeID;
          $scope.paymentData.Amount = 1;
          $scope.paymentData.paymentMode = 'paypal';
          $scope.paymentData.paymentType = 'getContact';

          $scope.showLoader();
          $paymentFactory.payment($scope.paymentData).then(function(data,$ionicPopup) {

            $scope.result = data;
            if($scope.result.status == 1) 
            {
              $scope.hideLoader();
              $getContactFactory.getContact($stateParams.nodeID,redirectScreen).then(function(data,$ionicPopup) {

                $scope.result = data;
                if($scope.result.status == 1) 
                {
                  $state.go('contacts',{'nodeID':$stateParams.nodeID,'userData':JSON.stringify($scope.result.data),'redirectScreen':redirectScreen
                    })
                }
                else
                {
                  $scope.hideLoader();
                  $scope.showAlert($scope.result.msg);
                }
              })
            }
            else
            {
              $scope.hideLoader();
              $scope.showAlert($scope.result.msg);
            } 
          });
        }, function (error) {
              alert("Transaction Cancelled");
        });
      });
    }

    $scope.doPaymentForMerge = function() {

      $payPalFactory.initPaymentUI().then(function() {

        $payPalFactory.makePayment(5, "Total Amount").then(function (data) {

          $scope.paymentData.paymentID = data.response.id;
          $scope.paymentData.paymentState = data.response.state;
          $scope.paymentData.paymentResponse_type = data.response_type;
          $scope.paymentData.nodeID = $stateParams.nodeID;
          $scope.paymentData.Amount = 5;
          $scope.paymentData.paymentMode = 'paypal';
          $scope.paymentData.paymentType = 'treeMerge';

          $scope.showLoader();
          $paymentFactory.payment($scope.paymentData).then(function(data,$ionicPopup) {

            $scope.result = data;
            if($scope.result.status == 1) 
            {
              $scope.hideLoader();
              $commonFactory.mergeTree($stateParams.existNodeID,$stateParams.existTreeID,$stateParams.newID).then(function(data,$ionicPopup) {

                $scope.result = data;

                if($scope.result.status == 1) 
                {
                  $scope.hideLoader();
                  $scope.showSuccessAlert($scope.result.msg);
                }
                else
                {
                  $scope.hideLoader();
                  $scope.showAlert($scope.result.msg);
                } 

                /*if($scope.result.status == 1) 
                {
                  $state.go('contacts',{'nodeID':$stateParams.nodeID,'userData':JSON.stringify($scope.result.data)
                    })
                }
                else
                {
                  $scope.hideLoader();
                  $scope.showAlert($scope.result.msg);
                }*/
              })
            }
            else
            {
              $scope.hideLoader();
              $scope.showAlert($scope.result.msg);
            } 
          });
        }, function (error) {
              alert("Transaction Cancelled");
        });
      });
    }
});