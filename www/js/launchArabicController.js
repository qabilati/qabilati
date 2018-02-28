angular.module('launchArabiccontroller', [])

.controller('launchArabicCtrl',function($scope, $ionicModal, $timeout,$howaboutUs,$ionicPopup,$localstorage,
  $state,$filter,$translate,$ionicLoading,$commonFactory, $ionicSlideBoxDelegate,$stateParams, $timeout,$window) 
  {
    var langCode = $localstorage.get("DEVICELANGUAGE");
    $localstorage.set("DEVICELANGUAGE",langCode);
    $translate.use(langCode);

    $nodeID = $localstorage.get("userNodeId");

    $scope.firstSlide = 'img/ar1.gif';

    var deviceLanguage = navigator.language; 
    var language_code = (navigator.language).split("-")[0];
    
    $scope.startApp = function() {
      var nodeID = $localstorage.get("userNodeId");
      if ($stateParams.redirectScreen == 'dashboard') 
      {
        $state.go('app.FamilyMemberLifeStory',{'nodeID':nodeID,'activeTab':'a'});
      }
      else
      {
        $state.go('app.howToUse');
      }
      
    };
    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };
    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };

    // Called each time the slide changes
    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
      
      if (index == 0) 
      {
        document.getElementById('slide-1').src='img/ar1.gif';
      }
      else if (index == 1) 
      {
        document.getElementById('slide-2').src='img/ar2.gif';
      }
      else if (index == 2) 
      {
        document.getElementById('slide-3').src='img/ar3.gif';
      }
      else if (index == 3) 
      {
        document.getElementById('slide-4').src='img/ar4.gif';
      }
      else if (index == 4) 
      {
        document.getElementById('slide-5').src='img/ar5.gif';
      }
    };    

    
});
