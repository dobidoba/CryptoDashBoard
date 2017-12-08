app.directive("fieldsetToggler", function(){
  return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        titre: '@titre',
        page: '@page'

      },
      template: '<fieldset class="col col-xs-12">' +
      '<legend> {{titre}} </legend>'+
      '<div ng-transclude></div>'+
      '</fieldset>'
  };
});
