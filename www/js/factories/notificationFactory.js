angular.module("notificationFactory",[])
.factory('$notificationFactory', ['$window','$http','$q','$localstorage', function($window,$http,$q,$localstorage) {
  return {
	getNoti : function()
  	{
  		var deferred = $q.defer();
		var webserviceURL = $localstorage.get("webserviceURL");
		var userID = $localstorage.get("USERID");
		var treeID = $localstorage.get("TREEID");
		var nodeID = $localstorage.get("userNodeId");
		
		$http.get(webserviceURL+'?xAction=getNotificationData&treeID_fk='+treeID+'&userID_fk='+userID+'&nodeID_fk='+nodeID)

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
