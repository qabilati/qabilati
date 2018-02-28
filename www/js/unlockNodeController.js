angular.module('unlockNodeController', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('unlockNodeCtrl',function($scope, $ionicPlatform, $ionicModal, $ionicLoading, $ionicPopup, $localstorage, $stateParams, $cordovaActionSheet, $timeout, $state, $filter, $translate, $getContactFactory, $payPalFactory, $login, $paymentFactory, $inAppPurchaseFactory,$commonFactory) 
{
  $scope.paymentData = {};
  $scope.getContactData = {};
  $scope.payType = $stateParams.payType;

  var productIds = ['bundle.1','bundle.2','bundle.3','bundle.4']; // <- Add your product Ids here

  var spinner = '<ion-spinner icon="dots" class="spinner-stable"></ion-spinner><br/>';

  var userNodeId = $localstorage.get("userNodeId");
  var USERID = $localstorage.get("USERID");
  var TREEID = $localstorage.get("TREEID");
  var trans_id;
  var nodeID = $stateParams.nodeID;

  $scope.loadImage = function() {
    var options = {
      title: $translate.instant('SELECT_PAYMENT_METHOD'),
      buttonLabels: [$translate.instant('SELECT_PAYPAL'),$translate.instant('SELECT_InApp')],
      addCancelButtonWithLabel: $translate.instant('CANCEL_CONSTANT'),
      androidEnableCancelButton : true,
    };
    $cordovaActionSheet.show(options).then(function(btnIndex) {
      var type = null;
      if (btnIndex === 1 || btnIndex === 2) {

        $state.go('app.unlockNodeForm',{'payType':btnIndex,'nodeID':$stateParams.nodeID,'redirectScreen':$stateParams.redirectScreen});
      } 
      if (type !== null) {
        alert("Select Payment Option");
      }
    });
  };

  $ionicLoading.show({ template: spinner + 'Loading Products...' });
  inAppPurchase
  .getProducts(productIds)
  .then(function (products) {
    $ionicLoading.hide();
    $scope.products = products;
  })
  .catch(function (err) {
    $ionicLoading.hide();
    console.log(err);
  });

  $scope.loadProducts = function () {
    //alert("Load products");
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

  $scope.buy = function (productId) 
  {
    $ionicLoading.show({ template: spinner + 'Purchasing...' });
    inAppPurchase
    .buy(productId)
    .then(function (data) {
      console.log(JSON.stringify(data));
      console.log('consuming transactionId: ' + data.transactionId);
      trans_id = data.transactionId;
      return inAppPurchase.consume(data.type, data.receipt, data.signature);
    })
    .then(function () {
      $paymentFactory.unlockPaymentInApp(USERID,$stateParams.nodeID,TREEID,productId,trans_id,$stateParams.redirectScreen).then(function(data,$ionicPopup) {
        $scope.result = data;
        if($scope.result.status == 1) 
        {
          if ($stateParams.redirectScreen == 'viewTree') 
          {
            $state.go('app.tree',{'nodeID':$stateParams.nodeID});
          }
          else if ($stateParams.redirectScreen == 'changeCover')
          {
            $state.go('app.changeCover',{'nodeID':$stateParams.nodeID});
          }
          else if($stateParams.redirectScreen == 'editNode')
          {
            $state.go('app.editTreeNode',{'nodeID':$stateParams.nodeID});
          }
          else if($stateParams.redirectScreen == 'getContact')
          {
             $state.go('contacts',{'nodeID':$stateParams.nodeID,'userData':JSON.stringify($scope.result.data),'redirectScreen':'Other'});
          }
        }
        else
        {
          $scope.hideLoader();
          $scope.showAlert($scope.result.msg);
        } 
      });
      var alertPopup = $ionicPopup.alert({
        title: 'Purchase was successful!',
        template: 'Check your mail for the transaction data'
      });
      console.log('consume done!');
      $ionicLoading.hide();
    })
    .catch(function (err) {
      $ionicLoading.hide();
      console.log(err);
      $ionicPopup.alert({
        title: 'Something went wrong',
        template: 'Error occures'
      });
    });
  };

  $scope.doPayment = function(amount) {

    $payPalFactory.initPaymentUI().then(function() {

      $payPalFactory.makePayment(amount, "Total Amount").then(function (data) {

        $scope.paymentData.paymentID = data.response.id;
        $scope.paymentData.paymentState = data.response.state;
        $scope.paymentData.paymentResponse_type = data.response_type;
        $scope.paymentData.nodeID = $stateParams.nodeID;
        $scope.paymentData.Amount = amount;
        $scope.paymentData.paymentMode = 'paypal';
        $scope.paymentData.paymentType = 'unlockNode';
        $scope.paymentData.redirectScreen = $stateParams.redirectScreen;

        $scope.showLoader();
        $paymentFactory.unlockPayment($scope.paymentData).then(function(data,$ionicPopup) {

          $scope.result = data;
          if($scope.result.status == 1) 
          {
            $scope.hideLoader();
            if ($stateParams.redirectScreen == 'viewTree') 
            {
              $state.go('app.tree',{'nodeID':$stateParams.nodeID});
            }
            else if ($stateParams.redirectScreen == 'changeCover')
            {
              $state.go('app.changeCover',{'nodeID':$stateParams.nodeID});
            }
            else if($stateParams.redirectScreen == 'editNode')
            {
              $state.go('app.editTreeNode',{'nodeID':$stateParams.nodeID});
            }
            else if($stateParams.redirectScreen == 'getContact')
            {
               $state.go('contacts',{'nodeID':$stateParams.nodeID,'userData':JSON.stringify($scope.result.data),'redirectScreen':'Other'});
            }
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
  };

  $scope.restore = function () {
    $ionicLoading.show({ template: spinner + 'Restoring Purchases...' });
    inAppPurchase
      .restorePurchases()
      .then(function (purchases) {
        $ionicLoading.hide();
        console.log(JSON.stringify(purchases));
        $ionicPopup.alert({
          title: 'Restore was successful!',
          template: 'Check your console log for the restored purchases data'
        });
      })
      .catch(function (err) {
        $ionicLoading.hide();
        console.log(err);
        $ionicPopup.alert({
          title: 'Something went wrong',
          template: 'Error occures'
        });
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
