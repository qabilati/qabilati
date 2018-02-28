angular.module("checksignUp",[])
.factory('$signUp', ['$window','$http','$q','$localstorage', function($window,$http,$q,$localstorage) {
																
  return {
	   
  		check: function(signUpData) {

  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");

			$http.get(webserviceURL+'?xAction=registerUser&firstName='+signUpData.firstname+
			'&lastName='+signUpData.lastname+
			'&clan='+signUpData.clan+
			'&gender='+signUpData.gender+
			'&email='+signUpData.email+
			'&password='+signUpData.pass+
			'&birthDate='+signUpData.BirthDate+
			'&fatherName='+signUpData.fatherName+
			'&motherName='+signUpData.motherName+
			'&profilePic='+signUpData.profilepic+
			'&phoneNumber='+signUpData.phoneNumber+
			'&birthCountry='+signUpData.birthCountry+
			'&birthState='+signUpData.birthState+
			'&birthCity='+signUpData.birthCity+
			'&residenceCountry='+signUpData.residenceCountry+
			'&residenceState='+signUpData.residenceState+
			'&residenceCity='+signUpData.residenceCity+
			'&address='+signUpData.address+
			'&login_type='+signUpData.socialType+
			'&socialID='+signUpData.socialID+
			'&token='+signUpData.token+
			'&deviceType='+signUpData.deviceType)

			.success(function(data, status, headers,config){
				return deferred.resolve(data);
			})
			.error(function(data, status, headers,config){
				deferred.reject(data);
			});
			return deferred.promise;
  		},

  		sociallogin : function(socialData,token,type){
  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
	        
	        if (type == 'Fb') 
	        {
	        	$http.get(webserviceURL+'?xAction=socialLogin&firstName='+socialData.facebook_first_name+
	        	'&lastName='+socialData.facebook_last_name+
	        	'&email='+socialData.facebook_email+
				'&profilePic='+socialData.profile_picture+
				'&socialID='+socialData.facebook_id+
				'&type='+type+
				'&deviceType='+socialData.deviceType+
				'&token='+token)

				.success(function(data, status, headers,config){
				return deferred.resolve(data);
				})
				.error(function(data, status, headers,config){
					deferred.reject(data);
				});
	        }
	        else if (type == 'Twitter')
        	{
        		$http.get(webserviceURL+'?xAction=socialLogin&firstName='+socialData.full_name+
				'&profilePic='+socialData.profile_picture+
				'&socialID='+socialData.twitter_id+
				'&type='+type+
				'&deviceType='+socialData.deviceType+
				'&token='+token)

				.success(function(data, status, headers,config){
				return deferred.resolve(data);
				})
				.error(function(data, status, headers,config){
					deferred.reject(data);
				});
        	}
        	else
    		{
				$http.get(webserviceURL+'?xAction=socialLogin&firstName='+socialData.full_name+
				'&profilePic='+socialData.profile_picture+
				'&socialID='+socialData.insta_id+
				'&type='+type+
				'&deviceType='+socialData.deviceType+
				'&token='+token)
				.success(function(data, status, headers,config){
				return deferred.resolve(data);
				})
				.error(function(data, status, headers,config){
					deferred.reject(data);
				});
    		}
		    
			return deferred.promise;
  		}
  	}
}])


