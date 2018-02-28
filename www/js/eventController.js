angular.module('eventcontroller', [])

  .controller('eventCtrl',function($scope, $ionicModal, $timeout,$ionicPopup,$localstorage,$state,$filter,$addEvent,$stateParams,$translate,$ionicLoading,$commonFactory) 
  {
  	$scope.eventData = {};

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

    $scope.doAddEvent = function() {
      if(!$scope.eventData.title || !$scope.eventData.description || !$scope.eventData.location || !$scope.eventData.stodyDate )
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
      }
    };
  
    $scope.dateOnChange = function()
    {
      var updtDate = $scope.eventData.datetimeValue;
      var dateSt = new Date(updtDate);
      var currDate = new Date();

      var currentDateTime = $filter('date')(dateSt, "yyyy-MM-dd HH:mm:ss")
      if(updtDate)
      {

        document.getElementById('stodyDate').placeholder = $filter('date')(dateSt, "yyyy-MM-dd HH:mm:ss");
      }
      $scope.eventData.stodyDate = $filter('date')(dateSt, "yyyy-MM-dd HH:mm:ss");
    }
  })

    .controller('editEventCtrl',function($scope, $ionicModal, $timeout,$ionicPopup,$localstorage,$state,$filter,$addEvent,$stateParams,$translate,$ionicLoading,$addEvent) 
      {
		  
		   var langCode = $localstorage.get("DEVICELANGUAGE");
  			$localstorage.set("DEVICELANGUAGE",langCode);
  			$translate.use(langCode);
  			var deviceLanguage = navigator.language; 
  			var language_code = (navigator.language).split("-")[0];

            var eventID = $stateParams.eventID;
            var eventTitle = $stateParams.eventTitle;
            var eventDescription = $stateParams.eventDescription;
            var location = $stateParams.location;
            var eventDate = $stateParams.eventDate;
            var nodeID_fk = $stateParams.nodeID_fk;
			
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
 
            $scope.editEventData = {};

            $scope.editEventData.eventID = eventID;
            $scope.editEventData.title = eventTitle;
            $scope.editEventData.description = eventDescription;
            $scope.editEventData.location = location;
            $scope.editEventData.stodyDate = eventDate;
		
    $scope.showLoader();	
			 $scope.cancelbtn = function(){
            $scope.hideLoader();
        		$state.go('app.FamilyMemberLifeStory',{'nodeID':nodeID_fk,'activeTab':'a'})
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
            $state.go('app.FamilyMemberLifeStory',{'nodeID':$stateParams.nodeID_fk,'activeTab':'d'});
          }
        }, ]
      });
    }; 

    $scope.dateOnChange1 = function()
    {
      var updtDate = $scope.editEventData.datetimeValue;
      var dateSt = new Date(updtDate);
      var currDate = new Date();

      var currentDateTime = $filter('date')(dateSt, "yyyy-MM-dd HH:mm:ss")
      if(updtDate)
      {

        document.getElementById('stodyDate').placeholder = $filter('date')(dateSt, "yyyy-MM-dd HH:mm:ss");
      }
      $scope.editEventData.stodyDate = $filter('date')(dateSt, "yyyy-MM-dd HH:mm:ss");
    }

    $scope.doEditEvent = function(){
      $scope.showLoader();
      $addEvent.editEvent($scope.editEventData,$stateParams.nodeID_fk).then(function(data,$ionicPopup)
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
