app.directive("fieldsetToggler", function(){
  return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        titre: '@titre',
        page: '@page'

      },
      template: '<fieldset  id="#legend" class="col col-xs-12">' +
      '<legend ng-click="isHidden = !isHidden;"> <i class="fa fa-toggle-right" ng-show="isHidden"></i><i class="fa fa-toggle-down" ng-show="!isHidden"></i> {{titre}} </legend>'+
      '<div class="fieldsetToggler" ng-transclude></div>'+
      '</fieldset>',
      controller: function($scope, $log){        
        $("#legend").click(function(){
          incr();
        });
        function incr(){
          console.log('clic');
          alert('toto');
          
        }
      }
  };
});

app.directive('slideToggle', function() {  
  return {
    restrict: 'A',      
    scope:{
      isOpen: "=slideToggle"
    },  
    link: function(scope, element, attr) {
      console.log('boum');
      var slideDuration = parseInt(attr.slideToggleDuration, 10) || 200;      
      scope.$watch('isOpen', function(newVal,oldVal){
        if(newVal !== oldVal){ 
          element.stop().slideToggle(slideDuration);
        }
      });
    }
  };  
});
