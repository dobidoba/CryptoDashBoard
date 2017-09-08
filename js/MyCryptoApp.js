var app = angular.module('MyCryptoApp', ['ng-fusioncharts', 'ngStorage', 'ngRoute']);

app.config(function ($routeProvider) {
	
$routeProvider
  .when('/', {
	templateUrl: '/pages/index.html',
	controller: 'MyCryptoCtrl'
  })
  .otherwise({
	redirectTo: '/'
  });
});


app.directive('setFocus', function($timeout, $rootScope) {
    return {
        restrict: 'A',
        scope: {
            personId: '@',
            index: '@',
            selectedPersonId: '@'
        },
        link: function($scope, $element, attrs) {
            $scope.$watch("index", function(currentValue, previousValue) {
                if($scope.personId == $scope.selectedPersonId)
                {
                    $timeout(function(){
                        $element[0].focus();
                    });
                }
            })
        }
    }
});


	