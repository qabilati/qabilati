angular.module('notificationController', [])

  .controller('notificationCtrl',function($scope, $ionicModal, $timeout,$ionicPopup,$localstorage,$state,$filter,$stateParams,$notificationFactory,$ionicHistory,$window,$translate,$ionicLoading,$commonFactory,$getContactFactory) 
  {

  	$scope.searchData = {};
  	var a = $scope.searchData.searchTab;
    var langCode = $localstorage.get("DEVICELANGUAGE");
    $localstorage.set("DEVICELANGUAGE",langCode);
    $translate.use(langCode);
    var deviceLanguage = navigator.language; 
    var language_code = (navigator.language).split("-")[0];

    if(!$scope.searchData.searchTab)
    {
    	$scope.searchData.searchTab = '';
    } 
    else
    {
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
  		}).then(function(data){
  			$scope.modal.hide();
  		});
  	}; 

    $scope.showAlert_View = function(nodeID) {
      var alertPopup = $ionicPopup.alert({
        template: $translate.instant("Remaining_view_msg"),
        buttons: [{ 
          text: $translate.instant('CANCEL_CONSTANT'),
          type: 'button-default',
          onTap: function(e) {
          }
        }, 
        {
          text: $translate.instant('OK_CONSTANT'),
          type: 'button-positive',
          onTap: function(e) 
          {
            $getContactFactory.getContact(nodeID,'notificationScreen').then(function(data,$ionicPopup) 
            {
              $scope.res = data;
              //alert(JSON.stringify($scope.res));
              if($scope.res.status == 1) 
              {
                $state.go('contacts',{'nodeID':nodeID,'userData':JSON.stringify($scope.res.data),'redirectScreen':'notificationScreen'})
              }
              else
              {
                $scope.showAlert($scope.res.msg);
              }
            });
          }
        }]
      }).then(function(data){
        $scope.modal.hide();
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

    $scope.showLoader();
    $notificationFactory.getNoti().then(function(data,$ionicPopup){
      $scope.a =  $scope.searchData.searchTab;
      $scope.result = data;
     $localstorage.set("notification_Count",$scope.result.notCount);
      if($scope.result.status == 1)
      {
        $localstorage.set("notification_Count",$scope.result.notCount);
        $scope.hidenoti = true;
        $scope.hideLoader();
        $scope.searchData = $scope.result.data;
        $scope.searchData.searchTab = $scope.a;
      }
      else
      {
        $scope.hidenoti = false;
        $scope.hideLoader();
      }
    });
  	

$scope.reload = function(){
  $window.location.reload();
}

$scope.showLoader();
$scope.openNoti = function(nodeID,NotiID,viewState){
  //alert(viewState);
  $commonFactory.checkRemainingViews(nodeID).then(function(data,$ionicPopup){
    $scope.result = data;

    if($scope.result.status == 1)
    {
      if(viewState==1)
      {
        $getContactFactory.getContact(nodeID,'notificationScreen').then(function(data,$ionicPopup) 
        {
          $scope.res = data;
          if($scope.res.status == 1) 
          {
            $state.go('contacts',{'nodeID':nodeID,'userData':JSON.stringify($scope.res.data),'redirectScreen':'notificationScreen'})
          }
          else
          {
            $scope.showAlert($scope.res.msg);
          }
        });
      }
      else
      {
          $scope.showAlert_View(nodeID);
      }
      
    }
    else if($scope.result.status == 2)
    {
      $state.go('app.paymentScreen',{'nodeID':nodeID,'type':2,'redirectScreen':'notificationScreen'});
    }
    else if ($scope.result.status == 3)
    {
      $getContactFactory.getContact(nodeID,'notificationScreen').then(function(data,$ionicPopup) 
      {
        $scope.res = data;
        if($scope.res.status == 1) 
        {
          $state.go('contacts',{'nodeID':nodeID,'userData':JSON.stringify($scope.res.data),'redirectScreen':'notificationScreen'});
        }
        else
        {
          $scope.showAlert($scope.res.msg);
        }
      });
    }
    else
    {
      $scope.hideLoader();
      $scope.showAlert($scope.result.msg);
    }
  });
}

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

});