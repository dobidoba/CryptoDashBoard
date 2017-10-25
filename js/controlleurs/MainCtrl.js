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
/* ##### FONCTIONS Json Copyright */



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
	
	
	$scope.LoadFileData = function(files) {
		$scope.files = files;
		console.log(files[0]);
		var reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(files[0]);
		
		this.showCurrenciesFavorites();
	};
	
	function onReaderLoad(event){
        var obj = JSON.parse(event.target.result);
		CurrenciesService.removeAllCurrencieFromFavorites($scope);
		CurrenciesService.updateCurrenciesFavorites($scope,$sce,obj);
    }
	
		
	
  
};
