<?php

	class Highscores {

		private $highscores;

		// Construct Highscores, Read in CSV File
		public function __construct() {
			$this->highscores = array();
			if (($file = fopen("scores.csv", "r")) !== FALSE) {
			    while (($data = fgetcsv($file, 1000, ",")) !== FALSE) {
			        for ($i=0; $i < sizeof($data); $i++) {
			            array_push($this->highscores, $data[$i]);
			        }
			    }
			    fclose($file);
			}
		}

		// Save Highscores Array to CSV File
		private function saveHighscores() {
			$file = fopen('scores.csv', 'w');
			fputcsv($file, $this->highscores);
			fclose($file);
		}

		// Get Highscores
		public function getScores() {
			return $this->highscores;
		}

		// Add New Score to Highscores Array & Resort Top 10
		public function addScore($newScore) {
			$flag = false;
			for ($i = 0; $i < sizeof($this->highscores); $i++) { 
				if ($newScore > $this->highscores[$i]) {
					$flag = true;
					array_push($this->highscores, $newScore);
					arsort($this->highscores);
					$this->highscores = array_slice($this->highscores, 0, 10);
					$this->saveHighscores();
				}
			}
			return $flag;
		}

	}

?>