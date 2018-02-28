angular.module("commonFactory",[])
.factory('$commonFactory', ['$window','$http','$q','$localstorage', function($window,$http,$q,$localstorage) {
															
  return {

  		ContactUS: function(ContactData) {
  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			var userID = $localstorage.get("USERID");
    		var treeID = $localstorage.get("TREEID");
			
			$http.get(webserviceURL+'?xAction=ContactUS&firstName='+ContactData.firstname+
			'&type='+ContactData.type+
			'&lastName='+ContactData.lastname+
			'&email='+ContactData.email+
			'&Message='+ContactData.Message+
			'&phoneNumber='+ContactData.phone+
			'&userID='+userID)

			.success(function(data, status, headers,config){
				return deferred.resolve(data);
			})
			.error(function(data, status, headers,config){
				deferred.reject(data);
			});
			return deferred.promise;
  		},

  		selectCountry: function(){
  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			
			$http.get(webserviceURL+'?xAction=selectCountry')

			.success(function(data, status, headers,config){
				return deferred.resolve(data);
			})
			.error(function(data, status, headers,config){
				deferred.reject(data);
			});
			return deferred.promise;
  		},

  		selectState:function(country){
  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			
			$http.get(webserviceURL+'?xAction=selectState&country='+country)

			.success(function(data, status, headers,config){
				return deferred.resolve(data);
			})
			.error(function(data, status, headers,config){
				deferred.reject(data);
			});
			return deferred.promise;
  		},

  		selectCity:function(state){
  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");

			//alert(webserviceURL+'?xAction=selectCity&state='+state)
			
			$http.get(webserviceURL+'?xAction=selectCity&state='+state)

			.success(function(data, status, headers,config){
				return deferred.resolve(data);
			})
			.error(function(data, status, headers,config){
				deferred.reject(data);
			});
			return deferred.promise;
  		},

  		getClans: function(){
  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			
			$http.get(webserviceURL+'?xAction=getClans')

			.success(function(data, status, headers,config){
				return deferred.resolve(data);
			})
			.error(function(data, status, headers,config){
				deferred.reject(data);
			});
			return deferred.promise;
  		},

  		getFamily: function(){
  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			
			$http.get(webserviceURL+'?xAction=getFamily')

			.success(function(data, status, headers,config){
				return deferred.resolve(data);
			})
			.error(function(data, status, headers,config){
				deferred.reject(data);
			});
			return deferred.promise;
  		},

  		ancestry: function(nodeID){
  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			var email = $localstorage.get("userEmail");
			var firstname = $localstorage.get("firstname");
			var lastname = $localstorage.get("lastname");
			var clan = $localstorage.get("clan");
			var birthDate = $localstorage.get("birthDate");
			
			$http.get(webserviceURL+'?xAction=ancestryTrack&firstName='+firstname+
			'&lastName='+lastname+
			'&nodeID='+nodeID+
			'&clan='+clan+
			'&birthDate='+birthDate+
			'&email='+email)

			.success(function(data, status, headers,config){
				return deferred.resolve(data);
			})
			.error(function(data, status, headers,config){
				deferred.reject(data);
			});
			return deferred.promise;
  		},

  		checkRemainingViews: function(nodeID) {
  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			var userID = $localstorage.get("USERID");
    		var treeID = $localstorage.get("TREEID");
			
			$http.get(webserviceURL+'?xAction=checkRemainingViews&userID='+userID+'&nodeID='+nodeID)

			.success(function(data, status, headers,config){
				return deferred.resolve(data);
			})
			.error(function(data, status, headers,config){
				deferred.reject(data);
			});
			return deferred.promise;
  		},

  		mergeTree: function(existNodeID,existTreeID,newID) {
  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			var userID = $localstorage.get("USERID");
    		var treeID = $localstorage.get("TREEID");
			
			$http.get(webserviceURL+'?xAction=TreeMerging&userID='+userID+'&treeID='+treeID+'&existNodeID='+existNodeID+'&existTreeID='+existTreeID+'&newID='+newID)

			.success(function(data, status, headers,config){
				return deferred.resolve(data);
			})
			.error(function(data, status, headers,config){
				deferred.reject(data);
			});
			return deferred.promise;
  		},
  		
  		checkNodeType: function(nodeID) {
  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			var userID = $localstorage.get("USERID");
    		var treeID = $localstorage.get("TREEID");

			$http.get(webserviceURL+'?xAction=checkNodeType&userID='+userID+'&treeID='+treeID+'&nodeID='+nodeID)
			.success(function(data, status, headers,config){
				return deferred.resolve(data);
			})
			.error(function(data, status, headers,config){
				deferred.reject(data);
			});
			return deferred.promise;
  		},

  		deductView: function(nodeID,type) {
  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			var userID = $localstorage.get("USERID");
    		var treeID = $localstorage.get("TREEID");
			
			$http.get(webserviceURL+'?xAction=deductView&userID='+userID+'&treeID='+treeID+'&nodeID='+nodeID+'&type='+type)

			.success(function(data, status, headers,config){
				return deferred.resolve(data);
			})
			.error(function(data, status, headers,config){
				deferred.reject(data);
			});
			return deferred.promise;
  		},

  		getNotificationCount: function() {
  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			var userID = $localstorage.get("USERID");
    		var treeID = $localstorage.get("TREEID");
			
			//alert(webserviceURL+'?xAction=getNotificationCount&userID='+userID)
			$http.get(webserviceURL+'?xAction=getNotificationCount&userID='+userID)

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


