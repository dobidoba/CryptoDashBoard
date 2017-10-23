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
	
	// ## resize
	$(window).resize(function(){
		$scope.$apply(function(){
		  updateChartSize($scope);
		});
	});
	
	
  // ##############################################################################
  /* ##### FONCTIONS */
	
	function updateChart($scope) {
		console.log("ChartsCtrl.updateChart()");
		
		myCryptoCurrencies=$scope.currenciesFavorites;
				
		updateChartSize($scope);
		investChart($scope);
		changeChart7d($scope);
		changeChart24h($scope);
	}
	
	function updateChartSize($scope) {
		
		$scope.chartHeight=300;
		
		// SIZE
		windowSize=window.innerWidth;
		if (windowSize!=null){
			$scope.chartWidth=(windowSize)-65;
		}
	}
	
	function updateChartPosition(chartId,height) {
		$(chartId).css('position','fixed');
		$(chartId).css("left", ($(window).width()/2-$('#chart1').width()/2) + "px");
		$(chartId).css("top", height + "px");
	}
	
// ##############################################################################
	
	function investChart($scope) {
		
		$scope.investChartDataSource = {
				  "chart": {
					"caption": "Investment",
					"showborder": "1",
					"boderColor": "#D8D8D8",
					"bgColor": "#ffffff",
					"numbersuffix": "%",
					"showlabels":"1",
					"showlegend":"0",
					"valueFontColor": "#000000",
					"palettecolors": "#91AF64,#B0BF92,#D0DFA3,#E0F0E0",
					"theme": "zune"
				 }
			  };
			
			if (myCryptoCurrencies){
				data = new Array(myCryptoCurrencies.length);
				i=0;
				angular.forEach(myCryptoCurrencies,
					function(myCrypto){
						if (myCrypto.balance>0){
							
							pourcent=myCrypto.valueBtc/$scope.totalBtcValue*100;
							data[i++] = { label : myCrypto.name , value : pourcent};
						}
						
					}
				);
				
				$scope.investChartDataSource.data = new Array(i-1);
				i=0;
				angular.forEach(data,
					function(graphData){
						$scope.investChartDataSource.data[i++] = graphData;
					}
				);
				
				
			}
			
			
			var jsondata = angular.toJson($scope.investChartDataSource);
			
			
			var chart = FusionCharts('revenue-chart');
			if (chart){
				chart.dispose();
			}
			var revenueChart = new FusionCharts({
				id: 'revenue-chart',
				type: 'pie2d',
				renderAt: 'chart-container',
				dataFormat: 'json',
				dataSource: jsondata
			});
    revenueChart.render();
	}
	
// ##############################################################################
	
	function changeChart7d($scope) {
		$scope.changeChart7dDataSource = {
				  "chart": {
					"caption": "Coins change 7d",
					"showborder": "1",
					"boderColor": "#D8D8D8",
					"bgColor": "#ffffff",
					"labeldisplay": "ROTATE",
					"numbersuffix": "%",
					"numdivlines": "7",
					"divLineDashed": "1",
					"showAlternateHGridColor": "0",
					"valueFontColor": "#000000",
					"showCanvasBorder": "0",
					"usePlotGradientColor": "0"
				 }
			  };
			  
		if (myCryptoCurrencies){
			
			$scope.changeChart7dDataSource.data = new Array(myCryptoCurrencies.length-1);
			i=0;
				
			angular.forEach(myCryptoCurrencies,
				function(myCrypto){
					changeChartTime($scope.changeChart7dDataSource,myCrypto.name, myCrypto.percent_change_7d);
				}
			);
		}
	}
	
 // ##############################################################################	
	
	function changeChart24h($scope) {
		$scope.changeChart24hDataSource = {
				  "chart": {
					"caption": "Coins change 24h",
					"showborder": "1",
					"boderColor": "#D8D8D8",
					"bgColor": "#ffffff",
					"labeldisplay": "ROTATE",
					"numbersuffix": "%",
					"numdivlines": "7",
					"divLineDashed": "1",
					"showAlternateHGridColor": "0",
					"valueFontColor": "#000000",
					"showCanvasBorder": "0",
					"usePlotGradientColor": "0"
				 }/*,
				 "trendlines": [
						{
							"line": [
								{
									"startvalue": "20",
									"endvalue": "",
									"istrendzone": "",
									"valueonright": "1",
									"color": "fda813",
									"displayvalue": "omg",
									"showontop": "1",
									"thickness": "2"
								},
								{
									"startvalue": "40",
									"endvalue": "",
									"istrendzone": "",
									"valueonright": "1",
									"color": "f77027",
									"displayvalue": "moon",
									"showontop": "1",
									"thickness": "2"
								}
							]
						}
					]*/
			  };
			  
		if (myCryptoCurrencies){
			$scope.changeChart24hDataSource.data = new Array(myCryptoCurrencies.length-1);
			i=0;
				
			angular.forEach(myCryptoCurrencies,
				function(myCrypto){
					changeChartTime($scope.changeChart24hDataSource,myCrypto.name, myCrypto.percent_change_24h);
				}
			);
		}
	}
	
	
	function changeChartTime(datasource,myCryptoName, myCryptoChangeValue) {	

		if (myCryptoChangeValue<0){
			color="#D3D3D3";
		}
		if (myCryptoChangeValue<-5){
			color="#f0ad4e";
		}
		if (myCryptoChangeValue<-25){
			color="#d9534f";
		}
		if (myCryptoChangeValue>0){
			color="#5cb85c";
		}
		if (myCryptoChangeValue>5){
			color="#f0ad4e";
		}		
		if (myCryptoChangeValue>25){
			color="#337ab7";
		}
		
		datasource.data[i++] = { label : myCryptoName , value : myCryptoChangeValue,  "color": color};
	}
	
	
	
};
