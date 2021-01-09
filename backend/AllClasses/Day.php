<?php 

    require_once "Config.php";

    class Day extends Config  {
        public function __construct() {
            parent::__construct();
        }

        public function getAllDay($day_date, $unit_id) {
            $query = "SELECT * FROM day WHERE day_date = ? AND unit_id = ?";
            $binder = array('ss', $day_date, $unit_id);
            return $this->selectSome($query, $binder);
        }

        public function insertDay($day_date, $unit_id) {
            $query = "INSERT INTO day (day_date, unit_id) VALUES (?,?)";
            $binder = array('si', $day_date, $unit_id);
            return $this->insert($query, $binder);
        }
    }




?>