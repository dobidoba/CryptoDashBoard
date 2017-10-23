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
        if (newValue !== oldValue) {
			$scope.totalBtcValue = newValue;
		}
    });

// ##############################################################################
/* ##### Infinite Scroll Magic */
	
  $scope.infiniteScroll = {};
  $scope.infiniteScroll.numToAdd = 20;
  $scope.infiniteScroll.currentItems = 20;
  
  $scope.resetInfScroll = function() {
     $scope.infiniteScroll.currentItems = $scope.infiniteScroll.numToAdd;
  };
  $scope.addMoreItems = function(){
     $scope.infiniteScroll.currentItems += $scope.infiniteScroll.numToAdd;
  };
	
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
		console.log("ListCurrenciesCtrl.setSelectedCurrencie()");
		$scope.selectedCurrencie = selectedCurrencie;
	}
  
  // ## updateMyCryptoBalance
	$scope.updateMyCryptoBalance = function(selectedCrypto,oldBalance){
		console.log("ListCurrenciesCtrl.updateMyCrypto()");
		
		// MAJ crypto
		CurrenciesService.changeBalance($scope,selectedCrypto,oldBalance);
	}
	
 // ## add currencie
	$scope.addcurrencie = function(selectedCrypto){
		console.log("ListCurrenciesCtrl.addcurrencie()");
		console.log(selectedCrypto);
		CurrenciesService.addCurrencieToFavorites($scope,$sce,selectedCrypto);
	}
	
  // ## delete currencie
	$scope.removeSelectedCurrencie = function(){
		console.log("ListCurrenciesCtrl.removeSelectedCurrencie()");
		CurrenciesService.removeCurrencieFromFavorites($scope,$scope.selectedCurrencie);
	}
  
};
