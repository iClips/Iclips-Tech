<?php
    function sendEmail($to, $subject, $message) {
        $currentDateTime = getCurrentDate();
        
        $message = "The following message was sent from your website at $currentDateTime. $message";
        $headers = 'From: <sales@kinleys.co.za>'       . "\r\n" .
                     'Reply-To: <sales@kinleys.co.za>' . "\r\n" .
                     'X-Mailer: PHP/' . phpversion();
    
        return mail($to, $subject, $message, $headers);    
    }
    
    function getCurrentDate() {
        // Get the current date and time in GMT+2 timezone
        $dateNow = new DateTime("now", new DateTimeZone('GMT+2'));
        $zoneDateTime = $dateNow->format('l, j F Y H\Hi');
    
        return $zoneDateTime;
    }
?>    