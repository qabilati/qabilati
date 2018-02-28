angular.module('treeInvitecontroller', [])

  .controller('treeInviteCtrl',function($scope, $ionicModal, $timeout,$ionicPopup,$localstorage,$state,$filter,$treeInviteFactory,$translate,$ionicLoading,$commonFactory) 
  	{

  		$scope.treeData = {};
      var langCode = $localstorage.get("DEVICELANGUAGE");
      $scope.userEmail = $localstorage.get("userEmail");
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
       template: $translate.instant('Invitation_Send_Successfully'),
       buttons: [{
       text: $translate.instant('OK_CONSTANT'),
       type: 'button-positive',
       onTap: function(e) {
         $state.go('app.getInvitePeople', {}, {reload: true});
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




  	$scope.doTree = function() {

	    if(!$scope.treeData.firstname || !$scope.treeData.lastname || !$scope.treeData.email)
	    {
	      $scope.showAlert($translate.instant('EMPTY_CONSTANT'));
	    } 
      else if ($scope.userEmail == $scope.treeData.email) 
      {
        $scope.showAlert($translate.instant('selt_invites'));
      }
      else
	    {
        $scope.showLoader();
	      $treeInviteFactory.invite($scope.treeData).then(function(data,$ionicPopup) {
	        $scope.result = data;
	        if($scope.result.status == 1) {
            $scope.hideLoader();
	        	$scope.showAlert($scope.result.msg);
	        }else{
            $scope.hideLoader();
	          $scope.showSuccessAlert($scope.result.msg);
	        } 
	      });
	    }
  	};
  	});
