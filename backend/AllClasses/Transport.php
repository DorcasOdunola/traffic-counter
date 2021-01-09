<?php

    require_once 'Config.php';

    class Transport extends Config {

        public function __construct() {
            parent::__construct();
        }

        public function InsertTrans($transName, $transDesc, $unitId) {
            $query = "INSERT INTO transport (transport_name, transport_desc, transport_img, unit_id) VALUES (?, ?, ?, ?)";
            $binder = array("ssss", $transName, $transDesc, $unitId);
            return $this->insert($query, $binder);
        }

        public function getTransport($unit_id) {
            $query = "SELECT * FROM transport WHERE unit_id = ?";
            $binder = array("s", $unit_id);
            return $this->selectSome($query, $binder);
        }

        public function deleteTransport($transport_id) {
            $query = "DELETE FROM transport WHERE transport_id = ?";
            $binder = array("s", $transport_id);
            return $this->delete($query, $binder);
        }

        public function updateTransport($trans_id, $trans_name, $trans_desc) {
            $query = "UPDATE transport set transport_name = ?, transport_desc = ? WHERE transport_id = ?";
            $binder = array('sss', $trans_name, $trans_desc, $trans_id);
            return $this->update($query, $binder);
        }

        public function multiInsertTransport($transports){
            $allTransports = [];
            foreach ($transports as $t) {
                $eachTransport = array($t['transport_name'], $t['transport_desc'], $t['transport_img'], $t['unit_id']);
                // $allTransports[] = $eachTransport;
                array_push($allTransports, $eachTransport);
            }
            // return $allTransports;
            $query = "INSERT INTO transport (transport_name, transport_desc, transport_img, unit_id) values (?,?,?,?)";
            $binder = "sssi";
            return $this->multiInsert($query, $allTransports, $binder);
            // return $insert;
        }
    }


?>