app.controller('MainCtrl', MainCtrl);
MainCtrl.$inject = ['RequestService','CurrenciesService','$scope','$http','$sce','$location'];

function MainCtrl(RequestService,CurrenciesService,$scope,$http,$sce,$location) {
  
	var currencies = RequestService.getCurrencies($http);
	var currenciesFavorites = RequestService.getCurrenciesFavorites($http);
				
	currencies.then(
		function(currencies) {
			CurrenciesService.updateCurrencies($scope,$http,$sce,$location,currencies);
			
			currenciesFavorites.then(
			function(currenciesFavorites) {
					CurrenciesService.updateCurrenciesFavorites($scope,$sce,currenciesFavorites);
			});
	  
		});
  
};
