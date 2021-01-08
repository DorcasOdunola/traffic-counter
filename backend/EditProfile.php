<?php

    require "AllClasses/Users.php";
    require 'vendor/autoload.php';
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();
    $allheaders = getallheaders();
    $val = $allheaders['authorization'];
    $myJwt = trim(substr($val, 7));
    $checkUser = \Firebase\JWT\JWT::decode($myJwt, $_ENV['SECRET'], ['HS256']);
    $getEmail = $checkUser->info;
    $emailJWT = $getEmail->email;

    
    $_POST = json_decode(file_get_contents("php://input"));
    $firstName = $_POST->firstName;
    $lastName = $_POST->lastName;
    $surname = $_POST->surname;
    $email = $_POST->email;
    $address = $_POST->address;
    $phoneno = $_POST->phoneNo;
    $status = $_POST->status;
    $unit_id = $_POST->unitId;

    $user = new Users;
    $insert = $user->updateUser($firstName, $lastName, $surname, $email, $phoneno, $address, $status, $unit_id, $emailJWT);
    $response = [];
    if ($insert) {
        $response["edited"] = true;
    } else {
        $response["edited"] = false;
    }  
    echo json_encode($response); 




?>