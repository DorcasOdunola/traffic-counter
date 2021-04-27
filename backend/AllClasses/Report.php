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
            $query = "SELECT * FROM report";
            return $this->select($query);
        }

        public function getReportPerUnit($date, $unit_id) {
            $query = "SELECT report_id, value, transport_id, transport_name,transport_img, report.unit_id as unit_id, day_id, day_date FROM report JOIN unit USING (unit_id) JOIN transport USING (transport_id) JOIN day USING (day_id) WHERE day_date = ? AND report.unit_id = ?";
            $binder = array('ss', $date, $unit_id);
            return $this->selectSome($query, $binder);
        }

        public function getReportPerRange($fromDate, $toDate, $unit_id) {
            $query = "SELECT report_id, value, transport_id, transport_name,transport_img, report.unit_id as unit_id, day_id, day_date FROM report JOIN unit USING (unit_id) JOIN transport USING (transport_id) JOIN day USING (day_id) WHERE (day_date BETWEEN ? AND ?) and (report.unit_id = ?)";
            //  $query = "SELECT report_id, value, report.unit_id as unit_id, day_id, day_date FROM report JOIN unit USING (unit_id) JOIN day USING (day_id) WHERE (day_date BETWEEN ? AND ?) and (report.unit_id = ?)";
            $binder = array('sss', $fromDate, $toDate, $unit_id);
            return $this->selectSome($query, $binder);
        }

        // public function getReportPerTime($date, $unit_id) {
        //     $query = "SELECT report_id, value, time, transport_id, transport_name,transport_img, report.unit_id as unit_id, day_id, day_date FROM report JOIN unit USING (unit_id) JOIN transport USING (transport_id) JOIN day USING (day_id) WHERE day_date = ? AND report.unit_id = ?";
        //     $binder = array('ss', $date, $unit_id);
        //     return $this->selectSome($query, $binder);
        // }

        public function getReportForAllUnit($date) {
            $query = "SELECT report_id, value, time, transport_id, transport_name,transport_img, report.unit_id as unit_id, name as unit_name, day_id, day_date FROM report JOIN unit USING (unit_id) JOIN transport USING (transport_id) JOIN day USING (day_id) WHERE day_date = ?";
            $binder = array('s', $date);
            return $this->selectSome($query, $binder);
        }
    }


?>