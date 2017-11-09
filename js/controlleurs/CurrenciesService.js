app.service('CurrenciesService', function(StorageService) {


	var appData={
		currenciesAll: [],
		currenciesFavorites: [],
		totalBtcValue: 0,
		btcPrice: 0,
		userData: null
	};
		
	this.getTotalBtcValue = function() {
		return appData.totalBtcValue;
	}
	this.getCurrenciesFavorites = function() {
		return appData.currenciesFavorites;
	}
	this.getDefaultCurrenciesFavorites = function() {
		return [{"id":"bitcoin","name":"Bitcoin","symbol":"BTC","rank":"1","price_usd":"5921.01","price_btc":"1.0","24h_volume_usd":"1852660000.0","market_cap_usd":98531154386,"available_supply":"16640937.0","total_supply":"16640937.0","percent_change_1h":"-0.7","percent_change_24h":"0.11","percent_change_7d":"4.88","last_updated":"1508743150","png":{},"png16":{},"png32":{},"$$hashKey":"object:34","balance":0,"alertMin":null,"alertMax":null,"favorite":true,"valueDollars":0,"valueBtc":0},{"id":"ethereum","name":"Ethereum","symbol":"ETH","rank":"2","price_usd":"289.19","price_btc":"0.0491174","24h_volume_usd":"306181000.0","market_cap_usd":27550613089,"available_supply":"95268208.0","total_supply":"95268208.0","percent_change_1h":"-0.5","percent_change_24h":"-2.62","percent_change_7d":"-15.34","last_updated":"1508743160","png":{},"png16":{},"png32":{},"$$hashKey":"object:35","balance":0,"alertMin":null,"alertMax":null,"favorite":true,"valueDollars":0,"valueBtc":0}];
	}
	
// ##############################################################################
/* ##### PUBLIC */

	this.updateCurrencies = function($scope,$http,$sce,$location,currencies) {
		console.log("CurrenciesCtrl.updateCurrencies()");
		 
		appData.btcPrice = currencies[0].price_usd;
		
		// traitement de chaque currencie
		angular.forEach(currencies,
			function(currencie){

				// construction et ajout d'une currencie
				var myCrypto = angular.copy(currencie);
				myCrypto=evalCurrencieStatic($sce,myCrypto);
				
				// toutes les cryptos
				appData.currenciesAll.push(myCrypto);	
			}
		);
		
		// MAJ SCOPE
		$scope.btcPrice = appData.btcPrice;
		$scope.currencies= appData.currenciesAll;
		
	};

	this.updateCurrenciesFavorites = function($scope,$sce,currenciesFavorites) {
		console.log("CurrenciesCtrl.updateCurrenciesFavorites()");

		appData.totalBtcValue = 0;
		
		// traitement de chaque currencie
		angular.forEach(currenciesFavorites,
			function(currencie){
				addCurrencie($sce,currencie);
			}
		);
		
		// MAJ SCOPE
		$scope.totalBtcValue = appData.totalBtcValue;
		$scope.currenciesFavorites = appData.currenciesFavorites;
		
		// MAJ STORAGE
		StorageService.saveCurrenciesFavorites($scope.currenciesFavorites);
	}
	
	this.addCurrencieToFavorites = function($scope,$sce,currencieFavorite) {
		console.log("CurrenciesCtrl.addCurrencieToFavorites()");
		
		addCurrencie($sce,currencieFavorite);
		
		// MAJ SCOPE
		$scope.totalBtcValue = appData.totalBtcValue;
		$scope.currenciesFavorites = appData.currenciesFavorites;
		
		// MAJ STORAGE
		StorageService.saveCurrenciesFavorites($scope.currenciesFavorites);
	};
	
	this.removeCurrencieFromFavorites = function($scope,currencieFavorite) {
		console.log("CurrenciesCtrl.removeCurrencieFromFavorites()");
		
		var myCrypto = getCurrencie(appData.currenciesFavorites,currencieFavorite.symbol);
		
		// Valeur totale en BTC
		appData.totalBtcValue = appData.totalBtcValue - (myCrypto.price_btc)*(myCrypto.balance);

		// Remove
		appData.currenciesFavorites.splice( appData.currenciesFavorites.indexOf(myCrypto),1);
		
		myCrypto.balance = 0;
		myCrypto.favorite=false;
		
		// MAJ SCOPE
		$scope.totalBtcValue = appData.totalBtcValue;
		$scope.currenciesFavorites = appData.currenciesFavorites;
		
		// MAJ STORAGE
		StorageService.saveCurrenciesFavorites($scope.currenciesFavorites);
	};
	
	this.removeAllCurrencieFromFavorites = function($scope) {
		appData.currenciesFavorites = [];
		$scope.currenciesFavorites = appData.currenciesFavorites;
	}
	
	this.changeBalance = function($scope, myCrypto,oldBalance) {
		evalCurrencieCalculate(myCrypto);
		
		// MAJ total BTC
		appData.totalBtcValue = appData.totalBtcValue - (myCrypto.price_btc)*(oldBalance);
		appData.totalBtcValue = appData.totalBtcValue + (myCrypto.price_btc)*(myCrypto.balance);

		// MAJ SCOPE
		$scope.totalBtcValue = appData.totalBtcValue;
		
		// MAJ STORAGE
		StorageService.saveCurrenciesFavorites($scope.currenciesFavorites);
	}
	
// ##############################################################################
/* ##### PRIVATE */

	// construction et ajout d'une currencie
	function addCurrencie($sce,currencie) {
		//console.log("CurrenciesService.addCurrencie");
		//console.log(currencie);
		
		if (currencie==null){
			return;
		}
		
		var myCrypto = getCurrencie(appData.currenciesAll,currencie.symbol);
		var myCryptoFav = getCurrencie(appData.currenciesFavorites,currencie.symbol);;

		if (myCryptoFav==null){	
			myCrypto.balance = parseInt(currencie.balance);

			if (currencie.alertMin) {
				myCrypto.alertMin = parseFloat(currencie.alertMin);
			}else{
				myCrypto.alertMin = null;
			}
			if (currencie.alertMax) {
				myCrypto.alertMax = parseFloat(currencie.alertMax);
			}else{
				myCrypto.alertMax = null;
			}
			
			if (isNaN(myCrypto.balance)){
				myCrypto.balance = 0;
			}
			myCrypto.favorite=true;
			myCrypto=evalCurrencieStatic($sce,myCrypto);
			myCrypto=evalCurrencieCalculate(myCrypto);
			
			// Valeur totale en BTC
			appData.totalBtcValue = appData.totalBtcValue + (myCrypto.price_btc)*(myCrypto.balance);
			// toutes les cryptos
			appData.currenciesFavorites.push(myCrypto);	
		}
	}

	function getCurrencie(currencies,symbol) {
		var myCrypto = null;
		angular.forEach(currencies,
			function(currencie){
				if (currencie.symbol === symbol){
					myCrypto =  currencie;
				}
			}
		);
		return myCrypto;
	}
	
	function evalCurrencieStatic($sce,myCrypto) {
		
		myCrypto.market_cap_usd=Number(myCrypto.market_cap_usd);
		myCrypto.png=$sce.trustAsHtml("https://files.coinmarketcap.com/static/img/coins/64x64/"+angular.lowercase(myCrypto.id)+".png");
		myCrypto.png16=$sce.trustAsHtml("https://files.coinmarketcap.com/static/img/coins/16x16/"+angular.lowercase(myCrypto.id)+".png");
		myCrypto.png32=$sce.trustAsHtml("https://files.coinmarketcap.com/static/img/coins/32x32/"+angular.lowercase(myCrypto.id)+".png");
		
		return myCrypto;
	}

	function evalCurrencieCalculate(myCrypto) {
		myCrypto.valueDollars=(myCrypto.price_btc)*(myCrypto.balance)*(appData.btcPrice);
		myCrypto.valueBtc=(myCrypto.price_btc)*(myCrypto.balance);

		return myCrypto;
	}

	 function nanToZero(value) {
		if (isNaN(value)) return 0;
		return value;
	}
	
	function toFixed(x) {
		console.log(x);
	  if (x != undefined && Math.abs(x) < 1.0) {
		var e = parseInt(x.toString().split('e-')[1]);
		if (e) {
			x *= Math.pow(10,e-1);
			x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
		}
	  } else {
		var e = parseInt(x.toString().split('+')[1]);
		if (e > 20) {
			e -= 20;
			x /= Math.pow(10,e);
			x += (new Array(e+1)).join('0');
		}
	  }
	  return x;
	}
		
	
});


