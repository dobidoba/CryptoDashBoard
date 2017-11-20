
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
	
	// ##first update
	$scope.updateAllChart = function(){
			console.log("ChartsCtrl.updateAllChart()");
			updateChart($scope);		
	}
	
	
  // ##############################################################################
  /* ##### FONCTIONS */
	
	function updateChart($scope) {
		console.log("ChartsCtrl.updateChart()");
		myCryptoCurrencies=$scope.currenciesFavorites;
		investChart($scope);
	}
	
	
// ##############################################################################
	
	function investChart($scope) {
		

		if (myCryptoCurrencies){
			
			$scope.options = {
				title: {
					display: true,
					text: 'My investment distribution (%)'
				},
				legend: {
					display: true,
					position: 'left',
					labels: {
						fontColor: 'black'
					}
				}
			}

			$scope.labels = [];
			$scope.data = [];
			i=0;
			angular.forEach(myCryptoCurrencies,
				function(myCrypto){
					if (myCrypto.balance>0){
						
						pourcent=myCrypto.valueBtc/$scope.totalBtcValue*100;
						$scope.labels[i] = myCrypto.name;
						$scope.data[i] = pourcent.toFixedDown(2);
						i=i+1;
					}
					
				}
			);
		}

		
	}
	
	
	
};


Number.prototype.toFixedDown = function(digits) {
    var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
        m = this.toString().match(re);
    return m ? parseFloat(m[1]) : this.valueOf();
};
	