<?php
    require 'AllClasses/Users.php';
    require 'vendor/autoload.php';
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();

    $user = new Users;
    $insert = $user->getAllUser();
    $response = [];
    if ($insert) {
        $getUser = $user->res['fetched'];
        while ($obj = $getUser->fetch_assoc()) {
            $users[] = $obj;
        }
        echo json_encode($users);
    } else {
        $response["success"] = false;
        echo json_encode($response);
    }
    


?>