angular.module("galleryFactory",[])
	.factory('$galleryFactory', ['$window','$http','$q','$localstorage', function($window,$http,$q,$localstorage) {
	  		var userID = $localstorage.get("USERID");
    		var treeID = $localstorage.get("TREEID");
  	return {
	  	addPhoto : function(galleryData,nodeID_fk)
	  	{
	  		var deferred = $q.defer();
	  		var webserviceURL = $localstorage.get("webserviceURL");
	  		$http.get(webserviceURL+'?xAction=addGalleryImage&photo='+galleryData.profilepic+
	  			'&title='+galleryData.title+
	  			'&date='+galleryData.Date+
	  			'&location='+galleryData.location+
	  			'&description='+galleryData.description+
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