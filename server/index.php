<?php 

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
    error_reporting(E_ERROR);

    function sendMessage($data, $url) {
        $settings = [
            "url" => "https://ok36.bit-live.ru/id5366-umc2",
            "username" => "bit-schedule",
            "password" => "17121992"
        ];
        $payload = json_encode($data);
        $ch = curl_init( $settings["url"] . "/hs/bit/" . $url);        
        curl_setopt( $ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt( $ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            "Authorization: Basic " . base64_encode($settings["username"] . ":" . $settings["password"]),
        ));
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true);
        $result = curl_exec($ch);
        if (curl_errno($ch)) {
            return 'ошибка';
        }
        curl_close($ch);  
        return $result;
    }      

    $post = json_decode(file_get_contents('php://input'), true);

    if (!empty($post["method"])) {
        $response = sendMessage($post["data"], $post["method"]);
        echo $response;
    } else {
        echo json_encode(array("success" => false));
    }

    
