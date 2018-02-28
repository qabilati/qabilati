angular.module("paymentFactory",[])
.factory('$paymentFactory', ['$window','$http','$q','$localstorage', function($window,$http,$q,$localstorage) {
  return {

  		payment: function(paymentData) {

  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			var userID = $localstorage.get("USERID");
    		var treeID = $localstorage.get("TREEID");
    		var userNodeId = $localstorage.get("userNodeId");
  			$http.get(webserviceURL+'?xAction=payment&nodeID='+paymentData.nodeID+
  				'&treeID='+treeID+
				'&userID='+userID+
				'&amount='+paymentData.Amount+
				'&paymentMode='+paymentData.paymentMode+
  				'&paymentID='+paymentData.paymentID+
  				'&paymentState='+paymentData.paymentState+
  				'&paymentResponse_type='+paymentData.paymentResponse_type+
  				'&paymentType='+paymentData.paymentType)

			.success(function(data, status, headers,config){
				return deferred.resolve(data);
			})
			.error(function(data, status, headers,config){
				deferred.reject(data);
			});
			return deferred.promise;
  		},

  		unlockPayment: function(paymentData) {

  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			var userID = $localstorage.get("USERID");
    		var treeID = $localstorage.get("TREEID");
    		var userNodeId = $localstorage.get("userNodeId");
  			$http.get(webserviceURL+'?xAction=unlockPayment&nodeID='+paymentData.nodeID+
  				'&treeID='+treeID+
				'&userID='+userID+
				'&amount='+paymentData.Amount+
				'&paymentMode='+paymentData.paymentMode+
  				'&paymentID='+paymentData.paymentID+
  				'&paymentState='+paymentData.paymentState+
  				'&paymentResponse_type='+paymentData.paymentResponse_type+
  				'&paymentType='+paymentData.paymentType)

			.success(function(data, status, headers,config){
				return deferred.resolve(data);
			})
			.error(function(data, status, headers,config){
				deferred.reject(data);
			});
			return deferred.promise;
  		},

  		unlockPaymentInApp : function(userID,nodeID,treeID,productId,transactionId,redirectScreen){
	  		var deferred = $q.defer();
	 		var webserviceURL = $localstorage.get("webserviceURL");
	 		var userID = $localstorage.get("USERID");
    		var treeID = $localstorage.get("TREEID");
    		var userNodeId = $localstorage.get("userNodeId");

			$http.get(webserviceURL+'?xAction=unlockPaymentInApp&productId='+productId+
			'&nodeID='+nodeID+
			'&userID='+userID+
			'&treeID='+treeID+
			'&transactionId='+transactionId+
			'&redirectScreen='+redirectScreen
			)

			.success(function(data, status, headers,config){
				return deferred.resolve(data);
			})
			.error(function(data, status, headers,config){
				deferred.reject(data);
			});
			return deferred.promise;
		}
  	}
}])


