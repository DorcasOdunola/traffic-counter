<?php
    // require "config.php";
    require "AllClasses/Unit.php";
    require 'vendor/autoload.php';
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();

    $unit = new Unit;
    $insert = $unit->selectAll();
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

    // class GetAllUnit {
    //     public $connect;

    //     public function __construct() {
    //         $a = new Config;
    //         $this->connect = $a->getConnection();
    //     }

    //     public function getUnit() {
    //         $sql = "SELECT * FROM unit";
    //         $getAll = $this->connect->query($sql);
    //         $res = [];
    //         $units = [];
    //         if ($getAll->num_rows > 0) {
    //             while ($obj = $getAll->fetch_assoc()) {
    //                 $units[] = $obj;
    //             }
    //             echo json_encode($units);
    //         } else {
    //             $res['gotten'] = false;
    //             echo json_encode($res);
    //         } 
    //     }
    // }

    // $allUnit = new GetAllUnit;
    // $allUnit->getUnit();

?>