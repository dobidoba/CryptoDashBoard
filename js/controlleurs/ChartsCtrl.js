
app.controller('ChartsCtrl', ChartsCtrl);
ChartsCtrl.$inject = ['CurrenciesService','$scope'];

function ChartsCtrl(CurrenciesService,$scope) {
	

	

   // ##############################################################################
  /* ##### WATCH */
	
	$scope.$watch(function () { return CurrenciesService.getTotalBtcValue(); }, function (newValue, oldValue, $scope) {
        if (newValue !== oldValue) {
			$scope.currenciesFavorites=CurrenciesService.getCurrenciesFavorites();
			$scope.updateAllChart();		
		}
    });
	
	
  // ##############################################################################
  /* ##### INIT */
	
	
	// ##first update
	$scope.updateAllChart = function(){
			console.log("ChartsCtrl.updateAllChart()");
			updateChart($scope);		
	}
	$scope.updateAllChart();
	
	
  // ##############################################################################
  /* ##### FONCTIONS */
	
	function updateChart($scope) {
		console.log("ChartsCtrl.updateChart()");
		myCryptoCurrencies=$scope.currenciesFavorites;
		investChart($scope);
	}
	
	
// ##############################################################################
	
	function investChart($scope) {
		console.log(myCryptoCurrencies);

		if (myCryptoCurrencies){
			data = new Array(myCryptoCurrencies.length);
			i=0;
			angular.forEach(myCryptoCurrencies,
				function(myCrypto){
					if (myCrypto.balance>0){
						
						pourcent=myCrypto.valueBtc/$scope.totalBtcValue*100;
						data[i++] = { pourcent};
					}
					
				}
			);
			$scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
			$scope.data = data;
		}

		
	}
	
	
	
};
