<?php
    // header("Access-Control-Allow-Origin: http://localhost:4200");
    // header("Access-Control-Allow-Headers: Content-Type, authorization");
    // header("Access-Control-Allow-Headers: ");
    // require "config.php";
    require "AllClasses/Users.php";
    require 'vendor/autoload.php';
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();
    $allheaders = getallheaders();
    $val = $allheaders['authorization'];
    $myJwt = trim(substr($val, 7));
    $checkUser = \Firebase\JWT\JWT::decode($myJwt, $_ENV['SECRET'], ['HS256']);
    $getEmail = $checkUser->info;
    $email = $getEmail->email;

    $user = new Users;
    $insert = $user->getUsers($email);
    $response = [];
    if ($insert) {
        if ($user->res['fetched']->num_rows > 0) {
            $get = $user->res['fetched'];
            $getAll = $get->fetch_assoc();
            echo json_encode($getAll);
        } else {
            $response['gotten'] = false;
            echo json_encode($response);
        }
    } else {
        $response['success'] = false;
        echo json_encode($response);
    }  




    
    // class Profile {
    //     public $email;
    //     public $connect;

    //     public function __construct() {
    //         $a = new Config;
    //         $this->connect = $a->getConnection();
           
    //         // $res = [];
    //         // $res["val"] = $checkUser->info;
    //     }
    //     public function getProfile() {
    //         $sql = "SELECT * FROM users WHERE email = '$this->email'";
    //         $get = $this->connect->query($sql);
    //         $res = [];
    //         if ($get->num_rows > 0) {
    //             $getAll = $get->fetch_assoc();
    //             echo json_encode($getAll);
    //         } else {
    //             $res['seen'] = false;
    //             echo json_encode($res);
    //         } 
    //     }
    // }

    // $getProfile = new Profile;
    // $getProfile->getProfile();
?>