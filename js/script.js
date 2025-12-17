// ===================================
// HERO IMAGE SLIDER AUTO-SCROLL
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Get all slider elements
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;
    
    console.log('Total slides:', slides.length);
    console.log('Total dots:', dots.length);
    
    // Function to show specific slide
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Add active class to current slide and dot
        if (slides[index]) {
            slides[index].classList.add('active');
            console.log('Showing slide:', index);
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }
    
    // Function to go to next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Auto-scroll every 5 seconds
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Stop auto-scroll
    function stopAutoSlide() {
        clearInterval(slideInterval);
    }
    
    // Manual slide navigation with dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopAutoSlide();
            currentSlide = index;
            showSlide(currentSlide);
            startAutoSlide(); // Restart auto-scroll after manual click
        });
    });
    
    // Start the auto-slider
    startAutoSlide();
    
    // Pause slider on hover
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopAutoSlide);
        heroSection.addEventListener('mouseleave', startAutoSlide);
    }
    
    
    // ===================================
    // MOBILE MENU TOGGLE
    // ===================================
    
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }
    
    
    // ===================================
    // NAVBAR SCROLL EFFECT
    // ===================================
    
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    
    // ===================================
    // STATS COUNTER ANIMATION
    // ===================================
    
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
    
    const statsSection = document.querySelector('.stats-section');
    
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    animateStats();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
    
    
    // ===================================
    // SERVICES SLIDER WITH AUTO-SCROLL
    // ===================================
    
    const servicesTrack = document.querySelector('.services-track');
    const serviceCards = document.querySelectorAll('.service-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (servicesTrack && serviceCards.length > 0) {
        let currentIndex = 0;
        let cardsPerView = 3;
        let autoScrollInterval;
        let isAutoScrolling = true;
        
        // Calculate cards per view based on screen size
        function updateCardsPerView() {
            if (window.innerWidth <= 640) {
                cardsPerView = 1;
            } else if (window.innerWidth <= 968) {
                cardsPerView = 2;
            } else {
                cardsPerView = 3;
            }
        }
        
        // Update slider position
        function updateSlider() {
            const cardWidth = serviceCards[0].offsetWidth;
            const gap = 30;
            const offset = -(currentIndex * (cardWidth + gap));
            servicesTrack.style.transform = `translateX(${offset}px)`;
            
            // Update button states
            if (prevBtn && nextBtn) {
                prevBtn.disabled = currentIndex === 0;
                nextBtn.disabled = currentIndex >= serviceCards.length - cardsPerView;
                
                prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
                nextBtn.style.opacity = currentIndex >= serviceCards.length - cardsPerView ? '0.5' : '1';
                prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
                nextBtn.style.cursor = currentIndex >= serviceCards.length - cardsPerView ? 'not-allowed' : 'pointer';
            }
        }
        
        // Auto-scroll function
        function autoScroll() {
            if (isAutoScrolling) {
                if (currentIndex < serviceCards.length - cardsPerView) {
                    currentIndex++;
                } else {
                    currentIndex = 0; // Loop back to start
                }
                updateSlider();
            }
        }
        
        // Start auto-scroll
        function startAutoScroll() {
            autoScrollInterval = setInterval(autoScroll, 3000); // Scroll every 3 seconds
        }
        
        // Stop auto-scroll
        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }
        
        // Next button
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                stopAutoScroll();
                isAutoScrolling = false;
                if (currentIndex < serviceCards.length - cardsPerView) {
                    currentIndex++;
                    updateSlider();
                }
                // Resume auto-scroll after 5 seconds of inactivity
                setTimeout(() => {
                    isAutoScrolling = true;
                    startAutoScroll();
                }, 5000);
            });
        }
        
        // Previous button
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                stopAutoScroll();
                isAutoScrolling = false;
                if (currentIndex > 0) {
                    currentIndex--;
                    updateSlider();
                }
                // Resume auto-scroll after 5 seconds of inactivity
                setTimeout(() => {
                    isAutoScrolling = true;
                    startAutoScroll();
                }, 5000);
            });
        }
        
        // Pause auto-scroll on hover
        servicesTrack.addEventListener('mouseenter', () => {
            stopAutoScroll();
        });
        
        servicesTrack.addEventListener('mouseleave', () => {
            if (isAutoScrolling) {
                startAutoScroll();
            }
        });
        
        // Update on window resize
        window.addEventListener('resize', () => {
            const oldCardsPerView = cardsPerView;
            updateCardsPerView();
            
            // Reset position if layout changed
            if (oldCardsPerView !== cardsPerView) {
                currentIndex = 0;
                updateSlider();
            }
        });
        
        // Initialize
        updateCardsPerView();
        updateSlider();
        startAutoScroll(); // Start auto-scrolling
    }
    
    
    // ===================================
    // SCROLL TO TOP BUTTON
    // ===================================
    
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (scrollTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top on click
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    
    // ===================================
    // SMOOTH SCROLL FOR NAVIGATION LINKS
    // ===================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    console.log('✅ Onsunplay Solar - All Features Loaded!');
});
