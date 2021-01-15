<?php

    require "AllClasses/Report.php";

    $_POST = json_decode(file_get_contents("php://input"));
   

   //  $report = new Report;
   //  $transport_id = $_POST->transport_id;
   //  $unit_id = $_POST->unit_id;
   //  $user_id = $_POST->user_id;
   //  $day_id = 1;

   //  $insert = $report->saveReport($transport_id, $unit_id, $user_id, $day_id);
   //  $response = [];
   //  if ($insert) {
   //     $response['inserted'] = true;
   //  } else {
   //     $response['inserted'] = false;
   //  }
    echo json_encode($_POST);




?>