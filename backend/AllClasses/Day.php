<?php 

    require_once "Config.php";

    class Day extends Config  {
        public function __construct() {
            parent::__construct();
        }

        public function getAllDay($day_date, $unit_id) {
            $query = "SELECT * FROM day WHERE day_date = ? AND unit_id = ?";
            $binder = array('ss', $day_date, $unit_id);
            return $this->SelectSome($query, $binder);
        }

        public function insertDay() {

        }
    }




?>