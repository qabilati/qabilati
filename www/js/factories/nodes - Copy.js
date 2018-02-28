angular.module("nodes",[])
.factory('$nodes', ['$window','$http','$q','$localstorage', function($window,$http,$q,$localstorage) {
																
  return {
	    
  		AddNode: function(nodeData)
  		{
  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			var userID = $localstorage.get("USERID");
    		var treeID = $localstorage.get("TREEID");
    		var parentID = $localstorage.get("USERID");
    		var deathDate = '0000-00-00';

    		if (nodeData.living == 0) 
    		{
    			deathDate = nodeData.DeathDate;
    		}

    		$http.get(webserviceURL+'?xAction=addNode&firstName='+nodeData.firstname+
			'&lastName='+nodeData.lastname+
			'&clan='+nodeData.clan+
			'&relation='+nodeData.relation+
			'&gender='+nodeData.gender+
			'&email='+nodeData.email+
			'&birthDate='+nodeData.BirthDate+
			'&birthPlace='+nodeData.placeOfBirth+
			'&residence='+nodeData.placeofResidence+
			'&fatherName='+nodeData.fatherName+
			'&motherName='+nodeData.motherName+
			'&spouseName='+nodeData.spouseName+
			'&spouseMaidenName='+nodeData.spouseMaidenName+
			'&profilePic='+nodeData.profilepic+
			'&phoneNumber='+nodeData.phone+
			'&address='+nodeData.postalAddress+
			'&isLeaving='+nodeData.living+
			'&deathDate='+deathDate+
			'&treeID_fk='+treeID+
			'&userID_fk='+userID+
			'&parentID='+parentID)
			
			.success(function(data, status, headers,config){
				return deferred.resolve(data);
			})
			.error(function(data, status, headers,config){
				deferred.reject(data);
			});
			return deferred.promise;
  		}

  		/*getStory: function(){
  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			var userID = $localstorage.get("USERID");
    		var treeID = $localstorage.get("TREEID");
			
			$http.get(webserviceURL+'?xAction=getLifeStory&treeID='+treeID+'&userID='+userID)

			.success(function(data, status, headers,config){
				return deferred.resolve(data);
			})
			.error(function(data, status, headers,config){
				deferred.reject(data);
			});
			return deferred.promise;
  		}*/
  	}
}])


