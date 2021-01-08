<?php
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Headers: Content-Type, authorization");
    class Config {
        protected $host = 'localhost';
        protected $username = 'root';
        protected $password = '';
        protected $dbName = 'traffic_counter';
        public $con = '';
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
            $stmt = bind_param(...$binder);
            if ($stmt->execute()) {
                return true;
            } else {
                return false;
            }
        }

        public function SelectAll($query) {
            $stmt = $this->con->prepare($query);
            $stmt->execute();
            if ($stmt->execute()) {
                return true;
            } else {
               return false;
            }   
        }

        public function SelectSome($query, $binder) {
            $stmt = $this->con->prepare($query);
            $stmt = bind_param(...$binder);
            $stmt->execute();
            if ($stmt->execute()) {
                return true;
            } else {
               return false;
            }  

        }
    }
?>