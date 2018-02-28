angular.module("treeInviteFactory",[])
.factory('$treeInviteFactory', ['$window','$http','$q','$localstorage', function($window,$http,$q,$localstorage) {

	  		var userID = $localstorage.get("USERID");
    		var treeID = $localstorage.get("TREEID");
    		var nodeID = $localstorage.get("userNodeId");
																
  return {  
  		invite: function(treeData){

  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			$http.get(webserviceURL+'?xAction=addinvites&firstname='+treeData.firstname+
			'&lastname='+treeData.lastname+'&email='+treeData.email+
			'&treeID='+treeID+
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
