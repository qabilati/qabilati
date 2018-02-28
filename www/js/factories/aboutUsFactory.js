angular.module("howaboutUs",[])
.factory('$howaboutUs', ['$window','$http','$q','$localstorage', function($window,$http,$q,$localstorage) {
											
  return {  
  		aboutUs: function(userData){
  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			var langCode = $localstorage.get("DEVICELANGUAGE");
			$http.get(webserviceURL+'?xAction=cmsPage&pageName=aboutUs&langID='+langCode)
			.success(function(data, status, headers,config){
				return deferred.resolve(data);
			})
			.error(function(data, status, headers,config){
				deferred.reject(data);
			});
			return deferred.promise;
  		},
		
		howtouse: function(userData){
  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			var langCode = $localstorage.get("DEVICELANGUAGE");	
			$http.get(webserviceURL+'?xAction=cmsPage&pageName=howToUse&langID='+langCode)
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
