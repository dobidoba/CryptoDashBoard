app.directive('coinHeader', function(){
  return {
    restrict: 'E',
    scope : true,
    templateUrl: 'pages/templates/coinHeader.html'
  }
});

app.directive('coinInfos1', function(){
  return {
    restrict: 'E',
    scope : true,
    templateUrl: 'pages/templates/coinInfos1.html'
  }
});
app.directive('coinInfos2', function(){
  return {
    restrict: 'E',
    scope : true,
    templateUrl: 'pages/templates/coinInfos2.html'
  }
});

app.directive('slideToggle', function() {  
  return {
    restrict: 'A',      
    scope:{
      isOpen: "=slideToggle"
    },  
    link: function(scope, element, attr) {
      
      if(attr.slideToggleHide){
        element.hide();
      }
      
      scope.$watch('isOpen', function(newVal,oldVal){
        if(newVal !== oldVal){ 
          element.stop().slideToggle(200);
        }
      });
    }
  };  
});
