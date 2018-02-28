angular.module('verticalTreeController', [])

  .controller('verticalTreeCtrl',function($scope, $ionicModal, $timeout, $ionicPopup,$localstorage, $state, $filter, $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $cordovaActionSheet, $stateParams,$translate,$cordovaSocialSharing,$ionicLoading,$sce, $ionicSideMenuDelegate,$ionicGesture,$verticalTreeFactory,$commonFactory) {

  		$ionicSideMenuDelegate.canDragContent(false);
  		$scope.treeData = "";
  		$scope.siblingData = "";
  		$scope.finalTree = {};
  		var siteroot = $localstorage.get("siteroot");
	    var webserviceURL = $localstorage.get("webserviceURL");
	    var userNodeId = $localstorage.get('userNodeId');
	    $scope.webNodeCount = 0;
  
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

		$commonFactory.getNotificationCount().then(function(data){
	        var result = data; 
	        if(result.status == 1)
	        {
	          cordova.plugins.notification.badge.set(result.data.noticount);
	          $scope.hidenoti_count = true;
	          $localstorage.set("notification_Count",result.data.noticount);
	          $scope.NotiCount = result.data.noticount;
	        }
	        else
	        {
	          cordova.plugins.notification.badge.clear();
	          $scope.hidenoti_count = false;
	          $localstorage.set("notification_Count",0);
	          $scope.NotiCount = 0;
	        }
	    })

		$scope.getTreeOnload = function () {
	    	//$scope.showLoader();
		    $verticalTreeFactory.getTree(TreeNodeID).then(function(data,$ionicPopup){
		    	//$scope.showLoader();
		    	$scope.result = data;
		    	if($scope.result.status == 1) {
		    		//$scope.hideLoader();
		    		$scope.treeData = $scope.result.data;
		    		$scope.hfDepth = $scope.result.hfDepth;
		    		$scope.hffDepth = $scope.result.hffDepth;
		    		$scope.hfmDepth = $scope.result.hfmDepth;
		    		$scope.hmDepth = $scope.result.hmDepth;
		    		$scope.hmfDepth = $scope.result.hmfDepth;
		    		$scope.hmmDepth = $scope.result.hmmDepth;
		    		$scope.siblings = $scope.result.siblings;
		    		$scope.mainnode = $scope.result.mainnode;
		    		$scope.treeHeight = $scope.result.treeHeight;
		    		$scope.baseLevelNodeCount = $scope.result.baseLevelNodeCount;
		    		$scope.childLevelNodeCount = $scope.result.childLevelNodeCount;
		    		$scope.grandChildLevelNodeCount = $scope.result.grandChildLevelNodeCount;
		    		$scope.Treegenerator($scope.treeData,$scope.hfDepth,$scope.hffDepth,$scope.hfmDepth,$scope.hmDepth,$scope.hmfDepth,$scope.hmmDepth,$scope.siblings,$scope.mainnode,$scope.treeHeight,$scope.baseLevelNodeCount,$scope.childLevelNodeCount,$scope.grandChildLevelNodeCount,$scope.webNodeCount);
		    	}else{
		    		//$scope.hideLoader();
		    		$scope.showAlert($scope.result.msg);
		    	}
		    });
	    };

	    $scope.getTreeOnload();
	    //$state.reload();
	   /* $scope.stopMoving = function(){
            alert("jh");
        };*/

$scope.Treegenerator = function(finalTree,hfDepth,hffDepth,hfmDepth,hmDepth,hmfDepth,hmmDepth,connections,host,treeHeight,baseLevelNodeCount,childLevelNodeCount,grandChildLevelNodeCount,webNodeCount)
{	
	Hfname = finalTree.H.fname;
	Hlname = finalTree.H.lname;
	Himage = finalTree.H.image;
	HID = finalTree.H.id;

	if(hfDepth > 0)
	{
		HFfname = finalTree.HF.fname;
		HFlname = finalTree.HF.lname;
		HFimage = finalTree.HF.image;
		HFID = finalTree.HF.id;
	}
	if(hfDepth > 1)
	{
		HFFfname = finalTree.HFF.fname;
		HFFlname = finalTree.HFF.lname;
		HFFimage = finalTree.HFF.image;
		HFFID = finalTree.HFF.id;

		HFMfname = finalTree.HFM.fname;
		HFMlname = finalTree.HFM.lname;
		HFMimage = finalTree.HFM.image;
		HFMID = finalTree.HFM.id;
	}
	if(hffDepth > 1)
	{
		HFFFfname = finalTree.HFFF.fname;
		HFFFlname = finalTree.HFFF.lname;
		HFFFimage = finalTree.HFFF.image;
		HFFFID = finalTree.HFFF.id;

		HFFMfname = finalTree.HFFM.fname;
		HFFMlname = finalTree.HFFM.lname;
		HFFMimage = finalTree.HFFM.image;
		HFFMID = finalTree.HFFM.id;
	}
	if(hfmDepth > 1)
	{
		HFMFfname = finalTree.HFMF.fname;
		HFMFlname = finalTree.HFMF.lname;
		HFMFimage = finalTree.HFMF.image;
		HFMFID = finalTree.HFMF.id;

		HFMMfname = finalTree.HFMM.fname;
		HFMMlname = finalTree.HFMM.lname;
		HFMMimage = finalTree.HFMM.image;
		HFMMID = finalTree.HFMM.id;
	}
	if(hmDepth > 0)
	{
		HMfname = finalTree.HM.fname;
		HMlname = finalTree.HM.lname;
		HMimage = finalTree.HM.image;
		HMID = finalTree.HM.id;
	}
	if(hmDepth > 1)
	{
		HMFfname = finalTree.HMF.fname;
		HMFlname = finalTree.HMF.lname;
		HMFimage = finalTree.HMF.image;
		HMFID = finalTree.HMF.id;

		HMMfname = finalTree.HMM.fname;
		HMMlname = finalTree.HMM.lname;
		HMMimage = finalTree.HMM.image;
		HMMID = finalTree.HMM.id;
	}
	if(hmfDepth > 1)
	{
		HMFFfname = finalTree.HMFF.fname;
		HMFFlname = finalTree.HMFF.lname;
		HMFFimage = finalTree.HMFF.image;
		HMFFID = finalTree.HMFF.id;

		HMFMfname = finalTree.HMFM.fname;
		HMFMlname = finalTree.HMFM.lname;
		HMFMimage = finalTree.HMFM.image;
		HMFMID = finalTree.HMFM.id;
	}
	if(hmmDepth > 1)
	{
		HMMFfname = finalTree.HMMF.fname;
		HMMFlname = finalTree.HMMF.lname;
		HMMFimage = finalTree.HMMF.image;
		HMMFID = finalTree.HMMF.id;

		HMMMfname = finalTree.HMMM.fname;
		HMMMlname = finalTree.HMMM.lname;
		HMMMimage = finalTree.HMMM.image;
		HMMMID = finalTree.HMMM.id;
	}
					
	//hfDepth > 1 && hffDepth > 1 && hfmDepth > 1 && hmDepth > 1 && hmfDepth > 1 && hmmDepth > 1
	/*----------------------------- 1) Full Tree Husband Side ---------------------*/
	if(hfDepth > 1 && hffDepth > 1 && hfmDepth > 1 && hmDepth > 1 && hmfDepth > 1 && hmmDepth > 1)
	{
		var parentNodeCount = 8;
		var root = {
			name: '',
			id: 'start',
			hidden: true,
			children: [
				{
				  fname: HFFFfname,
				  lname: HFFFlname,
				  image: HFFFimage,
				  id: HFFFID,
				  no_parent: true
				},
				{
				  name: '',
				  id: 'HFF',
				  no_parent: true,
				  hidden: true,
				  children: [
				    {
				      fname: HFFfname,
				      lname: HFFlname,
				      image: HFFimage,
				      id: HFFID,
				    },
				    {
				      name: '',
				      id: 'HF',
				      no_parent: true,
				      hidden: true,
				      children: [
				        {
				          fname: HFfname,
				          lname: HFlname,
				          image: HFimage,
				          id: HFID,
				        },
				        /*{
			              name: '',
			              id: 'H',
			              no_parent: true,
			              hidden: true,
			              children: [
			                {
			                  fname: Hfname,
			                  lname: Hlname,
			                  image: Himage,
			                  id: HID
			                },
			              ]
			            },*/
				        host,
				      ]
				    },
				  ]
				},
				{
				  fname: HFFMfname,
				  lname: HFFMlname,
				  image: HFFMimage,
				  id: HFFMID,
				  no_parent: true
				},
				{
				  fname: HFMFfname,
				  lname: HFMFlname,
				  image: HFMFimage,
				  id: HFMFID,
				  no_parent: true
				},
				{
				  name: '',
				  id: 'HFM',
				  no_parent: true,
				  hidden: true,
				  children: [
				    {
				      fname: HFMfname,
				      lname: HFMlname,
				      image: HFMimage,
				      id: HFMID
				    },
				  ]
				},
				{
				  fname: HFMMfname,
				  lname: HFMMlname,
				  image: HFMMimage,
				  id: HFMMID,
				  no_parent: true
				},
				{
				  fname: HMFFfname,
				  lname: HMFFlname,
				  image: HMFFimage,
				  id: HMFFID,
				  no_parent: true
				},
				{
				  name: '',
				  id: 'HMF',
				  no_parent: true,
				  hidden: true,
				  children: [
				    {
				      fname: HMFfname,
				      lname: HMFlname,
				      image: HMFimage,
				      id: HMFID
				    },
				    {
				      name: '',
				      id: 'HM',
				      no_parent: true,
				      hidden: true,
				      children: [
				        {
				          fname: HMfname,
				          lname: HMlname,
				          image: HMimage,
				          id: HMID
				        },
				      ]
				    },
				  ]
				},
				{
				  fname: HMFMfname,
				  lname: HMFMlname,
				  image: HMFMimage,
				  id: HMFMID,
				  no_parent: true
				},
				{
				  fname: HMMFfname,
				  lname: HMMFlname,
				  image: HMMFimage,
				  id: HMMFID,
				  no_parent: true
				},
				{
				  name: '',
				  id: 'HMM',
				  no_parent: true,
				  hidden: true,
				  children: [
				    {
				      fname: HMMfname,
				      lname: HMMlname,
				      image: HMMimage,
				      id: HMMID,
				    },
				  ]
				},
				{
				  fname: HMMMfname,
				  lname: HMMMlname,
				  image: HMMMimage,
				  id: HMMMID,
				  no_parent: true
				},
			]
		}

		var siblings = connections;
	}

	/*----------------------------- 2) HFF, HFM & HMF Parents ---------------------*/
	if(hfDepth > 1 && hffDepth > 1 && hfmDepth > 1 && hmDepth > 1 && hmfDepth > 1 && hmmDepth == 1)
	{
		var parentNodeCount = 6;
		var root = {
		  name: '',
		  id: 'start',
		  hidden: true,
		  children: [
		    {
		      fname: HFFFfname,
		      lname: HFFFlname,
		      image: HFFFimage,
		      id: HFFFID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HFF',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HFFfname,
		          lname: HFFlname,
		          image: HFFimage,
		          id: HFFID,
		        },
		        {
		          name: '',
		          id: 'HF',
		          no_parent: true,
		          hidden: true,
		          children: [
		            {
		              fname: HFfname,
		              lname: HFlname,
		              image: HFimage,
		              id: HFID,
		            },
		            host,
		          ]
		        },
		      ]
		    },
		    {
		      fname: HFFMfname,
		      lname: HFFMlname,
		      image: HFFMimage,
		      id: HFFMID,
		      no_parent: true
		    },
		    {
		      fname: HFMFfname,
		      lname: HFMFlname,
		      image: HFMFimage,
		      id: HFMFID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HFM',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HFMfname,
		          lname: HFMlname,
		          image: HFMimage,
		          id: HFMID,
		        },
		      ]
		    },
		    {
		      fname: HFMMfname,
		      lname: HFMMlname,
		      image: HFMMimage,
		      id: HFMMID,
		      no_parent: true
		    },
		    {
		      fname: HMFFfname,
		      lname: HMFFlname,
		      image: HMFFimage,
		      id: HMFFID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HMF',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HMFfname,
		          lname: HMFlname,
		          image: HMFimage,
		          id: HMFID,
		        },
		        {
		          name: '',
		          id: 'HM',
		          no_parent: true,
		          hidden: true,
		          children: [
		            {
		              fname: HMfname,
		              lname: HMlname,
		              image: HMimage,
		              id: HMID
		            },
		          ]
		        },
		      ]
		    },
		    {
		      fname: HMFMfname,
		      lname: HMFMlname,
		      image: HMFMimage,
		      id: HMFMID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HMM',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HMMfname,
		          lname: HMMlname,
		          image: HMMimage,
		          id: HMMID,
		          no_parent: true,
		        },
		      ]
		    },
		  ]
		}

		var siblings = connections;
	}

	/*----------------------------- 3) HFF, HFM & HMM Parents ---------------------*/
	if(hfDepth > 1 && hffDepth > 1 && hfmDepth > 1 && hmDepth > 1 && hmfDepth == 1 && hmmDepth > 1)
	{
		var parentNodeCount = 6;
		var root = {
		  name: '',
		  id: 'start',
		  hidden: true,
		  children: [
		    {
		      fname: HFFFfname,
		      lname: HFFFlname,
		      image: HFFFimage,
		      id: HFFFID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HFF',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HFFfname,
		          lname: HFFlname,
		          image: HFFimage,
		          id: HFFID,
		        },
		        {
		          name: '',
		          id: 'HF',
		          no_parent: true,
		          hidden: true,
		          children: [
		            {
		              fname: HFfname,
		              lname: HFlname,
		              image: HFimage,
		              id: HFID,
		            },
		            host,
		          ]
		        },
		      ]
		    },
		    {
		      fname: HFFMfname,
		      lname: HFFMlname,
		      image: HFFMimage,
		      id: HFFMID,
		      no_parent: true
		    },
		    {
		      fname: HFMFfname,
		      lname: HFMFlname,
		      image: HFMFimage,
		      id: HFMFID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HFM',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HFMfname,
		          lname: HFMlname,
		          image: HFMimage,
		          id: HFMID,
		        },
		      ]
		    },
		    {
		      fname: HFMMfname,
		      lname: HFMMlname,
		      image: HFMMimage,
		      id: HFMMID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HMF',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HMFfname,
		          lname: HMFlname,
		          image: HMFimage,
		          id: HMFID,
		          no_parent: true,
		        },
		        {
		          name: '',
		          id: 'HM',
		          no_parent: true,
		          hidden: true,
		          children: [
		            {
		              fname: HMfname,
		              lname: HMlname,
		              image: HMimage,
		              id: HMID
		            },
		          ]
		        },
		      ]
		    },
		    {
		      fname: HMMFfname,
		      lname: HMMFlname,
		      image: HMMFimage,
		      id: HMMFID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HMM',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HMMfname,
		          lname: HMMlname,
		          image: HMMimage,
		          id: HMMID,
		        },
		      ]
		    },
		    {
		      fname: HMMMfname,
		      lname: HMMMlname,
		      image: HMMMimage,
		      id: HMMMID,
		      no_parent: true
		    },
		  ]
		}

		var siblings = connections;
	}

	/*----------------------------- 4) HFF, HMF & HMM Parents Only ---------------------*/
	if(hfDepth > 1 && hffDepth > 1 && hfmDepth == 1 && hmDepth > 1 && hmfDepth > 1 && hmmDepth > 1)
	{
		var root = {
		  name: '',
		  id: 'start',
		  hidden: true,
		  children: [
		    {
		      fname: HFFFfname,
		      lname: HFFFlname,
		      image: HFFFimage,
		      id: HFFFID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HFF',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HFFfname,
		          lname: HFFlname,
		          image: HFFimage,
		          id: HFFID,
		        },
		        {
		          name: '',
		          id: 'HF',
		          no_parent: true,
		          hidden: true,
		          children: [
		            {
		              fname: HFfname,
		              lname: HFlname,
		              image: HFimage,
		              id: HFID,
		            },
		            host,
		          ]
		        },
		      ]
		    },
		    {
		      fname: HFFMfname,
		      lname: HFFMlname,
		      image: HFFMimage,
		      id: HFFMID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HFM',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HFMfname,
		          lname: HFMlname,
		          image: HFMimage,
		          id: HFMID,
		          no_parent: true,
		        },
		      ]
		    },
		    {
		      fname: HMFFfname,
		      lname: HMFFlname,
		      image: HMFFimage,
		      id: HMFFID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HMF',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HMFfname,
		          lname: HMFlname,
		          image: HMFimage,
		          id: HMFID,
		        },
		        {
		          name: '',
		          id: 'HM',
		          no_parent: true,
		          hidden: true,
		          children: [
		            {
		              fname: HMfname,
		              lname: HMlname,
		              image: HMimage,
		              id: HMID
		            },
		          ]
		        },
		      ]
		    },
		    {
		      fname: HMFMfname,
		      lname: HMFMlname,
		      image: HMFMimage,
		      id: HMFMID,
		      no_parent: true
		    },
		    {
		      fname: HMMFfname,
		      lname: HMMFlname,
		      image: HMMFimage,
		      id: HMMFID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HMM',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HMMfname,
		          lname: HMMlname,
		          image: HMMimage,
		          id: HMMID,
		        },
		      ]
		    },
		    {
		      fname: HMMMfname,
		      lname: HMMMlname,
		      image: HMMMimage,
		      id: HMMMID,
		      no_parent: true
		    },
		  ]
		}

		var siblings = connections;
	}

	/*----------------------------- 5) HFM, HMF & HMM Parents only ---------------------*/
	if(hfDepth > 1 && hffDepth == 1 && hfmDepth > 1 && hmDepth > 1 && hmfDepth > 1 && hmmDepth > 1)
	{
		var parentNodeCount = 6;
		var root = {
		  name: '',
		  id: 'start',
		  hidden: true,
		  children: [
		    {
		      name: '',
		      id: 'HFF',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HFFfname,
		          lname: HFFlname,
		          image: HFFimage,
		          id: HFFID,
		          no_parent: true,
		        },
		        {
		          name: '',
		          id: 'HF',
		          no_parent: true,
		          hidden: true,
		          children: [
		            {
		              fname: HFfname,
		              lname: HFlname,
		              image: HFimage,
		              id: HFID,
		            },
		            host,
		          ]
		        },
		      ]
		    },
		    {
		      fname: HFMFfname,
		      lname: HFMFlname,
		      image: HFMFimage,
		      id: HFMFID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HFM',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HFMfname,
		          lname: HFMlname,
		          image: HFMimage,
		          id: HFMID,
		        },
		      ]
		    },
		    {
		      fname: HFMMfname,
		      lname: HFMMlname,
		      image: HFMMimage,
		      id: HFMMID,
		      no_parent: true
		    },
		    {
		      fname: HMFFfname,
		      lname: HMFFlname,
		      image: HMFFimage,
		      id: HMFFID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HMF',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HMFfname,
		          lname: HMFlname,
		          image: HMFimage,
		          id: HMFID,
		        },
		        {
		          name: '',
		          id: 'HM',
		          no_parent: true,
		          hidden: true,
		          children: [
		            {
		              fname: HMfname,
		              lname: HMlname,
		              image: HMimage,
		              id: HMID
		            },
		          ]
		        },
		      ]
		    },
		    {
		      fname: HMFMfname,
		      lname: HMFMlname,
		      image: HMFMimage,
		      id: HMFMID,
		      no_parent: true
		    },
		    {
		      fname: HMMFfname,
		      lname: HMMFlname,
		      image: HMMFimage,
		      id: HMMFID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HMM',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HMMfname,
		          lname: HMMlname,
		          image: HMMimage,
		          id: HMMID,
		        },
		      ]
		    },
		    {
		      fname: HMMMfname,
		      lname: HMMMlname,
		      image: HMMMimage,
		      id: HMMMID,
		      no_parent: true
		    },
		  ]
		}

		var siblings = connections;
	}

	/*----------------------------- 6) HF-2, HFF-2, HFM-2, HM-1, HMF-0, HMM-0 -----------*/
	if(hfDepth > 1 && hffDepth > 1 && hfmDepth > 1 && hmDepth == 1 && hmfDepth == 0 && hmmDepth == 0)
	{
		var parentNodeCount = 4;
		var root = {
		  name: '',
		  id: 'start',
		  hidden: true,
		  children: [
		    {
		      fname: HFFFfname,
		      lname: HFFFlname,
		      image: HFFFimage,
		      id: HFFFID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HFF',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HFFfname,
		          lname: HFFlname,
		          image: HFFimage,
		          id: HFFID,
		        },
		        {
		          name: '',
		          id: 'HF',
		          no_parent: true,
		          hidden: true,
		          children: [
		            {
		              fname: HFfname,
		              lname: HFlname,
		              image: HFimage,
		              id: HFID,
		            },
		            host,
		            {
		              fname: HMfname,
		              lname: HMlname,
		              image: HMimage,
		              id: HMID,
		              no_parent: true,
		            },

		          ]
		        },
		      ]
		    },
		    {
		      fname: HFFMfname,
		      lname: HFFMlname,
		      image: HFFMimage,
		      id: HFFMID,
		      no_parent: true
		    },
		    {
		      fname: HFMFfname,
		      lname: HFMFlname,
		      image: HFMFimage,
		      id: HFMFID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HFM',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HFMfname,
		          lname: HFMlname,
		          image: HFMimage,
		          id: HFMID,
		        },
		      ]
		    },
		    {
		      fname: HFMMfname,
		      lname: HFMMlname,
		      image: HFMMimage,
		      id: HFMMID,
		      no_parent: true
		    },
		  ]
		}

		var siblings = connections; 
	}

	/*----------------------------- 7) HF-2, HFF-2, HFM-1, HM-1, HMF-0, HMM-0 -----------*/
	if(hfDepth > 1 && hffDepth > 1 && hfmDepth == 1 && hmDepth == 1 && hmfDepth == 0 && hmmDepth == 0)
	{
		var parentNodeCount = 3;
		var root = {
		  name: '',
		  id: 'start',
		  hidden: true,
		  children: [
		    {
		      fname: HFFFfname,
		      lname: HFFFlname,
		      image: HFFFimage,
		      id: HFFFID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HFF',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HFFfname,
		          lname: HFFlname,
		          image: HFFimage,
		          id: HFFID,
		        },
		        {
		          name: '',
		          id: 'HF',
		          no_parent: true,
		          hidden: true,
		          children: [
		            {
		              fname: HFfname,
		              lname: HFlname,
		              image: HFimage,
		              id: HFID,
		            },
		            host,
		            {
		              fname: HMfname,
		              lname: HMlname,
		              image: HMimage,
		              id: HMID,
		              no_parent: true,
		            },
		          ]
		        },
		        {
		          fname: HFMfname,
		          lname: HFMlname,
		          image: HFMimage,
		          id: HFMID,
		          no_parent: true,
		        },
		      ]
		    },
		    {
		      fname: HFFMfname,
		      lname: HFFMlname,
		      image: HFFMimage,
		      id: HFFMID,
		      no_parent: true
		    },
		  ]
		}

		var siblings = connections;
	}

	/*----------------------------- 8) HF-2, HFF-1, HFM-2, HM-1, HMF-0, HMM-0 -----------*/
	if(hfDepth > 1 && hffDepth == 1 && hfmDepth > 1 && hmDepth == 1 && hmfDepth == 0 && hmmDepth == 0)
	{
		var parentNodeCount = 3;
		var root = {
		  name: '',
		  id: 'start',
		  hidden: true,
		  children: [
		    {
		      fname: HFMFfname,
		      lname: HFMFlname,
		      image: HFMFimage,
		      id: HFMFID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HFF',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HFFfname,
		          lname: HFFlname,
		          image: HFFimage,
		          id: HFFID,
		          no_parent: true
		        },
		        {
		          name: '',
		          id: 'HF',
		          no_parent: true,
		          hidden: true,
		          children: [
		            {
		              fname: HFfname,
		              lname: HFlname,
		              image: HFimage,
		              id: HFID,
		            },
		            host,
		            {
		              fname: HMfname,
		              lname: HMlname,
		              image: HMimage,
		              id: HMID,
		              no_parent: true,
		            },
		          ]
		        },
		        {
		          fname: HFMfname,
		          lname: HFMlname,
		          image: HFMimage,
		          id: HFMID,
		          //no_parent: true,
		        },
		      ]
		    },
		    {
		      fname: HFMMfname,
		      lname: HFMMlname,
		      image: HFMMimage,
		      id: HFMMID,
		      no_parent: true
		    },
		  ]
		}

		var siblings = connections;
	}

	/*----------------------------- 9) HF-2, HFF-1, HFM-1, HM-1, HMF-0, HMM-0 -----------*/
	if(hfDepth > 1 && hffDepth == 1 && hfmDepth == 1 && hmDepth == 1 && hmfDepth == 0 && hmmDepth == 0)
	{
		var parentNodeCount = 3;
		var root = {
		  name: '',
		  id: 'start',
		  hidden: true,
		  children: [
		    {
		      fname: HFFfname,
		      lname: HFFlname,
		      image: HFFimage,
		      id: HFFID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HF',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HFfname,
		          lname: HFlname,
		          image: HFimage,
		          id: HFID,
		        },
		        host,
		        {
		          fname: HMfname,
		          lname: HMlname,
		          image: HMimage,
		          id: HMID,
		          no_parent: true
		        },
		      ]
		    },
		    {
		      fname: HFMfname,
		      lname: HFMlname,
		      image: HFMimage,
		      id: HFMID,
		      no_parent: true,
		    },
		  ]
		}

		var siblings = connections;
	}

	/*----------------------------- 10) HF-1, HFF-0, HFM-0, HM-2, HMF-2, HMM-2 -----------*/
	if(hfDepth == 1 && hffDepth == 0 && hfmDepth == 0 && hmDepth > 1 && hmfDepth > 1 && hmmDepth > 1)
	{
		var parentNodeCount = 4;
		var root = {
		  name: '',
		  id: 'start',
		  hidden: true,
		  children: [
		    {
		      fname: HMFFfname,
		      lname: HMFFlname,
		      image: HMFFimage,
		      id: HMFFID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HMF',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HMFfname,
		          lname: HMFlname,
		          image: HMFimage,
		          id: HMFID,
		        },
		        {
		          name: '',
		          id: 'HM',
		          no_parent: true,
		          hidden: true,
		          children: [
		            {
		              fname: HFfname,
		              lname: HFlname,
		              image: HFimage,
		              id: HFID,
		              no_parent: true
		            },
		            host,
		            {
		              fname: HMfname,
		              lname: HMlname,
		              image: HMimage,
		              id: HMID
		            },
		          ]
		        },
		      ]
		    },
		    {
		      fname: HMFMfname,
		      lname: HMFMlname,
		      image: HMFMimage,
		      id: HMFMID,
		      no_parent: true
		    },
		    {
		      fname: HMMFfname,
		      lname: HMMFlname,
		      image: HMMFimage,
		      id: HMMFID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HMM',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HMMfname,
		          lname: HMMlname,
		          image: HMMimage,
		          id: HMMID,
		        },
		      ]
		    },
		    {
		      fname: HMMMfname,
		      lname: HMMMlname,
		      image: HMMMimage,
		      id: HMMMID,
		      no_parent: true
		    },
		  ]
		}

		var siblings = connections;
	}

	/*----------------------------- 11) HF-1, HFF-0, HFM-0, HM-2, HMF-2, HMM-1 -----------*/
	if(hfDepth == 1 && hffDepth == 0 && hfmDepth == 0 && hmDepth > 1 && hmfDepth > 1 && hmmDepth == 1)
	{
		var parentNodeCount = 3;
		var root = {
		  name: '',
		  id: 'start',
		  hidden: true,
		  children: [
		    {
		      fname: HMFFfname,
		      lname: HMFFlname,
		      image: HMFFimage,
		      id: HMFFID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HMF',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HMFfname,
		          lname: HMFlname,
		          image: HMFimage,
		          id: HMFID,
		        },
		        {
		          name: '',
		          id: 'HM',
		          no_parent: true,
		          hidden: true,
		          children: [
		            {
		              fname: HFfname,
		              lname: HFlname,
		              image: HFimage,
		              id: HFID,
		              no_parent: true
		            },
		            host,
		            {
		              fname: HMfname,
		              lname: HMlname,
		              image: HMimage,
		              id: HMID
		            },
		          ]
		        },
		        {
		          fname: HMMfname,
		          lname: HMMlname,
		          image: HMMimage,
		          id: HMMID,
		          no_parent: true
		        },
		      ]
		    },
		    {
		      fname: HMFMfname,
		      lname: HMFMlname,
		      image: HMFMimage,
		      id: HMFMID,
		      no_parent: true
		    },
		  ]
		}

		var siblings = connections;
	}

	/*----------------------------- 12) HF-1, HFF-0, HFM-0, HM-2, HMF-1, HMM-2 -----------*/
	if(hfDepth == 1 && hffDepth == 0 && hfmDepth == 0 && hmDepth > 1 && hmfDepth == 1 && hmmDepth > 1)
	{
		var parentNodeCount = 3;
		var root = {
		  name: '',
		  id: 'start',
		  hidden: true,
		  children: [
		    {
		      fname: HMMFfname,
		      lname: HMMFlname,
		      image: HMMFimage,
		      id: HMMFID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HMF',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HMFfname,
		          lname: HMFlname,
		          image: HMFimage,
		          id: HMFID,
		          no_parent: true,
		        },
		        {
		          name: '',
		          id: 'HM',
		          no_parent: true,
		          hidden: true,
		          children: [
		            {
		              fname: HFfname,
		              lname: HFlname,
		              image: HFimage,
		              id: HFID,
		              no_parent: true
		            },
		            host,
		            {
		              fname: HMfname,
		              lname: HMlname,
		              image: HMimage,
		              id: HMID
		            },
		          ]
		        },
		        {
		          fname: HMMfname,
		          lname: HMMlname,
		          image: HMMimage,
		          id: HMMID,
		        },
		      ]
		    },
		    {
		      fname: HMMMfname,
		      lname: HMMMlname,
		      image: HMMMimage,
		      id: HMMMID,
		      no_parent: true
		    },
		  ]
		}

		var siblings = connections;
	}

	/*----------------------------- 13) HF-1, HFF-0, HFM-0, HM-2, HMF-1, HMM-1 -----------*/
	if(hfDepth == 1 && hffDepth == 0 && hfmDepth == 0 && hmDepth > 1 && hmfDepth == 1 && hmmDepth == 1)
	{
		var parentNodeCount = 3;
		var root = {
		  name: '',
		  id: 'start',
		  hidden: true,
		  children: [
		    {
		      fname: HMFfname,
		      lname: HMFlname,
		      image: HMFimage,
		      id: HMFID,
		      no_parent: true,
		    },
		    {
		      name: '',
		      id: 'HM',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HFfname,
		          lname: HFlname,
		          image: HFimage,
		          id: HFID,
		          no_parent: true
		        },
		        host,
		        {
		          fname: HMfname,
		          lname: HMlname,
		          image: HMimage,
		          id: HMID
		        },
		      ]
		    },
		    {
		      fname: HMMfname,
		      lname: HMMlname,
		      image: HMMimage,
		      id: HMMID,
		      no_parent: true
		    },
		  ]
		}

		var siblings = connections;
	}

	/*---------------------------- 14) HFF and HFM Parents ---------------------*/
	if(hfDepth > 1 && hffDepth > 1 && hfmDepth > 1 && hmDepth > 1 && hmfDepth == 1 && hmmDepth == 1)
	{
		var parentNodeCount = 6;
		var root = {
			name: '',
			id: 'start',
			hidden: true,
			children: [
				{
				  fname: HFFFfname,
				  lname: HFFFlname,
				  image: HFFFimage,
				  id: HFFFID,
				  no_parent: true
				},
				{
				  name: '',
				  id: 'HFF',
				  no_parent: true,
				  hidden: true,
				  children: [
				    {
				      fname: HFFfname,
				      lname: HFFlname,
				      image: HFFimage,
				      id: HFFID,
				    },
				    {
				      name: '',
				      id: 'HF',
				      no_parent: true,
				      hidden: true,
				      children: [
				        {
				          fname: HFfname,
				          lname: HFlname,
				          image: HFimage,
				          id: HFID,
				        },
				        host,
				      ]
				    },
				  ]
				},
				{
				  fname: HFFMfname,
				  lname: HFFMlname,
				  image: HFFMimage,
				  id: HFFMID,
				  no_parent: true
				},
				{
				  fname: HFMFfname,
				  lname: HFMFlname,
				  image: HFMFimage,
				  id: HFMFID,
				  no_parent: true
				},
				{
				  name: '',
				  id: 'HFM',
				  no_parent: true,
				  hidden: true,
				  children: [
				    {
				      fname: HFMfname,
				      lname: HFMlname,
				      image: HFMimage,
				      id: HFMID
				    },
				  ]
				},
				{
				  fname: HFMMfname,
				  lname: HFMMlname,
				  image: HFMMimage,
				  id: HFMMID,
				  no_parent: true
				},
				{
				  name: '',
				  id: 'HMF',
				  no_parent: true,
				  hidden: true,
				  children: [
				    {
				      fname: HMFfname,
				      lname: HMFlname,
				      image: HMFimage,
				      id: HMFID,
				      no_parent: true,
				    },
				    {
				      name: '',
				      id: 'HM',
				      no_parent: true,
				      hidden: true,
				      children: [
				        {
				          fname: HMfname,
				          lname: HMlname,
				          image: HMimage,
				          id: HMID
				        },
				      ]
				    },
				  ]
				},
				{
				  name: '',
				  id: 'HMM',
				  no_parent: true,
				  hidden: true,
				  children: [
				    {
				      fname: HMMfname,
				      lname: HMMlname,
				      image: HMMimage,
				      id: HMMID,
				      no_parent: true,
				    },
				  ]
				},
			]
		}

		var siblings = connections;
	}

	/*---------------------------- 15) HFF and HMF Parents ---------------------*/
	if(hfDepth > 1 && hffDepth > 1 && hfmDepth == 1 && hmDepth > 1 && hmfDepth > 1 && hmmDepth == 1)
	{
		var parentNodeCount = 4;
		var root = {
			name: '',
			id: 'start',
			hidden: true,
			children: [
			{
				fname: HFFFfname,
				lname: HFFFlname,
				image: HFFFimage,
				id: HFFFID,
				no_parent: true
			},
			{
				name: '',
				id: 'HFF',
				no_parent: true,
				hidden: true,
				children: [
				{
					fname: HFFfname,
					lname: HFFlname,
					image: HFFimage,
					id: HFFID,
				},
				{
					name: '',
					id: 'HF',
					no_parent: true,
					hidden: true,
					children: [
					{
						fname: HFfname,
						lname: HFlname,
						image: HFimage,
						id: HFID,
					},
					host,
					]
				},
				]
			},
			{
				fname: HFFMfname,
				lname: HFFMlname,
				image: HFFMimage,
				id: HFFMID,
				no_parent: true
			},
			{
				name: '',
				id: 'HFM',
				no_parent: true,
				hidden: true,
				children: [
				{
					fname: HFMfname,
					lname: HFMlname,
					image: HFMimage,
					id: HFMID,
					no_parent: true,
				},
				]
			},
			{
				fname: HMFFfname,
				lname: HMFFlname,
				image: HMFFimage,
				id: HMFFID,
				no_parent: true
			},
			{
				name: '',
				id: 'HMF',
				no_parent: true,
				hidden: true,
				children: [
				{
					fname: HMFfname,
					lname: HMFlname,
					image: HMFimage,
					id: HMFID,
				},
				{
					name: '',
					id: 'HM',
					no_parent: true,
					hidden: true,
					children: [
					{
						fname: HMfname,
						lname: HMlname,
						image: HMimage,
						id: HMID
					},
					]
				},
				]
			},
			{
				fname: HMFMfname,
				lname: HMFMlname,
				image: HMFMimage,
				id: HMFMID,
				no_parent: true
			},
			{
				name: '',
				id: 'HMM',
				no_parent: true,
				hidden: true,
				children: [
				{
					fname: HMMfname,
					lname: HMMlname,
					image: HMMimage,
					id: HMMID,
					no_parent: true
				},
				]
			},
			]
		}

		var siblings = connections;
	}

	/*---------------------------- 16) HFF and HMM Parents ---------------------*/
	if(hfDepth > 1 && hffDepth > 1 && hfmDepth == 1 && hmDepth > 1 && hmfDepth == 1 && hmmDepth > 1)
	{
		var parentNodeCount = 4;
		var root = {
		  name: '',
		  id: 'start',
		  hidden: true,
		  children: [
		    {
		      fname: HFFFfname,
		      lname: HFFFlname,
		      image: HFFFimage,
		      id: HFFFID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HFF',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HFFfname,
		          lname: HFFlname,
		          image: HFFimage,
		          id: HFFID,
		        },
		        {
		          name: '',
		          id: 'HF',
		          no_parent: true,
		          hidden: true,
		          children: [
		            {
		              fname: HFfname,
		              lname: HFlname,
		              image: HFimage,
		              id: HFID,
		            },
		            host,
		          ]
		        },
		      ]
		    },
		    {
		      fname: HFFMfname,
		      lname: HFFMlname,
		      image: HFFMimage,
		      id: HFFMID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HFM',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HFMfname,
		          lname: HFMlname,
		          image: HFMimage,
		          id: HFMID,
		          no_parent: true,
		        },
		      ]
		    },
		    {
		      name: '',
		      id: 'HMF',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HMFfname,
		          lname: HMFlname,
		          image: HMFimage,
		          id: HMFID,
		          no_parent: true,
		        },
		        {
		          name: '',
		          id: 'HM',
		          no_parent: true,
		          hidden: true,
		          children: [
		            {
		              fname: HMfname,
		              lname: HMlname,
		              image: HMimage,
		              id: HMID
		            },
		          ]
		        },
		      ]
		    },
		    {
		      fname: HMMFfname,
		      lname: HMMFlname,
		      image: HMMFimage,
		      id: HMMFID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HMM',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HMMfname,
		          lname: HMMlname,
		          image: HMMimage,
		          id: HMMID,
		          
		        },
		      ]
		    },
		    {
		      fname: HMMMfname,
		      lname: HMMMlname,
		      image: HMMMimage,
		      id: HMMMID,
		      no_parent: true
		    },
		    
		  ]
		}

		var siblings = connections;
	}

	/*---------------------------- 17) HFM and HMF parents ---------------------*/
	if(hfDepth > 1 && hffDepth == 1 && hfmDepth > 1 && hmDepth > 1 && hmfDepth > 1 && hmmDepth == 1)
	{
		var parentNodeCount = 4;
		var root = {
		  name: '',
		  id: 'start',
		  hidden: true,
		  children: [
		    {
		      name: '',
		      id: 'HFF',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HFFfname,
		          lname: HFFlname,
		          image: HFFimage,
		          id: HFFID,
		          no_parent: true,
		        },
		        {
		          name: '',
		          id: 'HF',
		          no_parent: true,
		          hidden: true,
		          children: [
		            {
		              fname: HFfname,
		              lname: HFlname,
		              image: HFimage,
		              id: HFID,
		            },
		            host,
		          ]
		        },
		      ]
		    },
		    
		    {
		      fname: HFMFfname,
		      lname: HFMFlname,
		      image: HFMFimage,
		      id: HFMFID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HFM',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HFMfname,
		          lname: HFMlname,
		          image: HFMimage,
		          id: HFMID,
		        },
		      ]
		    },
		    {
		      fname: HFMMfname,
		      lname: HFMMlname,
		      image: HFMMimage,
		      id: HFMMID,
		      no_parent: true
		    },
		    {
		      fname: HMFFfname,
		      lname: HMFFlname,
		      image: HMFFimage,
		      id: HMFFID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HMF',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HMFfname,
		          lname: HMFlname,
		          image: HMFimage,
		          id: HMFID,
		        },
		        {
		          name: '',
		          id: 'HM',
		          no_parent: true,
		          hidden: true,
		          children: [
		            {
		              fname: HMfname,
		              lname: HMlname,
		              image: HMimage,
		              id: HMID
		            },
		          ]
		        },
		      ]
		    },
		    {
		      fname: HMFMfname,
		      lname: HMFMlname,
		      image: HMFMimage,
		      id: HMFMID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HMM',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HMMfname,
		          lname: HMMlname,
		          image: HMMimage,
		          id: HMMID,
		          no_parent: true
		        },
		      ]
		    },
		  ]
		}

		var siblings = connections;
	}

	/*---------------------------- 18) HFM and HMM parents ---------------------*/
	if(hfDepth > 1 && hffDepth == 1 && hfmDepth > 1 && hmDepth > 1 && hmfDepth == 1 && hmmDepth > 1)
	{
		var parentNodeCount = 4;
		var root = {
		  name: '',
		  id: 'start',
		  hidden: true,
		  children: [
		    {
		      name: '',
		      id: 'HFF',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HFFfname,
		          lname: HFFlname,
		          image: HFFimage,
		          id: HFFID,
		          no_parent: true,
		        },
		        {
		          name: '',
		          id: 'HF',
		          no_parent: true,
		          hidden: true,
		          children: [
		            {
		              fname: HFfname,
		              lname: HFlname,
		              image: HFimage,
		              id: HFID,
		            },
		            host,
		          ]
		        },
		      ]
		    },
		    
		    {
		      fname: HFMFfname,
		      lname: HFMFlname,
		      image: HFMFimage,
		      id: HFMFID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HFM',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HFMfname,
		          lname: HFMlname,
		          image: HFMimage,
		          id: HFMID,
		        },
		      ]
		    },
		    {
		      fname: HFMMfname,
		      lname: HFMMlname,
		      image: HFMMimage,
		      id: HFMMID,
		      no_parent: true
		    },
		    
		    {
		      name: '',
		      id: 'HMF',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HMFfname,
		          lname: HMFlname,
		          image: HMFimage,
		          id: HMFID,
		          no_parent: true,
		        },
		        {
		          name: '',
		          id: 'HM',
		          no_parent: true,
		          hidden: true,
		          children: [
		            {
		              fname: HMfname,
		              lname: HMlname,
		              image: HMimage,
		              id: HMID
		            },
		          ]
		        },
		      ]
		    },
		    
		    {
		      fname: HMMFfname,
		      lname: HMMFlname,
		      image: HMMFimage,
		      id: HMMFID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HMM',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HMMfname,
		          lname: HMMlname,
		          image: HMMimage,
		          id: HMMID,
		        },
		      ]
		    },
		    {
		      fname: HMMMfname,
		      lname: HMMMlname,
		      image: HMMMimage,
		      id: HMMMID,
		      no_parent: true
		    },
		  ]
		}

		var siblings = connections;
	}

	/*---------------------------- 19) HMF and HMM Parents ---------------------*/
	if(hfDepth > 1 && hffDepth == 1 && hfmDepth == 1 && hmDepth > 1 && hmfDepth > 1 && hmmDepth > 1)
	{
		var parentNodeCount = 6;
		var root = {
		  name: '',
		  id: 'start',
		  hidden: true,
		  children: [
		    {
		      name: '',
		      id: 'HFF',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HFFfname,
		          lname: HFFlname,
		          image: HFFimage,
		          id: HFFID,
		          no_parent: true,
		        },
		        {
		          name: '',
		          id: 'HF',
		          no_parent: true,
		          hidden: true,
		          children: [
		            {
		              fname: HFfname,
		              lname: HFlname,
		              image: HFimage,
		              id: HFID,
		            },
		            host,
		          ]
		        },
		      ]
		    },
		    {
		      name: '',
		      id: 'HFM',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HFMfname,
		          lname: HFMlname,
		          image: HFMimage,
		          id: HFMID,
		          no_parent: true,
		        },
		      ]
		    },
		    {
		      fname: HMFFfname,
		      lname: HMFFlname,
		      image: HMFFimage,
		      id: HMFFID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HMF',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HMFfname,
		          lname: HMFlname,
		          image: HMFimage,
		          id: HMFID
		        },
		        {
		          name: '',
		          id: 'HM',
		          no_parent: true,
		          hidden: true,
		          children: [
		            {
		              fname: HMfname,
		              lname: HMlname,
		              image: HMimage,
		              id: HMID
		            },
		          ]
		        },
		      ]
		    },
		    {
		      fname: HMFMfname,
		      lname: HMFMlname,
		      image: HMFMimage,
		      id: HMFMID,
		      no_parent: true
		    },
		    {
		      fname: HMMFfname,
		      lname: HMMFlname,
		      image: HMMFimage,
		      id: HMMFID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HMM',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HMMfname,
		          lname: HMMlname,
		          image: HMMimage,
		          id: HMMID,
		        },
		      ]
		    },
		    {
		      fname: HMMMfname,
		      lname: HMMMlname,
		      image: HMMMimage,
		      id: HMMMID,
		      no_parent: true
		    },
		  ]
		}

		var siblings = connections;
	}

	/*---------------------------- 20) HMM Parents Only ---------------------*/
	if(hfDepth > 1 && hffDepth == 1 && hfmDepth == 1 && hmDepth > 1 && hmfDepth == 1 && hmmDepth > 1)
	{
		var parentNodeCount = 4;
		var root = {
		  name: '',
		  id: 'start',
		  hidden: true,
		  children: [
		    {
		      name: '',
		      id: 'HFF',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HFFfname,
		          lname: HFFlname,
		          image: HFFimage,
		          id: HFFID,
		          no_parent: true,
		        },
		        {
		          name: '',
		          id: 'HF',
		          no_parent: true,
		          hidden: true,
		          children: [
		            {
		              fname: HFfname,
		              lname: HFlname,
		              image: HFimage,
		              id: HFID,
		            },
		            host,
		          ]
		        },
		      ]
		    },
		    {
		      name: '',
		      id: 'HFM',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HFMfname,
		          lname: HFMlname,
		          image: HFMimage,
		          id: HFMID,
		          no_parent: true,
		        },
		      ]
		    },
		    {
		      name: '',
		      id: 'HMF',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HMFfname,
		          lname: HMFlname,
		          image: HMFimage,
		          id: HMFID,
		          no_parent: true,
		        },
		        {
		          name: '',
		          id: 'HM',
		          no_parent: true,
		          hidden: true,
		          children: [
		            {
		              fname: HMfname,
		              lname: HMlname,
		              image: HMimage,
		              id: HMID
		            },
		          ]
		        },
		      ]
		    },
		    {
		      fname: HMMFfname,
		      lname: HMMFlname,
		      image: HMMFimage,
		      id: HMMFID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HMM',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HMMfname,
		          lname: HMMlname,
		          image: HMMimage,
		          id: HMMID,
		          
		        },
		      ]
		    },
		    {
		      fname: HMMMfname,
		      lname: HMMMlname,
		      image: HMMMimage,
		      id: HMMMID,
		      no_parent: true
		    },
		    
		  ]
		}

		var siblings = connections;
	}
	
	/*---------------------------- 21) HMF Parents Only ---------------------*/
	if(hfDepth > 1 && hffDepth == 1 && hfmDepth == 1 && hmDepth > 1 && hmfDepth > 1 && hmmDepth == 1)
	{
		var parentNodeCount = 4;
		var root = {
		  name: '',
		  id: 'start',
		  hidden: true,
		  children: [
		    {
		      name: '',
		      id: 'HFF',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HFFfname,
		          lname: HFFlname,
		          image: HFFimage,
		          id: HFFID,
		          no_parent: true,
		        },
		        {
		          name: '',
		          id: 'HF',
		          no_parent: true,
		          hidden: true,
		          children: [
		            {
		              fname: HFfname,
		              lname: HFlname,
		              image: HFimage,
		              id: HFID,
		            },
		            host,
		          ]
		        },
		      ]
		    },
		    {
		      name: '',
		      id: 'HFM',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HFMfname,
		          lname: HFMlname,
		          image: HFMimage,
		          id: HFMID,
		          no_parent: true,
		        },
		      ]
		    },
		    {
		      fname: HMFFfname,
		      lname: HMFFlname,
		      image: HMFFimage,
		      id: HMFFID,
		      no_parent: true
		    },
		    {
		      name: '',
		      id: 'HMF',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HMFfname,
		          lname: HMFlname,
		          image: HMFimage,
		          id: HMFID
		        },
		        {
		          name: '',
		          id: 'HM',
		          no_parent: true,
		          hidden: true,
		          children: [
		            {
		              fname: HMfname,
		              lname: HMlname,
		              image: HMimage,
		              id: HMID
		            },
		          ]
		        },
		      ]
		    },
		    {
		      fname: HMFMfname,
		      lname: HMFMlname,
		      image: HMFMimage,
		      id: HMFMID,
		      no_parent: true
		    },
		    
		    {
		      name: '',
		      id: 'HMM',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HMMfname,
		          lname: HMMlname,
		          image: HMMimage,
		          id: HMMID,
		          no_parent: true,
		        },
		      ]
		    },
		    
		  ]
		}

		var siblings = connections;
	}

	/*---------------------------- 22) HFM parent ONly ---------------------*/
	if(hfDepth > 1 && hffDepth == 1 && hfmDepth > 1 && hmDepth > 1 && hmfDepth == 1 && hmmDepth == 1)
	{
		var parentNodeCount = 4;
		var root = {
		    name: "",
		    id: "start",
		    hidden: true,
		    children: [
		        {
		            fname: HFMFfname,
		            lname: HFMFlname,
		            image: HFMFimage,
		            id: HFMFID,
		            no_parent: true
		        },
		        {
		            name: "",
		            id: "HFF",
		            no_parent: true,
		            hidden: true,
		            children: [
		                {
		                    fname: HFFfname,
		                    lname: HFFlname,
		                    image: HFFimage,
		                    id: HFFID,
		                    no_parent: true
		                },
		                {
		                    name: "",
		                    id: "HF",
		                    no_parent: true,
		                    hidden: true,
		                    children: [
		                        {
		                            fname: HFfname,
		                            lname: HFlname,
		                            image: HFimage,
		                            id: HFID,
		                        },
		                        host,
		                        {
		                            fname: HMfname,
		                            lname: HMlname,
		                            id: HMID,
		                            image: HMimage,
		                            no_parent: true
		                        },
		                    ]
		                },
		                {
		                    fname: HFMfname,
		                    lname: HFMlname,
		                    id: HFMID,
		                    image: HFMimage,
		                    //no_parent: true
		                },
		                {
					      fname: HMFfname,
					      lname: HMFlname,
					      image: HMFimage,
					      id: HMFID,
					      no_parent: true,
					    },
					    {
					      name: '',
					      id: 'HM',
					      no_parent: true,
					      hidden: true,
					      children: [
					        {
					          fname: HMfname,
					          lname: HMlname,
					          image: HMimage,
					          id: HMID
					        },
					      ]
					    },
					    {
					      fname: HMMfname,
					      lname: HMMlname,
					      image: HMMimage,
					      id: HMMID,
					      no_parent: true,
					    },
		            ]
		        },
		        {
		            fname: HFMMfname,
		            lname: HFMMlname,
		            id: HFMMID,
		            image: HFMMimage,    
		            no_parent: true
		        },   
		    ]
		}

		var siblings = connections;
	}

	/*---------------------------- 23) HFF parent ONly ---------------------*/
	if(hfDepth > 1 && hffDepth > 1 && hfmDepth == 1 && hmDepth > 1 && hmfDepth == 1 && hmmDepth == 1)
	{
		var parentNodeCount = 4;
		var root = {
		    name: "",
		    id: "start",
		    hidden: true,
		    children: [
		        {
		            fname: HFFFfname,
		            lname: HFFFlname,
		            image: HFFFimage,
		            id: HFFFID,
		            no_parent: true
		        },
		        {
		            name: "",
		            id: "HFF",
		            no_parent: true,
		            hidden: true,
		            children: [
		                {
		                    fname: HFFfname,
		                    lname: HFFlname,
		                    image: HFFimage,
		                    id: HFFID,
		                    //no_parent: true
		                },
		                {
		                    name: "",
		                    id: "HF",
		                    no_parent: true,
		                    hidden: true,
		                    children: [
		                        {
		                            fname: HFfname,
		                            lname: HFlname,
		                            image: HFimage,
		                            id: HFID,
		                        },
		                        host,
		                        /*{
		                            fname: HMfname,
		                            lname: HMlname,
		                            id: HMID,
		                            image: HMimage,
		                            no_parent: true
		                        },*/
		                    ]
		                },
		                {
		                    fname: HFMfname,
		                    lname: HFMlname,
		                    id: HFMID,
		                    image: HFMimage,
		                    no_parent: true
		                },
		                {
					      fname: HMFfname,
					      lname: HMFlname,
					      image: HMFimage,
					      id: HMFID,
					      no_parent: true,
					    },
					    {
					      name: '',
					      id: 'HM',
					      no_parent: true,
					      hidden: true,
					      children: [
					        {
					          fname: HMfname,
					          lname: HMlname,
					          image: HMimage,
					          id: HMID
					        },
					      ]
					    },
					    {
					      fname: HMMfname,
					      lname: HMMlname,
					      image: HMMimage,
					      id: HMMID,
					      no_parent: true,
					    },
		            ]
		        },
		        {
		            fname: HFFMfname,
		            lname: HFFMlname,
		            id: HFFMID,
		            image: HFFMimage,    
		            no_parent: true
		        },   
		    ]
		}

		var siblings = connections;
	}

	/*---------------------------- 24) HF and HM Parents Only ---------------------*/
	if(hfDepth > 1 && hffDepth == 1 && hfmDepth == 1 && hmDepth > 1 && hmfDepth == 1 && hmmDepth == 1)
	{

		var parentNodeCount = 4;
		var root = {
		  name: '',
		  id: 'start',
		  hidden: true,
		  children: [
		    {
		      fname: HFFfname,
		      lname: HFFlname,
		      image: HFFimage,
		      id: HFFID,
		      no_parent: true,
		    },
		    {
		      name: '',
		      id: 'HF',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HFfname,
		          lname: HFlname,
		          image: HFimage,
		          id: HFID,
		        },
		        host,
		      ]
		    },
		    {
		      fname: HFMfname,
		      lname: HFMlname,
		      image: HFMimage,
		      id: HFMID,
		      no_parent: true,
		    },
		    {
		      fname: HMFfname,
		      lname: HMFlname,
		      image: HMFimage,
		      id: HMFID,
		      no_parent: true,
		    },
		    {
		      name: '',
		      id: 'HM',
		      no_parent: true,
		      hidden: true,
		      children: [
		        {
		          fname: HMfname,
		          lname: HMlname,
		          image: HMimage,
		          id: HMID
		        },
		      ]
		    },
		    {
		      fname: HMMfname,
		      lname: HMMlname,
		      image: HMMimage,
		      id: HMMID,
		      no_parent: true,
		    },
		  ]
		}

		var siblings = connections;
	}

	/*---------------------------- 25) HM Parents Only ---------------------*/
	if(hfDepth == 1 && hffDepth == 0 && hfmDepth == 0 && hmDepth > 1 && hmfDepth == 1 && hmmDepth == 1)
	{
		var parentNodeCount = 3;
		var root = {
		    name: "",
		    id: "start",
		    hidden: true,
		    children: [
		        {
		          fname: HMFfname,
		          lname: HMFlname,
		          image: HMFimage,
		          id: HMFID,
		          no_parent: true
		      },
		      {
		          name: "",
		          id: "HF",
		          no_parent: true,
		          hidden: true,
		          children: [
		              {
		                  fname: HFfname,
		                  lname: HFlname,
		                  image: HFimage,
		                  id: HFID,
		                  no_parent: true
		              },
		              host,
		              {
		                  fname: HMfname,
		                  lname: HMlname,
		                  id: HMID,
		                  image: HMimage,
		              },
		          ]
		      },
		      {
		          fname: HMMfname,
		          lname: HMMlname,
		          id: HMMID,
		          image: HMMimage,
		          no_parent: true
		      },
		    ]
		} 

		var siblings = connections;
	}	

	/*---------------------------- 26) HF Parents Only ---------------------*/
	if(hfDepth > 1 && hffDepth == 1 && hfmDepth == 1 && hmDepth == 1 && hmfDepth == 0 && hmmDepth == 0)
	{
		var parentNodeCount = 3;
		var root = {
		    name: "",
		    id: "start",
		    hidden: true,
		    children: [
		        {
		          fname: HFFfname,
		          lname: HFFlname,
		          image: HFFimage,
		          id: HFFID,
		          no_parent: true
		      },
		      {
		          name: "",
		          id: "HF",
		          no_parent: true,
		          hidden: true,
		          children: [
		              {
		                  fname: HFfname,
		                  lname: HFlname,
		                  image: HFimage,
		                  id: HFID,
		              },
		              host,
		              {
		                  fname: HMfname,
		                  lname: HMlname,
		                  id: HMID,
		                  image: HMimage,
		                  no_parent: true
		              },
		          ]
		      },
		      {
		          fname: HFMfname,
		          lname: HFMlname,
		          id: HFMID,
		          image: HFMimage,
		          no_parent: true
		      },
		    ]
		} 

		var siblings = connections;
	}
	
	/*---------------------------- 27) Single - No Father and Mother ---------- */
	if(hfDepth == 1 && hffDepth == 0 && hfmDepth == 0 && hmDepth == 1 && hmfDepth == 0 && hmmDepth == 0)
	{
		var parentNodeCount = 3;
		var root = {
		    name: "",
		    id: "start",
		    hidden: true,
		    children: [
		        {
		            fname: HFfname,
		            lname: HFlname,
		            image: HFimage,
		            id: HFID,
		            no_parent: true
		        },
		        host,
		        {
		            fname: HMfname,
		            lname: HMlname,
		            id: HMID,
		            image: HMimage,
		            no_parent: true
		        },
		    ]
		}

		var siblings = connections;
	}

/*alert(baseLevelNodeCount);
alert(childLevelNodeCount);
alert(grandChildLevelNodeCount);*/

	if (baseLevelNodeCount >= childLevelNodeCount && baseLevelNodeCount >= grandChildLevelNodeCount) 
	{
		webNodeCount = baseLevelNodeCount;
	}
	else if (childLevelNodeCount >= baseLevelNodeCount && childLevelNodeCount >= grandChildLevelNodeCount) 
	{
		webNodeCount = childLevelNodeCount;
	}
	else if (grandChildLevelNodeCount >= baseLevelNodeCount && grandChildLevelNodeCount >= childLevelNodeCount) 
	{
		webNodeCount = grandChildLevelNodeCount;
	}

	if (webNodeCount > parentNodeCount) 
	{
		parentNodeCount = webNodeCount;
	}

		/*alert(webNodeCount);
		alert(parentNodeCount);*/

		var treeWidth = parentNodeCount * 100;

		var allNodes = flatten(root);

		var margin = {
			    top: 10,
			    right: 10,
			    bottom: 10,
			    left: 10
		  	},
			width = treeWidth,
			height = treeHeight;
		
		var kx = function (d) {
			return d.x - 20;
		};

		var ky = function (d) {
			return d.y - 10;
		};

		//thie place the text x axis adjust this to center align the text
		var tx = function (d) {
		  return d.x - 3;
		};

		//thie place the text y axis adjust this to center align the text
		var ty = function (d) {
		  return d.y + 3;
		};

		//make an SVG
		var svg = d3.select("#graph").append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom+100)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		// Compute the layout.
		var tree = d3.layout.tree().size([width, height]),
		nodes = tree.nodes(root),
		links = tree.links(nodes);

		// Create the link lines.
		svg.selectAll(".link")
		.data(links)
		.enter().append("path")
		.attr("class", "link")
		.attr("d", elbow);

		var nodes = svg.selectAll(".node")
			.data(nodes)
			.enter();

		//First draw sibling line with blue line
		svg.selectAll(".sibling")
			.data(siblings)
			.enter().append("path")
			.attr("class", "sibling")
			.attr("d", sblingLine);

		// Create the node rectangles.
		nodes.append("image")
		.attr("class", "node")
		.attr("height", 50)
		.attr("width", 50)
		.attr("id", function (d) {
			return d.id;
		})
		.attr("display", function (d) {
			if (d.hidden) {
				return "none"
			} else {
				return ""
			};

		}) 
		.attr("xlink:href", function (d) {
			return d.image;
		})
		.attr("x", kx)
		.attr("y", ky);

		// Create the node text label.
		nodes.append("text")
		.text(function (d) {
			return d.fname;
		})
		.attr("x", tx)
		.attr("y", ty)
		.attr("width",40)
		.attr("text-anchor","middle")
		.attr("class", function (d) {
			return "fname";
		})
		.attr("id", function (d) {
			return "fname-"+d.id;
		});

		nodes.append("text")
		.text(function (d) {
			return d.lname;
		})
		.attr("x", tx)
		.attr("y", ty)
		.attr("width",40)
		.attr("text-anchor","middle")
		.attr("class", function (d) {
			return "lname";
		})
		.attr("id", function (d) {
			return "lname-"+d.id;
		});

		function sblingLine(d, i) {
			//start point
			var start = allNodes.filter(function (v) {
				if (d.source.id == v.id) {
					return true;
				} else {
					return false;
				}
			});
			//end point
			var end = allNodes.filter(function (v) {
				if (d.target.id == v.id) {
					return true;
				} else {
					return false;
				}
			});
			//define teh start coordinate and end co-ordinate
			var linedata = [{
				x: start[0].x,
				y: start[0].y
			}, {
				x: end[0].x,
				y: end[0].y
			}];
			var fun = d3.svg.line().x(function (d) {
				return d.x;
			}).y(function (d) {
				return d.y;
			}).interpolate("linear");
			return fun(linedata);
		}

		/*To make the nodes in flat mode.
			This gets all teh nodes in same level*/
		function flatten(root) {

			var n = [],
			i = 0;

			function recurse(node) {
				if (node.children) node.children.forEach(recurse);
				if (!node.id) node.id = ++i;
				n.push(node);
			}
			recurse(root);
			return n;
		}

		/** 
			This draws the lines between nodes.
			**/
		function elbow(d, i) 
		{
			if (d.target.no_parent) {
				return "M0,0L0,0";
			}
			var diff = d.source.y - d.target.y;
			//0.40 defines the point from where you need the line to break out change is as per your choice.
			var ny = d.target.y + diff * 0.40;

			linedata = [{
				x: d.target.x,
				y: d.target.y
			}, {
				x: d.target.x,
				y: ny
			}, {
				x: d.source.x,
				y: d.source.y
			}]

			var fun = d3.svg.line().x(function (d) {
				return d.x;
			}).y(function (d) {
				return d.y;
			}).interpolate("step-after");
			return fun(linedata);
		}

		$scope.changenodestate = function(childnodeid)
		{
			$state.go($state.current, {'nodeID':childnodeid}, {reload: true, inherit: false});

			/*$state.transitionTo('app.tree',{'nodeID':childnodeid}, {
			    reload: true,
			    inherit: false
			});

			$timeout(function(){
				$state.reload();
			},1000);*/
		}

		$scope.addmemberstate = function(childnodeid)
		{
			$state.go('app.form',{'nodeID':childnodeid,'activeTab':'b'});
		}

		$('.node').click(function() {
            var clickId = this.id;

            var clickIdLen = clickId.split("-");

			var my_click_id = $localstorage.get("Tree_ClickID");

			if (clickIdLen.length > 1) 
			{
				$scope.addmemberstate(clickIdLen[1]);
			}
			else
			{
				$localstorage.set("Tree_ClickID",clickId);
				if(my_click_id == clickId)
            	{
            		$state.go('app.userProfile',{'nodeID':clickId,'activeTab':'a'});
        		}
        		else
    			{
    				$scope.changenodestate(clickIdLen[0]);
    			}
			}
        });

        $('.fname').click(function() {
            var clickId = this.id;
            var clickIdLen = clickId.split("-");
			
			if (clickIdLen.length > 2) {
				$scope.addmemberstate(clickIdLen[2]);
			}
			else
			{
				$scope.changenodestate(clickIdLen[1]);
			}
        });

        $('.lname').click(function() {
            var clickId = this.id;
            var clickIdLen = clickId.split("-");
			
			if (clickIdLen.length > 2) {
				$scope.addmemberstate(clickIdLen[2]);
			}
			else
			{
				$scope.changenodestate(clickIdLen[1]);
			}
        });
       

		jQuery(document).ready(function(){

		    var svg = $('#graph').find('svg')[0];
		  $('.fname').each(function(){
		      var text = $("#"+this.id).text();
		      $("#"+this.id).attr('y', parseInt($("#"+this.id).attr("y"))+parseInt(50));
		    });
		  $('.lname').each(function(){
		      var text = $("#"+this.id).text();
		      $("#"+this.id).attr('y', parseInt($("#"+this.id).attr("y"))+parseInt(65));
		    }); 
		    
		});
	}
});