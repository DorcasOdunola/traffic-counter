<?php
    require 'AllClasses/Users.php';

    $_POST = json_decode(file_get_contents("php://input"));

    $user_id = $_POST;
    // $response = [];
    // $response["user_id"] = $user_id;

    $user = new Users;
    $insert = $user->deleteUser($user_id);

    $response = [];
    if($insert){
        $response['deleted'] = true;
    }else{
        $response['deleted'] = false;
        $response['message'] = "An error occurred";
    }

    echo json_encode($response);