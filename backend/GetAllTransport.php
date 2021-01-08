<?php
    require 'AllClasses/Transport.php';

    $_POST = json_decode(file_get_contents("php://input"));
    $unit_id = $_POST;

    $transport = new Transport;
    $insert = $transport->getTransport($unit_id);

    $response = [];
    if ($insert) {
        if ($transport->res['fetched']->num_rows > 0) {
            $getTrans = $transport->res['fetched'];
            while ($obj = $getTrans->fetch_assoc()) {
                $AllTransport[] = $obj;
            }
            echo json_encode($AllTransport);
        } else {
            $response["message"] = "no transport means";
            echo json_encode($response);
        }
    } else {
        $response["success"] = false;
        echo json_encode($response);
    }
    
    


?>