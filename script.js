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
        
        if (projectLinks.length > 1) {
            let currentIndex = 1;
            let isTransitioning = false;
            let autoScrollInterval;

            // 1. Clone first and last elements for infinite effect
            const firstClone = projectLinks[0].cloneNode(true);
            const lastClone = projectLinks[projectLinks.length - 1].cloneNode(true);
            carousel.appendChild(firstClone);
            carousel.insertBefore(lastClone, projectLinks[0]);

            // Update the NodeList to include clones
            projectLinks = document.querySelectorAll('.project-tile-link');

            // 2. Center the initial "real" first slide
            function centerSlide(index, instant = false) {
                if (instant) {
                    carousel.style.transition = 'none';
                } else {
                    carousel.style.transition = 'transform 0.6s ease-in-out';
                }
                
                const slideToCenter = projectLinks[index];
                const wrapper = carousel.parentElement;
                const offset = (wrapper.offsetWidth / 2) - (slideToCenter.offsetLeft + slideToCenter.offsetWidth / 2);
                carousel.style.transform = `translateX(${offset}px)`;

                // Update active class
                document.querySelectorAll('.project-tile-link').forEach(s => s.classList.remove('active'));
                if (projectLinks[index] && !instant) {
                     // The "real" active slide is the one that's not a clone
                    const realIndex = (index -1 + (projectLinks.length - 2)) % (projectLinks.length - 2);
                    document.querySelectorAll('.project-tile-link:not(.clone)')[realIndex].classList.add('active');
                }
            }
            
            // 3. Navigation functions
            function showNext() {
                if (isTransitioning) return;
                isTransitioning = true;
                currentIndex++;
                centerSlide(currentIndex);
                resetAutoScroll();
            }

            function showPrev() {
                if (isTransitioning) return;
                isTransitioning = true;
                currentIndex--;
                centerSlide(currentIndex);
                resetAutoScroll();
            }

            // 4. Handle the "jump" after transition ends
            carousel.addEventListener('transitionend', () => {
                isTransitioning = false;
                if (currentIndex <= 0) { // If we're at the prepended clone
                    currentIndex = projectLinks.length - 2;
                    centerSlide(currentIndex, true);
                } else if (currentIndex >= projectLinks.length - 1) { // If we're at the appended clone
                    currentIndex = 1;
                    centerSlide(currentIndex, true);
                }
                 // Re-add active class after the jump
                const realIndex = (currentIndex -1 + (projectLinks.length - 2)) % (projectLinks.length - 2);
                document.querySelectorAll('.project-tile-link:not(.clone)')[realIndex].classList.add('active');

            });

            // 5. Auto-scroll logic
            function startAutoScroll() {
                autoScrollInterval = setInterval(showNext, 4000); // 4 seconds
            }

            function resetAutoScroll() {
                clearInterval(autoScrollInterval);
                startAutoScroll();
            }

            // 6. Event Listeners
            nextBtn.addEventListener('click', showNext);
            prevBtn.addEventListener('click', showPrev);
            carousel.addEventListener('mouseover', () => clearInterval(autoScrollInterval));
            carousel.addEventListener('mouseout', startAutoScroll);
            window.addEventListener('resize', () => centerSlide(currentIndex, true));

            // Initial Setup
            centerSlide(currentIndex, true);
            document.querySelectorAll('.project-tile-link:not(.clone)')[0].classList.add('active');
            startAutoScroll();
        }
    }
});
