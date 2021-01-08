<?php 
    // require 'config.php';
    require 'AllClasses/Users.php';
    require 'vendor/autoload.php';
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();


    $_POST = json_decode(file_get_contents("php://input"));
    $firstName = $_POST->firstName;
    $lastName = $_POST->lastName;
    $surname = $_POST->surname;
    $email = $_POST->email;
    $address = $_POST->address;
    $phoneno = $_POST->phoneNo;
    $password = $_POST->password;
    $status = $_POST->status;
    $unit_id = $_POST->unitId;
    $img = "profilepicture.png";
    $pass = password_hash($password, PASSWORD_DEFAULT);

    $user = new Users;
    $insert = $user->addUser($firstName, $lastName, $surname, $email, $phoneno, $address, $status, $pass, $img, $unit_id);
    $response = [];
    if ($insert) {
        $response["inserted"] = true;
    } else {
        $response["inserted"] = false;
    }  
    echo json_encode($response); 

    // class CreateUser {
    //     public $getInput;
    //     public $firstName;
    //     public $lastName;
    //     public $surname;
    //     public $email;
    //     public $address;
    //     public $phoneno;
    //     public $password;
    //     public $status;
    //     public $unit_id;
    //     public $connect;
    //     public $sql;
        
    //     public function __construct() {
    //         $this->getInput = file_get_contents("php://input");
    //         $a = new Config;
    //         $this->connect = $a->getConnection();
    //     }
    //     public function postUser() {
    //         if ($this->getInput) {
    //             $getDecode = json_decode($this->getInput);
    //             $this->firstName = $getDecode->firstName;
    //             $this->lastName = $getDecode->lastName;
    //             $this->surname = $getDecode->surname;
    //             $this->email = $getDecode->email;
    //             $this->address = $getDecode->address;
    //             $this->phoneno = $getDecode->phoneNo;
    //             $this->password = $getDecode->password;
    //             $this->status = $getDecode->status;
    //             $this->unit_id = $getDecode->unitId;
    //             $pass = password_hash($this->password, PASSWORD_DEFAULT);
    //             $this->sql = $this->connect->prepare("INSERT INTO users (first_name, last_name, surname, email, phone_number, address, status, password, unit_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    //             $this->sql->bind_param("sssssssss", $this->firstName, $this->lastName, $this->surname, $this->email, $this->phoneno, $this->address, $this->status,  $pass, $this->unit_id);

    //             $done = $this->sql->execute();
    //             $response = [];
    //             if ($done) {
    //                 $response["inserted"] = true;
    //             } else {
    //                 $response["inserted"] = false;
    //             }  
    //             echo json_encode($response);         
    //         }
    //     }
    // }
    //  $createUser= new CreateUser;
    //  $createUser->postUser();
   
  


?>