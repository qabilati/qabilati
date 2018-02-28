angular.module("becomeAdminFactory",[])
.factory('$becomeAdminFactory', ['$window','$http','$q','$localstorage', function($window,$http,$q,$localstorage) {

	var userID = $localstorage.get("USERID");
	var treeID = $localstorage.get("TREEID");
	
	 var nodeID = $localstorage.get("userNodeId");
	
	return {  

		getAdminData: function(){
			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			$http.get(webserviceURL+'?xAction=getAdminData&treeID='+treeID+
				'&nodeID='+nodeID+
				'&userID='+userID)

			.success(function(data, status, headers,config){
				return deferred.resolve(data);
			})
			.error(function(data, status, headers,config){
				deferred.reject(data);
			});
			return deferred.promise;
		},

		UpdateAdmin: function(paymentID,paymentState,paymentResponse_type,paymentAmount){
			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			$http.get(webserviceURL+'?xAction=updateAdmin&treeID='+treeID+
				'&nodeID='+nodeID+
				'&userID='+userID+
				'&amount='+paymentAmount+
				'&paymentMode='+"paypal"+
				'&paymentID='+paymentID+
				'&paymentState='+paymentState+
				'&paymentResponse_type='+paymentResponse_type+
				'&paymentType='+"becomeAdmin")

			/*alert(webserviceURL+'?xAction=updateAdmin&treeID='+treeID+
				'&nodeID='+nodeID+
				'&userID='+userID+
				'&amount='+paymentAmount+
				'&paymentMode='+"paypal"+
				'&tranID='+tranID+
				'&paymentID='+paymentID+
				'&paymentState='+paymentState+
				'&paymentResponse_type='+paymentResponse_type+
				'&paymentType='+"becomeAdmin")*/

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
