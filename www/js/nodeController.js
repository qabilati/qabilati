angular.module('nodecontroller', [])

  .controller('nodeCtrl',function($scope, $ionicModal, $timeout, $lifestory,$ionicPlatform,$ionicHistory, $nodes, $addEvent, $deleteTreeFactory, $ionicPopup,$localstorage, $state, $filter, $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $cordovaActionSheet, $stateParams,$galleryFactory,$translate,$cordovaSocialSharing,$ionicLoading,$ionicPopover,$commonFactory,$getContactFactory) {

    var siteroot = $localstorage.get("siteroot");
    var webserviceURL = $localstorage.get("webserviceURL");
    var userNodeId = $localstorage.get('userNodeId');
    var langCode = $localstorage.get("DEVICELANGUAGE");
    $localstorage.set("DEVICELANGUAGE",langCode);
    $translate.use(langCode);
    var deviceLanguage = navigator.language; 
    var language_code = (navigator.language).split("-")[0];

    $scope.hide_home_delete = true;

    $scope.storyData = {};
    $scope.eventData = {};
    $scope.galleryData = {};
    $scope.familyData = {};
    $scope.userNodeData = {};

    $scope.userEmail = $localstorage.get("userEmail");
    $scope.firstname = $localstorage.get("firstname");
    $scope.lastname = $localstorage.get("lastname");
    $scope.clan = $localstorage.get("clan");
    $scope.birthDate = $localstorage.get("birthDate");

    var tabActiveEvent = $stateParams.activeTab;
    $scope.activeTab = tabActiveEvent;
    $scope.profileImgURL = $localstorage.get("profileImgURL");
    
    $nodes.getNodeData($stateParams.nodeID).then(function(data,$ionicPopup)
    {
      $scope.showLoader();  
      $scope.result = data;
      if($scope.result.status == 1){
        $scope.hideLoader();
        $scope.userNodeData = $scope.result.data;
        $scope.userName = $scope.userNodeData.name;
        $scope.userPhoto = $scope.userNodeData.photo;
        $scope.coverPhoto = $scope.userNodeData.coverImage;
        $scope.currentNodeID = $scope.userNodeData.nodeID;
        $scope.nodeType = $scope.userNodeData.nodeType;
        $scope.relation = $scope.userNodeData.relation;
        $localstorage.set("relation",$scope.relation);
        $localstorage.set("mainUsername",$scope.userName);
        $localstorage.set("lastName",$scope.userNodeData.lastName);
        if (userNodeId == $scope.currentNodeID) 
        {
          $scope.isMainNode = 1;
        }
        else
        {
          $scope.isMainNode = 0;
        }
      }else{
        $scope.hideLoader();
        $scope.showAlert($scope.result.msg);
      }
    });

    $lifestory.getStory($stateParams.nodeID).then(function(data,$ionicPopup){
      $scope.showLoader();  
      $scope.result = data;
      if($scope.result.status == 1){
        $scope.storyData = $scope.result.data;
      }else{
        $scope.hideLoader();
        $scope.showAlert($scope.result.msg);
      }
    });

    $nodes.getFamilyMembers($stateParams.nodeID).then(function(data,$ionicPopup){
      $scope.showLoader();
      $scope.result = data;
      if($scope.result.status == 1){
        $scope.hideLoader();
        $scope.parentData = $scope.result.data.parent;
        $scope.spouseData = $scope.result.data.spouse;
        $scope.siblingData = $scope.result.data.sibling;
        $scope.childData = $scope.result.data.child;
      }else{
        $scope.hideLoader();
        $scope.showAlert($scope.result.msg);
      }
    });

    $addEvent.getEvent($stateParams.nodeID).then(function(data,$ionicPopup){
      $scope.showLoader();
      $scope.result = data;
      if($scope.result.status == 1){
        $scope.hideLoader();
        $scope.eventData = $scope.result.data;
      }else{
        $scope.hideLoader();
        $scope.showAlert($scope.result.msg);
      }
    });
    
    $galleryFactory.getPhoto($stateParams.nodeID).then(function(data,$ionicPopup){  
      $scope.showLoader();
      $scope.result = data;
      if($scope.result.status == 1){
        $scope.hideLoader();
        $scope.galleryData = $scope.result.data;
      }else{
        $scope.hideLoader();
        $scope.showAlert($scope.result.msg);
      }
    });
	
    $ionicPopover.fromTemplateUrl('templates/popover.html', {
      scope: $scope,
    }).then(function(popover) {
      $scope.popover = popover;
    });

    $scope.openPopover = function($event) {  
      $scope.popover.show($event);
    };

    $scope.closePopover = function() {
      $scope.popover.hide();
    };
	
 	  // Perform Action on destroy
    $scope.$on('$destroy', function() {
      $scope.popover.remove();
    });
	
    // Perform action on hide popover
    $scope.$on('popover.hidden', function() {
    // Perform action
    });
    // Perform action on remove popover
    $scope.$on('popover.removed', function() {
    // Perform action
    });

    $scope.viewTree = function()
    {
      $commonFactory.checkNodeType($stateParams.nodeID).then(function(data,$ionicPopup){
        $scope.result = data;
        $scope.closePopover();
        if($scope.result.status == 1)
        {
          $state.go('app.tree',{'nodeID':$stateParams.nodeID});
        }
        else if($scope.result.status == 2){
          $commonFactory.checkRemainingViews().then(function(data,$ionicPopup){
            $scope.result = data;
            if($scope.result.status == 1)
            {
              $scope.showAlert_View($stateParams.nodeID,'viewTree');
            }
            else if($scope.result.status == 2) {
             $state.go('app.unlockNode',{'nodeID':$stateParams.nodeID,'redirectScreen':'viewTree'});
            }
            else {
              $scope.hideLoader();
              $scope.showAlert($scope.result.msg);
            }
          });
        }
        else{
          $scope.hideLoader();
          $scope.showAlert($scope.result.msg);
        }
      });
    };

    $scope.changeCover = function() {
      $commonFactory.checkNodeType($stateParams.nodeID).then(function(data,$ionicPopup){
        $scope.result = data;
        $scope.closePopover();
        if($scope.result.status == 1)
        {
          $state.go('app.changeCover',{'nodeID':$stateParams.nodeID});
        }
        else if($scope.result.status == 2){

          $commonFactory.checkRemainingViews().then(function(data,$ionicPopup){
            $scope.result = data;
            if($scope.result.status == 1)
            {
              $scope.showAlert_View($stateParams.nodeID,'changeCover');
            }
            else if($scope.result.status == 2) {
             $state.go('app.unlockNode',{'nodeID':$stateParams.nodeID,'redirectScreen':'changeCover'});
            }
            else {
              $scope.hideLoader();
              $scope.showAlert($scope.result.msg);
            }
          });
        }
        else{
          $scope.hideLoader();
          $scope.showAlert($scope.result.msg);
        }
      });
    };

    $scope.editnode = function() 
    {
      $commonFactory.checkNodeType($stateParams.nodeID).then(function(data,$ionicPopup){
        $scope.result = data;
        $scope.closePopover();
        if($scope.result.status == 1)
        {
          $state.go('app.editTreeNode',{'nodeID':$stateParams.nodeID});
        }
        else if($scope.result.status == 2)
        {
          $commonFactory.checkRemainingViews().then(function(data,$ionicPopup){
            $scope.res = data;
            if($scope.res.status == 1)
            {
              $scope.showAlert_View($stateParams.nodeID,'editNode');
            }
            else if($scope.res.status == 2) {
             $state.go('app.unlockNode',{'nodeID':$stateParams.nodeID,'redirectScreen':'editNode'});
            }
            else {
              $scope.hideLoader();
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
    };
   
    $scope.getContactDetails = function()
    {
     
      $commonFactory.checkNodeType($stateParams.nodeID).then(function(data,$ionicPopup){
        $scope.result = data;
        if($scope.result.status == 1)
        {
          $getContactFactory.getContact($stateParams.nodeID,'dashboard').then(function(data,$ionicPopup) 
          {
            $scope.res = data;
             
            if($scope.res.status == 1) 
            {
              $state.go('contacts',{'nodeID':$stateParams.nodeID,'userData':JSON.stringify($scope.res.data),'redirectScreen':'dashboard'})
            }
            else
            {
              $scope.showAlert($scope.res.msg);
            }
          });
        }
        else if($scope.result.status == 2)
        {
          $commonFactory.checkRemainingViews($stateParams.nodeID).then(function(data,$ionicPopup){
            $scope.result = data;
            if($scope.result.status == 1)
            {
              $scope.showAlert_View($stateParams.nodeID,'getContact');
            }
            else if($scope.result.status == 2){
             $state.go('app.unlockNode',{'nodeID':$stateParams.nodeID,'redirectScreen':'getContact'});
            }
            else if ($scope.result.status == 3)
            {
              $getContactFactory.getContact($stateParams.nodeID,'getContact').then(function(data,$ionicPopup) 
              {
                $scope.res = data;
                if($scope.res.status == 1) 
                {
                  $state.go('contacts',{'nodeID':$stateParams.nodeID,'userData':JSON.stringify($scope.res.data),'redirectScreen':'getContact'});
                }
                else
                {
                  $scope.showAlert($scope.res.msg);
                }
              });
            }
            else{
              $scope.hideLoader();
              $scope.showAlert($scope.result.msg);
            }
          });
        }
        else
        {
          $scope.hideLoader();
          $scope.showAlert($scope.result.msg);
        }
      });
    };

    $scope.showAlert_View = function(nodeID,type) {
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
            $commonFactory.deductView(nodeID,type).then(function(data,$ionicPopup) 
            {
              $scope.res = data;
              if($scope.res.status == 1) 
              {
                if (type == 'viewTree') 
                {
                  $state.go('app.tree',{'nodeID':nodeID});
                }
                else if (type == 'changeCover')
                {
                  $state.go('app.changeCover',{'nodeID':nodeID});
                }
                else if(type == 'editNode')
                {
                  $state.go('app.editTreeNode',{'nodeID':nodeID});
                }
                else if(type == 'getContact')
                {
                  $state.go('contacts',{'nodeID':nodeID,'userData':JSON.stringify($scope.res.data),'redirectScreen':'dashboard'});
                }
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

    $scope.deletenode = function() 
    {
      $scope.closePopover();
      var confirmPopup = $ionicPopup.confirm({
        title: $translate.instant('CONFIRM_DELETE'),
        template: $translate.instant('CONFIRM_DELETE_MESSAGE'),
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
            $scope.showLoader();
            $deleteTreeFactory.deleteNode($stateParams.nodeID).then(function(data,$ionicPopup)
            {
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
            });
          }
        }]
      });
    };

    $scope.addEvent = function(){
         $state.go('app.addEvent',{'nodeID':$stateParams.nodeID,'activeTab':'d'});
    };

    $scope.addPhoto = function(){
        $state.go('app.gallery_image_save',{'nodeID':$stateParams.nodeID,'activeTab':'c'});
    };

    $scope.addFamilyMember = function(nodeID,relation){
        $state.go('app.form',{'nodeID':$stateParams.nodeID,'relation':$scope.relation,'activeTab':'b'});
    }

    $scope.addLifeStory = function(){
        $state.go('app.addLifeStory',{'nodeID':$stateParams.nodeID,'activeTab':'a'});
    }

    $scope.shareRelation = function(name,relation){
      var mainUsername = $localstorage.get("mainUsername");
      var msg = name + " & " + mainUsername + " are related on Qabilati , you can check your family tree and blood relatives on the Qabilati App.";
      $cordovaSocialSharing.share(msg, $translate.instant('SHARING_INFO'), null, 'http://qabilati.com/');
    }

    $scope.getUserProfile = function(nodeID) 
    {
      $state.go('app.userProfile',{'nodeID':nodeID,'activeTab':tabActiveEvent});
    }

    $scope.editEvent = function(eventID,eventTitle,eventDescription,location,eventDate,nodeID_fk){
      $state.go('editEvent',{'eventID':eventID,'eventTitle':eventTitle,'eventDescription':eventDescription,'location':location,'eventDate':eventDate,'nodeID_fk':nodeID_fk});
    }

    $scope.editPhoto = function(galleryID,title,description,photoDate,photo,location,nodeID_fk){
     $state.go('editPhoto',{'galleryID':galleryID,'title':title,'description':description,'photoDate':photoDate,'photo':photo,'location':location,'nodeID_fk':nodeID_fk});
    }

    $scope.editStory = function(lsID,title,description,location,stodyDate,nodeID_fk){
      $state.go('editStory',{'lsID':lsID,'title':title,'description':description,'location':location,'stodyDate':stodyDate,'nodeID_fk':nodeID_fk});
    }
    
    $scope.shareAnywhereStory = function(title,description,stodyDate,lsID) 
    {
      var msg = "Story Title:-"+" "+title+"\nStory Description:-"+" "+description+"\nStory Date:-"+" " +stodyDate;
      $cordovaSocialSharing.share(msg, $translate.instant('APP_NAME'), null, null);
    }

    $scope.shareAnywhereEvent = function(eventTitle,eventDescription,location,eventDate,eventID) 
    {
      var msg = "Event Title:-"+" "+eventTitle+"\n Event Description:-"+" "+eventDescription+"\n Event Location:-"+" "+location+"\n EVent Date:-"+" "+eventDate;
      $cordovaSocialSharing.share(msg, $translate.instant('APP_NAME'), null, null);
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
            $state.go('app.FamilyMemberLifeStory',{'nodeID':userNodeId,'activeTab':tabActiveEvent});
          }
        }, ]
      });
    };

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

 