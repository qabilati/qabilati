angular.module('checkParentController', [])

.controller('checkParentController', function($scope, $ionicModal, $nodes, $timeout,$ionicPopup,$localstorage,$ionicLoading,$state,$filter,$cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $cordovaActionSheet,$stateParams,$translate,$ionicLoading,$payPalFactory) {

  $scope.addNodeData = {};
  $scope.addNode1 = $scope.addNodeData;
  var nodeID = $stateParams.nodeID;
  var tabActiveEvent = $stateParams.activeTab;
  var langCode = $localstorage.get("DEVICELANGUAGE");
  $localstorage.set("DEVICELANGUAGE",langCode);
  $translate.use(langCode); 
  var deviceLanguage = navigator.language; 
  var language_code = (navigator.language).split("-")[0];
  var relation = $localstorage.get("relation");
  $scope.lastName = $localstorage.get("lastName");
  $scope.parentListData =JSON.parse($stateParams.parentListData);
  var listData = "";
  
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
  
  $scope.doAddNode = function()
  {
        $scope.showLoader();  
        $nodes.AddNode($scope.addNodeData,nodeID,$scope.countryid,$scope.stateid,$scope.cityid,$scope.countryidBirth,$scope.stateidBirth,$scope.cityidBirth,$scope.countryidResidence,$scope.stateidResidence,$scope.cityidResidence).then(function(data,$ionicPopup) {
        $scope.result = data;
        if($scope.result.status == 1) {
          $scope.hideLoader();
          $scope.showSuccessAlert($scope.result.msg);
        }
        else if($scope.result.status == 2){
          $scope.hideLoader();
          $scope.showPaymentAlert($scope.result.msg);
        }
        else{
           $scope.hideLoader();
          $scope.showAlert($scope.result.msg);
        } 
      });
  };
 
  $scope.dateOnChange1= function(){
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

  $scope.dateOnChange = function(){
    var updtDate = $scope.addNodeData.dateTimeValue;
    var dateSt = new Date(updtDate);
    var currDate = new Date();

    var currentDateTime = $filter('date')(dateSt, "yyyy-MM-dd")
    if(updtDate)
    {
      document.getElementById('BirthDate').placeholder = $filter('date')(dateSt, "yyyy-MM-dd");
    }
    $scope.addNodeData.BirthDate = $filter('date')(dateSt, "yyyy-MM-dd");
  };

  $scope.showLoader();
   $nodes.selectCountry().then(function(data){
        $scope.result = data; 

        if($scope.result.status == 1){
          $scope.hideLoader();
          $scope.countryData = $scope.result.data;
        }else{
          $scope.hideLoader();
          $scope.showAlert($scope.result.msg);
        }
     });

  $scope.showLoader();  
      $scope.getState = function(country){
        $nodes.selectState(country).then(function(data){
        $scope.countryid = country;
        $scope.result = data; 

        if($scope.result.status == 1){
          $scope.hideLoader();
          $scope.stateData = $scope.result.data;
        }else{
          $scope.hideLoader();
          $scope.showAlert($scope.result.msg);
        }
     })
      }

   $scope.showLoader();
       $scope.getCity = function(state){
        $nodes.selectCity(state).then(function(data){
        $scope.stateid= state;
        $scope.result = data; 

        if($scope.result.status == 1){
          $scope.hideLoader();
          $scope.cityData = $scope.result.data;
        }else{
          $scope.hideLoader();
          $scope.showAlert($scope.result.msg);
        }
     })
      }

       $scope.getCityID = function(city_id){
        $scope.cityid= city_id;
      }

     $scope.showLoader();
      $nodes.selectCountry().then(function(data){
        $scope.result = data; 
        if($scope.result.status == 1){
          $scope.hideLoader();
          $scope.countryDataBirth = $scope.result.data;
        }else{
          $scope.hideLoader();
          $scope.showAlert($scope.result.msg);
        }
     })

   $scope.showLoader();
      $scope.getStateBirth = function(country){
        $nodes.selectState(country).then(function(data){
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

  $scope.showLoader();
       $scope.getCityBirth = function(state){
        $nodes.selectCity(state).then(function(data){
        $scope.stateidBirth = state;
        $scope.result = data; 

        if($scope.result.status == 1){
          $scope.hideLoader();
          $scope.cityDataBirth = $scope.result.data;
        }else{
          $scope.hideLoader();
          $scope.showAlert($scope.result.msg);
        }
     })
      }

      $scope.getCityIDBirth = function(city_id){
        $scope.cityidBirth = city_id;
      }

  $scope.showLoader();
       $nodes.selectCountry().then(function(data){
        $scope.result = data; 

        if($scope.result.status == 1){
          $scope.hideLoader();
          $scope.countryDataResidence = $scope.result.data;
        }else{
          $scope.hideLoader();
          $scope.showAlert($scope.result.msg);
        }
     })

  $scope.showLoader();
      $scope.getStateResidence = function(country){
        $nodes.selectState(country).then(function(data){
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

  $scope.showLoader();
       $scope.getCityResidence = function(state){
        $nodes.selectCity(state).then(function(data){
        $scope.stateidResidence = state;
        $scope.result = data; 

        if($scope.result.status == 1){
          $scope.hideLoader();
          $scope.cityDataResidence = $scope.result.data;
        }else{
          $scope.hideLoader();
          $scope.showAlert($scope.result.msg);
        }
     })
      }

      $scope.getCityIDResidence = function(city_id){
        $scope.cityidResidence = city_id;
      }

        $scope.openPaypal = function(){
        $payPalFactory.initPaymentUI().then(function () 
          {
            $payPalFactory.makePayment(1, "Total Amount").then(function (data) 
            {
        $scope.showLoader();
              $nodes.AddNode($scope.addNode1,nodeID,$scope.countryid,$scope.stateid,$scope.cityid,$scope.countryidBirth,$scope.stateidBirth,$scope.cityidBirth,$scope.countryidResidence,$scope.stateidResidence,$scope.cityidResidence).then(function(data,$ionicPopup) {
              $scope.result = data;
              if($scope.result.status == 1) {
                  $scope.hideLoader();
                  $scope.showSuccessAlert($scope.result.msg);
              }
              else{
                  $scope.hideLoader();
                  $scope.showAlert($scope.result.msg);
              } 
            });
              /*$scope.showSuccessAlert($scope.result.msg);

              var paymentID = data.response.id;
              var paymentState = data.response.state;
              var paymentResponse_type = data.response_type;*/

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

