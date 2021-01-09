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

        public function insert($query, $binder) {
            $stmt = $this->con->prepare($query);
            $stmt->bind_param(...$binder);
            if ($stmt->execute()) {
                $this->res['id'] = $this->con->insert_id;
                $this->res['true'] = true;
               return $this->res;
            } else {
                return false;
            }
        }

        public function select($query) {
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


        public function selectSome($query, $binder) {
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

        public function update($query, $binder) {
            $stmt = $this->con->prepare($query);
            $stmt->bind_param(...$binder);
            if ($stmt->execute()) {
               return true;
            } else {
                return false;
            }
        }

        public function delete($query, $binder) {
            $stmt = $this->con->prepare($query);
            $stmt->bind_param(...$binder);
            if ($stmt->execute()) {
               return true;
            } else {
                return false;
            }
        }

        public function multiInsert($query, $items, $binder){
            $stmt = $this->con->prepare($query);
            $check = false;
            foreach ($items as $item) {
                // $bind_value = array($binder, ...$items);
                $stmt->bind_param($binder, ...$item);
                if($stmt->execute()){
                    $check = true;
                }
            }
            // echo json_encode($stmt);
            return $check;
            // if ($don) {

            //    return true;
            // } else {
            //    return false;
            
            
        }

    }
?>