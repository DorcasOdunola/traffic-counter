<?php
    require_once "Config.php";

    class Unit extends Config {

        public function __construct() {
            parent::__construct();
        }

        public function createUnit($unitName, $unitAddress, $unitInitial, $unitStatus) {
          $query = "INSERT INTO unit (name, address, initials, status) VALUES (?, ?, ?, ?)";
          $binder = array("ssss", $unitName, $unitAddress, $unitInitial, $unitStatus);
          return $this->Insert($query, $binder);
        }

        public function selectAll() {
            $query = "SELECT * FROM unit";
            return $this->Select($query);
        }

        public function deleteUnit($unit_id) {
            $query = "DELETE FROM unit WHERE unit_id = ?";
            $binder = array('s', $unit_id);
            return $this->Delete($query, $binder);
        }

        public function updateUnit($unit_id, $unitName, $unitAddress, $unitInitial, $unitStatus) {
            $query = "UPDATE unit set name = ?, address = ?, initials = ?, status = ? WHERE unit_id = ?";
            $binder = array('sssss',$unitName, $unitAddress, $unitInitial, $unitStatus, $unit_id);
            return $this->Update($query, $binder);

        }
    }


?>