<?php
    
    require 'AllClasses/Users.php';
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
    $fileName = $_FILES['file']['name'];
    $newName = time().$fileName;
    $moveFile = move_uploaded_file($fileName = $_FILES['file']['tmp_name'], 'uploads/'.$newName);
    $response = [];
    if ($moveFile) {
        $insert = $user->updateUserPic($newName, $email);
        if ($insert) {
            $response['inserted'] = true;
        } else {
            $response['inserted'] = false;
        }  
        $response['movedFile'] = true;
    } else {
        $response["moveFile"] = false;
    }
    echo json_encode($response);
?>