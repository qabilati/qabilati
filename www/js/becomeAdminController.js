angular.module('becomeAdminController', [])

  .controller('becomeAdminCtrl',function($scope, $ionicModal, $timeout,$ionicPopup,$localstorage,$state,$filter,$becomeAdminFactory,$translate,$ionicLoading,$stateParams,$payPalFactory) 
  	{
  		$scope.adminData = {};
      var langCode = $localstorage.get("DEVICELANGUAGE");
      var nodeID = $stateParams.nodeID;
      var userNodeId = $localstorage.get("userNodeId");
      $localstorage.set("DEVICELANGUAGE",langCode);
      $translate.use(langCode);
      var deviceLanguage = navigator.language; 
      var language_code = (navigator.language).split("-")[0];
	  
	  angular.isUndefinedOrNull = function(val) {
    //return angular.isUndefined(val) || val === null 
	 if (value === "" || value === null || typeof value === "undefined") {
        return val === null;
    }
  }

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
         $state.go('app.FamilyMemberLifeStory',{'nodeID':userNodeId,'activeTab':'a'});
       }
      }, ]
     });
   }; 

   $scope.showLoader = function() {
    $ionicLoading.show({
        template: '<ion-spinner icon="spiral"></ion-spinner>'
       // duration: 2000
      }).then(function(){
       
      });
    };

  $scope.hideLoader = function(){
    $ionicLoading.hide().then(function(){
       
    });
  };

  		 $becomeAdminFactory.getAdminData().then(function(data,$ionicPopup) {
        //$scope.showLoader();
          $scope.result = data;
          if($scope.result.status == 1) {
            $scope.adminFirstname =$scope.result.data.firstname + " " +$scope.result.data.lastname;
            $scope.adminAmount = $scope.result.data.amount;
            $scope.nodeid = $scope.result.data.nodeID;
            $scope.status = $scope.result.status;
            
          }else if($scope.result.status == 2) {
            $scope.adminAmount = 4;
            $scope.status = $scope.result.status;
          }
          else{
            $scope.hideLoader();
            $scope.showAlert($scope.result.msg);
          } 
        });

       $scope.doBecomeAdmin = function(){
        var adminAmount = $scope.adminAmount;
        var paymentAmount = $scope.adminData.paymentAmount;

        if (!$scope.adminData.paymentAmount) 
        {
          $scope.showAlert($translate.instant('EMPTY_CONSTANT'));
        } else if (paymentAmount > adminAmount)
        {

          $payPalFactory.initPaymentUI().then(function () 
          {
            $payPalFactory.makePayment(paymentAmount, "Total Amount").then(function (data) 
            {
              /*alert("success"+JSON.stringify(data));*/
              var paymentID = data.response.id;
              var paymentState = data.response.state;
              var paymentResponse_type = data.response_type;

              $becomeAdminFactory.UpdateAdmin(paymentID,paymentState,paymentResponse_type,paymentAmount).then(function(data,$ionicPopup) 
              {
                $scope.showLoader();
                $scope.result = data;

                if($scope.result.status == 1) 
                {
                  $scope.hideLoader();
                  $scope.showSuccessAlert($scope.result.msg);
                }else
                {
                  $scope.hideLoader();
                  $scope.showAlert($scope.result.msg);
                } 
              });
            }, function (error) {
              alert("Transaction Cancelled");
              });
          });
        }else{
          $scope.showAlert("Amount Must be greater than previous");
        }
      }  
          /*$becomeAdminFactory.UpdateAdmin($scope.tranID).then(function(data,$ionicPopup) 
          {
              $scope.showLoader();
              $scope.result = data;

              if($scope.result.status == 1) 
              {
                  $scope.hideLoader();
                  $scope.showSuccessAlert($scope.result.msg);
              }else
              {
                  $scope.hideLoader();
                  $scope.showAlert($scope.result.msg);
              } 
          });*/
	});
