<?php

	require 'highscore.php';

	$highscore = new Highscores();
	echo json_encode($highscore->getScores());
	
?>