<?php

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
    error_reporting(E_ERROR);

    function sendMessage($data, $url) {
        $payload = json_encode($data);
        $ch = curl_init( "https://1c.charite.me/umc2/hs/bit/" . $url);        
        curl_setopt( $ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt( $ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            "Authorization: Basic " . base64_encode("Дмитрий:AS21208"),
        ));
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_USERPWD, "Дмитрий:AS21208");
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

    


    
    
    