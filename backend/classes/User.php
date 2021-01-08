<?php
    require 'Config.php';

    class User extends Config{
        public function __construct(){
            parent::__construct();
        }

        public function getUsers(){
            $query = "SELECT * from users";
            return $this->Read($query);
        }

        public function addUser($firstName, $lastName, $surname, $email, $address, $phoneno, $password, $status, $unit_id){
            $query = "INSERT INTO users (first_name, last_name, surname, email, phone_number, address, status, password, unit_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $binder = array("sssssssss", $firstName, $lastName, $surname, $email, $phoneno, $address, $status,  $pass, $unit_id);

            return $this->Create($query, $binder);
        }

        public function deleteUser($user_id){
            $query = "DELETE from users where user_id = ?";
            $binder = array("s", $user_id);

            return $this->Delete($query, $binder);

        }
    }
?>