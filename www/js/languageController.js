angular.module('languagecontroller', [])

.controller('languageCtrl',function($scope, $ionicPlatform, $ionicModal, $timeout,$ionicPopup,$localstorage,$state,$filter,$languageFactory,$translate,$ionicLoading) 
{

	$scope.languageData = {};

	var logcheck = $localstorage.get("isLogin");
	var nodeID = $localstorage.get("userNodeId");
	var deviceLang = $localstorage.get("DEVICELANGUAGE");


    if (logcheck == "Yes") 
		{
    	var deviceLang = $localstorage.get("DEVICELANGUAGE");
    	$state.go('app.FamilyMemberLifeStory',{'nodeID':nodeID,'activeTab':'a'});
	} 
	/*else {
	        $state.go('app.login');
	}*/

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
					/* $state.go('app.FamilyMemberLifeStory',{'nodeID':nodeID,'activeTab':tabActiveEvent});*/
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


	$scope.showLoader();
	$languageFactory.languageList().then(function(data){
		$scope.result = data;	
		if($scope.result.status == 1){
			$scope.hideLoader();
			$scope.languageData = $scope.result.data;
		}else{
			$scope.hideLoader();
			$scope.showAlert($scope.result.msg);
		}
	})

	 
	$scope.languageSelect = function (language_code){
		//alert(language_code);
		$localstorage.set("DEVICELANGUAGE",language_code);
		$translate.use(language_code);
		var deviceLanguage = navigator.language; 
  		var language_code = (navigator.language).split("-")[0];

  		/*if (logcheck == "Yes") 
  		{
        var deviceLang = $localstorage.get("DEVICELANGUAGE");
        $state.go('app.FamilyMemberLifeStory',{'nodeID':nodeID,'activeTab':'a'});
		} 
		else {
		        $state.go('app.login');
		}*/
	};
})

.controller('changelanguageCtrl',function($scope, $ionicModal, $timeout,$ionicPopup,$localstorage,$state,$filter,$languageFactory,$translate,$ionicLoading,$commonFactory)
{
	var userNodeId = $localstorage.get("userNodeId");
	$scope.ChangeLanguage = function(langcode,selectedLanguage)
	{
		$state.go('app.FamilyMemberLifeStory',{'nodeID':userNodeId,'activeTab':'a'})

		$localstorage.set("DEVICELANGUAGE",langcode);
		$localstorage.set("SELECTEDLANGUAGE",selectedLanguage);
		$translate.use(langcode);
		$scope.userSelLang = $localstorage.get("SELECTEDLANGUAGE");
	};

	$scope.userSelLang = $localstorage.get("SELECTEDLANGUAGE");
	var deviceLang = $localstorage.get("DEVICELANGUAGE");

	if(!$scope.userSelLang){
		switch (deviceLang) {
			case 'en':
			$scope.userSelLang = "English";
			break;
			case 'ar':
			$scope.userSelLang = "Arabic";
			break;
			default:
			$scope.userSelLang = "English";
			break;

		}
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