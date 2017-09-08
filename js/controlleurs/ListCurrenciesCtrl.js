app.controller('ListCurrenciesCtrl', ListCurrenciesCtrl);
ListCurrenciesCtrl.$inject = ['RequestService','CurrenciesService','$scope','$window','$http','$sce','$location'];

// ############## LISTE DES CURRENCIES
function ListCurrenciesCtrl(RequestService,CurrenciesService,$scope,$window,$http,$sce,$location) {
  
  
// ##############################################################################
/* ##### INIT */

  $scope.sortType     = 'market_cap_usd'; 	// set the default sort type
  $scope.sortReverse  = true;  				// set the default sort order
  $scope.searchCurrencie   = '';     		// set the default search/filter term  
  $scope.windowWidth = $window.innerWidth;
   

  $scope.$watch(function () { return CurrenciesService.getTotalBtcValue(); }, function (newValue, oldValue) {
        if (newValue !== oldValue) $scope.totalBtcValue = newValue;
    });
	
	
// ##############################################################################
/* ##### FONCTIONS */
  
  // ## showDetail
	$scope.showDetail = function (myCryptoSymbol) {
		if ($scope.activeDetail != myCryptoSymbol) {
		  $scope.activeDetail = myCryptoSymbol;
		}
		else {
		  $scope.activeDetail = null;
		}
	};
  
  // ## selectedCurrencie
	$scope.setSelectedCurrencie = function(selectedCurrencie){
		console.log("CurrenciesCtrl.setSelectedCurrencie()");
		$scope.selectedCurrencie = selectedCurrencie;
	}
  
  // ## updateMyCryptoBalance
	$scope.updateMyCryptoBalance = function(selectedCrypto,oldBalance){
		console.log("CurrenciesCtrl.updateMyCrypto()");
		
		// MAJ crypto
		CurrenciesService.changeBalance($scope,selectedCrypto,oldBalance);
	}
	
  // ## delete currencie
	$scope.removeSelectedCurrencie = function(){
		console.log("CurrenciesCtrl.removeSelectedCurrencie()");
		CurrenciesService.removeCurrencieFromFavorites($scope,$scope.selectedCurrencie);
	}
  
};
