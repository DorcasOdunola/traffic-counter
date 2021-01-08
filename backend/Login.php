<?php
    require 'AllClasses/Users.php';
    require 'vendor/autoload.php';
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();

    $_POST = json_decode(file_get_contents("php://input"));
    $email = $_POST->email;
    $password = $_POST->password;

    $user= new Users;
    $insert = $user->getUser($email);
    $response = [];
    
    
    if($insert){
        if ($user->res['true'] == true) {
            $fetchAssoc = $user->res['fetched']->fetch_assoc();
            $fetchPass = $fetchAssoc['password'];
            $fetchName= $fetchAssoc['first_name'];
            $verifyPass = password_verify($password, $fetchPass);
            if ($verifyPass) {
                $details = [
                    "iss" => "localhost:4200",
                    "iat" => time(),
                    "nbf" => time(),
                    "exp" => time() + 7200,
                    "info" => [
                        'email' => $email
                    ]
                ];
                $myJwt = \Firebase\JWT\JWT::encode($details, $_ENV['SECRET']);
                $response["token"] = $myJwt;
                $response["firstName"] = $fetchName;
                $response["details"] = $fetchAssoc;
                $response["userDetails"] = true;
            } else {
                $response["userDet"] = false;
                $response["message"] = "Incorrect Password and Username";
            }
        }
    }else{
        $response['success'] = false;
        $response['message'] = "An error occurred";
    }

    echo json_encode($response);


?>