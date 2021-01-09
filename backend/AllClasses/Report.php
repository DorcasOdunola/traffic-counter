<?php
    require_once "Config.php";

    class Report extends Config {
        public function __construct(){
            parent::__construct();
        }

        public function saveReport($transport_id, $unit_id, $user_id, $day_id) {
            $query = "INSERT INTO report (transport_id, unit_id, user_id, day_id) VALUES (?,?,?,?)";
            $binder = array('ssss', $transport_id, $unit_id, $user_id, $day_id);
            return $this->insert($query, $binder);
        }

        public function getAllReport() {
            $query = "SELECT COUNT(transport_id), unit_id FROM report GROUP BY unit_id";
            // $binder = array('s', $unit_id);
            return $this->select($query);
        }
    }


?>