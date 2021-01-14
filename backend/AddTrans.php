<?php
    require 'AllClasses/Transport.php';
    require 'vendor/autoload.php';
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();

    $_POST = json_decode(file_get_contents("php://input"));
    $transName = $_POST->transName;
    $transDesc = $_POST->transDesc;
    $unitId = $_POST->unitId;

    $transport = new Transport;
    $insert = $transport->insertTrans($_POST->transName, $_POST->transDesc, $_POST->unitId);

    $response = [];
    if($insert){
        $response['success'] = true;
    }else{
        $response['success'] = false;
        $response['message'] = "An error occurred";
    }
    echo json_encode($response);

?>