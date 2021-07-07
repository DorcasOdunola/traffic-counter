<?php 
    require "AllClasses/Unit.php";
    $_POST = json_decode(file_get_contents("php://input"));

    $unit_id = $_POST;
    $unit = new Unit;
    $insert = $unit->getUnit($unit_id);
    $response = [];
    if ($insert) {
        if ($unit->res['fetched']->num_rows > 0) {
            $getAll = $unit->res['fetched'];
            while ($obj = $getAll->fetch_assoc()) {
                $units[] = $obj;
            }
            echo json_encode($units);
        } else {
            $response['gotten'] = false;
            echo json_encode($response);
        }
    } else {
        $response['success'] = false;
        echo json_encode($response);
    }  




?>