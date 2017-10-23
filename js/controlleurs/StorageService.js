app.service('StorageService', function($cacheFactory, $location) {
	
// ##############################################################################
/* ##### FONCTIONS LOAD SAVE storage */
	
	this.saveCurrenciesFavorites = function(data) {
		localStorage.setItem('CurrenciesFavorites', JSON.stringify(data));
	}
	
	this.saveCurrencies = function(data) {
		localStorage.setItem('Currencies', JSON.stringify(data));
	}
	
	this.loadCurrenciesFavorites = function() {
		return JSON.parse(localStorage.getItem('CurrenciesFavorites'));
	}
		
    this.loadCurrencies = function() {
		return JSON.parse(localStorage.getItem('Currencies'));
	}
	
// ##############################################################################
/* ##### FONCTIONS IMPORT / EXPORT */
	
	this.createExportCurrenciesFavorites = function(data){
		var currenciesJson=[];
			angular.forEach(data,
				function(cryptoCMC){
					console.log(cryptoCMC);
					var myCrypto = {};
					
					myCrypto.id = cryptoCMC.id;
					myCrypto.name = cryptoCMC.name;
					myCrypto.symbol = cryptoCMC.symbol;
					myCrypto.rank = cryptoCMC.rank;
					myCrypto.balance = cryptoCMC.balance;
					myCrypto.alertMin = cryptoCMC.alertMin;
					myCrypto.alertMax = cryptoCMC.alertMax;
					myCrypto.favorite = cryptoCMC.favorite;
					
					currenciesJson.push(myCrypto);
				}
			);
		return currenciesJson;
	}
	
});
