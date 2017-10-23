app.controller('MainCtrl', MainCtrl);
MainCtrl.$inject = ['RequestService','CurrenciesService', 'StorageService', '$scope','$http','$sce','$location'];

function MainCtrl(RequestService,CurrenciesService,StorageService,$scope,$http,$sce,$location) {
   
	$scope.currentCrypto = {};
   
	var currencies = RequestService.getCurrencies($http);
	
	currencies.then(
		function(currencies) {
			CurrenciesService.updateCurrencies($scope,$http,$sce,$location,currencies);
	
			var currenciesFavorites = StorageService.loadCurrenciesFavorites();	
			if (currenciesFavorites!=null){
				CurrenciesService.updateCurrenciesFavorites($scope,$sce,currenciesFavorites);
			}
	  
		});

			
// ##############################################################################
/* ##### FONCTIONS Copyright */

	$scope.downloadCurrenciesFavorites = function () {
		
		$( "#saveCurrenciesFavorites" ).click(function( event ) {
			var currenciesJson = StorageService.createExportCurrenciesFavorites($scope.currenciesFavorites);
			this.href = 'data:plain/text,' + JSON.stringify(currenciesJson, null, 4);
		});
	};

	$scope.showCurrenciesFavorites = function () {
		
		var currenciesJson = StorageService.createExportCurrenciesFavorites($scope.currenciesFavorites);
		
		 var infoModal = $('#modalJson');
		 infoModal.find('.modal-body').html('<pre><code>'+JSON.stringify(currenciesJson, null, 4)+'</pre></code>');
	};
	
	
	$scope.uploadCurrenciesFavorites = function () {
		
		$( "#saveCurrenciesFavorites" ).click(function( event ) {
			this.href = 'data:plain/text,' + JSON.stringify($scope.currenciesFavorites);
		});
	};
  
};
