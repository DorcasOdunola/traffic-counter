<?php
    require "AllClasses/Day.php";

    $_POST = json_decode(file_get_contents("php://input"));
    $day_date = $_POST->date;
    $unit_id = $_POST->unit_id;

    $day = new Day;
    $insert = $day->getAllDay($day_date, $unit_id);
    $response = [];
    if ($day->res['fetched']->num_rows>0) {
        $response["exist"] = true;
    } else {
        $inserted = $day->insertDay($day_date, $unit_id);
        if ($inserted) {
            $response['inserted'] = true;
        } else {
            $response['inserted'] = false;
        }
       $response['exist'] = false;
    }
    echo json_encode($response);
    


?>