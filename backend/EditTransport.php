<?php
    require "AllClasses/Transport.php";

    // $_POST = json_decode(file_get_contents("php://input"));
    $response = [];
    $trans_id = $_POST['trans_id'];
    $trans_name = $_POST['transName'];
    $trans_desc = $_POST['transDesc'];
    $transport = new Transport;
    if ($_FILES == []) {
        $trans_img = $_POST['file'];
        $insert = $transport->updateTransport($trans_id, $trans_name, $trans_desc, $trans_img);
        if ($insert) {
            $response['edited'] = true;
        } else {
            $response['edited'] = false;
        }
    } else {
        $fileName = $_FILES['file']['name'];
        $trans_img = time().$fileName;
        $moveFile = move_uploaded_file($fileName = $_FILES['file']['tmp_name'], 'uploads/'.$trans_img);
        if ($moveFile) {
            $insert = $transport->updateTransport($trans_id, $trans_name, $trans_desc, $trans_img);
            if ($insert) {
                $response['edited'] = true;
            } else {
                $response['edited'] = false;
            }
        } else {
           $response['movedFile'] = false;
        }
    }
    
    echo json_encode($response);



?>