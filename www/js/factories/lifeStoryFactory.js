angular.module("lifestory",[])
.factory('$lifestory', ['$window','$http','$q','$localstorage', function($window,$http,$q,$localstorage) {
																
  return {
	    
  		addStory: function(storyData,nodeID_fk){
  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			var userID = $localstorage.get("USERID");
    		var treeID = $localstorage.get("TREEID");
			
			$http.get(webserviceURL+'?xAction=addLifeStory&title='+storyData.title+
			'&description='+storyData.description+
			'&location='+storyData.location+
			'&stodyDate='+storyData.stodyDate+
			'&treeID_fk='+treeID+
			'&nodeID_fk='+nodeID_fk+
			'&userID_fk='+userID)

			.success(function(data, status, headers,config){
				return deferred.resolve(data);
			})
			.error(function(data, status, headers,config){
				deferred.reject(data);
			});
			return deferred.promise;
  		},

  		getStory: function(nodeID_fk){
  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			var userID = $localstorage.get("USERID");
    		var treeID = $localstorage.get("TREEID");
			
			$http.get(webserviceURL+'?xAction=getLifeStory&treeID='+treeID+'&userID='+userID+'&nodeID_fk='+nodeID_fk)

			.success(function(data, status, headers,config){
				return deferred.resolve(data);
			})
			.error(function(data, status, headers,config){
				deferred.reject(data);
			});
			return deferred.promise;
  		},

  		editStory: function(editProfileData,nodeID_fk){
  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			var userID = $localstorage.get("USERID");
    		var treeID = $localstorage.get("TREEID");
			
			$http.get(webserviceURL+'?xAction=editStory&title='+editProfileData.title+
			'&description='+editProfileData.description+
			'&location='+editProfileData.location+
			'&stodyDate='+editProfileData.stodyDate+
			'&treeID_fk='+treeID+
			'&lsID='+editProfileData.lsID+
			'&nodeID_fk='+nodeID_fk+
			'&userID_fk='+userID)

			.success(function(data, status, headers,config){
				return deferred.resolve(data);
			})
			.error(function(data, status, headers,config){
				deferred.reject(data);
			});
			return deferred.promise;
  		},

  		checkNotiCount: function(){
			var userID = $localstorage.get("USERID");
			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");

			$http.get(webserviceURL+'?xAction=check_noti_count&userID='+userID)
			.success(function(data, status, headers,config){
				 $localstorage.set("isLogin","Yes");
				return deferred.resolve(data);
			}).error(function(data, status, headers,config){
				deferred.reject(data);
			});
			return deferred.promise;
	 	}
  	}
}])


