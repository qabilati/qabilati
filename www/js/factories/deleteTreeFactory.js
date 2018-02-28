angular.module("deleteTreeFactory",[])
.factory('$deleteTreeFactory', ['$window','$http','$q','$localstorage', function($window,$http,$q,$localstorage) {
	//var nodeID = $localstorage.get("userNodeId");															
  return {

  	deleteNode : function(nodeID)
  	{
  		//alert(nodeID);
  		var deferred = $q.defer();
		var webserviceURL = $localstorage.get("webserviceURL");
		$http.get(webserviceURL+'?xAction=deletenode&nodeID='+nodeID)

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
