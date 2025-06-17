document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.project-carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const projectLinks = document.querySelectorAll('.project-tile-link');
    
    let currentIndex = 0;
    let autoScrollInterval;

    function updateCarousel() {
        const activeLink = projectLinks[currentIndex];
        const scrollOffset = activeLink.offsetLeft - (carousel.offsetWidth / 2) + (activeLink.offsetWidth / 2);
        
        carousel.scrollTo({
            left: scrollOffset,
            behavior: 'smooth'
        });

        projectLinks.forEach((link, index) => {
            if (index === currentIndex) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % projectLinks.length;
        updateCarousel();
        resetAutoScroll();
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + projectLinks.length) % projectLinks.length;
        updateCarousel();
        resetAutoScroll();
    }

    function startAutoScroll() {
        autoScrollInterval = setInterval(showNext, 4000); // 4 seconds
    }

    function resetAutoScroll() {
        clearInterval(autoScrollInterval);
        startAutoScroll();
    }
    
    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);

    // Stop auto-scroll when user hovers over the carousel
    carousel.addEventListener('mouseover', () => clearInterval(autoScrollInterval));
    carousel.addEventListener('mouseout', startAutoScroll);

    // Initial setup
    updateCarousel();
    startAutoScroll();
});

document.addEventListener('DOMContentLoaded', function() {
    var menuToggle = document.getElementById('menuToggle');
    var menu = document.getElementById('dropdownMenu');

    menuToggle.addEventListener('click', function(event) {
        event.stopPropagation();
        menu.classList.toggle('hiddenMenu');
    });

    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && event.target !== menuToggle) {
            menu.classList.add('hiddenMenu');
        }
    });

    menu.addEventListener('click', function(event) {
        if (event.target.tagName === 'A') {
            menu.classList.add('hiddenMenu');
        }
    });
});
