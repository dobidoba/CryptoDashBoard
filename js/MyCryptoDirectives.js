app.directive('coinHeader', function(){
  return {
    restrict: 'E',
    scope : true,
    templateUrl: 'pages/templates/coinHeader.html'
  }
});

app.directive('coinInfos', function(){
  return {
    restrict: 'E',
    scope : true,
    templateUrl: 'pages/templates/coinInfos.html'
  }
});

app.directive('slideToggle', function() {  
  return {
    restrict: 'A',      
    scope:{
      isOpen: "=slideToggle"
    },  
    link: function(scope, element, attr) {
      var slideDuration = parseInt(attr.slideToggleDuration, 10) || 200;      
      scope.$watch('isOpen', function(newVal,oldVal){
        if(newVal !== oldVal){ 
          element.stop().slideToggle(slideDuration);
        }
      });
    }
  };  
});
