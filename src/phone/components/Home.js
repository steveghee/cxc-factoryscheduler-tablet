// $scope, $element, $attrs, $injector, $sce, $timeout, $http, $ionicPopup, and $ionicPopover services are available



$scope.$on("$ionicView.loaded", function (event) {

	//Check if the $rootScope.viewSet variable has not been created
  	//Code in this if statement will only run once
	if (typeof $rootScope.viewSet === 'undefined' || $rootScope.viewSet === null) {

      	//Create the $rootScope.viewSet array
		$rootScope.viewSet = [];
    
		//Create a null entry in the $rootScope.viewSet array
		$rootScope.viewSet[0] = {}                 
                    
		//Set the viewName column to the name of the current view
		$rootScope.viewSet[0].viewName =  document.querySelector('[twx-view]').getAttribute('twx-view');    

		//Set the timesViewLoaded column to 1
		$rootScope.viewSet[0].timesViewLoaded =  1;     

		//Add any code here that you only want to run once.      
      
    } else {      

		//Check if the view name exists in the array
		if ($rootScope.viewSet.findIndex(i => i.viewName === document.querySelector('[twx-view]').getAttribute('twx-view')) != -1) {
      
			for (i = 0; i < $rootScope.viewSet.length; i++) {      

				//if the view has been loaded before, increment the counter
				if ($rootScope.viewSet[i].viewName == $document.querySelector('[twx-view]').getAttribute('twx-view')) {
          
					$rootScope.viewSet[i].timesViewLoaded = $rootScope.viewSet[i].timesViewLoaded + 1;                  
  
            	}          
          
			}

		} else {

			//Add the new view to the array
			var valueToPush = {};

			valueToPush.viewName = document.querySelector('[twx-view]').getAttribute('twx-view');
			valueToPush.timesViewLoaded = 1;

			$rootScope.viewSet.push(valueToPush);         

		}      
        
    }  
 
});

//This function will execute each time the view is loaded
$scope.$on("$ionicView.afterEnter", function (event) {

	//Configure the UI
	$timeout(function(){ $scope.ConfigureUI(); }, 100);  
  	$timeout(function(){ $scope.view.wdg['OpenImage']['visible'] = true ; }, 1250);  
  	$timeout(function(){ $scope.view.wdg['OpenPanel']['visible'] = false; }, 1250);  
    
  
  // this ideally will be read from thingworx...
    $scope.app.params.taskList = [
      {title:"Engine Inspection",info:"S/N 123-9987, Config:Mack", icon:"/Default/square.png"},
      {title:"Engine Inspection",info:"S/N 123-9988, Config:Volvo",icon:"/Default/square.png"},
      {title:"Engine Inspection",info:"S/N 123-9995, Config:Mack", icon:"/Default/square.png"},
      {title:"AGV Maintenance",  info:"Due: today",                icon:"/Default/square.png"},
      {title:"Engine Inspection",info:"S/N 123-9999, Config:Mack", icon:"/Default/square.png"},
                                 ]; 
  
});  

$scope.ShowHideControlPanel = function(IncomingPanelName) {

	if (IncomingPanelName == 'ControlPanel') {	
	
        var dspl = document.querySelector('.ControlPanel').style.display;
	    if (dspl == '' || dspl == 'none') {      
		//if (document.querySelector('.ControlPanel').style.display == 'none') {      

			//Turn off the Open image	
			$scope.view.wdg['OpenImage']['visible'] = false;		

			document.querySelector('.ControlPanel').style.display = 'inline';	

			//Configure the UI
			$timeout(function(){ $scope.ConfigureUI(); }, 100);			
			
			//Turn on the Close image	
			$timeout(function(){ $scope.view.wdg['CloseImage']['visible'] = true; }, 1000);				
			
			
        } else {                  

			//Turn off the Close image	
			$scope.view.wdg['CloseImage']['visible'] = false;		

			document.querySelector('.ControlPanel').style.display = 'none'; 	

			$timeout(function(){ $scope.ConfigureUI(); }, 100);			
			
			//Turn on the Openimage	
			$timeout(function(){ $scope.view.wdg['OpenImage']['visible'] = true; }, 1000);
	
		}

	}

  	else if (IncomingPanelName == 'InfoPanel') {	
	
        var dspl = document.querySelector('.InfoPanel').style.display;
	    if (dspl == '' || dspl == 'none') {      

			//Turn off the Open image	
			$scope.view.wdg['OpenPanel']['visible'] = false;		

			document.querySelector('.InfoPanel').style.display = 'inline';	

			//Configure the UI
			$timeout(function(){ $scope.ConfigureUI(); }, 100);			
			
			//Turn on the Close image	
			//$timeout(function(){ $scope.view.wdg['ClosePanel']['visible'] = true; }, 1000);				
			
			
        } else {                  

			//Turn off the Close image	
			//$scope.view.wdg['ClosePanel']['visible'] = false;		

			document.querySelector('.InfoPanel').style.display = 'none'; 	

			$timeout(function(){ $scope.ConfigureUI(); }, 100);			
			
			//Turn on the OpenPanel	
			$timeout(function(){ $scope.view.wdg['OpenPanel']['visible'] = true; }, 1000);
	
		}

	}
}


$scope.EnableDeviceOrientationListener = function() {
  
	window.addEventListener('deviceorientation', $scope.DeviceOrientationFunction);   
    
}

$scope.DeviceOrientationFunction = function(event) {

	$scope.ConfigureUI();

}

$scope.EnableWindowResizeListener = function() {
  
	window.addEventListener('resize', $scope.WindowResizeFunction);   
    
}

$scope.WindowResizeFunction = function(event) {

	$scope.ConfigureUI();  
  
}

$scope.ConfigureUI = function() {

 
	//This is portrait orientation
	if ((window.orientation == 0) || (window.orientation == 180) || (window.innerHeight > window.innerWidth)) {     
      
		if (window.innerWidth <= 500)  {   

			if (window.innerHeight <= 500)  {           

				//I don't think we'd encounter this condition.  Maybe an apple watch?
			
				//Set the height of the Control Panel to be the height of the screen          
				document.querySelector('.ControlPanel').style.height = window.innerHeight + 'px';				
	
            } else {              

				//This condition is typically phones in portrait orientation
			
				//Set the height of the Control Panel          
				document.querySelector('.ControlPanel').style.height = $scope.ControlPanelHeight + 'px';

				//Set the width of the Control Panel          
				document.querySelector('.ControlPanel').style.width = $scope.ControlPanelWidth + 'px';

				//Set the top coordinate of the Control Panel, this will center the panel vertically on the screen 
				document.querySelector('.ControlPanel').style.top = ((window.innerHeight - $scope.ControlPanelHeight) / 2) + 'px';

				//Set the top coordinate of the Open Image 
				document.querySelector('.OpenImage').style.top = ((window.innerHeight - 200) / 2) + 'px';				

				//Set the top coordinate of the Close Image 
				document.querySelector('.CloseImage').style.top = ((window.innerHeight - 200) / 2) + 'px';
				
				if (document.querySelector('.ControlPanel').style.display == 'none') {				

					//Set the right coordinate of the OpenImage 
					document.querySelector('.OpenImage').style.right = '0px';				

					//Set the right coordinate of the CloseImage 
					document.querySelector('.CloseImage').style.right = '0px';					
					
				} else if (document.querySelector('.ControlPanel').style.display == 'inline') {

					//Set the right coordinate of the Open Image 
					document.querySelector('.OpenImage').style.right = $scope.ControlPanelWidth + 'px';

					//Set the right coordinate of the Close Image 
					document.querySelector('.CloseImage').style.right = $scope.ControlPanelWidth + 'px';					
					
				}
					
            }              

        } else if ((window.innerWidth > 500) && (window.innerWidth <= 700))  {   

			if (window.innerHeight <= 500)  {           

            } else {              
 
            }              

			//Set the width of the Control Panel          
			//document.querySelector('.ControlPanel').style.width = 400 + 'px'; 			

        } else if (window.innerWidth > 700)  {   

			if (window.innerHeight <= 500)  {           

				//Set the height of the Control Panel to be the height of the screen          
				//document.querySelector('.ControlPanel').style.height = window.innerHeight + 'px';			
			
            } else {              

				//This condition is typically tablets like the iPad Pro and iPad in portrait orientation			
			
				//Set the height of the Control Panel          
				document.querySelector('.ControlPanel').style.height = $scope.ControlPanelHeight + 'px';

				//Set the width of the Control Panel          
				document.querySelector('.ControlPanel').style.width = $scope.ControlPanelWidth + 'px';

				//Set the top coordinate of the Control Panel, this will center the panel vertically on the screen 
				document.querySelector('.ControlPanel').style.top = ((window.innerHeight - $scope.ControlPanelHeight) / 2) + 'px';

				//Set the top coordinate of the Open Image 
				document.querySelector('.OpenImage').style.top = ((window.innerHeight - 200) / 2) + 'px';				

				//Set the top coordinate of the Close Image 
				document.querySelector('.CloseImage').style.top = ((window.innerHeight - 200) / 2) + 'px';
				
				if (document.querySelector('.ControlPanel').style.display == 'none') {				

					//Set the right coordinate of the OpenImage 
					document.querySelector('.OpenImage').style.right = '0px';				

					//Set the right coordinate of the CloseImage 
					document.querySelector('.CloseImage').style.right = '0px';					
					
				} else if (document.querySelector('.ControlPanel').style.display == 'inline') {

					//Set the right coordinate of the Open Image 
					document.querySelector('.OpenImage').style.right = $scope.ControlPanelWidth + 'px';

					//Set the right coordinate of the Close Image 
					document.querySelector('.CloseImage').style.right = $scope.ControlPanelWidth + 'px';					
					
				}

            }      

        }               
	
	//This is landscape orientation 
    } else if ((window.orientation == 90) || (window.orientation == -90) || (window.innerHeight < window.innerWidth)) {                  
      
		if (window.innerWidth <= 500)  {   

			if (window.innerHeight <= 500)  {           

				//Set the height of the Control Panel to be the height of the screen          
				//document.querySelector('.ControlPanel').style.height = window.innerHeight + 'px';			
			
            } else {              

            }         

			//Set the width of the Control Panel to be the width of the screen          
			//document.querySelector('.ControlPanel').style.width = window.innerWidth + 'px';			

        } else if ((window.innerWidth > 500) && (window.innerWidth <= 700))  {   

			if (window.innerHeight <= 500)  {           

				//This condition is typically midsize phones like the Galaxy S7, iPhone 6/7/8, iPhone 5/SE in landscape orientation

				//Set the height of the Control Panel to be the height of the screen          
				document.querySelector('.ControlPanel').style.height = window.innerHeight + 'px';
				
				//Set the width of the Control Panel          
				document.querySelector('.ControlPanel').style.width = $scope.ControlPanelWidth + 'px';				
				
				//Set the top coordinate of the Control Panel to the top of the screen
				document.querySelector('.ControlPanel').style.top = '0px';

				//Set the top coordinate of the Open Image 
				document.querySelector('.OpenImage').style.top = ((window.innerHeight - 200) / 2) + 'px';				

				//Set the top coordinate of the Close Image 
				document.querySelector('.CloseImage').style.top = ((window.innerHeight - 200) / 2) + 'px';
				
				if (document.querySelector('.ControlPanel').style.display == 'none') {				

					//Set the right coordinate of the OpenImage 
					document.querySelector('.OpenImage').style.right = '0px';				

					//Set the right coordinate of the CloseImage 
					document.querySelector('.CloseImage').style.right = '0px';					
					
				} else if (document.querySelector('.ControlPanel').style.display == 'inline') {

					//Set the right coordinate of the Open Image 
					document.querySelector('.OpenImage').style.right = $scope.ControlPanelWidth + 'px';

					//Set the right coordinate of the Close Image 
					document.querySelector('.CloseImage').style.right = $scope.ControlPanelWidth + 'px';					
					
				}

				//Turn off the VersotracLabel
				//$scope.view.wdg['VersotracLabel']['visible'] = false;

            } else {              
 
				//Set the height of the Control Panel to be the height of the screen          
				//document.querySelector('.ControlPanel').style.height = '100px';
 
            }           
 
			//Set the width of the Control Panel          
			//document.querySelector('.ControlPanel').style.width = 400 + 'px';

        } else if (window.innerWidth > 700)  {         

			if (window.innerHeight <= 500)  {           

				//This condition is typically larger phones  like the iPhone 7/8 Plus and iPhone X, Galaxy S8/S9 in landscape orientation

				//This is to work around the iPhone X issue
				if (navigator.userAgent.match(/iPhone10,3/i)) {

					//Set the height of the Control Panel to be the height of the screen          
					document.querySelector('.ControlPanel').style.height = (window.innerHeight - 20) + 'px';			

				} else {
					
					//Set the height of the Control Panel to be the height of the screen          
					document.querySelector('.ControlPanel').style.height = window.innerHeight + 'px';					
				
				}

				//Set the width of the Control Panel          
				document.querySelector('.ControlPanel').style.width = $scope.ControlPanelWidth + 'px';				
				
				//Set the top coordinate of the Control Panel to the top of the screen
				document.querySelector('.ControlPanel').style.top = '0px';

				//Set the top coordinate of the Open Image 
				document.querySelector('.OpenImage').style.top = ((window.innerHeight - 200) / 2) + 'px';				

				//Set the top coordinate of the Close Image 
				document.querySelector('.CloseImage').style.top = ((window.innerHeight - 200) / 2) + 'px';
				
				if (document.querySelector('.ControlPanel').style.display == 'none') {				

					//Set the right coordinate of the OpenImage 
					document.querySelector('.OpenImage').style.right = '0px';				

					//Set the right coordinate of the CloseImage 
					document.querySelector('.CloseImage').style.right = '0px';					
					
				} else if (document.querySelector('.ControlPanel').style.display == 'inline') {

					//Set the right coordinate of the Open Image 
					document.querySelector('.OpenImage').style.right = $scope.ControlPanelWidth + 'px';

					//Set the right coordinate of the Close Image 
					document.querySelector('.CloseImage').style.right = $scope.ControlPanelWidth + 'px';					
					
				}

				//Turn off the VersotracLabel
				//$scope.view.wdg['VersotracLabel']['visible'] = false;

            } else {              

				//This condition is typically tablets like the iPad Pro and iPad, Galaxy Tab in landscape orientation			
			
				//Set the height of the Control Panel          
				document.querySelector('.ControlPanel').style.height = $scope.ControlPanelHeight + 'px';

				//Set the width of the Control Panel          
				document.querySelector('.ControlPanel').style.width = $scope.ControlPanelWidth + 'px';

				//Set the top coordinate of the Control Panel, this will center the panel vertically on the screen 
				document.querySelector('.ControlPanel').style.top = ((window.innerHeight - $scope.ControlPanelHeight) / 2) + 'px';

				//Set the top coordinate of the Open Image 
				document.querySelector('.OpenImage').style.top = ((window.innerHeight - 200) / 2) + 'px';				

				//Set the top coordinate of the Close Image 
				document.querySelector('.CloseImage').style.top = ((window.innerHeight - 200) / 2) + 'px';
				
				if (document.querySelector('.ControlPanel').style.display == 'none') {				

					//Set the right coordinate of the OpenImage 
					document.querySelector('.OpenImage').style.right = '0px';				

					//Set the right coordinate of the CloseImage 
					document.querySelector('.CloseImage').style.right = '0px';					
					
				} else if (document.querySelector('.ControlPanel').style.display == 'inline') {

					//Set the right coordinate of the Open Image 
					document.querySelector('.OpenImage').style.right = $scope.ControlPanelWidth + 'px';

					//Set the right coordinate of the Close Image 
					document.querySelector('.CloseImage').style.right = $scope.ControlPanelWidth + 'px';					
					
				}

            }         
        }       
 
    }  

}

$scope.setUI = function(node,icon, append, nf, ff, state, shader) {
 
  var indicator = 'r f '+(state<=2?1:0)+';g f '+(state>=2?1:0)+';b f 0';
  var tnode = node.trim();
  var bname = tnode;
  var tname = icon + ' ' + append;
  var wdg   = $scope.view.wdg[bname];
  
  wdg.src    = tname;
  wdg.shader = shader + ";"+indicator+";nf f "+nf+";ff f "+ff;
  
  //cache these values for later
  wdg.nf = nf;
  wdg.ff = ff;
  
  $scope.$applyAsync();
}


encodeImg = function(objctx, src, textAttrs, callback) {
  //debugger;
  var retImg;
  if (src === undefined) { callback(retImg); return; }
  var image = new Image();
  image.onload = function () {
    var canvas    = document.createElement('canvas');
    canvas.width  = image.width;
    canvas.height = image.height;
     
    // Get drawing context for the Canvas
    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
     
    // Draw the actual text
    textAttrs.forEach(function(ta) {
      ctx.font      = ta.font;
      ctx.fillStyle = ta.fillcolor;
      // todo: should we allow images as well as text?
	  ctx.fillText(ta.text, ta.x, ta.y);
    });
     
    var retImg = canvas.toDataURL();
    callback(objctx, retImg, image.width, image.height);
  };
  image.src = src;
};

$scope.started=false;
$scope.go = function() {
  $scope.count=0;
  
  if (!$scope.started) {
    ['navMarker'].forEach(function(i,x) {
      $scope.view.wdg[i].shader  = "panelFlag1gl;r f 1;g f 1;b f 0;nf f 1.5;ff f 6";
      $scope.view.wdg[i].src     = "app/resources/Uploaded/panelFlag1.png app/resources/Uploaded/panelFlag1mask.png";
      $scope.view.wdg[i].visible = false;
    });
 
    ['i1','i2','i6','i7'].forEach(function(i) {
      $scope.view.wdg[i].shader = "panelHilite2bgl;r f 0;g f 0;b f 1;nf f 0.5;ff f 6";
      $scope.view.wdg[i].src    = "app/resources/Uploaded/panelInfo1.png app/resources/Uploaded/panelInfo1mask.png";
    });
    ['i4'].forEach(function(i) {
      $scope.view.wdg[i].shader = "panelHilite2bgl;r f 0;g f 1;b f 1;nf f 0.5;ff f 6";
      $scope.view.wdg[i].src    = "app/resources/Uploaded/panelInfo2.png app/resources/Uploaded/panelInfo2mask.png";
    });
    ['i3','i5'].forEach(function(i) {
      $scope.view.wdg[i].shader = "panelHilite2bgl;r f 0;g f 1;b f 1;nf f 0.5;ff f 6";
      $scope.view.wdg[i].src    = "app/resources/Uploaded/panelInfo3.png app/resources/Uploaded/panelInfo3mask.png";
    });
    
    var onoff = [
      {id:'traffic1', on:true},
      {id:'traffic2', on:true},
      {id:'traffic3', on:false},
      {id:'traffic4', on:false},
      {id:'traffic5', on:true},
      {id:'traffic6', on:true},
                ];
    onoff.forEach(function(i,x) {
      $scope.view.wdg[i.id].shader = "panelTrafficgl;state f "+(i.on?3:1)+";speed f 1;nf f 0.5;ff f 1.2";
      $scope.view.wdg[i.id].src    = "app/resources/Uploaded/tl1.png?name=imgA app/resources/Uploaded/tl2.png?name=imgB";  
    });
    
    $scope.started=true;
  }
  
  $timeout(function() {
    $scope.count+=1;
    $scope.panelText('i1',1,[ 
              {title:'Robbie Robot'}, 
              {text:'Last emptied : Yesterday'} ,
              {text:'Collection   : friday'}
                            ],0.5,1.2,1);
    $scope.panelText('i2',1,[ 
              {title:'Smart tools'}, 
              {text:'Capacity : 2'} ,
              {text:'Setting  : Medium'}
                            ],0.5,1.2,2);
    $scope.panelText('i3',3,[ 
              {title:'Inspection OEE'}, 
              {text:'Running : 253 days'} ,
              {text:'Alerts  : 0'} ,
              {text:'Weekly total'} ,
              {value:42, x:950}
                            ],1.2,3,3);
    $scope.panelText('i4',2,[ 
              {title:'Engine OEE'}, 
              {text:'Running : 253 days'} ,
              {text:'Alerts  : 0'} ,
              {text:'Weekly total'} ,
              {value:42, x:920}
                            ],0.3,3,2);
    $scope.panelText('i5',3,[ 
              {title:'Rockwell OEE'}, 
              {alert:'Service Due'},       
              {text:'Speed : 5'} ,
              {text:'Parts Per Million : 42'} ,
              {text:'Reject Rate : 0'}
                            ],0.3,1.2,2);
    $scope.panelText('i6',1,[ 
              {title:'Beer'}, 
              {text:'Capacity : 300'} ,
              {text:'Setting  : Tasty!'}
                            ],0.5,1.2,1);
    $scope.panelText('i7',1,[ 
              {title:'Pizza'}, 
              {text:'Capacity : 20'} ,
              {text:'Setting  : Yummy!'}
                            ],0.5,1.2,1);
 
    $scope.flagText('navMarker',1,[ 
              {title:'Inspection'}, 
              {text:''},
              {text:'Volvo Engine'}, 
              {text:'Due: Today'} 
                            ],0.3,8,2);
                            
      
    },3000);
  
}


$scope.panelText = function(panel,idx,text,nf,ff,state) {
  
  var tblock = []; 
  var yline  = 500;
  let rgbindicator = 'rgba('+(state<=2?255:0)+','+(state>=2?255:0)+',0,1)';
  
  // build up the text bloc
  text.forEach(function (line) {
    if      (line.title!=undefined) tblock.push({text:line.title, x:500, y:365, font:'120px Arial', fillcolor:'rgba(254,150,6,1)'});
    else if (line.alert!=undefined) tblock.push({text:line.alert, x:500, y:165, font:'120px Arial', fillcolor:line.fillcolor != undefined ? line.fillcolor : rgbindicator });
    else if (line.text !=undefined) {
      tblock.push({text:line.text, x:350, y:yline, font:'96px Arial', fillcolor:'rgba(255,168,36,1)'}); yline+=150;
    }
    else if (line.value != undefined) tblock.push({text:line.value, x:line.x!=undefined?line.x :660, y:1000, font:'300px Arial', fillcolor:line.fillcolor != undefined ? line.fillcolor :'rgba(196,196,4,1)'});
  });
  
  //keep these around for the async callbac
  var cnf    = nf;
  var cff    = ff;
  var cstate = state;
  
  // async update the factory line indicator to show that we are now simulating production changes ith new line in place...
  encodeImg(panel,
            'app/resources/Uploaded/panelInfo'+idx+'.png', 
            tblock,
            function(target,img,w,h) {

              $scope.setUI(target, img, 'app/resources/Uploaded/panelInfo'+idx+'mask.png', cnf, cff, cstate, 'panelHilite2bgl');

            }
  );
}

$scope.flagText = function(panel,idx,text,nf,ff,state) {
  
  var tblock = []; 
  var yline  = 500;
  let rgbblack     = 'rgba(0,0,0,1)';
  let rgbindicator = 'rgba('+(state<=2?255:0)+','+(state>=2?255:0)+',0,1)';
  
  // build up the text bloc
  text.forEach(function (line) {
    if      (line.title!=undefined) tblock.push({text:line.title, x:700, y:370, font:'140px Arial', fillcolor:rgbblack});
    else if (line.alert!=undefined) tblock.push({text:line.alert, x:700, y:165, font:'120px Arial', fillcolor:line.fillcolor != undefined ? line.fillcolor : rgbindicator });
    else if (line.text !=undefined) {
      tblock.push({text:line.text, x:450, y:yline, font:'96px Arial', fillcolor:rgbblack}); yline+=150;
    }
    else if (line.value != undefined) tblock.push({text:line.value, x:line.x!=undefined?line.x :760, y:1000, font:'300px Arial', fillcolor:line.fillcolor != undefined ? line.fillcolor :rgbblack});
  });
  
  //keep these around for the async callbac
  var cnf    = nf;
  var cff    = ff;
  var cstate = state;
  
  // async update the factory line indicator to show that we are now simulating production changes ith new line in place...
  encodeImg(panel,
            'app/resources/Uploaded/panelFlag'+idx+'.png', 
            tblock,
            function(target,img,w,h) {

              $scope.setUI(target, img, 'app/resources/Uploaded/panelFlag'+idx+'mask.png', cnf, cff, cstate, 'panelFlag1bgl');

            }
  );
}

$scope.minNavDistance = 2; //for testing!!!    should prooably be at least 10...

$scope.navHeightOffFloor = 1.0;
$scope.headpos =  undefined;
$scope.headgaze = undefined;
$scope.cartloc  = undefined;


$scope.identifiers = [];
$scope.navigateUserTo = function() {

  // hide the panel
  $scope.ShowHideControlPanel('ControlPanel');


  // user is given directions to the machine - will likely show these as 'ribbon' rendered but fixed i.e. we'll compute the 
  // path once, draw the items on the floor. For this first attempt, we'll use the navigator widget and the hololens arrow.
  console.log('calling SpatialLocationHelper::getLocation');
  //twx.app.fn.triggerDataService('SpatialLocationHelper', 'getLocation', {locationID:'magnemover'})
  $scope.getTargetLocation();

}

//$scope.$on('getLocation.serviceInvokeComplete', function(evt) {   
$scope.getTargetLocation = function() {
  console.log('reponse from SpatialLocationHelper::getLocation');
  
  //var rowData = twx.app.mdl['SpatialLocationHelper'].svc['getLocation'].data;
  var rowData = [{position:"-3.944 0.172 3.825", gaze:"0 0 1", up:"0 1 0"}]
  
  // as the user approaches the destination, we'll get the proximity trigger which will request (from thingworx) if there are any spatially pinned items - we
  // will get the pinned experience, so we will show another panel with 'related information' which will include a button to launch the pinned experience.
  if (rowData != undefined) {
    $scope.app.params.targetloc = [{ position:rowData[0].position, gaze:rowData[0].gaze, up:rowData[0].up} ];
    
    var tp = new Vector4().FromString($scope.app.params.targetloc[0].position);
    tml3dRenderer.setTranslation("navMarker",tp.X(), tp.Y(), tp.Z());
    tml3dRenderer.setProperties ("navMarker",{ hidden:false } );

    /*
    // only show the steps IF we are at a distance where the steps the floor are spaced (min) 1m apart
    var distToTarget = Math.abs(tp.Sub($scope.headpos).Length());
    
    console.log('distance to target = ',distToTarget);
    if (distToTarget > $scope.minNavDistance)
      
      $scope.drawPath( { from: $scope.headpos, 
                           to: tp, 
                         gaze: $scope.headgaze, 
                        floor: $scope.app.params.floorOffset
                       } );
    */
    
  }

  twx.app.fn.triggerWidgetService('navigator', 'show');
  if (!twx.app.isPreview() && $scope.app.params.voiceEnabled==='true') tml3dRenderer.synthesizeSpeech({text:"FOllow the path to the flagged machine"});

//})
}


$scope.arrived = function() {
 
  // is there anything useful, nearby?
  console.log('calling SpatialLocationHelper::getLocations');
  //twx.app.fn.triggerDataService('SpatialLocationHelper', 'getLocations', {})
  $scope.getLocations();
}

//$scope.$on('getLocations.serviceInvokeComplete', function(evt) { 
$scope.getLocations = function() {
  
  console.log('reponse from SpatialLocationHelper::getLocations');
  
  //here is where we would reach out to thingworx (spatial service) to ask about spatially-pinned content
  //var rowData = twx.app.mdl['SpatialLocationHelper'].svc['getLocations'].data;
  var rowData = [
                 {position:"-3.944 0.172 3.825", gaze:"0 0 1", up:"0 1 0"},
                 {position:"-3.944 0.172 3.825", gaze:"0 0 1", up:"0 1 0"}
                ];
  
  //result should be zero or more pinned items - could be content, could be experiences.
  //in this example, we'll expect at least one experience...
  if (rowData != undefined) { 
    var nearby = [];
    var mmpos = new Vector4().FromString($scope.app.params.targetloc[0].position);
    rowData.forEach(function(row) {
      if (row.key != 'magnemover') {
        var itmpos = new Vector4().FromString(row.position);
        if (itmpos.Sub(mmpos).Length() < 1) {
          nearby.push(row.key);
        }
      }
    });
    if (nearby.length > 0) { 
      console.log(nearby);
      
      //TODO build up the popup list of nearcby content/experiences
      if (!twx.app.isPreview() && $scope.app.params.voiceEnabled==='true') tml3dRenderer.synthesizeSpeech({text:"OEM Service experience is available"});
    }
    
    tml3dRenderer.setProperties("navMarker",{ hidden:true} );

    console.log('you have arrived');
 	$scope.ShowHideControlPanel('InfoPanel');

  }
//})
}

$scope.jump = function() {
  //TODO : turn this into using the results of the thingworx call i.e. this should be data that is somehow bound to the button(s) that get created above
  //
  window.location = "https://view.vuforia.com/command/view-experience?url=https%3A%2F%2Fcds-volvo.ptcxc.com%2FExperienceService%2Fcontent%2Fprojects%2Fsxsl-liveworx-2020%2Findex.html%3FexpId%3D1";
                  //"https://view.vuforia.com/command/view-experience?url=https%3A%2F%2Fcds-volvo.ptcxc.com%2FExperienceService%2Fcontent%2Fprojects%2Fcxc-volvo-engine-tablet%2Findex.html%3FexpId%3D1";
}





$scope.nsteps = 20;
// declare the feet dynamically (see tml widget for the ng-repeat that uses this data)
$scope.tunnel_objects = (function() {
   var imgs = [];
   for (var i=1; i< $scope.nsteps; i++) {
     imgs.push( {name:"footsteps"+i, src:"app/resources/Uploaded/pathonly.png?name=img"});
   }
   return imgs;
 })();

//
// (re)position the feet based on the from/to points. Note that we ajust these to be on the floor
//
$scope.drawPath = function(arg) {
  var p0 = new Vector4().Set3(arg.to.X(),   $scope.navHeightOffFloor - arg.floor, arg.to.Z() );      // staring point
  var gz = new Vector4().Set3(arg.gaze.X(), 0,                                    arg.gaze.Z()).Normalize();
  var p2 = new Vector4().Set3(arg.from.X(), $scope.navHeightOffFloor - arg.floor, arg.from.Z()).Add(gz); 
  var gd = p0.Sub(p2).Length();
  var p1 = gz.Scale(gd/2).Add(p2);	// control point is halfway between eye and starting point, central to gaze vector
  
  // here we go : classic quadratic bezier spline curve
  var nsp1 = $scope.nsteps+1;
  for (var i=1; i<nsp1; i++) {
    var img = "footsteps"+i;
    
    //quadratic bezier B(t) = (1-t)^2.P0 + 2.(1-t).t.P1 + t^2.P2
    var t    = i/nsp1;
    var omt  = 1-t;
    var omt2 = omt*omt;
    var t2   = t*t;
    var bt   = p0.Scale(omt2).Add(p1.Scale(2*omt*t)).Add(p2.Scale(t2));
    tml3dRenderer.setTranslation(img,bt.X(),bt.Y(),bt.Z());
    
    //quadratic bezier differential (tangent) B'(t) = 2.(1-t).(P1-P0) + 2.t.(P2-P1)
    var bdt = p1.Sub(p0).Scale(2*omt).Add(p2.Sub(p1).Scale(2*t)).Normalize();
     
    // this is vector;we need eulers, so we convert to a matrix
    var up = new Vector4().Set3(0,1,0);
    var dp = up.DotP(bdt); 
    // check to see if the two vectors are close to being parallel
    if (Math.abs(dp) > 0.8) {
      // if so, choose a new 'up'
      up = new Vector4().Set3(0,0,1);
    }
    var xd = up.CrossP(bdt);
    // recalculate up
    up = bdt.CrossP(xd);	
    // build the matrix...
    var em = new Matrix4().Set3V(xd,up,bdt);
    var r90 = new Matrix4().Rotate([1,0,0],-90,true).Multiply(em.m);

    // .. and get the eulers
    var es = r90.ToEuler(true);
    tml3dRenderer.setRotation(img,es.attitude, es.heading, es.bank);
    
  }
}

$scope.resetAll = function() {
  $scope.drawPath( { from:$scope.headpos, 
                       to:$scope.headpos, 
                     gaze:$scope.headgaze, 
                    floor:-10
                   } );

  //twx.app.fn.triggerWidgetService('pinnedInfoPanel', 'hide');  
  //twx.app.fn.triggerWidgetService('cartPanel', 'hide');  
  //twx.app.fn.triggerWidgetService('introPanel', 'hide');  
  //twx.app.fn.triggerWidgetService('tl2', 'set');  
}

