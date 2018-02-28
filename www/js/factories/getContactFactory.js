angular.module("getContactFactory",[])
.factory('$getContactFactory', ['$window','$http','$q','$localstorage', function($window,$http,$q,$localstorage) {
	return {

  	getContact : function(nodeID,redirectScreen){
  		var deferred = $q.defer();
		var webserviceURL = $localstorage.get("webserviceURL");
		var userID = $localstorage.get("USERID");
		var treeID = $localstorage.get("TREEID");

		$http.get(webserviceURL+'?xAction=getContactDetails&userID='+userID+'&treeID='+treeID+'&nodeID='+nodeID+'&redirectScreen='+redirectScreen)
		.success(function(data, status, headers,config){
			return deferred.resolve(data);
		})
		.error(function(data, status, headers,config){
			deferred.reject(data);
		});
		return deferred.promise;
	},

	getContactSearch : function(nodeID){
  		var deferred = $q.defer();
		var webserviceURL = $localstorage.get("webserviceURL");
		var userID = $localstorage.get("USERID");
		var treeID = $localstorage.get("TREEID");

		$http.get(webserviceURL+'?xAction=getContactSearch&userID='+userID+'&treeID='+treeID+'&nodeID='+nodeID)
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