document.addEventListener("DOMContentLoaded", function(event) {
    // fetch('https://api.ipify.org?format=json')
    //     .then(response => response.json())
    //     .then(data => {
    //         saveToDB(data.ip);
    //     })
    //     .catch(error => {
    //         console.log('Error:', error);
    //     })
    
    
    document.getElementById("btn_submit_message").addEventListener("click", submitMessage);

    async function submitMessage(event) {
        // event.preventDefault();
        
        // document.getElementById("demo").innerHTML = Date();
        const name = getValueById("name");
        const email = getValueById("email");
        const message = getValueById("message");
        
        if (name && email && message) {
            try {
                const response = await $.ajax({
                    url: "./api/sendMessage.php",
                    type: "POST",
                    dataType: "json",
                    data: {
                        name: name,
                        email: email,
                        message: message
                    },
                });
                
                if (response.status && response.status == 'Success') {
                    document.getElementById('name').value = '';
                    document.getElementById('email').value = '';
                    document.getElementById('message').value = '';
                }
                
                showMessageAlert(response.message);
            } catch (error) {
                console.log(error);
                alert("Error: " + error);
            }
        }
    }
    
    function getValueById(id) {
        return document.getElementById(id).value.trim();
    }
    
    function showMessageAlert(response) {
        var alert = document.getElementById('div_message_alert');
        alert.innerHTML = response;
        alert.style.display = "block";
    }
    
    // async function saveToDB(ip) {
    //     try {
    //         const response = await $.ajax({
    //             url: "/api/save_to_db.php",
    //             type: 'POST',
    //             dataType: "json",
    //             data: {
    //                 name: 'User',
    //                 email: 'no-reply@example.com',
    //                 message: 'A user visited Iclips.',
    //                 ip: ip
    //             }
    //         });
    //         console.log(response);
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // }

});