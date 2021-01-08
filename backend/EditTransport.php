<?php
    require "AllClasses/Transport.php";

    $_POST = json_decode(file_get_contents("php://input"));
    $trans_id = $_POST->trans_id;
    $trans_name = $_POST->trans_name;
    $trans_desc = $_POST->trans_desc;

    $transport = new Transport;
    $insert = $transport->updateTransport($trans_id, $trans_name, $trans_desc);
    $response = [];
    if ($insert) {
        $response['edited'] = true;
    } else {
        $response['edited'] = false;
    }
    echo json_encode($response);
    


?>