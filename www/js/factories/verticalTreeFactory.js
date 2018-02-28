angular.module("verticalTreeFactory",[])
.factory('$verticalTreeFactory', ['$window','$http','$q','$localstorage', function($window,$http,$q,$localstorage) {
																
  return {

  		getTree: function(nodeID){
  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceTreeURL");
			var userID = $localstorage.get("USERID");
    		var treeID = $localstorage.get("TREEID");
			
			$http.get(webserviceURL+'?xAction=viewTree&treeID='+treeID+'&userID='+userID+'&nodeID='+nodeID)

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


