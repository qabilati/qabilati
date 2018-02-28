angular.module('starter.controllers', ['ionic','ngCordova','ngCordovaOauth','app.factories.localstorage','ionic.cloud'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$login,$ionicPopup,$ionicPlatform,$ionicHistory,$localstorage,$forgotPasswordEmail1,$ionicLoading,$state,$stateParams,$translate,$window,$ionicPush,$ionicAuth, $ionicUser,$ionicLoading,$ionicPopover,$cordovaLocalNotification,$commonFactory,$getContactFactory,$cordovaDevice, $ionicSlideBoxDelegate,$cordovaOauth,$http) 
{
  $scope.loginData = {};
  $scope.facebookloginData = {};
  $scope.showpassword = false;
  var tabActiveEvent = 'b';
  var langCode = $localstorage.get("DEVICELANGUAGE");
  $localstorage.set("DEVICELANGUAGE",langCode);
  $translate.use(langCode);
  var deviceLanguage = navigator.language; 
  var language_code = (navigator.language).split("-")[0];
  $scope.deviceWidth = window.screen.width;
  $scope.deviceHeight = window.screen.height;
  //alert($scope.deviceWidth+'--'+$scope.deviceHeight);
  $localstorage.set("deviceWidth",$scope.deviceWidth);
  $localstorage.set("deviceHeight",$scope.deviceHeight);
  
  /*var my_noti_count = $localstorage.get("notification_Count");
  $scope.NotiCount = my_noti_count;
  if($scope.NotiCount >=1)
  {
      $scope.hidenoti_count = true;
  }
  else
  {
    $localstorage.set("notification_Count",0);
    $scope.NotiCount = $localstorage.get("notification_Count");
      $scope.hidenoti_count = false;
  }*/

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
        
  $ionicPush.register().then(function(t) {
      return $ionicPush.saveToken(t);
    }).then(function(t) {
      $scope.token1 = t.token;
    });

    
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
  
  var isAdmin = $localstorage.get("isAdmin");
  if (isAdmin == "1") {
      $scope.adminResult = false;
  }else{
      $scope.adminResult = true;
  }

  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });
  
  $scope.togglePass = function(){
    if($scope.showpassword==true){
      $scope.showpassword=false;
    }
    else {
      $scope.showpassword=true;
    }
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
              if($scope.res.status == 1) 
              {
                //$scope.showAlert_View(nodeID,JSON.stringify($scope.res.data));
                $state.go('contacts',{'nodeID':nodeID,'userData':JSON.stringify($scope.res.data),'redirectScreen':'notificationScreen'})
              }
              else
              {
                $scope.showAlert($scope.res.msg);
              }
            });
            //$state.go('contacts',{'nodeID':nodeID,'userData':data})
          }
        }]
      }).then(function(data){
        $scope.modal.hide();
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
        var nodeID = $localstorage.get("userNodeId");
        $state.go('app.FamilyMemberLifeStory',{'nodeID':nodeID,'activeTab':'b'});
        //$state.go('app.FamilyMemberLifeStory');
       }
     }, ]
   });
  };

  $scope.openNotification = function(msg,data,title) {
    var confirmPopup = $ionicPopup.confirm({
      title: title,
      template: msg,
      buttons: [{ 
        text: "YES",
        type: 'button-default',
        onTap: function(e) 
        {
          if (data.id == 2) {
            $state.go('app.paymentScreen',{'nodeID':data.nodeID,'type':data.id,'redirectScreen':'notificationScreen'});
          }
        }
      }, 
      {
        text: "NO",
        type: 'button-positive',
        onTap: function(e) {
        }
      }]
    });
  };

  $scope.$on('cloud:push:notification', function(event, data) {
    $scope.notificationData = {};
    var notiData = data.message.raw.additionalData;
    $scope.notificationData.id = notiData.id;
    if (notiData.id == 1) 
    {
      var msg = $translate.instant('MERGE_TREE_PAYMENT_MSG');//"You are part of a tree and in order to connect to the tree you need to pay the one dollar";
      var title = $translate.instant('MERGE_TREE');//"Merge Tree";
      $scope.openNotification(msg,$scope.notificationData,title);
    }
    if (notiData.id == 2) 
    {

          var msg = "";
          var title = "";

      $scope.notificationData.nodeID = notiData.data.nodeID;
      $scope.notificationData.relation = notiData.data.relation;
      $scope.notificationData.firstName = notiData.data.firstName;
      $scope.notificationData.lastName = notiData.data.lastName;
      $scope.notificationData.clan = notiData.data.clan;
      $scope.notificationData.email = notiData.data.email;
      $scope.notificationData.gender = notiData.data.gender;
      $scope.notificationData.parentID = notiData.data.parentID;
      $scope.notificationData.birthDate = notiData.data.birthDate;
      $scope.notificationData.phoneNumber = notiData.data.phoneNumber;

      var nodeID = $scope.notificationData.nodeID;

      $commonFactory.checkRemainingViews(nodeID).then(function(data,$ionicPopup){
        $scope.result = data;

        if($scope.result.status == 1)
        {
          $scope.showAlert_View(nodeID);
        }
        else if($scope.result.status == 2){
           msg = $translate.instant('PAYMENT_MSG');//"If you Know this Person & you want to see contact details then you need to pay one doller";
           title = $translate.instant('GET_CONTACT_DETAILS');//"Get Contact Details";
           $scope.openNotification(msg,$scope.notificationData,title);
         //$state.go('app.paymentScreen',{'nodeID':nodeID,'type':2});
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
        else{
          $scope.hideLoader();
          $scope.showAlert($scope.result.msg);
        }
      });
      /*var msg = "If you Know this Person & you want to see contact details then you need to pay one doller";
      var title = "Get Contact Details";
      $scope.notificationData.nodeID = notiData.data.nodeID;
      $scope.notificationData.relation = notiData.data.relation;
      $scope.notificationData.firstName = notiData.data.firstName;
      $scope.notificationData.lastName = notiData.data.lastName;
      $scope.notificationData.clan = notiData.data.clan;
      $scope.notificationData.email = notiData.data.email;
      $scope.notificationData.gender = notiData.data.gender;
      $scope.notificationData.parentID = notiData.data.parentID;
      $scope.notificationData.birthDate = notiData.data.birthDate;
      $scope.notificationData.phoneNumber = notiData.data.phoneNumber;*/
    }
    //$scope.openNotification(msg,$scope.notificationData,title);
  })

  /*if ($scope.isAdmin == "1") {
    $scope.isAdminResult = false;
  }else{
    $scope.isAdminResult = true;
  }*/
  /*if (isAdmin == "1") {
    $scope.becomeAdmin = false;
  }else if (isAdmin != 1) {
    $scope.becomeAdmin = true;
  }*/
   
  $scope.alertForPassword = function() {
    var alertPopup = $ionicPopup.alert({
      title: $translate.instant('ERROR_CONSTANT'),
      template: $translate.instant('FORGET_PASSWORD_ALERT_EMAIL'),
      buttons: [{
        text: $translate.instant('OK_CONSTANT'),
        type: 'button-positive',
        onTap: function(e) {

        }
      }, ]
    });
  };
   
  $scope.showAlertForEmailSend = function(msg) {
    var alertPopup = $ionicPopup.alert({
      title: $translate.instant('EMAIL_SENT_SUCCESSFULLY'),
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
   
  $ionicModal.fromTemplateUrl('templates/forget_password.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
   
  $scope.forgotpassword = function() {
    var siteroot = $localstorage.get("siteroot");
    var webserviceURL = $localstorage.get("webserviceURL");
    $localstorage.clear();
    $localstorage.set("webserviceURL",webserviceURL);
    $localstorage.set("siteroot",siteroot);
    $scope.email_id = $scope.loginData.username;
    if(!$scope.email_id){
      $scope.alertForPassword();
    }else{
      $scope.modal.show();
    }
  };

  $scope.togglePass = function(){
    if($scope.showpassword==true){
      $scope.showpassword=false;
    }
    else {
      $scope.showpassword=true;
    }
  };

  $scope.showLoaderData = function() {
  $ionicLoading.show({
      template: '<ion-spinner icon="spiral"></ion-spinner>'
     // duration: 2000
    }).then(function(){
     
    });
  };

  $scope.showLoader();
  $scope.sendforgotpassemail = function(){
    $forgotPasswordEmail1.sendforgotpassemail($scope.email_id).then(function(data,$ionicPopup){
      $scope.hideLoader();
      $scope.result = data;
      if($scope.result.status == 1){
        $scope.showAlertForEmailSend($scope.result.msg);
        $state.go('login');
      }else{
        $scope.showAlert($scope.result.msg);
      }
    });
  };

  $scope.doLogin = function() {

    var token_val =  $scope.token1;
    var isLogin = $localstorage.get("isLogin");
    //alert(langCode);
    if(isLogin=="Yes")
    {
        var nodeID = $localstorage.get("userNodeId");
        //alert(nodeID);
        $state.go('app.FamilyMemberLifeStory',{'nodeID':nodeID,'activeTab':'a'});
    }
    else
    {
      if(!$scope.loginData.username || !$scope.loginData.pass)
      {
        $scope.showAlert($translate.instant('EMPTY_CONSTANT'));
      }
      else
      {
          $scope.showLoader();
          var deviceTyp = "Android";//$cordovaDevice.getPlatform();
          $login.check($scope.loginData,token_val,deviceTyp).then(function(data,$ionicPopup) {
            $scope.result = data;
            //alert(JSON.stringify($scope.result));
            if($scope.result.status == 1)
            {
              $scope.hideLoader();
              $localstorage.set("LOGGEDINEMAIL",$scope.result.data.email);
              $localstorage.set("USERID",$scope.result.data.user_id);
              $localstorage.set("TREEID",$scope.result.data.treeID);
              $localstorage.set("userNodeId",$scope.result.data.userNodeId);
              $localstorage.set("isAdmin",$scope.result.data.isAdmin);
              $localstorage.set("userEmail",$scope.result.data.email);
              $localstorage.set("firstname",$scope.result.data.firstname);
              $localstorage.set("lastname",$scope.result.data.lastname);
              $localstorage.set("clan",$scope.result.data.clan);
              $localstorage.set("birthDate",$scope.result.data.birthDate);
              $localstorage.set("isLogin","Yes");
              /*$localstorage.set("notification_Count",$scope.result.data.notification_count);
              var my_not_count = $scope.result.data.notification_count;
              $scope.NotiCount = my_not_count;*/

              if ($scope.result.data.isFirstLogin == 0) 
              {
                if (langCode == 'en') 
                {
                  $state.go('launch',{'redirectScreen':'dashboard'});
                }
                else
                {
                  $state.go('launch-arabic',{'redirectScreen':'dashboard'});
                }
              }
              else
              {
                $state.go('app.FamilyMemberLifeStory',{'nodeID':$scope.result.data.userNodeId,'activeTab':tabActiveEvent});
              }
            }
            else
            {
              $localstorage.set("isLogin","");
              $scope.hideLoader();
              $scope.showAlert($scope.result.msg);
            }
          });  
      };
    }
    //});
  };

  $scope.home = function() {
    var nodeID = $localstorage.get("userNodeId");
    $state.go('app.FamilyMemberLifeStory',{'nodeID':nodeID,'activeTab':'a'});
  }

  $scope.ancestry = function() {
    var alertPopup = $ionicPopup.alert({
      //title: $translate.instant('EMAIL_SENT_SUCCESSFULLY'),
      template: $translate.instant("Ancestry_AND_Genealogy_msg"),
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
          var nodeID = $localstorage.get("userNodeId");
          $scope.showLoader();
          $commonFactory.ancestry(nodeID).then(function(data,$ionicPopup)
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
    }).then(function(data){
      $scope.modal.hide();
    });
    /*var nodeID = $localstorage.get("userNodeId");
    $state.go('app.FamilyMemberLifeStory',{'nodeID':nodeID,'activeTab':'a'});*/
  }
  
  $scope.logout = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: $translate.instant('CONFIRM_LOGOUT'),
      template: $translate.instant('CONFIRM_LOGOUT_MESSAGE'),
      buttons: [{ 
        text: $translate.instant('CANCEL_CONSTANT'),
        type: 'button-default',
        onTap: function(e) {
          //e.preventDefault();
        }
      }, 
      {
        text: $translate.instant('OK_CONSTANT'),
        type: 'button-positive',
        onTap: function(e) {
          $scope.showLoader();
          var siteroot = $localstorage.get("siteroot");
          var webserviceURL = $localstorage.get("webserviceURL");
          var webserviceTreeURL = $localstorage.get("webserviceTreeURL");
          var profileImgURL = $localstorage.get("profileImgURL");
          $localstorage.clear();
          $localstorage.set("webserviceURL",webserviceURL);
          $localstorage.set("siteroot",siteroot);
          $localstorage.set("webserviceTreeURL",webserviceTreeURL);
          $localstorage.set("profileImgURL",profileImgURL);
          $localstorage.set("isLogin","");
          $localstorage.set("Tree_ClickID","0");
          //$localstorage.set("DEVICELANGUAGE",DEVICELANGUAGE);
          //$scope.show_menu = false;
          $state.go('language');
        }
      }]
    });
  };

  $scope.LoginwithInstagram = function() {
    $ionicAuth.login('instagram')
      .then(function(response) {
        $scope.type = 'Insta';
          $scope.instaData = {};
          $scope.instaData.username = $ionicUser.social.instagram.data.username;
          $scope.instaData.full_name = $ionicUser.social.instagram.data.full_name;
          //$scope.instaData.profile_picture = $ionicUser.social.instagram.data.profile_picture;
          $scope.instaData.id = $ionicUser.social.instagram.data.raw_data.id;
          $scope.instaData.deviceType = "Android";//$cordovaDevice.getPlatform();
          $scope.instaData.type = 'instagram';

          $state.go('signup',{'socialData':JSON.stringify($scope.instaData)});
      })
      .catch(function(response) {
        console.log(response.data);
      });
  };

  $scope.LoginwithTwitter = function() {
    $ionicAuth.login('twitter').then(function(response) {
        $scope.type = 'Twitter';
        $scope.twitterData = {};
        $scope.twitterData.full_name = $ionicUser.social.twitter.data.full_name;
        //$scope.twitterData.profile_picture = $ionicUser.social.twitter.data.raw_data.profile_image_url;
        $scope.twitterData.id = $ionicUser.social.twitter.data.raw_data.id;
        $scope.twitterData.deviceType = "Android";//$cordovaDevice.getPlatform();
        $scope.twitterData.type = 'Twitter';

        $state.go('signup',{'socialData':JSON.stringify($scope.twitterData)});
      })
      .catch(function(response) {
        console.log(response.data);
      });
  };

  $scope.LoginwithFacebook = function() { 
    $ionicAuth.login('facebook')
      .then(function(response) {
        $scope.type = 'Fb';
        $scope.facebookData = {};
        //alert(JSON.stringify($ionicUser.social.facebook.data));
        $scope.facebookData.id = $ionicUser.social.facebook.data.raw_data.id; 
        $scope.facebookData.facebook_email = $ionicUser.social.facebook.data.raw_data.email; 
        $scope.facebookData.facebook_first_name = $ionicUser.social.facebook.data.raw_data.first_name;
        $scope.facebookData.facebook_last_name = $ionicUser.social.facebook.data.raw_data.last_name;
        $scope.facebookData.deviceType = "Android";//$cordovaDevice.getPlatform();
        $scope.facebookData.type = 'Fb';

        $state.go('signup',{'socialData':JSON.stringify($scope.facebookData)});

      })
      .catch(function(response) {
        console.log(response.data);
      });
  };
  
  $scope.clearHistory = function() {
    $ionicHistory.nextViewOptions({
        disableBack: true,
        historyRoot: true
    });
  }

})

.controller('SignUpCtrl',function($scope, $ionicModal, $timeout,$signUp,$ionicPopup,$localstorage,$state,$filter,$cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $cordovaActionSheet,$translate,$ionicPush,$ionicLoading,$commonFactory,$stateParams) {
    var siteroot = $localstorage.get("siteroot");
    var webserviceURL = $localstorage.get("webserviceURL");
    var clans = $localstorage.get("Clans");
    
   // $localstorage.clear();
    $localstorage.set("webserviceURL",webserviceURL);
    $localstorage.set("siteroot",siteroot); 
    var langCode = $localstorage.get("DEVICELANGUAGE");
    $localstorage.set("DEVICELANGUAGE",langCode);
    $translate.use(langCode);
    var deviceLanguage = navigator.language; 
    var language_code = (navigator.language).split("-")[0];
    $scope.showpassword=false;

    $ionicPush.register().then(function(t) {
      return $ionicPush.saveToken(t);
    }).then(function(t) {
      $scope.token = t.token;
    });


    $scope.signUpData = {};
    $scope.date = Date(); 
    $scope.signUpData.gender = 'Male';
    $scope.countryData = {};

    if($stateParams.socialData)
    {
      $scope.socialData = JSON.parse($stateParams.socialData);

      if ($scope.socialData.type == 'Twitter' || $scope.socialData.type == 'instagram') 
      {
        var full_name = $scope.socialData.full_name;
        var values = full_name.split(" ");
        if (values.length > 1) 
        {
          $scope.signUpData.firstname = values[0];
          $scope.signUpData.lastname = values[1];
        }
        else
        {
          $scope.signUpData.firstname = values[0];
        }
        $scope.signUpData.socialID = $scope.socialData.id;
        $scope.signUpData.socialType = $scope.socialData.type;
      }
      else
      {
        $scope.signUpData.firstname = $scope.socialData.facebook_first_name;
        $scope.signUpData.lastname = $scope.socialData.facebook_last_name;
        $scope.signUpData.email = $scope.socialData.facebook_email;
        $scope.signUpData.socialID = $scope.socialData.id;
        $scope.signUpData.socialType = $scope.socialData.type;
      }
    }
  
    $scope.togglePass = function(){
      if($scope.showpassword==true){
        $scope.showpassword=false;
      }
      else {
        $scope.showpassword=true;
      }
    };
    
    angular.isUndefinedOrNull = function(val) {
      //return angular.isUndefined(val) || val === null 
     if (value === "" || value === null || typeof value === "undefined") {
          return val === null;
      }
    };

    $scope.terms = function() 
    {
      var ref = cordova.InAppBrowser.open('http://qabilati.com', '_blank', 'location=yes');
    }

    /*$rootScope.$on("$cordovaLocalNotification:click", function(notification, state) {
        var data = JSON.parse(state.data);
        $console.log("Hiiii"+data);
        $console.log("Hiiii123"+notification);
        window.location.href = data.url;
    });*/

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
            $state.go('login');
          }
        }, ]
      });
    }; 

    $scope.showRestrictAlert = function(msg) {
      var alertPopup = $ionicPopup.alert({
        title: $translate.instant('SUCCESS_CONTANT'),
        template: $translate.instant(msg),
        buttons: [{
          text: $translate.instant('OK_CONSTANT'),
          type: 'button-positive',
          onTap: function(e) {
            $state.go('contactUS',{'type':'Restrict'});
          }
        },{ text: $translate.instant('CANCEL_CONSTANT'),  type: 'button-positive', onTap: function(e) { return true; } }]
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

    $scope.items = JSON.parse(clans);

    $scope.onSelect = function (item) {
      console.log('item', item);
    };

    $scope.cancelbtn = function()
    {
      $state.go('login',{});
    };


    /*$scope.signUpData = {
        firstname:"abc",
        lastname:"pqr",
        clan:"pqr",
        email:"abc@pqr.com",
        pass:"123456",
        fatherName:"qwqw",
        motherName:"saf",
        BirthDate:"2017-09-22"
    }*/
 

    $scope.doSignUp = function() {
      if(!$scope.signUpData.firstname || !$scope.signUpData.lastname || !$scope.signUpData.gender || !$scope.signUpData.email || !$scope.signUpData.pass || !$scope.signUpData.BirthDate || !$scope.signUpData.fatherName || !$scope.signUpData.motherName)
      {
        $scope.showAlert($translate.instant('EMPTY_CONSTANT'));
      }
      else
      {
        $scope.showLoader();
        $scope.signUpData.birthCountry = $scope.countryidBirth;
        $scope.signUpData.birthState = $scope.stateidBirth;
        $scope.signUpData.birthCity = $scope.cityidBirth;
        
        if($scope.cityidBirth=="0000")
        {
          $scope.signUpData.birthCity = $scope.signUpData.cityname;
        }
        else
        {
          $scope.signUpData.birthCity = $scope.cityidBirth;
        }
        $scope.signUpData.residenceCountry = $scope.countryidResidence;
        $scope.signUpData.residenceState = $scope.stateidResidence;
        $scope.signUpData.residenceCity = $scope.cityidResidence;
        if($scope.cityidResidence=="0000")
        {
          $scope.signUpData.residenceCity = $scope.signUpData.cityresname;
        }
        else
        {
          $scope.signUpData.residenceCity = $scope.cityidResidence;
        }
        $scope.signUpData.deviceType = "Android";//$cordovaDevice.getPlatform();
        //alert($scope.signUpData.deviceType);
        $scope.signUpData.token = $scope.token;
        if (!$scope.signUpData.socialType) 
        {
          $scope.signUpData.socialType = 'email';
          $scope.signUpData.socialID = '';
        }
        $signUp.check($scope.signUpData).then(function(data,$ionicPopup) {
          $scope.result = data;
          if($scope.result.status == 1) {
            $scope.hideLoader();
            $scope.showSuccessAlert($scope.result.msg);
          }
          else if($scope.result.status == 2){
            $scope.hideLoader();
            $scope.showRestrictAlert($scope.result.msg);
          }
          else{
            $scope.hideLoader();
            $scope.showAlert($scope.result.msg);
          } 
        });
      }
    };

    $scope.showLoader();
    $commonFactory.selectCountry().then(function(data){
      $scope.result = data; 
      if($scope.result.status == 1){
        $scope.hideLoader();
        $scope.countryDataBirth = $scope.result.data;
        $scope.countryDataResidence = $scope.result.data;
        //alert("Country 1 loaded...."+JSON.stringify($scope.countryDataBirth));
      }else{
        $scope.hideLoader();
        $scope.showAlert($scope.result.msg);
      }
    })
    

    $scope.showLoader();
    $scope.getStateBirth = function(country){
      $commonFactory.selectState(country).then(function(data){
        $scope.countryidBirth = country;
        $scope.result = data; 
        if($scope.result.status == 1){
          $scope.hideLoader();
          $scope.stateDataBirth = $scope.result.data;
          //alert("state 1 loaded....");
        }else{
          $scope.hideLoader();
          $scope.showAlert($scope.result.msg);
        }
      })
    }
        
    $scope.showLoader();
    $scope.getCityBirth = function(state){
      $commonFactory.selectCity(state).then(function(data){

        $scope.stateidBirth = state;
        $scope.result = data; 
        
              
        if($scope.result.status == 1){
          $scope.hideLoader();
          $scope.cityDataBirth = $scope.result.data;
          $scope.cityDataBirth.push({
          "city_id" : "0000",      
          "city" : $translate.instant('ADD_SELECT_CITY')//"Add your city"
        });
          //alert("city 1 loaded....");
        }else{
          $scope.hideLoader();
          $scope.showAlert($scope.result.msg);
        }
      })
    }

    $scope.getCityIDBirth = function(city_id){
      if(city_id == "0000")
        {
           $scope.city_textview_Enable = true;
        }
        else{
           $scope.city_textview_Enable = false;
        }
      $scope.cityidBirth = city_id;
    }

    $scope.showLoader();
    $scope.getStateResidence = function(country){
      $commonFactory.selectState(country).then(function(data){
        $scope.countryidResidence = country;
        $scope.result = data; 

        if($scope.result.status == 1){
          $scope.hideLoader();
          $scope.stateDataResidence = $scope.result.data;
         // alert("state 2 loaded....");
        }else{
          $scope.hideLoader();
          $scope.showAlert($scope.result.msg);
        }
      })
    }

    $scope.showLoader();
    $scope.getCityResidence = function(state){
      $commonFactory.selectCity(state).then(function(data){
        $scope.stateidResidence = state;
        $scope.result = data; 

        if($scope.result.status == 1){
          $scope.hideLoader();
          $scope.cityDataResidence = $scope.result.data;
          $scope.cityDataResidence.push({
          "city_id" : "0000",      
          "city" : $translate.instant('ADD_SELECT_CITY')//"Add your city"
        });
        }else{
          $scope.hideLoader();
          $scope.showAlert($scope.result.msg);
        }
      })
    }

    $scope.getCityIDResidence = function(city_id){
      
      if(city_id == "0000")
        {
          $scope.city_res_textview_Enable = true;
        }
        else{
          $scope.city_res_textview_Enable = false;
        }
        $scope.cityidResidence = city_id;
    }
    
    $scope.dateOnChange = function(){
      var updtDate = $scope.signUpData.dateTimeValue;
      var dateSt = new Date(updtDate);
      var currDate = new Date();

      var currentDateTime = $filter('date')(dateSt, "yyyy-MM-dd")
      if(updtDate)
      {
        document.getElementById('BirthDate').placeholder = $filter('date')(dateSt, "yyyy-MM-dd");
      }
      $scope.signUpData.BirthDate = $filter('date')(dateSt, "yyyy-MM-dd");
    }

    $scope.image = null;

    $scope.showImageAlert = function(title, msg) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: msg,
        buttons: [{
          text: $translate.instant('OK_CONSTANT'),
          type: 'button-positive',
          onTap: function(e) {

          }
        }, ]
      });
    };
  
    $scope.loadImage = function() {
      var options = {
        title: $translate.instant('SELECT_IMAGE_SOURCE'),
        buttonLabels: [$translate.instant('LOAD_FROM_LIBRARY'),$translate.instant('USE_CAMERA')],
        addCancelButtonWithLabel: $translate.instant('CANCEL_CONSTANT'),
        androidEnableCancelButton : true,
      };
      $cordovaActionSheet.show(options).then(function(btnIndex) {
        var type = null;
        if (btnIndex === 1) {
          type = Camera.PictureSourceType.PHOTOLIBRARY;
        } else if (btnIndex === 2) {
          type = Camera.PictureSourceType.CAMERA;
        }
        if (type !== null) {
          $scope.selectPicture(type);
        }
      });
    };

    // Take image with the camera or from library and store it inside the app folder
    // Image will not be saved to users Library.
    $scope.selectPicture = function(sourceType) {
      var options = {
        quality: 100,
        allowEdit : true,
        targetWidth: 300,
        targetHeight: 300,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: sourceType,
        saveToPhotoAlbum: false
      };
 
      $cordovaCamera.getPicture(options).then(function(imagePath) {
        // Grab the file name of the photo in the temporary directory
        var currentName = imagePath.replace(/^.*[\\\/]/, '');

        //Create a new name for the photo
        var d = new Date(),
        n = d.getTime(),
        newFileName =  n + ".jpg";

        // If you are trying to load image from the gallery on Android we need special treatment!
        if ($cordovaDevice.getPlatform() == 'Android' && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
          window.FilePath.resolveNativePath(imagePath, function(entry) {
            window.resolveLocalFileSystemURL(entry, success, fail);
            function fail(e) {
              console.error('Error: ', e);
            }

            function success(fileEntry) {
              var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
              //Only copy because of access rights
              $cordovaFile.copyFile(namePath, fileEntry.name, cordova.file.dataDirectory, newFileName).then(function(success){
                $scope.image = newFileName;
                $scope.signUpData.profilepic = newFileName;
                $scope.uploadImage();
              }, function(error){
                $scope.showImageAlert('Error', error.exception);
              });
            };
          }
          );
        } 
        else {
          var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
          //Move the file to permanent storage
          $cordovaFile.moveFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function(success){
            $scope.image = newFileName;
            $scope.signUpData.profilepic = newFileName;
            $scope.uploadImage();
          }, function(error){
            $scope.showImageAlert('Error', error.exception);
          });
        }
      },
      function(err){
        // Not always an error, maybe cancel was pressed...
      })
    };

    // Returns the local path inside the app for an image
    $scope.pathForImage = function(image) {
      if (image === null) {
        return '';
      } else {
        return cordova.file.dataDirectory + image;
      }
    };

    $scope.uploadImage = function() {

      var userId = $localstorage.get("USERID");
      //Destination URL
      var siteroot = $localstorage.get("siteroot");
      var url = siteroot+"uploads.php";

      //File for Upload
      var targetPath = $scope.pathForImage($scope.image);

      //File name only
      var filename = $scope.image;

      var options = {
        fileKey: "file",
        fileName: filename,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params : {'fileName': filename, 'userId' : userId, 'type' : 'business'}
      };

      $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
        //$scope.showAlert('Success', 'Image upload finished.');
        //angular.element(document.querySelector("form")).scope().businessform.logo.$setDirty();
      });
    }


    /*$scope.clearHistory = function() {
      $ionicHistory.nextViewOptions({
          disableBack: true,
          historyRoot: true
      });
    }*/


});

