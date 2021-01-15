<?php
    require_once 'Config.php';    

    class Users extends Config {
        public function __construct(){
            parent::__construct();
        }

        public function getUsers($email) {
            $query = "SELECT * from users WHERE email = ?";
            $binder = array("s", $email);
            return $this->selectSome($query, $binder);
        }

        public function getUser($email) {
            $query = "SELECT user_id, password, first_name, users.status as user_status, unit_id, unit.name as unit_name, count_interval FROM users JOIN unit USING (unit_id) WHERE email = ? ";
            $binder = array("s", $email);
            return $this->selectSome($query, $binder);
        }

        public function addUser($firstName, $lastName, $surname, $email, $phoneno, $address, $status, $pass, $img, $unit_id){
            $query = "INSERT INTO users (first_name, last_name, surname, email, phone_number, address, status, password, image, unit_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $binder = array("ssssssssss", $firstName, $lastName, $surname, $email, $phoneno, $address, $status, $pass, $img, $unit_id);
            return $this->insert($query, $binder);
        }

        public function updateUser ($firstName, $lastName, $surname, $email, $phoneno, $address, $status, $unit_id, $emailJWT) {
            $query = "UPDATE users set first_name = ?, last_name = ?, surname = ?, email = ?, phone_number = ?, address = ?, status = ?, unit_id = ? WHERE email = ?";
            $binder = array("sssssssss", $firstName, $lastName, $surname, $email, $phoneno, $address, $status, $unit_id, $emailJWT);
            return $this->update($query, $binder);
        }

        public function getAllUser() {
            $query = "SELECT user_id, first_name, last_name, surname, email, image, phone_number, users.address, users.status as user_status, unit_id, unit.name as unit_name FROM users JOIN unit USING (unit_id)";
            return $this->select($query);
        }

        public function deleteUser($user_id) {
            $query = "DELETE FROM users WHERE user_id = ?";
            $binder = array("s", $user_id);
            return $this->delete($query, $binder);
        }

        public function updateUserProfile ($user_id, $firstName, $lastName, $surname, $email, $phoneno, $address, $status, $unit_id) {
            $query = "UPDATE users set first_name = ?, last_name = ?, surname = ?, email = ?, phone_number = ?, address = ?, status = ?, unit_id = ? WHERE user_id = ?";
            $binder = array("sssssssss", $firstName, $lastName, $surname, $email, $phoneno, $address, $status, $unit_id, $user_id);
            return $this->update($query, $binder);
        }

        public function updateUserPic($newName, $email) {
            $query = "UPDATE users SET image = ? WHERE email = ?";
            $binder = array('ss', $newName, $email);
            return $this->update($query, $binder);
        }

        public function resetPassword($pass, $email) {
            $query = "UPDATE users SET password = ? WHERE email = ?";
            $binder = array("ss", $pass, $email);
            return $this->update($query, $binder);
        }
    }


?>