  <?php
		error_log ("downloadCurrenciesHeure.php START");
		echo '<br/>'.date("Y-m-d H:i:s").' - GET currencies from https://api.coinmarketcap.com/v1/ticker/ <br/>';
		$json = file_get_contents('https://api.coinmarketcap.com/v1/ticker/');
		$fp = fopen('currencies.json', 'w');
		fwrite($fp, $json);
		fclose($fp);
		echo date("Y-m-d H:i:s").' - END';
		
 ?>
 