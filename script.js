document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const dropdownMenu = document.getElementById('dropdownMenu');
    if (menuToggle && dropdownMenu) {
        menuToggle.addEventListener('click', function() {
            dropdownMenu.classList.toggle('active');
        });
    }

    // Project Carousel
    const carousel = document.querySelector('.project-carousel');
    if (carousel) {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const projectLinks = document.querySelectorAll('.project-tile-link');
        
        let currentIndex = 0;
        let autoScrollInterval;

        function updateCarousel() {
            const activeLink = projectLinks[currentIndex];
            const offset = (carousel.offsetWidth / 2) - (activeLink.offsetLeft + activeLink.offsetWidth / 2);
            carousel.style.transform = `translateX(${offset}px)`;

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

        carousel.addEventListener('mouseover', () => clearInterval(autoScrollInterval));
        carousel.addEventListener('mouseout', startAutoScroll);

        // Recalculate on window resize
        window.addEventListener('resize', updateCarousel);
        
        // Initial setup
        if(projectLinks.length > 0) {
            updateCarousel();
            startAutoScroll();
        }
    }
});
