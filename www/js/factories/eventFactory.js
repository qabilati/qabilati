angular.module("addEvent",[])
.factory('$addEvent', ['$window','$http','$q','$localstorage', function($window,$http,$q,$localstorage,$ionicPopup,$scope) {
																
  return {
  	addEvent: function(eventData,nodeID_fk){
  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			var userID = $localstorage.get("USERID");
    		var treeID = $localstorage.get("TREEID");
			
			$http.get(webserviceURL+'?xAction=addEvents&eventTitle='+eventData.title+
			'&eventDescription='+eventData.description+
			'&location='+eventData.location+
			'&eventDate='+eventData.stodyDate+
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

  		getEvent: function(nodeID_fk){
  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			var userID = $localstorage.get("USERID");
    		var treeID = $localstorage.get("TREEID");
			
			$http.get(webserviceURL+'?xAction=getEvents&treeID_fk='+treeID+'&userID_fk='+userID+'&nodeID_fk='+nodeID_fk)

			.success(function(data, status, headers,config){
				return deferred.resolve(data);
			})
			.error(function(data, status, headers,config){
				deferred.reject(data);
			});
			return deferred.promise;
  		},

  		editEvent: function(editEventData,nodeID_fk){
  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");

			var userID = $localstorage.get("USERID");
    		var treeID = $localstorage.get("TREEID");
			
			$http.get(webserviceURL+'?xAction=editEvent&eventTitle='+editEventData.title+
			'&eventDescription='+editEventData.description+
			'&location='+editEventData.location+
			'&eventDate='+editEventData.stodyDate+
			'&treeID_fk='+treeID+
			'&eventID='+editEventData.eventID+
			'&nodeID_fk='+nodeID_fk+
			'&userID_fk='+userID)

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