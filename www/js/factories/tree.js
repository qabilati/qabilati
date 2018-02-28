angular.module("treeFactory",[])
.factory('$treeFactory', ['$window','$http','$q','$localstorage', function($window,$http,$q,$localstorage) {
																
  return {

  		getTree: function(nodeID){

  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			var userID = $localstorage.get("USERID");
    		var treeID = $localstorage.get("TREEID");
			
			$http.get(webserviceURL+'?xAction=getTree&treeID='+treeID+'&userID='+userID+'&nodeID='+nodeID)

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


