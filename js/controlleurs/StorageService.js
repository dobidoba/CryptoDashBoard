app.service('StorageService', function($cacheFactory, $location) {
	
	
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
});
