angular.module("editTreeFactory",[])
.factory('$editTreeFactory', ['$window','$http','$q','$localstorage', function($window,$http,$q,$localstorage) {
	//var nodeID = $localstorage.get("userNodeId");															
	
  return {

	  	getNodeData : function(nodeID){
	  		var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			$http.get(webserviceURL+'?xAction=fetchUserData&nodeID='+nodeID)

			.success(function(data, status, headers,config){
				return deferred.resolve(data);
			})
			.error(function(data, status, headers,config){
				deferred.reject(data);
			});
			return deferred.promise;
		},

		addNodeData : function(editNodeData,nodeID,countryid,stateid,cityid,countryidBirth,stateidBirth,cityidBirth,countryidResidence,stateidResidence,cityidResidence){
	  		var deferred = $q.defer();

	 		var webserviceURL = $localstorage.get("webserviceURL");

			$http.get(webserviceURL+'?xAction=editProfile&firstname='+editNodeData.firstname+
			'&lastname='+editNodeData.lastname+
			'&clan='+editNodeData.clan+
			'&gender='+editNodeData.gender+
			'&postalAddress='+editNodeData.postalAddress+
			'&BirthDate='+editNodeData.BirthDate+
			'&living='+editNodeData.living+
			'&DeathDate='+editNodeData.DeathDate+
			'&nodeID='+nodeID+
			'&profilepic='+editNodeData.profilepic+
			'&birthCountry='+countryidBirth+
			'&birthState='+stateidBirth+
			'&birthCity='+cityidBirth+
			'&residenceCountry='+countryidResidence+
			'&residenceState='+stateidResidence+
			'&residenceCity='+cityidResidence)

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
