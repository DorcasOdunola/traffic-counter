<?php
    require "AllClasses/Day.php";

    $_POST = json_decode(file_get_contents("php://input"));
    $unit_id = $_POST->unit_id;
    $day_date = $_POST->day;

    $day = new Day;
    $insert = $day->getAllDay($day_date, $unit_id);
    $response = [];
    if ($insert) {
        if ($day->res['fetched']->num_rows > 0) {
           $getAll = $day->res['fetched'];
           while ($obj = $getAll->fetch_assoc()) {
                $days[] = $obj;
            }
            echo json_encode($days);
        } else {
            $response['gotten'] = false;
        } 
    } else {
        $response['success'] = false;
        echo json_encode($response);
    }

?>