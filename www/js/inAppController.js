angular.module('inAppController', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('inAppCtrl',function($scope, $ionicPlatform, $ionicModal, $ionicLoading, $ionicPopup, $localstorage, $stateParams, $cordovaActionSheet, $timeout, $state, $filter, $translate, $getContactFactory, $payPalFactory, $login, $paymentFactory, $inAppPurchaseFactory,$commonFactory) 
{
  $scope.paymentData = {};
  $scope.getContactData = {};
  $scope.payType = $stateParams.payType;

  var redirectScreen = $stateParams.redirectScreen;

  var productIds = ['bundle.1','bundle.2','bundle.3','bundle.4']; // <- Add your product Ids here

  var spinner = '<ion-spinner icon="dots" class="spinner-stable"></ion-spinner><br/>';

  var userNodeId = $localstorage.get("userNodeId");
  var USERID = $localstorage.get("USERID");
  var TREEID = $localstorage.get("TREEID");
  var trans_id;
  var nodeID = $stateParams.nodeID;

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

  $scope.buy = function (productId) {

    $ionicLoading.show({ template: spinner + 'Purchasing...' });
    inAppPurchase
      .buy(productId)
      .then(function (data) {
        //alert(JSON.stringify(data));
        console.log(JSON.stringify(data));
        console.log('consuming transactionId: ' + data.transactionId);
        trans_id = data.transactionId;
        return inAppPurchase.consume(data.type, data.receipt, data.signature);
      })
      .then(function () {

//alert("Hii");
        //-------------------------------------------------------------------------
        $inAppPurchaseFactory.addPaymentData(USERID,userNodeId,TREEID,productId,trans_id).then(function(data,$ionicPopup) {
        $scope.result = data;
        if($scope.result.status == 1) 
        {
          $scope.hideLoader();
          $getContactFactory.getContact($stateParams.nodeID,redirectScreen).then(function(data,$ionicPopup) {

            $scope.result = data;
            if($scope.result.status == 1) 
            {
              $state.go('contacts',{'nodeID':$stateParams.nodeID,'userData':JSON.stringify($scope.result.data),'redirectScreen':redirectScreen
                })
            }
            else
            {
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
        //---------------------------------------------------------------------------
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
        $scope.paymentData.paymentType = 'getContact';

        $scope.showLoader();
        $paymentFactory.payment($scope.paymentData).then(function(data,$ionicPopup) {

          $scope.result = data;
          if($scope.result.status == 1) 
          {
            $scope.hideLoader();
            $getContactFactory.getContact($stateParams.nodeID,redirectScreen).then(function(data,$ionicPopup) {

              $scope.result = data;
              if($scope.result.status == 1) 
              {
                $state.go('contacts',{'nodeID':$stateParams.nodeID,'userData':JSON.stringify($scope.result.data),'redirectScreen':redirectScreen
                  })
              }
              else
              {
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
