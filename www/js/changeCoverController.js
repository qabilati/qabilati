angular.module('changeCoverController', [])

.controller('changeCoverCtrl', function($scope, $ionicModal, $timeout,$ionicPopup,$localstorage,$ionicLoading,$state,$filter,$cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $cordovaActionSheet,$changeCoverFactory,$stateParams,$translate,$ionicLoading,$commonFactory,$editTreeFactory,$nodes) {
	   
    var langCode = $localstorage.get("DEVICELANGUAGE");
    $localstorage.set("DEVICELANGUAGE",langCode);
    $translate.use(langCode);
    var deviceLanguage = navigator.language; 
    var language_code = (navigator.language).split("-")[0];
    $scope.changeCoverData = {};

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
            $state.go('app.FamilyMemberLifeStory',{'nodeID':$stateParams.nodeID,'activeTab':'b'});
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

    $scope.uploadCover = function() {
      if(!$scope.changeCoverData.CoverImage)
      {
        $scope.showAlert($translate.instant('EMPTY_CONSTANT'));
      }
      else
      {
        $scope.showLoader();
        $changeCoverFactory.changeCover($scope.changeCoverData,$stateParams.nodeID).then(function(data,$ionicPopup){
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

    $nodes.getNodeData($stateParams.nodeID).then(function(data,$ionicPopup) {
      $scope.result = data; //alert(JSON.stringify($scope.result.data));

      if($scope.result.status == 1)
      {
        $scope.imageNewPath =$scope.result.data.coverImage;
      }
      else
      {
        //$scope.imageNewPath = $scope.userNodeData.photo;
      }
  });

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
      targetWidth: $localstorage.get("deviceWidth"),
      targetHeight: 200,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation : true
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
              $scope.changeCoverData.CoverImage = newFileName;
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
          $scope.changeCoverData.CoverImage = newFileName;
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
