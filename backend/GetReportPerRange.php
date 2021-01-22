<?php

    require "AllClasses/Report.php";

    $_POST = json_decode(file_get_contents("php://input"));

    $fromDate = $_POST->fromDate;
    $toDate = $_POST->toDate;
    $unit_id = $_POST->unit_id;

    $report = new Report;
    $insert = $report->getReportPerRange($fromDate, $toDate);
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