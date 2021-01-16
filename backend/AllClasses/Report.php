<?php
    require_once "Config.php";

    class Report extends Config {
        public function __construct(){
            parent::__construct();
        }

        public function saveReport($counts) {
            $allCount = [];
            foreach ($counts as $count) {
                $eachCount = array($count->value, $count->transport_id, $count->unit_id, $count->day_id);
                array_push($allCount, $eachCount);
            }
            $query = "INSERT INTO report (value, transport_id, unit_id, day_id) VALUES (?,?,?,?)";
            $binder = "ssss";
            return $this->multiInsert($query, $allCount, $binder);
        }

        public function getAllReport() {
            $query = "SELECT COUNT(transport_id), unit_id FROM report GROUP BY unit_id";
            $binder = array('s', $unit_id);
            return $this->select($query);
        }
    }


?>