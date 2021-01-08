<?php
    require "AllClasses/Users.php";

    $_POST = json_decode(file_get_contents("php://input"));
    $user_id = $_POST->user_id;
    $firstName = $_POST->firstName;
    $lastName = $_POST->lastName;
    $surname = $_POST->surname;
    $email = $_POST->email;
    $address = $_POST->address;
    $phoneno = $_POST->phoneNo;
    $status = $_POST->status;
    $unit_id = $_POST->unitId;

    $user = new Users;
    $insert = $user->updateUserProfile($user_id, $firstName, $lastName, $surname, $email, $phoneno, $address, $status, $unit_id);
    $response = [];
    if ($insert) {
        $response["edited"] = true;
    } else {
        $response["edited"] = false;
    }  
    echo json_encode($response); 

?>