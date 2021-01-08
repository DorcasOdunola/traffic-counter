<?php
    require "AllClasses/Day.php";

    $_POST = json_decode(file_get_contents("php://input"));
    $day_date = $_POST->$day_date;
    $unit_id = $_POST->unit_id;

    $day = new Day;
    $insert = $day->getAllDay($day_date, $unit_id);
    $response = [];
    if ($day->res->num_rows>0) {
        $response["exist"] = true;
    } else {
       $response['exist'] = false;
    }

    echo json_encode($response);
    


?>