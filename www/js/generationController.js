angular.module('generationController', [])

.controller('generationController', function($scope, $ionicModal, $timeout,$ionicPopup,$localstorage,$ionicLoading,$state,$filter,$stateParams,$translate,$ionicLoading,$payPalFactory,$nodes)
 {
  var langCode = $localstorage.get("DEVICELANGUAGE");
  $localstorage.set("DEVICELANGUAGE",langCode);
  $translate.use(langCode);
  var deviceLanguage = navigator.language; 
  var language_code = (navigator.language).split("-")[0];

  $scope.nodeID = $stateParams.nodeID;
  $scope.firstname = $stateParams.firstname;
  $scope.lastname = $stateParams.lastname;
  $scope.clan = $stateParams.clan;
  $scope.email = $stateParams.email;
  $scope.phone = $stateParams.phone;
  $scope.BirthDate = $stateParams.BirthDate;
  $scope.address = $stateParams.address;
  $scope.gender = $stateParams.gender;
  
    angular.isUndefinedOrNull = function(val) {
    //return angular.isUndefined(val) || val === null 
	 if (value === "" || value === null || typeof value === "undefined") {
        return val === null;
    }
  }

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
         $state.go('app.FamilyMemberLifeStory',{'nodeID':$scope.nodeID,'activeTab':'b'});
        }
      }, ]
    });
  };

 	$scope.openPaypal = function(){
 		$payPalFactory.initPaymentUI().then(function () 
          {
            $payPalFactory.makePayment(1, "Total Amount").then(function (data) 
            {
             // alert(nodeID + firstname + lastname + clan + email + phone + BirthDate + address);
              var paymentID = data.response.id;
              var paymentState = data.response.state;
              var paymentResponse_type = data.response_type;

              $scope.showLoader();
              $nodes.addNodePayment(paymentID,paymentState,paymentResponse_type).then(function(data,$ionicPopup)
              {
                $scope.result = data;
                if($scope.result.status == 1) {
                  $scope.hideLoader();
                 // $scope.showSuccessAlert($scope.result.msg);
			 
                  $nodes.addNodeAfterPayment($stateParams.nodeID,$stateParams.firstname,$stateParams.lastname,$stateParams.clan,$stateParams.relation,$stateParams.email,$stateParams.phone,$stateParams.BirthDate,$stateParams.address,$stateParams.gender,$stateParams.living,$stateParams.DeathDate,$stateParams.photo,$stateParams.countryidBirth,$stateParams.stateidBirth,$stateParams.cityidBirth,$stateParams.countryidResidence,$stateParams.stateidResidence,$stateParams.cityidResidence,$scope.living,$scope.DeathDate).then(function(data,$ionicPopup){
                        $scope.result = data;
                      if($scope.result.status == 1) {
                         $scope.hideLoader();
                         $scope.showSuccessAlert($scope.result.msg);
                      }else{
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
 });