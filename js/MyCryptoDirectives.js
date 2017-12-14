app.directive('blocInfos', function(){
  return {
    restrict: 'E',
    scope : {
      data1: '@data1',
      data2: '@data2',
      price1: '@price1',
      price2: '@price2',
      percent1: '@percent1',
      percent2: '@percent2',
      percent3: '@percent3'
    },
    templateUrl: 'pages/templates/blocInfos.html'
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
