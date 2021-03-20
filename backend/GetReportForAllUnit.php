<?php

    require "AllClasses/Report.php";

    $_POST = json_decode(file_get_contents("php://input"));
    $date = $_POST;
    $report = new Report;
    $insert = $report->getReportForAllUnit($date);
    $response = [];
    $response["date"] = $_POST;
    // if ($insert) {
    //     $getReport = $report->res['fetched'];
    //     $reports = [];
    //     while ($obj = $getReport->fetch_assoc()) {
    //         $reports[] = $obj;
    //     }
    //     echo json_encode($reports);
    // } else {
    //    $response['getReport'] = false;
    //    echo json_encode($response);
    // }
        echo json_encode($response);
?>