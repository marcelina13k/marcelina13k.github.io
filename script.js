document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const dropdownMenu = document.getElementById('dropdownMenu');
    if (menuToggle && dropdownMenu) {
        menuToggle.addEventListener('click', function() {
            dropdownMenu.classList.toggle('active');
        });
    }

    // --- New Project Carousel Logic ---
    const carousel = document.querySelector('.project-carousel');
    if (carousel) {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        let projectLinks = document.querySelectorAll('.project-tile-link');
        const slideCount = projectLinks.length;
        
        if (slideCount > 1) {
            let isTransitioning = false;
            let autoScrollInterval;

            const firstClone = projectLinks[0].cloneNode(true);
            firstClone.classList.add('clone');
            const lastClone = projectLinks[slideCount - 1].cloneNode(true);
            lastClone.classList.add('clone');
            
            carousel.appendChild(firstClone);
            carousel.insertBefore(lastClone, projectLinks[0]);

            projectLinks = document.querySelectorAll('.project-tile-link');
            const allSlidesCount = projectLinks.length;
            
            carousel.style.scrollBehavior = 'auto'; // Disable smooth scroll for initial setup
            
            let currentIndex = 1;

            function centerActiveSlide(instant = false) {
                if(instant) {
                    carousel.style.scrollBehavior = 'auto';
                } else {
                    carousel.style.scrollBehavior = 'smooth';
                }
                const slideToCenter = projectLinks[currentIndex];
                const wrapper = carousel.parentElement;
                const scrollLeft = slideToCenter.offsetLeft - (wrapper.offsetWidth - slideToCenter.offsetWidth) / 2;
                carousel.scrollTo({ left: scrollLeft });

                document.querySelectorAll('.project-tile-link').forEach(link => link.classList.remove('active'));
                
                const realIndex = (currentIndex -1 + slideCount) % slideCount;
                const realSlide = document.querySelectorAll('.project-tile-link:not(.clone)')[realIndex];
                if(realSlide) realSlide.classList.add('active');
            }
            
            function showNext() {
                if (isTransitioning) return;
                currentIndex++;
                centerActiveSlide();
                resetAutoScroll();
            }

            function showPrev() {
                if (isTransitioning) return;
                currentIndex--;
                centerActiveSlide();
                resetAutoScroll();
            }
            
            let scrollTimer;
            carousel.addEventListener('scroll', () => {
                clearTimeout(scrollTimer);
                scrollTimer = setTimeout(() => {
                    if (currentIndex === 0) {
                        isTransitioning = true;
                        currentIndex = slideCount;
                        centerActiveSlide(true);
                        isTransitioning = false;
                    } else if (currentIndex === allSlidesCount - 1) {
                        isTransitioning = true;
                        currentIndex = 1;
                        centerActiveSlide(true);
                        isTransitioning = false;
                    }
                }, 150); 
            });

            function startAutoScroll() {
                autoScrollInterval = setInterval(showNext, 4000); 
            }

            function resetAutoScroll() {
                clearInterval(autoScrollInterval);
                startAutoScroll();
            }

            nextBtn.addEventListener('click', showNext);
            prevBtn.addEventListener('click', showPrev);
            carousel.addEventListener('mouseover', () => clearInterval(autoScrollInterval));
            carousel.addEventListener('mouseout', startAutoScroll);
            window.addEventListener('resize', () => centerActiveSlide(true));
            
            centerActiveSlide(true);
            startAutoScroll();
        }
    }
});
