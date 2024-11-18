var heroAnimationInterval = null;

document.addEventListener('DOMContentLoaded', function () {
    
    const sections = document.querySelectorAll('.gallery-section');
    const heroSection = document.querySelector('.hero');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
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
    
    
    let isMenuOpen = false;
    document.getElementById("myMenu").addEventListener("click", function() {
        if (!isMenuOpen) {
            document.getElementById("side-menu").style.width = "250px";
            isMenuOpen = true;
        } else {
            document.getElementById("side-menu").style.width = "0";
            isMenuOpen = false
        }
    });
    
    document.getElementById("loading").classList.add('loader-hidden');

    // Wait for the animation to finish before hiding
    document.getElementById("loading").addEventListener('animationend', function() {
        document.getElementById("loading").classList.add('finished'); // Add finished class to hide
    }, { once: true });
});


function animateHero() {
    let selector = window.innerWidth < 768 ? '.gallery-image-hero-sm' : '.gallery-image-hero';
    let count = 0;
    let index = 0;
    let imgIndex = 0;

    const images = document.querySelectorAll(selector); // Adjust the selector to target your images

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
                entry.target.classList.add("in-view");
            } else {
                entry.target.classList.remove("in-view");
            }
        });
    });

    document.querySelectorAll(".fade-in").forEach((content) => {
        observer.observe(content);
    });
}

function toggleMenu() {
    const navBar = document.getElementById('navBar');
    navBar.classList.toggle('active');
}
