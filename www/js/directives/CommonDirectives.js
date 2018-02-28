angular.module('CommonDirectives', [])
.directive('ionicPasswordShowHide', function ($compile) {
        return {
            restrict: 'A',
            scope: {
                ngModel: '='
            },
            controller: function ($scope, $element) {
                //Parent element should be position:relative to make clear button in correct positon
                $element.parent().css( "position", "relative" );
                
                $scope.showHideBtnIcon = 'ion-eye-disabled';
                
                $scope.clearBtn = angular.element('<a tabindex="-1" ng-cloak ng-class="showHideBtnIcon" class="password-show-hide-btn button button-icon icon" ng-click="togglePasswordField()"></a>');
                $compile($scope.clearBtn)($scope);
                $element.after($scope.clearBtn);
                
                $scope.togglePasswordField = function () {
                    if( $element.attr('type') == 'password' ){
                        $element.attr('type', 'text');
                        $scope.showHideBtnIcon = 'ion-eye';
                    }else{
                        $element.attr('type', 'password');
                        $scope.showHideBtnIcon = 'ion-eye-disabled';
                    }
                }
            }
}
})

.directive('ngDraggable', function($document) {
  return {
    restrict: 'A',
    scope: {
      dragOptions: '=ngDraggable'
    },
    link: function(scope, elem, attr) {
      var startX, startY, x = 0, y = 0,
          start, stop, drag, container;

      var width  = elem[0].offsetWidth,
          height = elem[0].offsetHeight;

      // Obtain drag options
      if (scope.dragOptions) {
        start  = scope.dragOptions.start;
        drag   = scope.dragOptions.drag;
        stop   = scope.dragOptions.stop;
        var id = scope.dragOptions.container;
        if (id) {
            container = document.getElementById(id).getBoundingClientRect();
        }
      }

      // Bind mousedown event
      elem.on('mousedown', function(e) {
        e.preventDefault();
        startX = e.clientX - elem[0].offsetLeft;
        startY = e.clientY - elem[0].offsetTop;
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
        if (start) start(e);
      });

      // Handle drag event
      function mousemove(e) {
        y = e.clientY - startY;
        x = e.clientX - startX;
        setPosition();
        if (drag) drag(e);
      }

      // Unbind drag events
      function mouseup(e) {
        $document.unbind('mousemove', mousemove);
        $document.unbind('mouseup', mouseup);
        if (stop) stop(e);
      }

      // Move element, within container if provided
      function setPosition() {
        if (container) {
          if (x < container.left) {
            x = container.left;
          } else if (x > container.right - width) {
            x = container.right - width;
          }
          if (y < container.top) {
            y = container.top;
          } else if (y > container.bottom - height) {
            y = container.bottom - height;
          }
        }

        elem.css({
          top: y + 'px',
          left:  x + 'px'
        });
      }
    }
  }

})

.directive('tabs', function($state){
		return {
	   template:'<ion-tabs class="tabs-dark tabs-icon-top custom-class"><ion-tab icon-on="home" icon-off="home" class="border-tab" ng-click="browseLink(\'dashboard\')"></ion-tab><ion-tab icon-on="savedPlaces" icon-off="savedPlaces" class="border-tab" ng-click="browseLink(\'places\')"></ion-tab><ion-tab icon-on="payments" icon-off="payments" class="border-tab" ng-click="browseLink(\'payments\')"></ion-tab><ion-tab icon-on="feedback" icon-off="feedback" class="border-tab" ng-click="browseLink(\'feedback\')"></ion-tab><ion-tab icon-on="settings" ng-click="openSideMenu()" icon-off="settings"></ion-tab></ion-tabs>'
		}

})
.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
})
.directive('onLongPress', function($timeout) {
    return {
        restrict: 'A',
        link: function($scope, $elm, $attrs) {
            $elm.bind('touchstart', function(evt) {
                // Locally scoped variable that will keep track of the long press
                $scope.longPress = true;

                // We'll set a timeout for 600 ms for a long press
                $timeout(function() {
                    if ($scope.longPress) {
                        // If the touchend event hasn't fired,
                        // apply the function given in on the element's on-long-press attribute
                        $scope.$apply(function() {
                            $scope.$eval($attrs.onLongPress);
                            $scope.$eval($attrs.onclick);
                        });
                    }
                }, 600);
            });

            $elm.bind('touchend', function(evt) {
                // Prevent the onLongPress event from firing
                $scope.longPress = false;
                // If there is an on-touch-end function attached to this element, apply it
                if ($attrs.onTouchEnd) {
                    $scope.$apply(function() {
                        $scope.$eval($attrs.onTouchEnd)
                    });
                }
            });
        }
    };
});