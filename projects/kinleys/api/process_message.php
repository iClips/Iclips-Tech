<?php
    include '../api/incl/functions.php';
    
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'] . "\nName: $name\nEmail Address: $email";
    
    $to = 'theronclintwilliam@gmail.com';
    $subject = 'blayh blah!';
    
    if (sendEmail($to, $subject, $message)) {
        echo 'success';
    } else {
        echo 'failed';
    }
    