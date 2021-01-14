<?php
    require 'AllClasses/Transport.php';
    require 'vendor/autoload.php';
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();

    // $_POST = json_decode(file_get_contents("php://input"));
    $transName = $_POST['transName'];
    $transDesc = $_POST['transDesc'];
    $unitId = $_POST['unit_id'];

    $fileName = $_FILES['file']['name'];
    $transport_img = time().$fileName;
    $moveFile = move_uploaded_file($fileName = $_FILES['file']['tmp_name'], 'uploads/'.$transport_img);
    $transport = new Transport;
    $response = [];
    if ($moveFile) {
        $insert = $transport->insertTrans($transName, $transDesc, $transport_img, $unitId);
        if($insert){
            $response['success'] = true;
        }else{
            $response['success'] = false;
            $response['message'] = "An error occurred";
        }
    } else {
       $response['moveFile'] = false;
    }
    
    echo json_encode($response);

?>