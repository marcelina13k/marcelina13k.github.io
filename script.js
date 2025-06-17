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
                const slideToCenter = projectLinks[currentIndex];
                if (!slideToCenter) return;

                const wrapper = carousel.parentElement;
                const scrollLeft = slideToCenter.offsetLeft - (wrapper.offsetWidth - slideToCenter.offsetWidth) / 2;
                
                carousel.scrollTo({ 
                    left: scrollLeft,
                    behavior: instant ? 'auto' : 'smooth'
                });

                document.querySelectorAll('.project-tile-link').forEach(link => link.classList.remove('active'));
                
                // Use a timeout to apply active class after scrolling starts
                setTimeout(() => {
                    const realIndex = (currentIndex - 1 + slideCount) % slideCount;
                    const realSlide = document.querySelectorAll('.project-tile-link:not(.clone)')[realIndex];
                    if(realSlide) realSlide.classList.add('active');
                }, 100);
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
                if (isTransitioning) return; // Do not run snap-logic during an intentional jump

                clearTimeout(scrollTimer);
                scrollTimer = setTimeout(() => {
                    // When scrolling ends, check if we are at a clone and need to jump
                    if (currentIndex === 0) {
                        isTransitioning = true;
                        currentIndex = slideCount;
                        centerActiveSlide(true);
                        setTimeout(() => isTransitioning = false, 50);
                    } else if (currentIndex === allSlidesCount - 1) {
                        isTransitioning = true;
                        currentIndex = 1;
                        centerActiveSlide(true);
                        setTimeout(() => isTransitioning = false, 50);
                    }
                }, 200); // Increased timeout to prevent premature firing on long scrolls
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
