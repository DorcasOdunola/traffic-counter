<?php

    require "AllClasses/Report.php";

    $_POST = json_decode(file_get_contents("php://input"));

    $date = $_POST->date;
    $report = new Report;
    $insert = $report->getReportPerUnit($date);
    $response = [];
    if ($insert) {
        $getReport = $report->res['fetched'];
        $reports = [];
        while ($obj = $getReport->fetch_assoc()) {
            $reports[] = $obj;
        }
        echo json_encode($reports);
    } else {
       $response['getReport'] = false;
       echo json_encode($response);
    }


?>