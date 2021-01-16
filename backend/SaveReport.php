<?php

   require "AllClasses/Report.php";

   $_POST = json_decode(file_get_contents("php://input"));

   $report = new Report;
   $insert = $report->saveReport($_POST);

   $response = [];
   if ($insert) {
      $response['inserted'] = true;
   } else {
      $response['inserted'] = false;
   }
   echo json_encode($response);



?>