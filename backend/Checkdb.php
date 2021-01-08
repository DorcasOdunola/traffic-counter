<?php 
    require 'AllClasses/Unit.php';
    require 'vendor/autoload.php';
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();

    $unit = new Unit;
    $insert = $unit->selectAll();
    $response = [];
    if ($insert) {
        if ($unit->res['fetched']->num_rows == 0) {
            $response['empty'] = true;
        } else {
            $response['empty'] = false;
        }
    } else {
        $response['success'] = false;
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
    //     public $sql;
    //     public $connect;
        
    //     public function __construct() {
    //         $a = new Config;
    //         $this->connect = $a->getConnection();
    //     }
    //     public function checkUnit() {
    //         $sql = "SELECT * FROM unit";
    //         $query = $this->connect->query($sql);
    //         $response = [];
    //         if ($query->num_rows == 0) {
    //           $response['empty'] = true;
    //         } else {
    //             $response['empty'] = false;
    //         }  
    //         echo json_encode($response); 
    //     }
    // }
    //  $unit = new CreateUser;
    //  $unit->checkUnit();
?>