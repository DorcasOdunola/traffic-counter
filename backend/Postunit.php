<?php 

    require "AllClasses/Unit.php";
    require "AllClasses/Users.php";
    require "AllClasses/Transport.php";
    $_POST = json_decode(file_get_contents("php://input"));
    $unitName = $_POST->unit->unitName;
    $unitAddress = $_POST->unit->unitAddress;
    $unitInitial = $_POST->unit->unitInitial;
    $unitStatus = $_POST->unit->unitStatus;
    // $carimg = "car.png";
    // $bicycleimg = "bicycle.png";
    // $bikeimg = "bike.png";
    // $vanimg = "van.png";
    // $busimg = "bus.png";
    // $lorryimg = "lorry.png";



    $unit = new Unit;
    $insert = $unit->createUnit($unitName, $unitAddress, $unitInitial, $unitAddress);
    $response = [];
    if ($insert) {
        //ADD DEFAULT TRANSPORT MEANS TO THE CREATED UNIT

        $allTransport = [
            array("transport_name" => "Odunola", "transport_desc"=>"Dorcas", "transport_img" => "Miracle", "unit_id"=>$insert),
            array("transport_name" => "Adeyemo", "transport_desc"=>"Tabitha", "transport_img" => "Demilade", "unit_id"=>$insert),
            array("transport_name" => "New", "transport_desc"=>"Transport", "transport_img" => "Means", "unit_id"=>$insert)
        ];
        
        $Transport = new Transport;
        
        $insertTransports = $Transport->multiInsert($allTransport);  //insert transports

        // ****
        $firstName = $_POST->user->firstName;
        $lastName = $_POST->user->lastName;
        $surname = $_POST->user->surname;
        $email = $_POST->user->email;
        $address = $_POST->user->address;
        $phoneno = $_POST->user->phoneNo;
        $password = $_POST->user->password;
        $status = "Admin";
        $unit_id = $unit->res['unitId'];
        $pass = password_hash($password, PASSWORD_DEFAULT);
        $user = new Users;
        // $transport = new Transport;
        $img = "profilepicture.png";

        //CREATE USER
        $inserted = $user->addUser($firstName, $lastName, $surname, $email, $phoneno, $address, $status, $pass, $img, $unit_id);
        // $insertTransport = 
        if ($inserted) {
           $user_id = $user->res['unitId'];
           $response["inserted"] = true;
           $response["unitId"] = $unit_id;
           $response["unitInitial"] = $unitInitial;
           $response["unitName"] = $unitName;
           $response["userName"] = $firstName;
           $response["userId"] = $user_id;
        } else {
            $response["inserted"] = false;
        }
    } else {
        $response["success"] = false;
    }
    echo json_encode($response);
    


    // class CreateUnit {
    //     public $getInput;
    //     public $unitName;
    //     public $unitAddress;
    //     public $unitInitial;
    //     public $unitStatus;
    //     public $firstName;
    //     public $lastName;
    //     public $surname;
    //     public $email;
    //     public $address;
    //     public $phoneno;
    //     public $password;
    //     public $connect;
    //     public $sql;
    //     public $response = [];
    //     public $getId;
    //     public $getDecode;
        
    //     public function __construct() {
    //         $this->getInput = file_get_contents("php://input");
    //         $a = new Config;
    //         $this->connect = $a->getConnection();
    //     }
    //     public function postUnit() {
    //         if ($this->getInput) {
    //             $this->getDecode = json_decode($this->getInput);
    //             $this->unitName = $this->getDecode->unit->unitName;
    //             $this->unitAddress = $this->getDecode->unit->unitAddress;
    //             $this->unitInitial = $this->getDecode->unit->unitInitial;
    //             $this->unitStatus = $this->getDecode->unit->unitStatus;
    //             $this->sql = "INSERT INTO unit (name, address, initials, status) VALUES ('$this->unitName', '$this->unitAddress', '$this->unitInitial', '$this->unitStatus')";
    //             $insert = $this->connect->query($this->sql);
    //             $this->getId = mysqli_insert_id($this->connect);
    //             if ($insert) {
    //                $this->postUser(); 
    //             } else {
    //                 $this->response["insertUnit"] = false;
    //             }         
    //         }
    //     }
        
    //     public function postUser() {
    //         $this->firstName = $this->getDecode->user->firstName;
    //         $this->lastName = $this->getDecode->user->lastName;
    //         $this->surname = $this->getDecode->user->surname;
    //         $this->email = $this->getDecode->user->email;
    //         $this->address = $this->getDecode->user->address;
    //         $this->phoneno = $this->getDecode->user->phoneNo;
    //         $this->password = $this->getDecode->user->password;
    //         $pass = password_hash($this->password, PASSWORD_DEFAULT);
    //         $this->sql = "INSERT INTO users (first_name, last_name, surname, email, phone_number, address, password, status, unit_id) VALUES ('$this->firstName', '$this->lastName', '$this->surname', '$this->email', '$this->phoneno', '$this->address', '$pass', 'Admin', '$this->getId')";
    //         $insertUser = $this->connect->query($this->sql);
    //         $getuserId = mysqli_insert_id($this->connect);
    //         if ($insertUser) {
    //             $this->response["inserted"] = true;
    //             $this->response["unitId"] = $this->getId;
    //             $this->response["unitInitial"] = $this->unitInitial;
    //             $this->response["unitName"] = $this->unitName;
    //             $this->response["userName"] = $this->firstName;
    //             $this->response["userId"] = $getuserId;
    //         } else {
    //             $this->response["inserted"] = false;
    //         }
    //         echo json_encode($this->response); 
    //     }
    // }
    // $createUnit = new CreateUnit;
    // $createUnit->postUnit();
   
  


?>