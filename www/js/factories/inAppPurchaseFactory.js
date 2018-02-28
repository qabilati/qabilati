angular.module("inAppPurchaseFactory",[])
.factory('$inAppPurchaseFactory', ['$window','$http','$q','$localstorage', function($window,$http,$q,$localstorage) {
	//var nodeID = $localstorage.get("userNodeId");															
	
  return {

		addPaymentData : function(userID,nodeID,treeID,productId,transactionId){
	  		var deferred = $q.defer();

	 		var webserviceURL = $localstorage.get("webserviceURL");

			$http.get(webserviceURL+'?xAction=addPaymentData&productId='+productId+
			'&nodeID='+nodeID+
			'&userID='+userID+
			'&treeID='+treeID+
			'&transactionId='+transactionId
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
