angular.module('addNodeController', [])

.controller('addNodeController', function($scope, $ionicModal, $nodes, $timeout,$ionicPopup,$localstorage,$ionicLoading,$state,$filter,$cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $cordovaActionSheet,$stateParams,$translate,$ionicLoading,$payPalFactory,$commonFactory) {

  $scope.addNodeData = {};
  $scope.addNode1 = $scope.addNodeData;
  var nodeID = $stateParams.nodeID;
  var clan_nm="", last_name="";
  var tabActiveEvent = $stateParams.activeTab;
  var langCode = $localstorage.get("DEVICELANGUAGE");
  $localstorage.set("DEVICELANGUAGE",langCode);
  $translate.use(langCode); 
  var deviceLanguage = navigator.language; 
  var language_code = (navigator.language).split("-")[0];
  var relation = $localstorage.get("relation");
  $scope.lastName = $localstorage.get("lastName");
  $scope.checkItems={};
  $scope.SignUpData={};
  $scope.paymentData={};
  $scope.relation_name='';
  $scope.SignUpData.parentList = {};

  if($stateParams.parentData)
  {
    $scope.SignUpData = JSON.parse($stateParams.parentData);
    $scope.parentListData = $scope.SignUpData.parentList;
    if($scope.SignUpData.relation=="Spouse")      
    {
          $scope.relation_name = "Child";
    }
    else if($scope.SignUpData.relation=="Child")
    {
          $scope.relation_name = "Parent";
    }
    else if($scope.SignUpData.relation=="Sibling")
    {
          $scope.relation_name = "Parent";
    }
    else if($scope.SignUpData.relation=="Parents")
    {
          $scope.relation_name = "Child";
    }
  }

  if($stateParams.paymentData)
  {
    $scope.paymentData = JSON.parse($stateParams.paymentData);
  }
    
  angular.isUndefinedOrNull = function(val) 
  {
    if (value === "" || value === null || typeof value === "undefined") 
    {
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
          $state.go('app.FamilyMemberLifeStory',{'nodeID':nodeID,'activeTab':tabActiveEvent});
        }
      }, ]
    });
  };
  
  $scope.addNodeData =
  {
    lastname:$scope.lastName  
  }

  if (relation == 'Child' || relation == 'Sibling') 
  {
    $scope.hideRelation = false;
  }
  else if (relation == 'Parents' || relation == 'Spouse' || relation == 'Self')
  {
    $scope.hideRelation = true;
  }

  $scope.addNodeData.living = '1';
  $scope.addNodeData.gender = 'Male';
  $scope.addNodeData.relation = 'Child';
  $scope.date = Date(); 

  $scope.parentList = function(parentID,relation,last_name,clan_nm)
  {
    $scope.showLoader();
    return $nodes.parentList(parentID,relation,last_name,clan_nm);
  };

  $scope.showPaymentAlert = function(msg,SignUpData) {
    var alertPopup = $ionicPopup.alert({
      title: $translate.instant('SUCCESS_CONTANT'),
      template: $translate.instant(msg),
      buttons: [{
        text: $translate.instant('OK_CONSTANT'),
        type: 'button-positive',
        onTap: function(e) {

          $state.go('app.generationPaymentScreen',{'nodeID':$stateParams.nodeID,'paymentData':JSON.stringify(SignUpData)});
        }
      }, ]
    });
  };

  $scope.showRestrictAlert = function(msg,SignUpData) {
    var alertPopup = $ionicPopup.alert({
      title: $translate.instant('SUCCESS_CONTANT'),
      template: $translate.instant(msg),
      buttons: [{
        text: $translate.instant('OK_CONSTANT'),
        type: 'button-positive',
        onTap: function(e) {

          $state.go('app.contact_admin',{'type':'Restrict'});
        }
      },{ text: $translate.instant('CANCEL_CONSTANT'),  type: 'button-positive',onTap: function(e) { return true; } } ]
    });
  };

  $scope.showMergeAlert = function(existNodeID,existTreeID,newID,SignUpData) {
    var name = SignUpData.firstname+' '+SignUpData.lastname;
    var msgMerge = $translate.instant('WANT_MERGE');
    var msg = name+' '+msgMerge;
    var alertPopup = $ionicPopup.alert({
      title: $translate.instant('SUCCESS_CONTANT'),
      //template: $translate.instant(nodeID),
      template: msg,
      buttons: [{
        text: $translate.instant('OK_CONSTANT'),
        type: 'button-positive',
        onTap: function(e) {

          $state.go('app.payScreenForMerge',{'existNodeID':existNodeID,'existTreeID':existTreeID,'newID':newID});
        }
      },{ text: $translate.instant('CANCEL_CONSTANT'),  type: 'button-positive',onTap: function(e) { return true; } } ]
    });
  };

  $scope.doSignup = function(SignUpData)
  {
    $scope.showLoader(); 

    $nodes.AddNode(SignUpData).then(function(data,$ionicPopup) {
        $scope.result = data;
        if($scope.result.status == 1) {
          $scope.hideLoader();
          if($scope.result.existNodeID == 0)
          {
            $scope.showSuccessAlert($scope.result.msg);
          }
          else
          {
            $scope.showMergeAlert($scope.result.existNodeID,$scope.result.existTreeID,$scope.result.newID,SignUpData)
          }
        }
        else if($scope.result.status == 2){
          $scope.hideLoader();
          $scope.showPaymentAlert($scope.result.msg,SignUpData);
        }
        else if($scope.result.status == 3){
          $scope.hideLoader();
          $scope.showRestrictAlert($scope.result.msg,SignUpData);
        }
        else{
           $scope.hideLoader();
          $scope.showAlert($scope.result.msg);
        } 
      });
  };



  $scope.doAddNode = function()
  {
    var array = [];
    for(i in $scope.checkItems) {
        //console.log($scope.checkItems[i]);
        if($scope.checkItems[i] == true) {
            array.push(i);
        }
    }
    $scope.SignUpData.parentList = array;
    $scope.doSignup($scope.SignUpData);
  };
  
  /*$scope.addNodeData = {
        firstname:"abc",
        lastname:"pqr",
        clan:"AlNahyan",
        email:"abc@pqr.com",
        phone:"1234567890",
        BirthDate:"2017-09-22"
  }*/

  $scope.setSignUpData = function()
  {
    if(!$scope.addNodeData.firstname || !$scope.addNodeData.lastname || !$scope.addNodeData.email ||  !$scope.addNodeData.BirthDate)
    {
        $scope.showAlert($translate.instant('EMPTY_CONSTANT'));
    }
    else 
    {
      clan_nm = $scope.addNodeData.clan;
      last_name = $scope.addNodeData.lastname

      $scope.addNodeData.nodeID = $stateParams.nodeID;
      $scope.addNodeData.countryid = $scope.countryid;
      $scope.addNodeData.stateid = $scope.stateid;
      $scope.addNodeData.cityid = $scope.cityid;
      $scope.addNodeData.countryidBirth = $scope.countryidBirth;
      $scope.addNodeData.stateidBirth = $scope.stateidBirth;
      $scope.addNodeData.cityidBirth = $scope.cityidBirth;

        if($scope.cityidBirth=="0000")
        {
          $scope.addNodeData.cityidBirth = $scope.addNodeData.cityname;
        }
        else
        {
          $scope.addNodeData.cityidBirth = $scope.cityidBirth;
        }

      $scope.addNodeData.countryidResidence = $scope.countryidResidence;
      $scope.addNodeData.stateidResidence = $scope.stateidResidence;
      $scope.addNodeData.cityidResidence = $scope.cityidResidence;

      if($scope.cityidResidence=="0000")
        {
          $scope.addNodeData.cityidResidence = $scope.addNodeData.cityresname;
        }
        else
        {
          $scope.addNodeData.cityidResidence = $scope.cityidResidence;
        }


      if($scope.addNodeData.relation == 'Child')
      {
          $scope.parentList(nodeID,'Child',last_name,clan_nm).then(function(data) {
          $scope.result = data;

          if ($scope.result.status == 1) 
          {
            $scope.addNodeData.parentList = $scope.result.data;

            $state.go('app.ParentListBeforeAddingChild',{'nodeID':$stateParams.nodeID,'parentData':JSON.stringify($scope.addNodeData)});
          }
          else
          {
            $scope.addNodeData.parentList = "";
            $scope.doSignup($scope.addNodeData);
          }
        });
      }
      else if($scope.addNodeData.relation == 'Parents')
      {
        $scope.parentList(nodeID,'Parents',last_name,clan_nm).then(function(data) {
          $scope.result = data;
          if ($scope.result.status == 1) 
          {
            $scope.addNodeData.parentList = $scope.result.data;

            $state.go('app.ParentListBeforeAddingChild',{'nodeID':$stateParams.nodeID,'parentData':JSON.stringify($scope.addNodeData)});
          }
          else
          {
            $scope.addNodeData.parentList = "";
            $scope.doSignup($scope.addNodeData);
          }
        });
      }
      else if($scope.addNodeData.relation == 'Spouse')
      {
        $scope.parentList(nodeID,'Spouse',last_name,clan_nm).then(function(data) {
          $scope.result = data;
          if ($scope.result.status == 1) 
          {
            $scope.addNodeData.parentList = $scope.result.data;

            $state.go('app.ParentListBeforeAddingChild',{'nodeID':$stateParams.nodeID,'parentData':JSON.stringify($scope.addNodeData)});
          }
          else
          {
            $scope.addNodeData.parentList = "";
            $scope.doSignup($scope.addNodeData);
          }
        });
      }
      else if($scope.addNodeData.relation == 'Sibling')
      {
        $scope.parentList(nodeID,'Sibling',last_name,clan_nm).then(function(data) {
          $scope.result = data;
          if ($scope.result.status == 1) 
          {
            $scope.addNodeData.parentList = $scope.result.data;

            $state.go('app.ParentListBeforeAddingChild',{'nodeID':$stateParams.nodeID,'parentData':JSON.stringify($scope.addNodeData)});
          }
          else
          {
            $scope.addNodeData.parentList = "";
            $scope.doSignup($scope.addNodeData);
          }
        });
      }
    }
  };
 
  $scope.dateOnChange1= function() {
    var updtDate = $scope.addNodeData.dateTimeValuePassAway;
    var dateSt = new Date(updtDate);
    var currDate = new Date();

    var currentDateTime = $filter('date')(dateSt, "yyyy-MM-dd")
    if(updtDate)
    {
      document.getElementById('DeathDate').placeholder = $filter('date')(dateSt, "yyyy-MM-dd");
    }
    $scope.addNodeData.DeathDate = $filter('date')(dateSt, "yyyy-MM-dd");
  };

  $scope.dateOnChange = function() {
    var updtDate = $scope.addNodeData.dateTimeValue;
    var dateSt = new Date(updtDate);
    var currDate = new Date();
    var currentDateTime = $filter('date')(dateSt, "yyyy-MM-dd");
    //var currentDate = $filter('date')(currDate, "yyyy-MM-dd");

    if(updtDate)
    {
      document.getElementById('BirthDate').placeholder = $filter('date')(dateSt, "yyyy-MM-dd");
    }
    $scope.addNodeData.BirthDate = $filter('date')(dateSt, "yyyy-MM-dd");
  };
  
  $scope.showLoader();
  $commonFactory.selectCountry().then(function(data){
    $scope.result = data; 
    if($scope.result.status == 1){
      $scope.hideLoader();
      $scope.countryDataBirth = $scope.result.data;
      $scope.countryDataResidence = $scope.result.data;
    }else{
      $scope.hideLoader();
      $scope.showAlert($scope.result.msg);
    }
  });
   
  $scope.showLoader();
  $scope.getStateBirth = function(country){
    $commonFactory.selectState(country).then(function(data){
      $scope.countryidBirth = country;
      $scope.result = data; 

      if($scope.result.status == 1){
        $scope.hideLoader();
        $scope.stateDataBirth = $scope.result.data;
      }else{
        $scope.hideLoader();
        $scope.showAlert($scope.result.msg);
      }
    })
  }
  
  $scope.getCityBirth = function(state){
    $scope.showLoader();
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
      }else{
        $scope.hideLoader();
        $scope.showAlert($scope.result.msg);
      }
    })
  }

  $scope.getCityIDBirth = function(city_id){

    if(city_id == "0000")
        {
          $scope.form_city_textview_Enable = true;
        }
        else{
          $scope.form_city_textview_Enable = false;
        }

    $scope.cityidBirth = city_id;
  }
  
  $scope.getStateResidence = function(country){
    $scope.showLoader();
    $commonFactory.selectState(country).then(function(data){
      $scope.countryidResidence = country;
      $scope.result = data; 
      if($scope.result.status == 1){
        $scope.hideLoader();
        $scope.stateDataResidence = $scope.result.data;
      }else{
        $scope.hideLoader();
        $scope.showAlert($scope.result.msg);
      }
    })
  }
  
  $scope.getCityResidence = function(state){
    $scope.showLoader();
    $commonFactory.selectCity(state).then(function(data){
      $scope.stateidResidence = state;
      $scope.result = data; 

      if($scope.result.status == 1) {
        $scope.hideLoader();
        $scope.cityDataResidence = $scope.result.data;
        $scope.cityDataResidence.push({
          "city_id" : "0000",      
          "city" : $translate.instant('ADD_SELECT_CITY')//"Add your city"
        });
      } else {
        $scope.hideLoader();
        $scope.showAlert($scope.result.msg);
      }
    })
  }

  $scope.getCityIDResidence = function(city_id) {

    if(city_id == "0000")
        {
          $scope.form_city_res_textview_Enable = true;
        }
        else{
          $scope.form_city_res_textview_Enable = false;
        }

        

    $scope.cityidResidence = city_id;
  }

  $scope.openPaypal = function() {

    $payPalFactory.initPaymentUI().then(function() {

      $payPalFactory.makePayment(2, "Total Amount").then(function (data) {

        var paymentID = data.response.id;
        var paymentState = data.response.state;
        var paymentResponse_type = data.response_type;

        $scope.showLoader();
        $nodes.addNodePayment(paymentID,paymentState,paymentResponse_type).then(function(data,$ionicPopup)
       {
          $scope.result = data;
          if($scope.result.status == 1) {

            $scope.hideLoader();
            $nodes.addNodeAfterPayment($stateParams.nodeID,$scope.paymentData).then(function(data,$ionicPopup){

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


  $scope.image = null;

   $scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: $translate.instant(title),
      template: $translate.instant(msg),
      buttons: [{
        text: 'OK',
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
      if ($cordovaDevice.getPlatform() == 'Android' && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) 
      {
        window.FilePath.resolveNativePath(imagePath, function(entry) 
        {
          window.resolveLocalFileSystemURL(entry, success, fail);
          function fail(e) {
            console.error('Error: ', e);
          }

          function success(fileEntry) 
          {
            var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
            $cordovaFile.copyFile(namePath, fileEntry.name, cordova.file.dataDirectory, newFileName).then(function(success)
            {
              $scope.image = newFileName;
              $scope.addNodeData.profilepic = newFileName;
              $scope.uploadImage();
            }, function(error){
              $scope.showAlert('Error', error.exception);
            });
          };
        });
      } else {
        var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        // Move the file to permanent storage
        $cordovaFile.moveFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function(success)
        {
          $scope.image = newFileName;
          $scope.addNodeData.profilepic = newFileName;
          $scope.uploadImage();
        }, function(error){
          $scope.showAlert('Error', error.exception);
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
    // Destination URL
    var siteroot = $localstorage.get("siteroot");
    var url = siteroot+"uploads.php";
    
    // File for Upload
    var targetPath = $scope.pathForImage($scope.image);
   
    // File name only
    var filename = $scope.image;
   
    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'fileName': filename}
    };
   
    $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
      //$scope.showAlert('Success', 'Image upload finished.');
      //$scope.showSuccessAlert($scope.result.msg);
    });
   }
});

