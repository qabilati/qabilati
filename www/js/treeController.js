angular.module('treecontroller', [])

  .controller('treeCtrl',function($scope, $ionicModal, $timeout, $ionicPopup,$localstorage, $state, $filter, $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $cordovaActionSheet, $stateParams,$translate,$cordovaSocialSharing,$ionicLoading,$treeFactory,$sce, $ionicSideMenuDelegate,$ionicGesture) 
  	{
  		$ionicSideMenuDelegate.canDragContent(false);
  		$scope.treeData = {};
  		var siteroot = $localstorage.get("siteroot");
	    var webserviceURL = $localstorage.get("webserviceURL");
	    var userNodeId = $localstorage.get('userNodeId');

	    var imageUrl = $localstorage.get('profileImgURL');
	    var photo = "";
		
		  angular.isUndefinedOrNull = function(val) {
    //return angular.isUndefined(val) || val === null 
	 if (value === "" || value === null || typeof value === "undefined") {
        return val === null;
    }
  }

  $scope.showLoader = function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="spiral"></ion-spinner>',
      duration: 3000
    }).then(function(){
       
    });
  };
  $scope.hideLoader = function(){
    $ionicLoading.hide().then(function(){
       
    });
  };


	    var langCode = $localstorage.get("DEVICELANGUAGE");
	    $localstorage.set("DEVICELANGUAGE",langCode);
	    $translate.use(langCode);

	    var deviceLanguage = navigator.language; 
    	var language_code = (navigator.language).split("-")[0];
		
		$scope.onDragComplete=function(data,evt){
       		console.log("drag success, data:", data);
    	}

    	$scope.onDropComplete=function(data,evt){
        	console.log("drop success, data:", data);
    	}
			
    	if ($stateParams.nodeID != "") 
    	{
    		var TreeNodeID = $stateParams.nodeID;
    	}
    	else
		{
			var TreeNodeID = userNodeId;
		}

		$scope.trustAsHtml = function(string) {
		    return $sce.trustAsHtml(string);
		};



		$scope.Treegenerator = function(parent,same,child,spouse,sibling)
	    {
	    	var tree = "";
	    	var target = document.getElementById('tree-render');
	    	tree += '<li class="with-spouse with-spouse-top">';
	    	if(angular.isArray(parent) && parent.length > 0)
 			{
 				if (parent.length == 1) 
 				{
 					angular.forEach(parent, function(value, key) {

 						if ((value.gender == 'Male')) 
						{
							if(value.photo != "" && value.photo != "undefined")
							{
								photo = imageUrl+value.photo;
							}
							else
							{
								photo = 'img/male.jpg';
							}
 							tree +='<a id="'+value.nodeID+'" title="'+value.Name+'" href="#/app/verticalTree/'+value.nodeID+'" itemprop="url sameAs"><img src="'+photo+'"/><span itemprop="name">'+value.Name+'</span></a>';

 							tree += '<div class="got-parents" itemprop="spouse" itemscope="" itemtype=""><a href="#/app/form/'+TreeNodeID+'/b" title="These details are private"><img src="img/mother.png"/>Add Mother</a></div>';
 						}
 						else
						{
							if(value.photo != "" && value.photo != "undefined")
							{
								photo = imageUrl+value.photo;
							}
							else
							{
								photo = 'img/female.jpg';
							}

							tree += '<a title="Add Father" href="#/app/form/'+TreeNodeID+'/b" itemprop="url sameAs"><img src="img/father.png"/><span itemprop="name">Add Father</span></a>';

							tree +='<div class="got-parents" itemprop="spouse" itemscope="" itemtype=""><a id="'+value.nodeID+'" title="'+value.Name+'" href="#/app/verticalTree/'+value.nodeID+'" itemprop="url sameAs"><img src="'+photo+'"/><span itemprop="name">'+value.Name+'</span></a></div>';
						}

					});
 				}
 				else 
 				{
	 				angular.forEach(parent, function(value, key) {

	 					if ((value.gender == 'Male')) 
						{
							if(value.photo != "" && value.photo != "undefined")
							{
								photo = imageUrl+value.photo;
							}
							else
							{
								photo = 'img/male.jpg';
							}

	 						tree +='<a id="'+value.nodeID+'" title="'+value.Name+'" href="#/app/verticalTree/'+value.nodeID+'" itemprop="url sameAs"><img src="'+photo+'"/><span itemprop="name">'+value.Name+'</span></a>';
	 					}
	 					else if(value.gender == 'Female')
						{
							if(value.photo != "" && value.photo != "undefined")
							{
								photo = imageUrl+value.photo;
							}
							else
							{
								photo = 'img/female.jpg';
							}

							tree +='<div class="got-parents" itemprop="spouse" itemscope="" itemtype=""><a id="'+value.nodeID+'" title="'+value.Name+'" href="#/app/verticalTree/'+value.nodeID+'" itemprop="url sameAs"><img src="'+photo+'"/><span itemprop="name">'+value.Name+'</span></a></div>';
						}
		         	});
	         	}
			}
			else
			{
				tree += '<a title="Add Father" href="#/app/form/'+TreeNodeID+'/b" itemprop="url sameAs"><img src="img/father.png"/><span itemprop="name">Add Father</span></a>';

				tree += '<div class="got-parents" itemprop="spouse" itemscope="" itemtype=""><a href="#/app/form/'+TreeNodeID+'/b" title="These details are private"><img src="img/mother.png"/>Add Mother</a></div>';
			}

			if(angular.isArray(same) && same.length > 0)
 			{
 				tree +='<ol class="ol-two"><li itemprop="children" itemscope="" itemtype="" class="with-spouse">';
 				angular.forEach(same, function(value, key) {

 					if(value.photo != "" && value.photo != "undefined")
					{
						photo = imageUrl+value.photo;
					}
					else
					{
						if (value.gender == 'Female') 
						{
							photo = 'img/female.jpg';
						}
						else
						{
							photo = 'img/male.jpg';
						}
					}

					tree +='<a id="'+value.nodeID+'" title="'+value.Name+'" href="#/app/verticalTree/'+value.nodeID+'" itemprop="url sameAs"><img src="'+photo+'"/><span itemprop="name">'+value.Name+'</span></a>';
	         	});

	         	if(angular.isArray(spouse) && spouse.length > 0)
 				{	
	         		angular.forEach(spouse, function(value, key) {

	         			if(value.photo != "" && value.photo != "undefined")
						{
							photo = imageUrl+value.photo;
						}
						else
						{
							if (value.gender == 'Female') 
							{
								photo = 'img/female.jpg';
							}
							else
							{
								photo = 'img/male.jpg';
							}
						}
 						
						tree +='<div class="got-parents" itemprop="spouse" itemscope="" itemtype=""><a id="'+value.nodeID+'" title="'+value.Name+'" href="#/app/verticalTree/'+value.nodeID+'" itemprop="url sameAs"><img src="'+photo+'"/><span itemprop="name">'+value.Name+'</span></a></div>';
	         		});
         		}
         		else
     			{
     				tree += '<div class="got-parents" itemprop="spouse" itemscope="" itemtype=""><a href="#/app/form/'+TreeNodeID+'/b" title="These details are private"><img src="img/mother.png"/>Add Spouse</a></div>';
     			}


	         	if(angular.isArray(child) && child.length > 0)
	 			{
	 				tree +='<ol class="three">';
	 				angular.forEach(child, function(value, key) {

	 					if(value.photo != "" && value.photo != "undefined")
						{
							photo = imageUrl+value.photo;
						}
						else
						{
							if (value.gender == 'Female') 
							{
								photo = 'img/female.jpg';
							}
							else
							{
								photo = 'img/male.jpg';
							}
						}

				 		tree += '<li class="end-node"><a href="#/app/verticalTree/'+value.nodeID+'" id="'+value.nodeID+'" title="'+value.Name+'"><img src="'+photo+'"/>'+value.Name+'</a></li>';
		         	});
		         	tree +='</ol>';
				}
				else
				{
					tree += '<ol class="three"><li class="end-node"><a href="#/app/form/'+TreeNodeID+'/b" title="Add Child"><img src="img/add-node.jpg"/>Add Child</a></li></ol>';
				}

	         	tree += '</li>';

	         	if(angular.isArray(sibling) && sibling.length > 0)
	 			{
	 				angular.forEach(sibling, function(value, key) 
	 				{
	 					if(value.photo != "" && value.photo != "undefined")
						{
							photo = imageUrl+value.photo;
						}
						else
						{
							if (value.gender == 'Female') 
							{
								photo = 'img/female.jpg';
							}
							else
							{
								photo = 'img/male.jpg';
							}
						}

 						tree += '<li class="end-node"><a href="#/app/verticalTree/'+value.nodeID+'" id="'+value.nodeID+'" title="'+value.Name+'"><img src="'+photo+'"/>'+value.Name+'</a></li>';
		         	});
				}
	         	tree += '</ol>';
			}
			tree += '</li>';
			$scope.TreeView = tree;
	    };
	    
	    $scope.getTreeOnload = function () {
	    	$scope.showLoader();
		    $treeFactory.getTree(TreeNodeID).then(function(data,$ionicPopup){
		    	$scope.result = data;
		    	if($scope.result.status == 1) {
		    		$scope.hideLoader();
		    		$scope.parent = $scope.result.data.parent;
		    		$scope.same = $scope.result.data.same;
		    		$scope.child = $scope.result.data.child;
		    		$scope.spouse = $scope.result.data.spouse;
		    		$scope.sibling = $scope.result.data.sibling;
		    		$scope.Treegenerator($scope.parent,$scope.same,$scope.child,$scope.spouse,$scope.sibling);
		    	}else{
		    		$scope.hideLoader();
		    		$scope.showAlert($scope.result.msg);
		    	}
		    });
	    };

	    $scope.getTreeOnload();
  	});