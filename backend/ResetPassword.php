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
    $email = $getEmail->email;

    $_POST = json_decode(file_get_contents("php://input"));
    $password = $_POST->password;
    $pass = password_hash($password, PASSWORD_DEFAULT);
    $user = new Users;
    $insert = $user->resetPassword($pass, $email);
    $response = [];
    if ($insert) {
       $response['updated'] = true;
    } else {
       $response['update'] = false;
    }
    echo json_encode($response);

?>