angular.module("searchScreenFactory",[])
.factory('$searchScreenFactory', ['$window','$http','$q','$localstorage', function($window,$http,$q,$localstorage) {
  return {

  	/*searchList : function(searchTab)
  	{
  		var deferred = $q.defer();
		var webserviceURL = $localstorage.get("webserviceURL");
		$http.get(webserviceURL+'?xAction=searchUser&treeID_fk='+treeID+'&userID_fk='+userID+'&nodeID_fk='+nodeID+'&searchStr='+searchTab)

		.success(function(data, status, headers,config){
			return deferred.resolve(data);
		})
		.error(function(data, status, headers,config){
			deferred.reject(data);
		});
		return deferred.promise;
	},*/

	getList : function(searchTab)
  	{
  		var deferred = $q.defer();
		var webserviceURL = $localstorage.get("webserviceURL");
		var userID = $localstorage.get("USERID");
		var treeID = $localstorage.get("TREEID");
		var nodeID = $localstorage.get("userNodeId");
		
		$http.get(webserviceURL+'?xAction=searchUserResult&treeID_fk='+treeID+'&userID_fk='+userID+'&nodeID_fk='+nodeID+'&searchStr='+searchTab)
		
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
