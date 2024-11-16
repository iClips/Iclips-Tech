<?php
    include 'db_config.php';
    
    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        echoResponse("Failed", "No POST data received.");
        return;
    }
    
    $name = $_POST["name"] ?? null;
    $email = $_POST["email"] ?? null;
    $message = $_POST["message"] ?? null;
    $ip = $_POST["ip"] ?? "Unknown";
    
    if (!$name || !$email || !$message) {
        echoResponse("Failed", "Some of the form's information are missing. Kindly, check that all fields are filled in correctly.");
        return;
    }
    
    if (!saveMessageToDB($name, $email, $message, $ip)) {
        echoResponse("Failed", "The system could not process your message. Kindly, try again later.");
        return;
    }

    echoResponse("Success", "Thank you for your message! We've received it and will get back to you as soon as possible.");
    
    

    function echoResponse($status, $message) {
        $response = [
            'status' => $status,
            'message' => $message
        ];
        echo json_encode($response);
    }
    
    function saveMessageToDB($name, $email, $message, $ip) {
        global $conn;
        $date = date('Y-m-d H:i:s');
        try {
            $sql = "INSERT INTO Message (dateTime, name, email, message, ip) VALUES (:dateTime, :name, :email, :message, :ip)";
            $sth = $conn->prepare($sql);
            $sth->execute(['dateTime' => $date, 'name' => $name,  'email' => $email, 'message' => $message, 'ip' => $ip]);
            
            return true;
        } catch (PDOException $ex) {
            return false;
        }
    }
    
?>
