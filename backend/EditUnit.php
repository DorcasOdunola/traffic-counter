<?php 
    require 'AllClasses/Unit.php';

    $_POST = json_decode(file_get_contents("php://input"));

    $unit_id = $_POST->unit_id;
    $unitName = $_POST->name;
    $unitAddress = $_POST->address;
    $unitInitial = $_POST->initial;
    $unitStatus = $_POST->status;

    $unit = new Unit;
    $insert = $unit->updateUnit($unit_id, $unitName, $unitAddress, $unitInitial, $unitStatus);
    $response = [];
    if ($insert) {
        $response["edited"] = true;
    } else {
        $response["edited"] = false;
        $response["message"] = "An error occured";
    }  
    echo json_encode($response); 



?>