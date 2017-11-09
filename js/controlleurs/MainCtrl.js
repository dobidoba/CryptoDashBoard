app.controller('MainCtrl', MainCtrl);
MainCtrl.$inject = ['RequestService','CurrenciesService', 'StorageService', '$scope','$http','$sce','$location'];

function MainCtrl(RequestService,CurrenciesService,StorageService,$scope,$http,$sce,$location) {
   
	$scope.currentCrypto = {};
   
	var currencies = RequestService.getCurrencies($http);
	
	currencies.then(
		function(currencies) {
			CurrenciesService.updateCurrencies($scope,$http,$sce,$location,currencies);
	
			var currenciesFavorites = StorageService.loadCurrenciesFavorites();	
			if (currenciesFavorites==null){
				currenciesFavorites = CurrenciesService.getDefaultCurrenciesFavorites();
			}
			if (currenciesFavorites!=null){
				CurrenciesService.updateCurrenciesFavorites($scope,$sce,currenciesFavorites);
			}
	  
		});

			
// ##############################################################################
/* ##### FONCTIONS Json Copyright */



	$scope.downloadCurrenciesFavorites = function () {
		
		$( "#saveCurrenciesFavorites" ).click(function( event ) {
			var currenciesJson = StorageService.createExportCurrenciesFavorites(CurrenciesService.getCurrenciesFavorites());
			this.href = 'data:plain/text,' + JSON.stringify(currenciesJson, null, 4);
		});
	};

	$scope.showCurrenciesFavorites = function () {
		console.log($scope.currenciesFavorites);
		var currenciesJson = StorageService.createExportCurrenciesFavorites(CurrenciesService.getCurrenciesFavorites());
		
		 var infoModal = $('#modalJson');
		 infoModal.find('.modal-body').html('<pre><code>'+JSON.stringify(currenciesJson, null, 4)+'</pre></code>');
	};
	
	
	$scope.LoadFileData = function(files) {
		
		bootbox.confirm("Update your favorite currencies ?", function(result){ 
			if (result){
				$scope.files = files;
				console.log(files[0]);
				var reader = new FileReader();
				reader.onload = onReaderLoad;
				reader.readAsText(files[0]);
				
				bootbox.alert("Currencies updated");
			}
		});
	};
	
	function onReaderLoad(event){
        var obj = JSON.parse(event.target.result);
		CurrenciesService.removeAllCurrencieFromFavorites($scope);
		CurrenciesService.updateCurrenciesFavorites($scope,$sce,obj);
    }
	
		
	
  
};
