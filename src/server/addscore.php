<?php

	require 'highscore.php';

	$score = $_POST["score"];

	$highscore = new Highscores();
	$isNewHighscore = $highscore->addScore($score);

	if ($isNewHighscore) {
		echo "true";
	} else {
		echo "false";
	}

?>