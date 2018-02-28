angular.module("checkforgetPassword",[])
.factory('$forgotPasswordEmail1', ['$window','$http','$q','$localstorage', function($window,$http,$q,$localstorage) {
																
  return {  
  		sendforgotpassemail: function(email_id){
  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			$http.get(webserviceURL+'?xAction=forgotPassword&email='+email_id)
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

