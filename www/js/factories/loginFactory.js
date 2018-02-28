angular.module("checklogin",[])
.factory('$login', ['$window','$http','$q','$localstorage', function($window,$http,$q,$localstorage) {

	/*if (window.localStorage['session']) {
      var _user = JSON.parse(window.localStorage['session']);
   }
   var setUser = function (session) {
      _user = session;
      window.localStorage['session'] = JSON.stringify(_user);
   }*/
																
  return {
  		check: function(userData,devicetoken,deviceTyp){
  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			$http.get(webserviceURL+'?xAction=loginUser&email='+userData.username+'&password='+userData.pass+
				'&devicetoken='+devicetoken+'&deviceTyp='+deviceTyp)

			.success(function(data, status, headers,config){
				return deferred.resolve(data);
			}).error(function(data, status, headers,config){
				deferred.reject(data);
			});
			return deferred.promise;
  		},
		
		checkTree: function(){
			   var userID = $localstorage.get("USERID");
			   var treeID = $localstorage.get("TREEID");
	           var nodeID = $localstorage.get("userNodeId");
				
				var deferred = $q.defer();
				var webserviceURL = $localstorage.get("webserviceURL");

				$http.get(webserviceURL+'?xAction=CheckNodeForTree&nodeID='+nodeID+'&treeID='+treeID+'&userID='+userID)

				.success(function(data, status, headers,config){
					return deferred.resolve(data);
				})
				.error(function(data, status, headers,config){
					deferred.reject(data);
				});
				return deferred.promise;
		},
		
		mergeTree: function(TreeID_merge){
			   var userID = $localstorage.get("USERID");
			   var treeID = $localstorage.get("TREEID");
	           var nodeID = $localstorage.get("userNodeId");
				
				var deferred = $q.defer();
				var webserviceURL = $localstorage.get("webserviceURL");

				$http.get(webserviceURL+'?xAction=TreeMerging&nodeID='+nodeID+'&treeID='+treeID+'&userID='+userID+'&TreeID_merge='+TreeID_merge)

				//alert(webserviceURL+'?xAction=TreeMerging&nodeID='+nodeID+'&treeID='+treeID+'&userID='+userID+'&TreeID_merge='+TreeID_merge)

				.success(function(data, status, headers,config){
					return deferred.resolve(data);
				})
				.error(function(data, status, headers,config){
					deferred.reject(data);
				});
				return deferred.promise;
		},
	
  		sociallogin : function(socialData,token,type,deviceType){
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
				'&token='+token+
				'&deviceType='+deviceType)

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
				'&token='+token+
				'&deviceType='+deviceType)

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
				'&token='+token+
				'&deviceType='+deviceType)
				
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