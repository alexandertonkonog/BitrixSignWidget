<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
    header('Content-Security-Policy: upgrade-insecure-requests');
    error_reporting(0);
    $settings = json_decode(file_get_contents('./settings.json'));
    $address = $settings->settings->address;
    $timeReserve = $settings->settings->timeReserve;
    $url = $address."ws/ws1.1cws?wsdl";
    $options = array(
        'login'=>'Admin',
        'password'=>'123Fktrcfylh123',
        "soap_version" => SOAP_1_1,
        "stream_context" => stream_context_create(
            [
                'ssl' => [
                    'verify_peer'       => false,
                    'verify_peer_name'  => false,
                ]
            ]
        )
    );
    $client = new SoapClient($url, $options);
    function getTime($beg, $fin, $time) {
        $arr = array();
        while($beg < $fin) {
            array_push($arr, $beg->format('Y-m-d H:i:s'));
            $beg = $beg->modify("+$time minutes");
        }
        return $arr;
    }
    function getDuration($durArr, $employee) {  
        $userDur;
        foreach($durArr as $val) {
            if($val->id == $employee->employee->id) {
                $userDur = $val->duration;
                break;
            }
        }
        return $userDur;
        
    }
    if($_SERVER['REQUEST_METHOD'] == 'GET' && $_GET['type'] == 'clinic') {
        $obj = $client->__soapCall("GetListClinic", array(), $options);
        $xml = new SimpleXMLElement($obj->return);
        $need = array();
        foreach ($xml as $value) {
            $needObj = new stdClass();
            $needObj->id = $value->УИД->__toString();
            $needObj->name = $value->Наименование->__toString();
            array_push($need, $needObj);
        }
        
        echo json_encode($need);
    } else if($_SERVER['REQUEST_METHOD'] == 'GET' && $_GET['type'] == 'time') {
        $finishDate = (new dateTime($_GET['startDate']))->modify("+1 month")->format('Y-m-d\TH:i:s');
        $params = array('StartDate'=>$_GET['startDate'], 'FinishDate'=>$finishDate);
        $obj = $client->__soapCall("GetSchedule", array($params), $options);
        $employees = $client->__soapCall("GetListEmployees", array(), $options);
        $list = new SimpleXMLElement($employees->return);
        $response = new stdClass();
        $durationList = array();      
        if(!empty($list)) {
            foreach($list->Сотрудник as $value) {
                $dur = new stdClass();
                $dur->id = $value->UID;
                if(isset($value->ОсновныеУслуги->ОсновнаяУслуга->Продолжительность)) {
                    $time = $value->ОсновныеУслуги->ОсновнаяУслуга->Продолжительность->__toString();
                    $dur->duration = (new dateTime($time))->format('i');
                } else {
                    $dur->duration = $timeReserve;
                }
                array_push($durationList, $dur);
            }
        }
        $xml = new SimpleXMLElement($obj->return);
        $need = array();
        if(!empty($xml)) {
            foreach ($xml as $value) {

                $needObj = new stdClass();

                $needObj->employee = new stdClass();
                $needObj->employee->id = $value->СотрудникID->__toString();
                $needObj->employee->name = $value->СотрудникФИО->__toString();
                $needObj->employee->spec = $value->Специализация->__toString();

                $needObj->clinic = $value->Клиника->__toString();

                $needObj->time = array();
                $err = null;

                $employeeDur = getDuration($durationList, $needObj);
                if(!empty($value->ПериодыГрафика->СвободноеВремя)) {
                    foreach($value->ПериодыГрафика->СвободноеВремя->ПериодГрафика as $val) { 
                        if($val->Клиника->__toString() == $_GET['clinicId']) {
                            $dateBegin = new dateTime($val->ВремяНачала->__toString());
                            $dateFinal = new dateTime($val->ВремяОкончания->__toString());
                            array_push($needObj->time, getTime($dateBegin, $dateFinal, $employeeDur));
                        } else {
                            $err = true;
                            break;
                        }
                    }
                } else {
                    $err = true;
                }
                if($err != true) {
                    array_push($need, $needObj);
                }                
            }
            if(!empty($need)) {
                echo json_encode($need);
            } else {
                $response->success = "false";
                echo json_encode($response);
            }
        } else {
            $response->success = "false";
            echo json_encode($response);
        }
    } else if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $data = json_decode(file_get_contents('php://input'));
        if($data->type == 'sign') {
            $params = array('EmployeeID'=>$data->medic, 'Clinic'=>$data->clinic, 'Date'=>$data->today,
            'TimeBegin'=>$data->dateTime, 'Specialization'=>$data->spec);
            $obj = $client->__soapCall("GetReserve", array($params), $options);
            $xml = new SimpleXMLElement($obj->return);
            // echo json_encode($xml);
            if($xml->Результат->__toString() == "true") {
                $GUID = $xml->УИД->__toString();
                $secParams = array('EmployeeID'=>$data->medic, 'Clinic'=>$data->clinic, 'Date'=>$data->today,
                'TimeBegin'=>$data->dateTime, 'Specialization'=>$data->spec, 'PatientSurname'=>$data->surname, 'PatientName'=>$data->name, 'PatientFatherName'=>'',
                'Comment'=>$data->comment, 'Phone'=>$data->number, 'Email'=>'', 'Address'=>$data->address, 'GUID'=>$GUID);
                $secObj = $client->__soapCall("BookAnAppointment", array($secParams), $options);
                $xml2 = new SimpleXMLElement($secObj->return);
                $need = new stdClass();
                $need->success = $xml2->Результат->__toString();
                echo json_encode($need);
            }
        } else if ($data->type == 'call'){
            $params = array('Specialization'=>$data->spec, 'Clinic'=>$data->clinic, 'Date'=>$data->today,
            'TimeBegin'=>$data->dateTime, 'PatientSurname'=>$data->surname, 'PatientName'=>$data->name, 'PatientFatherName'=>'',
            'Comment'=>$data->comment, 'Phone'=>$data->number, 'Email'=>'', 'Address'=>$data->address);
            $obj = $client->__soapCall("FastBookAnAppointment", array($params), $options);
            $xml = new SimpleXMLElement($obj->return);
            $need = new stdClass();
            $need->success = $xml->Результат->__toString();
            echo json_encode($need);
        }
    }  else if($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    }
?>
