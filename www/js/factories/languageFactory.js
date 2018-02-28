angular.module("languageFactory",[])
.factory('$languageFactory', ['$window','$http','$q','$localstorage', function($window,$http,$q,$localstorage) {
																
  return {

  	languageList: function(){
  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			
			$http.get(webserviceURL+'?xAction=selectLanguage')

			.success(function(data, status, headers,config){
				return deferred.resolve(data);
			})
			.error(function(data, status, headers,config){
				deferred.reject(data);
			});
			return deferred.promise;
  		}

  		}//selectCountry
}])
	    