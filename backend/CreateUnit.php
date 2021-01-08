<?php 
    // header("Access-Control-Allow-Origin: http://localhost:4200");
    // header("Access-Control-Allow-Headers: Content-Type, authorization");
  
    require 'AllClasses/Unit.php';
    require 'vendor/autoload.php';
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();
    
    $_POST = json_decode(file_get_contents("php://input"));
    $unitName = $_POST->unitName;
    $unitAddress = $_POST->unitAddress;
    $unitInitial = $_POST->unitInitial;
    $unitStatus = $_POST->unitStatus;

    $unit = new Unit;
    $insert = $unit->createUnit($unitName, $unitAddress, $unitInitial, $unitStatus);
    $response = [];
    if ($insert) {
        $response["inserted"] = true;
    } else {
        $response["inserted"] = false;
        $response["message"] = "An error occured";
    }  
    echo json_encode($response); 

    
    // class CreateUnit {
    //     public $connect;
    //     public $getPost;
    //     public $unitName;
    //     public $unitAddress;
    //     public $unitInitial;
    //     public $unitStatus;

    //     public function __construct() {
    //         $this->getPost = file_get_contents("php://input");
    //         $a = new Config;
    //         $this->connect = $a->getConnection();
    //     }
    //     public function createUnit() {
    //         if ($this->getPost) {
    //             $post = json_decode($this->getPost);
    //             $this->unitName = $post->unitName;
    //             $this->unitAddress = $post->unitAddress;
    //             $this->unitInitial = $post->unitInitial;
    //             $this->unitStatus = $post->unitStatus;
    //             $sql = "INSERT INTO unit (name, address, initials, status) VALUES ('$this->unitName', '$this->unitAddress', '$this->unitInitial', '$this->unitStatus')";
    //             $insert = $this->connect->query($sql);
    //             $res = [];
    //             if ($insert) {
    //                 $res["inserted"]= true;
    //             } else {
    //                 $res["inserted"] = false;
    //             }
    //             echo json_encode($res);
    //         }

    //     }
    // }
    // $unit = new CreateUnit;
    // $unit->createUnit();




?>