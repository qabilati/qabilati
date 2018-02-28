angular.module("changeCoverFactory",[])
	.factory('$changeCoverFactory', ['$window','$http','$q','$localstorage', function($window,$http,$q,$localstorage) {
	  		
  	return {
	  	changeCover : function(changeCoverData,nodeID_fk)
	  	{
	  		var deferred = $q.defer();
	  		var webserviceURL = $localstorage.get("webserviceURL");
	  		var userID = $localstorage.get("USERID");
    		var treeID = $localstorage.get("TREEID");

	  		$http.get(webserviceURL+'?xAction=CoverImage&CoverImage='+changeCoverData.CoverImage+
	  			'&treeID_fk='+treeID+
	  			'&userID_fk='+userID+
	  			'&nodeID_fk='+nodeID_fk)

			.success(function(data, status, headers,config){
				return deferred.resolve(data);
			})
			.error(function(data, status, headers,config){
				deferred.reject(data);
			});
			return deferred.promise;
  		},

  		getPhoto : function(nodeID){
  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			var userID = $localstorage.get("USERID");
    		var treeID = $localstorage.get("TREEID");

			$http.get(webserviceURL+'?xAction=getGalleryImage&treeID_fk='+treeID+'&userID_fk='+userID+'&nodeID_fk='+nodeID)

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