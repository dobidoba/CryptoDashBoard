app.config(['$httpProvider', function ($httpProvider) {
	console.log("disable http caching");
	//initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};    
    }    

    // extra
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache'; 
}]);

app.service('RequestService', function(StorageService) {

	// #### getCurrencies
	this.getCurrencies = function($http) {
		console.log("RequestService.getCurrencies()");
		
		$http.get('/downloadCurrencies30sec.php').then(function(data){
			console.log(data.data);
		});
		
        return $http.get("/currencies.json?callback=JSON_CALLBACK").then(function(data){
			//StorageService.saveCurrencies(data.data);
			console.log("Currencies loaded : " + data.data.length);
			return data.data;
        });
    };
	
	// #### getCurrenciesFavorites
	this.getCurrenciesFavorites = function($http) {
		console.log("RequestService.getCurrenciesFavorites()");
		
        return $http.get("/currenciesFavorites.json?callback=JSON_CALLBACK").then(function(data){
			//StorageService.saveCurrenciesFavorites(data.data);
			console.log("Currencies Favorite loaded : " + data.data.length);
			return data.data;
        });
    };
	
	
});


