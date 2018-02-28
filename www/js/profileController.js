angular.module('profilecontroller', [])

  .controller('profileCtrl',function($scope, $ionicModal, $timeout,$lifestory,$ionicPopup,$localstorage,$state,$filter,$stateParams,$translate,$translate,$ionicLoading,$commonFactory) 
  {
    var siteroot = $localstorage.get("siteroot");
    var webserviceURL = $localstorage.get("webserviceURL");
    var nodeID = $stateParams.nodeID;
    var tabActiveEvent = $stateParams.activeTab;
    var langCode = $localstorage.get("DEVICELANGUAGE");
    $localstorage.set("DEVICELANGUAGE",langCode);
    $translate.use(langCode);
    var deviceLanguage = navigator.language; 
    var language_code = (navigator.language).split("-")[0];
    $scope.profileData = {};
	
	
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
 
    // var currDate = new Date();
    // $scope.profileData.stodyDate = $filter('date')(currDate, "yyyy-MM-dd");
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


    $scope.doAddStory = function() {
      if(!$scope.profileData.title || !$scope.profileData.description || !$scope.profileData.location || !$scope.profileData.stodyDate )
      {
        $scope.showAlert($translate.instant('EMPTY_CONSTANT'));
      }
      else
      {
        var USERID = $localstorage.get("USERID");
        $scope.showLoader();
              $lifestory.addStory($scope.profileData,nodeID).then(function(data,$ionicPopup){
          $scope.result = data;
          if($scope.result.status == 1){
            $scope.hideLoader();
            $scope.showSuccessAlert($scope.result.msg);
          }else{
            $scope.hideLoader();
            $scope.showAlert($scope.result.msg);
          }
        });
      }
    };
  
    $scope.dateOnChange = function(){
      var updtDate = $scope.profileData.datetimeValue;
      var dateSt = new Date(updtDate);
      var currDate = new Date();

      var currentDateTime = $filter('date')(dateSt, "yyyy-MM-dd")
      if(updtDate)
      {
        document.getElementById('stodyDate').placeholder = $filter('date')(dateSt, "yyyy-MM-dd");
      }
      $scope.profileData.stodyDate = $filter('date')(dateSt, "yyyy-MM-dd");
    }

  })

  .controller('editProfileCtrl',function($scope, $ionicModal, $timeout,$lifestory,$ionicPopup,$localstorage,$state,$filter,$stateParams,$translate,$translate,$ionicLoading) 
  {
	   var langCode = $localstorage.get("DEVICELANGUAGE");
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
      
      $scope.editProfileData = {};
      $scope.editProfileData.lsID = $stateParams.lsID;
      $scope.editProfileData.title = $stateParams.title;
      $scope.editProfileData.description = $stateParams.description;
      $scope.editProfileData.location = $stateParams.location;
      $scope.editProfileData.stodyDate = $stateParams.stodyDate;
      $scope.nodeID_fk = $stateParams.nodeID_fk;

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
	  $scope.cancelbtn = function(){
        $scope.hideLoader();
        $state.go('app.FamilyMemberLifeStory',{'nodeID':$scope.nodeID_fk,'activeTab':'a'})
  	  }

      $scope.dateOnChange1 = function(){
      var updtDate = $scope.editProfileData.datetimeValue;
      var dateSt = new Date(updtDate);
      var currDate = new Date();

      var currentDateTime = $filter('date')(dateSt, "yyyy-MM-dd")
      if(updtDate)
      {
        document.getElementById('stodyDate').placeholder = $filter('date')(dateSt, "yyyy-MM-dd");
      }
      $scope.editProfileData.stodyDate = $filter('date')(dateSt, "yyyy-MM-dd");
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
            $state.go('app.FamilyMemberLifeStory',{'nodeID':$stateParams.nodeID_fk,'activeTab':'a'});
          }
        }, ]
      });
    }; 

    $scope.doEditStory = function(){
      $scope.showLoader();  
      $lifestory.editStory($scope.editProfileData,$stateParams.nodeID_fk).then(function(data,$ionicPopup)
      {
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
  });





