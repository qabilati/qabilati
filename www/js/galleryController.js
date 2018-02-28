angular.module('galleryController', [])

.controller('galleryCtrl', function($scope, $ionicModal, $timeout,$ionicPopup,$localstorage,$ionicLoading,$state,$filter,$cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $cordovaActionSheet,$galleryFactory,$stateParams,$translate,$ionicLoading,$commonFactory) {
	   
    var langCode = $localstorage.get("DEVICELANGUAGE");
    $localstorage.set("DEVICELANGUAGE",langCode);
    $translate.use(langCode);
    var deviceLanguage = navigator.language; 
    var language_code = (navigator.language).split("-")[0];
    $scope.galleryData = {};
    $scope.imageNewPath = "";
	
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

    $scope.SuccessAlert = function(msg) {
      var alertPopup = $ionicPopup.alert({
        title: $translate.instant('SUCCESS_CONTANT'),
        template: $translate.instant(msg),
        buttons: [{
          text: $translate.instant('OK_CONSTANT'),
          type: 'button-positive',
          onTap: function(e) {
            $state.go('app.FamilyMemberLifeStory',{'nodeID':$stateParams.nodeID,'activeTab':$stateParams.activeTab});
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


    $scope.dateOnChange = function() {
      var updtDate = $scope.galleryData.Date;
      var dateSt = new Date(updtDate);
      var currDate = new Date();
      var currentDateTime = $filter('date')(dateSt, "yyyy-MM-dd")
      if(updtDate)
      {
        document.getElementById('Date').placeholder = $filter('date')(dateSt, "yyyy-MM-dd");
      }
      $scope.galleryData.Date = $filter('date')(dateSt, "yyyy-MM-dd");
    }

    $scope.doGalleryImageUpload = function() {
      if(!$scope.galleryData.profilepic)
      {
        $scope.showAlert($translate.instant('EMPTY_CONSTANT'));
      }
      else
      {
        $scope.showLoader();
        $galleryFactory.addPhoto($scope.galleryData,$stateParams.nodeID).then(function(data,$ionicPopup){
          $scope.result = data;
          if($scope.result.status == 1)
          {
             $scope.hideLoader();
            $scope.SuccessAlert($scope.result.msg);
          } else {
             $scope.hideLoader();
            $scope.showAlert($scope.result.msg);
          }
        });
      }
    };

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
      saveToPhotoAlbum: true
    };
   
    $cordovaCamera.getPicture(options).then(function(imagePath) {
      // Grab the file name of the photo in the temporary directory
      var currentName = imagePath.replace(/^.*[\\\/]/, '');
      // $scope.imageNewPath = cordova.file.dataDirectory;
       $scope.imageNewPath = imagePath;
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
              $scope.imageNewPath = fileEntry.nativeURL;
              $scope.image = newFileName;
              $scope.galleryData.profilepic = newFileName;
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
          $scope.imageNewPath = imagePath;
          $scope.image = newFileName;
          $scope.galleryData.profilepic = newFileName;
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
})

.controller('editGalleryCtrl', function($scope, $ionicModal, $timeout,$ionicPopup,$localstorage,$ionicLoading,$state,$filter,$cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $cordovaActionSheet,$galleryFactory,$stateParams,$translate,$ionicLoading) 
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

      $scope.editGalleryData = {};

      $scope.editGalleryData.galleryID = $stateParams.galleryID;
      $scope.editGalleryData.profilepic = $stateParams.photo;
      $scope.editGalleryData.title = $stateParams.title;
      $scope.editGalleryData.Date = $stateParams.photoDate;
      $scope.editGalleryData.location = $stateParams.location;
      $scope.editGalleryData.description = $stateParams.description;
      var nodeID_fk = $stateParams.nodeID_fk;
	  
  $scope.showLoader();  
	  $scope.home = function(){
       $scope.hideLoader();
			 $state.go('app.FamilyMemberLifeStory',{'nodeID':$stateParams.nodeID_fk,'activeTab':'c'});  
	}

});
