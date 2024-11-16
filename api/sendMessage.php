<?php
    include 'db_config.php';
    
    $name = $_POST["name"] ?? null;
    $email = $_POST["email"] ?? null;
    $message = $_POST["message"] ?? null;
    
    if ($name && $email && $message) {
        if (saveMessageToDB($name, $email, $message)) {
            if (sendEmail($name, $email, $message)) {
                echoResponse("Success", "Thank you for your message! We've received it and will get back to you as soon as possible.");
            } else {
                echoResponse("Failed", "The system could not process your message. Kindly, try again later.");
            }
        } else {
            echoResponse("Failed", "The system could not process your message. Kindly, try again later.");
        }
    } else {
        echoResponse("Failed", "Some of the form's information are missing. Kindly, check that all fields are filled in correctly.");
    }
    
    function echoResponse($status, $message) {
        $response = [
            'status' => $status,
            'message' => $message
        ];
        echo json_encode($response);
    }
    
    function saveMessageToDB($name, $email, $message) {
        global $conn;
        $date = date('Y-m-d H:i:s');
        try {
            $sql = "INSERT INTO Message (dateTime, name, email, message) VALUES (:dateTime, :name, :email, :message)";
            $sth = $conn->prepare($sql);
            $sth->execute(['dateTime' => $date, 'name' => $name,  'email' => $email, 'message' => $message]);
            
            return true;
        } catch (PDOException $ex) {
            return false;
        }
    }
    
    function sendEmail($name, $email, $message) {
        $to = 'theronclintwilliam@gmail.com';
        $subject = 'Iclips Website Message';
        $body = "From: $name \r\nEmail: $email \r\n Message: $message";
        $body = wordwrap($body,70);
        $headers = 'From: <support@iclips.co.za>'       . "\r\n" .
                    //  'Reply-To: support@iclips.co.za' . "\r\n" .
                     'X-Mailer: PHP/' . phpversion();
        // $headers = "From: Clint Theron <support@iclips.co.za>" . "\r\n";
    
        return mail($to, $subject, $body, $headers);    
        // return mail($to, $subject, $body);    
    }
?>
