angular.module("nodes",[])
.factory('$nodes', ['$window','$http','$q','$localstorage', function($window,$http,$q,$localstorage) {
  return {
	    
  		AddNode: function(SignUpData)
  		{
  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			var userID = $localstorage.get("USERID");
    		var treeID = $localstorage.get("TREEID");
    		var deathDate = '0000-00-00';

    		if (SignUpData.living == 0) 
    		{
    			deathDate = SignUpData.DeathDate;
    		}

    		$http.get(webserviceURL+'?xAction=addNode&firstName='+SignUpData.firstname+
			'&lastName='+SignUpData.lastname+
			'&clan='+SignUpData.clan+
			'&relation='+SignUpData.relation+
			'&gender='+SignUpData.gender+
			'&email='+SignUpData.email+
			'&birthDate='+SignUpData.BirthDate+
			'&profilePic='+SignUpData.profilepic+
			'&phoneNumber='+SignUpData.phone+
			'&address='+SignUpData.address+
			'&isLeaving='+SignUpData.living+
			'&deathDate='+deathDate+
			'&treeID_fk='+treeID+
			'&userID_fk='+userID+
			'&parentID='+SignUpData.nodeID+
			'&birthCountry='+SignUpData.countryidBirth+
			'&birthState='+SignUpData.stateidBirth+
			'&birthCity='+SignUpData.cityidBirth+
			'&residenceCountry='+SignUpData.countryidResidence+
			'&residenceState='+SignUpData.stateidResidence+
			'&residenceCity='+SignUpData.cityidResidence+
			'&parentList='+SignUpData.parentList)

			.success(function(data, status, headers,config){
				return deferred.resolve(data);
			})
			.error(function(data, status, headers,config){
				deferred.reject(data);
			});
			return deferred.promise;
  		},

  		getFamilyMembers: function(nodeID){
  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			var userID = $localstorage.get("USERID");
    		var treeID = $localstorage.get("TREEID");

			$http.get(webserviceURL+'?xAction=getTree&treeID='+treeID+'&userID='+userID+'&nodeID='+nodeID)

			.success(function(data, status, headers,config){
				return deferred.resolve(data);
			})
			.error(function(data, status, headers,config){
				deferred.reject(data);
			});
			return deferred.promise;
  		},

  		addNodePayment: function(nodeID,paymentID,paymentState,paymentResponse_type){

  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			var userID = $localstorage.get("USERID");
    		var treeID = $localstorage.get("TREEID");
  			$http.get(webserviceURL+'?xAction=addNodePayment&nodeID='+nodeID+
  				'&treeID='+treeID+
				'&userID='+userID+
				'&amount='+"1"+
				'&paymentMode='+"paypal"+
  				'&paymentID='+paymentID+
  				'&paymentState='+paymentState+
  				'&paymentResponse_type='+paymentResponse_type+
  				'&paymentType='+"newNode")

			.success(function(data, status, headers,config){
				return deferred.resolve(data);
			})
			.error(function(data, status, headers,config){
				deferred.reject(data);
			});
			return deferred.promise;

  		},
		
  		addNodeAfterPayment: function(nodeID,SignUpData) {

  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			var userID = $localstorage.get("USERID");
    		var treeID = $localstorage.get("TREEID");
    		var deathDate = '0000-00-00';

    		if (SignUpData.living == 0) 
    		{
    			deathDate = SignUpData.DeathDate;
    		}

    		$http.get(webserviceURL+'?xAction=addNodeAfterPayment&firstName='+SignUpData.firstname+
			'&lastName='+SignUpData.lastname+
			'&clan='+SignUpData.clan+
			'&relation='+SignUpData.relation+
			'&gender='+SignUpData.gender+
			'&email='+SignUpData.email+
			'&birthDate='+SignUpData.BirthDate+
			'&profilePic='+SignUpData.profilepic+
			'&phoneNumber='+SignUpData.phone+
			'&address='+SignUpData.address+
			'&isLeaving='+SignUpData.living+
			'&deathDate='+deathDate+
			'&treeID_fk='+treeID+
			'&userID_fk='+userID+
			'&parentID='+nodeID+
			'&birthCountry='+SignUpData.countryidBirth+
			'&birthState='+SignUpData.stateidBirth+
			'&birthCity='+SignUpData.cityidBirth+
			'&residenceCountry='+SignUpData.countryidResidence+
			'&residenceState='+SignUpData.stateidResidence+
			'&residenceCity='+SignUpData.cityidResidence+
			'&parentList='+SignUpData.parentList)

			.success(function(data, status, headers,config){
				return deferred.resolve(data);
			})
			.error(function(data, status, headers,config){
				deferred.reject(data);
			});
			return deferred.promise;
  		},

  		getNodeData: function(nodeID){
  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			var userID = $localstorage.get("USERID");
    		var treeID = $localstorage.get("TREEID");
			
			$http.get(webserviceURL+'?xAction=getNodeData&treeID='+treeID+'&userID='+userID+'&nodeID='+nodeID)

			.success(function(data, status, headers,config){
				return deferred.resolve(data);
			})
			.error(function(data, status, headers,config){
				deferred.reject(data);
			});
			return deferred.promise;
  		},
  		parentList:function(nodeID,relation,last_name,clan_nm){
  			var deferred = $q.defer();
			var webserviceURL = $localstorage.get("webserviceURL");
			
			$http.get(webserviceURL+'?xAction=ParentList&nodeID='+nodeID+'&relation='+relation+'&lastName='+last_name+'&clan='+clan_nm)

			.success(function(data, status, headers,config){
				return deferred.resolve(data);
			})
			.error(function(data, status, headers,config){
				deferred.reject(data);
			});
			return deferred.promise;
  		},
  	}
}])


