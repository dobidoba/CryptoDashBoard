app.service('CurrenciesService', function() {


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
	}
	
	this.addCurrencieToFavorites = function($scope,$sce,currencieFavorite) {
		console.log("CurrenciesCtrl.addCurrencieToFavorites()");
		
		addCurrencie($sce,currencieFavorite);
		
		// MAJ SCOPE
		$scope.totalBtcValue = appData.totalBtcValue;
		$scope.currenciesFavorites = appData.currenciesFavorites;
	};
	
	this.removeCurrencieFromFavorites = function($scope,currencieFavorite) {
		console.log("CurrenciesCtrl.removeCurrencieFromFavorites()");
		
		var myCrypto = getCurrencie(appData.currenciesFavorites,currencieFavorite.symbol);
		
		// Valeur totale en BTC
		console.log(appData.totalBtcValue);
		appData.totalBtcValue = appData.totalBtcValue - (myCrypto.price_btc)*(myCrypto.balance);
		console.log(appData.totalBtcValue);
		// Remove
		appData.currenciesFavorites.splice( appData.currenciesFavorites.indexOf(myCrypto),1);
		
		myCrypto.balance = 0;
		myCrypto.favorite=false;
		
		// MAJ SCOPE
		$scope.totalBtcValue = appData.totalBtcValue;
		$scope.currenciesFavorites = appData.currenciesFavorites;
	};
	
	this.changeBalance = function($scope, myCrypto,oldBalance) {
		evalCurrencieCalculate(myCrypto);
		
		// MAJ total BTC
		appData.totalBtcValue = appData.totalBtcValue - (myCrypto.price_btc)*(oldBalance);
		appData.totalBtcValue = appData.totalBtcValue + (myCrypto.price_btc)*(myCrypto.balance);

		// MAJ SCOPE
		$scope.totalBtcValue = appData.totalBtcValue;
	}
	
// ##############################################################################
/* ##### PRIVATE */

	// construction et ajout d'une currencie
	function addCurrencie($sce,currencie) {
		
		var myCrypto = getCurrencie(appData.currenciesAll,currencie.symbol);
		
		myCrypto.balance = parseInt(currencie.balance);
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


		
	
});


