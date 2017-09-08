 
 <?php
	
	$filename = 'currencies.json';
	if (file_exists($filename)) {
		echo '<br/>'."$filename a été modifié le : " . date("Y-m-d H:i:s", filemtime($filename)) . '<br/>';
		$dte=date("Y-m-d H:i:s", filemtime($filename));
		$date= date("Y-m-d H:i:s");
		$diff=strtotime($date)-strtotime($dte);
		echo 'date serveur : '.$date.'<br/> date '.$filename.' : '.$dte. '<br/> dernier download : '.$diff.' secondes<br/>';
		
		if($diff>30){
			echo date("Y-m-d H:i:s").' - GET currencies from https://api.coinmarketcap.com/v1/ticker/ <br/>';
			shell_exec('php downloadCurrenciesHeure.php');
			echo date("Y-m-d H:i:s").' - END';
		}
		
	}
	
 ?>
 