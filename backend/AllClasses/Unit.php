<?php
    require_once "Config.php";

    class Unit extends Config {

        public function __construct() {
            parent::__construct();
        }
        public function createUnit($unitName, $unitAddress, $unitInitial, $unitStatus, $countInterval) {
          $query = "INSERT INTO unit (name, address, initials, status, count_interval) VALUES (?, ?, ?, ?, ?)";
          $binder = array("sssss", $unitName, $unitAddress, $unitInitial, $unitStatus, $countInterval);
          return $this->insert($query, $binder);
        }

        public function selectAll() {
            $query = "SELECT * FROM unit";
            return $this->select($query);
        }

        public function deleteUnit($unit_id) {
            $query = "DELETE FROM unit WHERE unit_id = ?";
            $binder = array('s', $unit_id);
            return $this->delete($query, $binder);
        }

        public function updateUnit($unit_id, $unitName, $unitAddress, $unitInitial, $unitStatus, $countInterval) {
            $query = "UPDATE unit set name = ?, address = ?, initials = ?, status = ?, count_interval = ? WHERE unit_id = ?";
            $binder = array('ssssss',$unitName, $unitAddress, $unitInitial, $unitStatus, $countInterval, $unit_id);
            return $this->update($query, $binder);
        }

        public function getUnit($unit_id) {
            $query = "SELECT * FROM unit WHERE unit_id = ?";
            $binder = array('i', $unit_id);
            return $this->selectSome($query, $binder);
        }
    }


?>