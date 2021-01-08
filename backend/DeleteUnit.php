<?php 
    require 'AllClasses/Unit.php';

    $_POST = json_decode(file_get_contents("php://input"));

    $unit_id = $_POST;
    
    $unit = new Unit;
    $insert = $unit->deleteUnit($unit_id);

    $response = [];
    if($insert){
        $response['deleted'] = true;
    }else{
        $response['deleted'] = false;
        $response['message'] = "An error occurred";
    }

    echo json_encode($response);

?>