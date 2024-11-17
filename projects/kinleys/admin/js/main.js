"use strict";
document.addEventListener("DOMContentLoaded", function(event) { 
    console.log("content loaded");
    if (document.getElementById("sign_in") !== null) {
        document.getElementById("sign_in").onclick = function() { onSignIn() };
    }
    
    function onSignIn() {
        window.location.href = "./dashboard.html";
    }
    
    if (document.getElementById("nav_response") !== null) {
        document.getElementById("nav_response").onclick = function() { onNavResponse() };
    }
    
    function onNavResponse() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }
});