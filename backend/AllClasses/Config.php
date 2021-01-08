<?php
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Headers: Content-Type, authorization");
    class Config {
        protected $host = 'localhost';
        protected $username = 'root';
        protected $password = '';
        protected $dbName = 'traffic_counter';
        public $con = '';
        public $res = [];
        public function __construct() {
            $this->con = new mysqli($this->host, $this->username, $this->password, $this->dbName);
            if ($this->con->connect_error) {
                die("Unable to Connect". $this->con->connect_error);
            } 
            
        }
        public function getConnection()
        {
            return $this->con;
        }

        public function Insert($query, $binder) {
            $stmt = $this->con->prepare($query);
            $stmt->bind_param(...$binder);
            if ($stmt->execute()) {
                $this->res['unitId'] = $this->con->insert_id;
                $this->res['true'] = true;
               return $this->res;
            } else {
                return false;
            }
        }

        public function Select($query) {
            $stmt = $this->con->prepare($query);
            if ($stmt->execute()) {
                $fetch = $stmt->get_result();
                $this->res['true'] = true;
                $this->res['fetched'] = $fetch;
                return $this->res;
            } else {
               return false;
            }   
        }


        public function SelectSome($query, $binder) {
            $stmt = $this->con->prepare($query);
            $stmt->bind_param(...$binder);
            if ($stmt->execute()) {
               $fetch = $stmt->get_result();
               $this->res['true'] = true;
               $this->res['fetched'] = $fetch;
               return $this->res;
            } else {
               return false;
            }  
        }

        public function Update($query, $binder) {
            $stmt = $this->con->prepare($query);
            $stmt->bind_param(...$binder);
            if ($stmt->execute()) {
               return true;
            } else {
                return false;
            }
        }

        public function Delete($query, $binder) {
            $stmt = $this->con->prepare($query);
            $stmt->bind_param(...$binder);
            if ($stmt->execute()) {
               return true;
            } else {
                return false;
            }
        }

        public function multiInsert($query, $items, $binder){
            $stmt = $this->conn->prepare($query);
            foreach ($items as $item) {
                $stmt->bind_param($binder, ...$items);
                $stmt->execute();
            }
        }

    }
?>