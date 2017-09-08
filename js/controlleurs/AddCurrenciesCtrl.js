app.controller('AddCurrenciesCtrl', AddCurrenciesCtrl);
AddCurrenciesCtrl.$inject = ['CurrenciesService','$scope','$sce'];

function AddCurrenciesCtrl(CurrenciesService,$scope,$sce) {

// ##############################################################################
/* ##### FONCTIONS */
  
	// ## changeFavorite
	$scope.changeFavorite = function (currencie) {
		currencie.favorite=!currencie.favorite;
		
		// ajout de la currencie
		if (currencie.favorite){
			CurrenciesService.addCurrencieToFavorites($scope,$sce,currencie);
		}
		//suppression de la currencie
		if (!currencie.favorite){
			CurrenciesService.removeCurrencieFromFavorites($scope,currencie);
		}
		
		
	};
	
	// ## showFavorite
	$scope.showFavorite = function () {
		$scope.showOnlyFavorite = !$scope.showOnlyFavorite;
	}
	
};





