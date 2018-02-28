angular.module('editTreecontroller', [])

  .controller('editTreeCtrl',function($scope, $ionicModal, $timeout,$ionicPopup,$localstorage,$state,$filter,$editTreeFactory,$cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $cordovaActionSheet,$stateParams,$timeout,$translate,$ionicLoading,$commonFactory) 
  {
    var nodeID = $stateParams.nodeID;
    var birthCity_web ="";
    var residenceCity_web="";
    $scope.editNodeData = {};
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


    $editTreeFactory.getNodeData($stateParams.nodeID).then(function(data,$ionicPopup)
    {
      $scope.result = data; //alert(JSON.stringify($scope.result.data));

      if($scope.result.status == 1)
      {
        birthCity_web = $scope.result.data.birthCity;
        residenceCity_web = $scope.result.data.residenceCity;
        //alert("hii");
        //$scope.editNodeData = $scope.result.data;
        $scope.editNodeData =
        {
          firstname: $scope.result.data.firstName,
          lastname:$scope.result.data.lastName,
          clan:$scope.result.data.clan,
          fathername:$scope.result.data.fatherName,
          mothername:$scope.result.data.motherName,
          spousename:$scope.result.data.spouseName,
          postalAddress:$scope.result.data.address,
          BirthDate:$scope.result.data.birthDate,
          placeOfBirth:$scope.result.data.birthPlace,
          placeofResidence:$scope.result.data.residence,
          living:$scope.result.data.isLeaving,
          DeathDate : $scope.result.data.deathDate,
          profilepic : $scope.result.data.photo,
          gender:$scope.result.data.gender,
          country : $scope.result.data.country,
          state : $scope.result.data.state,
          city : $scope.result.data.city,

          countryBirth : $scope.result.data.birthCountry,
          stateBirth : $scope.result.data.birthState,
          cityBirth : $scope.result.data.birthCity,

          countryResidence : $scope.result.data.residenceCountry,
          stateResidence : $scope.result.data.residenceState,
          cityResidence : $scope.result.data.residenceCity
        }

        $scope.countryid = $scope.result.data.country;      
        $scope.stateid = $scope.result.data.state;
        $scope.cityid = $scope.result.data.city;
 
        $scope.countryidBirth = $scope.result.data.birthCountry;
        $scope.stateidBirth = $scope.result.data.birthState;
        $scope.cityidBirth = $scope.result.data.birthCity;

        $scope.countryidResidence = $scope.result.data.residenceCountry;
        $scope.stateidResidence = $scope.result.data.residenceState;
        $scope.cityidResidence = $scope.result.data.residenceCity;

        $scope.stateData = $scope.result.data.allstate;
        $scope.cityData = $scope.result.data.allcity; 

        $scope.stateDataBirth = $scope.result.data.allbirthstate;
        $scope.cityDataBirth = $scope.result.data.allbirthcity; 

        $scope.stateDataResidence = $scope.result.data.allresidencestate;
        $scope.cityDataResidence = $scope.result.data.allresidencecity;
		    var profileImgURL = $localstorage.get("profileImgURL"); 
        $scope.imgPath = profileImgURL+"/"+$scope.result.data.photo;

    /* alert($scope.result.data.photo);

          $scope.imgPath = $scope.result.data.photo;
          alert($scope.imgPath);*/
    }
    else
    {
      $scope.showAlert($scope.result.msg);
    }
  });
  
  $scope.cancelbtn = function(){
        $state.go('app.FamilyMemberLifeStory',{'nodeID':$stateParams.nodeID,'activeTab':'a'})
  }

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
        },{ text: $translate.instant('CANCEL_CONSTANT'),  type: 'button-positive',onTap: function(e) { return true; } }]
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
          $state.go('app.FamilyMemberLifeStory',{'nodeID':nodeID});
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

  $scope.doEditNode = function() {
    if(!$scope.editNodeData.firstname || !$scope.editNodeData.lastname)
    {
      $scope.showAlert($translate.instant('EMPTY_CONSTANT'));
    } else
    {
      $scope.showLoader();

//alert($scope.result.data.city+"--------->"+$scope.editNodeData.cityname+"---->"+birthCity_web);
      if($scope.result.data.city=="0000" || $scope.result.data.city=="0")
        {
          if($scope.editNodeData.cityname=="0000")
          {
              $scope.cityidBirth = birthCity_web;//$scope.editNodeData.cityBirth;
          }
          else
          {
              $scope.cityidBirth = $scope.editNodeData.cityname;
          }
        }
        else
        {
          $scope.cityidBirth = $scope.cityidBirth;
        }


      if($scope.result.data.residenceCity=="0000" || $scope.result.data.residenceCity=="0")
        {
          if($scope.editNodeData.cityresname=="0000")
          {
                $scope.cityidResidence = residenceCity_web;//$scope.editNodeData.cityResidence;
          }
          else
          {
               $scope.cityidResidence = $scope.editNodeData.cityresname;
          }
        }
        else
        {
          $scope.cityidResidence = $scope.cityidResidence;
        }

      $editTreeFactory.addNodeData($scope.editNodeData,nodeID,$scope.countryid,$scope.stateid,$scope.cityid,$scope.countryidBirth,$scope.stateidBirth,$scope.cityidBirth,$scope.countryidResidence,$scope.stateidResidence,$scope.cityidResidence).then(function(data,$ionicPopup) {
        $scope.result = data;
        //alert($scope.result.status);
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
    }else{
      $scope.hideLoader();
      $scope.showAlert($scope.result.msg);
    }
  })

  $scope.showLoader();
  $scope.getStateBirth = function(countryBirth){
    $commonFactory.selectState(countryBirth).then(function(data){
      $scope.countryidBirth = countryBirth;
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

  $scope.showLoader();
  $scope.getCityBirth = function(stateBirth){
    $commonFactory.selectCity(stateBirth).then(function(data){
      $scope.stateidBirth = stateBirth;
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

  $scope.getCityIDBirth = function(cityBirth){

    if(cityBirth == "0000")
        {
          $scope.editcity_textview_Enable = true;
        }
        else{
          $scope.editcity_textview_Enable = false;
        }

    $scope.cityidBirth = cityBirth;

  }

  $scope.showLoader();
  $scope.getStateResidence = function(countryResidence){
    $commonFactory.selectState(countryResidence).then(function(data){
      $scope.countryidResidence = countryResidence;
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

  $scope.showLoader();
  $scope.getCityResidence = function(stateResidence){
    $commonFactory.selectCity(stateResidence).then(function(data){
      $scope.stateidResidence = stateResidence;
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

  $scope.getCityIDResidence = function(cityResidence){
    if(cityResidence == "0000")
        {
          $scope.editcity_res_textview_Enable = true;
        }
        else{
          $scope.editcity_res_textview_Enable = false;
        } 

    $scope.cityidResidence = cityResidence;
  }


  $scope.dateOnChange = function(){
    var updtDate = $scope.editNodeData.dateTimeValue;
    var dateSt = new Date(updtDate);
    var currDate = new Date();
    var currentDateTime = $filter('date')(dateSt, "yyyy-MM-dd")
    if(updtDate)
    {
      document.getElementById('BirthDate').placeholder = $filter('date')(dateSt, "yyyy-MM-dd");
    }
    $scope.editNodeData.BirthDate = $filter('date')(dateSt, "yyyy-MM-dd");
  };

  $scope.dateOnChange1 = function(){
    var updtDate = $scope.editNodeData.DeathDate;
    var dateSt = new Date(updtDate);
    var currDate = new Date();

    var currentDateTime = $filter('date')(dateSt, "yyyy-MM-dd")
    if(updtDate)
    {
      document.getElementById('DeathDate').placeholder = $filter('date')(dateSt, "yyyy-MM-dd");
    }
    $scope.editNodeData.DeathDate = $filter('date')(dateSt, "yyyy-MM-dd");
  }

   $scope.image = null;
   //$scope.imgPath = null;
   
   $scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: $translate.instant(title),
      template: $translate.instant(msg),
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
      $scope.imgPath = imagePath;

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
              $scope.imgPath = fileEntry.nativeURL;
              $scope.image = newFileName;
              $scope.editNodeData.profilepic = newFileName;
              //$scope.uploadImage();
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
          $scope.imgPath = imagePath;
          $scope.image = newFileName;
          $scope.editNodeData.profilepic = newFileName;
          //$scope.uploadImage();
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
    });
  }
});