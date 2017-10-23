var app = angular.module('MyCryptoApp', ['ui.select', 'ngSanitize', 'infinite-scroll', 'ng-fusioncharts', 'ngStorage', 'ngRoute']);

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



	