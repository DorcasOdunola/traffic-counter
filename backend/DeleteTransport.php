<?php
    require 'AllClasses/Transport.php';

    $_POST = json_decode(file_get_contents("php://input"));
    $transport_id = $_POST;

    $transport = new Transport;
    $insert = $transport->deleteTransport($transport_id);
    $response = [];
    if ($insert) {
        $response["deleted"] = true;
    } else {
        $response["deleted"] = false;
    }
    echo json_encode($response);
    

    


?>