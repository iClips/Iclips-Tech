"use strict";
jQuery(document).ready(function ($) {

//==========================================
// MOBAILE MENU
//=========================================

    $('#navbar-menu').find('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: (target.offset().top - 0)
                }, 1000);
                if ($('.navbar-toggle').css('display') != 'none') {
                    $(this).parents('.container').find(".navbar-toggle").trigger("click");
                }
                return false;
            }
        }
    });


//==========================================
//ScrollUp
//=========================================

    // $(window).scroll(function () {
    //     if ($(this).scrollTop() > 600) {
    //         $('#scrollUp').fadeIn('slow');
    //     } else {
    //         $('#scrollUp]').fadeOut('slow');
    //     }
    // });

    // $('#scrollUp').click(function () {
    //     $("html, body").animate({scrollTop: 0}, 1000);
    //     return false;
    // });

// Add smooth scrolling to all links
  $(".smooth-scroll").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });

//==========================================
// For fancybox active
//=========================================

    $('.fancybox').fancybox();
    
    

//==========================================
// Loading
//=========================================

    $(window).load(function () {
        $("#loading").fadeOut(500);
    });

//==========================================
// Message Form
//=========================================
    $(function () {
        $('#msg_form').on('submit', function (e) {
            e.preventDefault();
    
            $.ajax({
                type: 'post',
                url: '/api/process_message.php',
                data: $('form').serialize(),
                success: function (response) {
                    if (response.indexOf('success') !== -1) {
                        $('#message_success').css('opacity', 1).slideDown();
                        // startMessageSuccessTimeout()           
                        $('#name').val('');
                        $('#email').val('');
                        $('#message').val('');
                    } else {
                        alert("Something went wrong. Kindly try again later: " + response);
                    }
                }
            });
        });
      });

    });
    
    function startMessageSuccessTimeout() {
        window.setTimeout(function() {
            $('#message_success').fadeTo(500, 0).slideUp(500, function(){
                //$(id).toggle(); 
            });
        }, 10*1000);
    }