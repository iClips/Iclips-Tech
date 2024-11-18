var heroAnimationInterval = null;

let isMenuOpen = false;
let sideMenu, myMenu, myMenuItems;

document.addEventListener('DOMContentLoaded', function () {
    var loadingElement = document.getElementById("loading");
    loadingElement.style.transition = "opacity 0.5s"; 
    loadingElement.style.opacity = "0"; 
    loadingElement.style.display = 'none';

    const sectionTitle = document.querySelectorAll('.section-title');
    const heroSection = document.querySelector('.hero');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('anim-title');
            } else {
                entry.target.classList.remove('anim-title');
            }
        });
    }, {
        threshold: 0.1
    });

    sectionTitle.forEach(section => {
        observer.observe(section);
    });

    const observerHero = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !heroAnimationInterval) {
                animateHero();
            } else if (!entry.isIntersecting && heroAnimationInterval) {
                clearInterval(heroAnimationInterval);
                heroAnimationInterval = null;
            }
        });
    }, {
        threshold: 0.1
    });
    observerHero.observe(heroSection);
    
    animateHero();
    initIntoViewAnim();
});

function toggleMenu() {
    if (!isMenuOpen) {
        document.querySelector(".side-menu").style.width = "250px";
        isMenuOpen = true;
    } else {
        document.querySelector(".side-menu").style.width = "0";
        isMenuOpen = false
    }
}

function animateHero() {
    // let selector = window.innerWidth < 768 ? '.gallery-image-hero-sm' : '.gallery-image-hero';
    let selector = '.gallery-image-hero';
    let count = 0;
    let index = 0;
    let imgIndex = 0;

    const images = document.querySelectorAll(selector); 

    const newImageSources = [
        'assets/images/gallery/kitchen',
        'assets/images/gallery/bath',
        'assets/images/gallery/sit',
        'assets/images/gallery/study'
    ];
    heroAnimationInterval  = setInterval(() => {
        count++;
        index = 0;
        if (count == 5) {
            count = 1;
        }
        
        setTimeout(() => {
            images.forEach((img, i) => {
                
                setTimeout(() => {
                    img.style.opacity = 0;                    
                }, i*200);
            });
        }, 100);
        
        setTimeout(() => {
            images.forEach((img, i) => {
                
                setTimeout(() => {
                    img.src = `${newImageSources[i]}${count}.jpg`;
                    img.style.opacity = 1;                
                }, i*200);             
            });        
        }, 2000);
        
    }, 7000);
}


function initIntoViewAnim() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fadeInUp");
            } else {
                entry.target.classList.remove("fadeInUp");
            }
        });
    });

    document.querySelectorAll(".section-title").forEach((content) => {
        observer.observe(content);
    });
}


let lastScrollTop = 0;
const topNav = document.querySelector('.top_nav');
const navBar = document.getElementById("navBar");

window.addEventListener('scroll', function() {
    if (window.innerWidth >= 768) {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
        if (currentScroll > lastScrollTop) {
            topNav.classList.add('hidden'); 
            navBar.classList.add('show'); 
        } else {
            if (currentScroll <= 0) {
                topNav.classList.remove('hidden');
                navBar.classList.remove('show');
            } else {
                navBar.classList.add('show'); // Keep navbar visible
            }
        }
    
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; 
    }
});

function openModal() {
    const overlay = document.getElementById('modalk-overlay');
    const modal = overlay.querySelector('.modalk');

    overlay.style.display = 'flex';

    setTimeout(() => {
        overlay.classList.add('show');
        modal.classList.add('show');
    }, 10);
}

function closeModal() {
    const overlay = document.getElementById('modalk-overlay');
    const modal = overlay.querySelector('.modalk');

    modal.classList.remove('show');
    overlay.classList.remove('show');

    setTimeout(() => {
        overlay.style.display = 'none';
    }, 400);
}

$(document).ready(function () {
    $('[data-fancybox="gallery"]').fancybox({
        buttons: [
            'zoom',         
            'slideShow',   
            'fullScreen',    
            'thumbs',       
            'close'  
        ],
        animationEffect: "zoom", 
        transitionEffect: "fade",
        loop: true,              
        keyboard: true,          
        protect: true,           
        arrows: true,            
        infobar: true,        
        zoom: true   
    });
});