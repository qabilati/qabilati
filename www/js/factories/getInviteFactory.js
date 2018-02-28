angular.module("getInviteFactory",[])
.factory('$getInviteFactory', ['$window','$http','$q','$localstorage', function($window,$http,$q,$localstorage) {
	
	return {  

		getInvitePeople: function()
		{
			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			var userID = $localstorage.get("USERID");
			var treeID = $localstorage.get("TREEID");
			var nodeID = $localstorage.get("userNodeId");
			$http.get(webserviceURL+'?xAction=getinvites&treeID='+treeID+
				'&nodeID='+nodeID+
				'&userID='+userID)

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
