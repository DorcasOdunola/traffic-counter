
<?php 
    require "config.php";
    // echo json_encode($con);
    // echo json_encode($res);
    // $sql = "SELECT * FROM users";
    // $res = [];
    //     $getUser = $con->query($sql);
    //         if ($getUser->num_rows>0) {
    //            $res["empty"] = false;
    //         } else {
    //            $res["empty"] = true;
    //         }  
    //         echo json_encode($res);
    class Login{
        // public $sql = "SELECT * FROM users";
        // public $res = [];
        // public $getUser;
        public function __construct(){

        }
        public function getUsers(){
            echo json_encode($con);
        //    $this->$getUser = $con->query($this->$sql);
        //     if ($getUser->num_rows>0) {
        //        $this->$res["empty"] = false;
        //     } else {
        //        $this->$res["empty"] = true;
        //     }  
        //     echo json_encode($con);
        }
    }

    $login = new Login;
    $login->getUsers();
    
    
    // require_once "User.php";
    // $User = new User();
    // $users = $User->getUsers();
    // echo $users;

    // $connect = new mysqli($host, $username, $password, $dbName);
    // if ($connect->connect_error) {
    //     die("Unable to Connect". $con->connect_error);
    // } else {
    //     $sql = "SELECT * FROM users";
    //     $response = [];
    //     $insert = $connect->query($sql);
    //     if ($insert) {
    //         // $mine = json_encode($insert);
    //         // print_r($mine);
    //         $response['success'] = true;
    //     } else {
    //         $response['success'] = false;
    //         // $me = json_encode("successfull");
    //         // echo($me);
    //     }
    //     echo json_encode($response);
    // }

    
?>