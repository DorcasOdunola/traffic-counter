<?php 
    // header("Access-Control-Allow-Origin: http://localhost:4200");
    // header("Access-Control-Allow-Headers: Content-Type, authorization");
  
    require 'AllClasses/Unit.php';
    require 'AllClasses/Transport.php';
    require 'AllClasses/Users.php';
    require 'vendor/autoload.php';
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();
    
    $_POST = json_decode(file_get_contents("php://input"));
    $unitName = $_POST->unitName;
    $unitAddress = $_POST->unitAddress;
    $unitInitial = $_POST->unitInitial;
    $unitStatus = $_POST->unitStatus;
    $countInterval = "60000";

    $unit = new Unit;
    $insert = $unit->createUnit($unitName, $unitAddress, $unitInitial, $unitStatus, $countInterval);
    $response = [];
    if ($insert) {
        $unit_id = $unit->res['id'];
        // ADD DEFAULT TRANSPORT MEANS TO THE CREATED UNIT
        $allTransport = [
            array("transport_name" => "Car", "transport_desc"=>"Car", "transport_img" => "car.png", "unit_id"=>$unit_id),
            array("transport_name" => "Bus", "transport_desc"=>"Bus", "transport_img" => "bus.png", "unit_id"=>$unit_id),
            array("transport_name" => "Bike", "transport_desc"=>"Bike", "transport_img" => "bike.png", "unit_id"=>$unit_id),
            array("transport_name" => "Bicycle", "transport_desc"=>"Bicycle", "transport_img" => "bicycle.png", "unit_id"=>$unit_id),
            array("transport_name" => "Van", "transport_desc"=>"Van", "transport_img" => "van.png", "unit_id"=>$unit_id),
            array("transport_name" => "Lorry", "transport_desc"=>"Lorry", "transport_img" => "lorry.png", "unit_id"=>$unit_id)
        ];
        $transport = new Transport;
        $insertTransports = $transport->multiInsertTransport($allTransport);  //insert transports
        //***** End of creating transport means */
        //Creating default User//
        $firstName = "User";
        $lastName = "MyUser";
        $surname = "Default";
        $email = "user@gmail.com";
        $address = "User address";
        $phoneno = "00000000000";
        $password = "user";
        $status = "Admin";
        $img = "profilepicture.png";
        $pass = password_hash($password, PASSWORD_DEFAULT);

        $user = new Users;
        $insert = $user->addUser($firstName, $lastName, $surname, $email, $phoneno, $address, $status, $pass, $img, $unit_id);
        //**End of creating default user */
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