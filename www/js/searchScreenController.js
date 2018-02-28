angular.module('searchScreencontroller', [])

  .controller('searchScreenCtrl',function($scope, $ionicModal, $timeout,$ionicPopup,$localstorage,$state,$filter,$stateParams,$searchScreenFactory,$ionicHistory,$window,$translate,$ionicLoading,$commonFactory,$getContactFactory) 
  {

  	$scope.searchData = {};
    $scope.searchTabData = {};
    $scope.clickFlag = 0;

  	var a = $scope.searchTabData.searchTab;
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


  	if(!$scope.searchTabData.searchTab)
  	{
  		$scope.searchTabData.searchTab = '';
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




    
  $scope.showLoader = function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="spiral"></ion-spinner>',
      duration: 1000
    }).then(function(){
       
    });
  };
  $scope.hideLoader = function(){
    $ionicLoading.hide().then(function(){
       
    });
  };

  	$scope.doSearch = function() 
  	{
      $scope.showLoader();
  		$searchScreenFactory.getList($scope.searchTabData.searchTab).then(function(data,$ionicPopup){
			$scope.a =  $scope.searchTabData.searchTab;
			$scope.result = data;
			if($scope.result.status == 1)
			{
        $scope.hidesearh = true;
        $scope.hideLoader();
				$scope.searchData = $scope.result.data;
				$scope.searchTabData.searchTab = $scope.a;
			}
			else
			{
        $scope.hidesearh = false;
        $scope.hideLoader();
				$scope.showAlert($scope.result.msg);
			}
		});
  	};

/*$scope.showLoader();
$searchScreenFactory.getList($scope.searchTabData.searchTab).then(function(data,$ionicPopup){
	$scope.result = data;
      if($scope.result.status == 1){
        $scope.hideLoader();
        $scope.searchData = $scope.result.data;
      }else{
        $scope.hideLoader();
        $scope.showAlert($scope.result.msg);
      }
    })*/

$scope.reload = function(){
  $window.location.reload();
}

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
            $getContactFactory.getContact(nodeID,'searchScreen').then(function(data,$ionicPopup) 
            {
              $scope.res = data;
              if($scope.res.status == 1) 
              {
                $state.go('contacts',{'nodeID':nodeID,'userData':JSON.stringify($scope.res.data),'redirectScreen':'searchScreen'});
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

    $scope.showLoader();
    $scope.searchEdit = function(nodeID)
    {
      if ($scope.clickFlag == 0)
      {
        $scope.clickFlag = 1;
        $scope.hideLoader();
        $commonFactory.checkRemainingViews(nodeID).then(function(data,$ionicPopup){
          $scope.result = data;

          if($scope.result.status == 1)
          {
            $scope.showAlert_View(nodeID);
            $scope.clickFlag = 0;            
          }
          else if($scope.result.status == 2)
          {
            $state.go('app.paymentScreen',{'nodeID':nodeID,'type':2,'redirectScreen':'searchScreen'});
            $scope.clickFlag = 0;
          }
          else if ($scope.result.status == 3)
          {
            $getContactFactory.getContact(nodeID,'searchScreen').then(function(data,$ionicPopup) 
            {
              $scope.res = data;
              if($scope.res.status == 1) 
              {
                $state.go('contacts',{'nodeID':nodeID,'userData':JSON.stringify($scope.res.data),'redirectScreen':'searchScreen'});
              }
              else
              {
                $scope.showAlert($scope.res.msg);
              }
            });
          }
          else
          {
            $scope.clickFlag = 0;
            $scope.hideLoader();
            $scope.showAlert($scope.result.msg);
          }
        });
      }
    }

});