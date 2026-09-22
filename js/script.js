
document.addEventListener('DOMContentLoaded', () => {
    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    if(slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5500);
    }

    // Sticky Header effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 30px rgba(0,0,0,0.8)';
            header.style.background = 'var(--bg-main)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = 'var(--header-bg)';
        }
    });

    // PERFECT MOBILE MENU TOGGLE
    const hamburger = document.getElementById('hamburger');
    const navList = document.getElementById('navList');
    
    if(hamburger && navList) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navList.classList.toggle('active');
            hamburger.innerHTML = navList.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024 && navList.classList.contains('active') && !navList.contains(e.target) && !hamburger.contains(e.target)) {
                navList.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }

    // Mobile Accordion functionality (Dropdown toggle)
    if (window.innerWidth <= 1024) {
        const hasDropdowns = document.querySelectorAll('.has-dropdown');
        hasDropdowns.forEach(item => {
            const link = item.querySelector('.nav-link');
            if(link) {
                link.addEventListener('click', (e) => {
                    // Only prevent default if it's not a direct link to a page (though user wants separate pages, 
                    // usually mobile dropdown parent acts as toggle. We prevent default to toggle menu).
                    e.preventDefault(); 
                    
                    // Close other open dropdowns for accordion effect
                    hasDropdowns.forEach(other => {
                        if (other !== item) other.classList.remove('active');
                    });
                    
                    item.classList.toggle('active');
                });
            }
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if(question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(faq => faq.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Theme Toggle
    const themeBtn = document.getElementById('themeToggle');
    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'light') {
                document.documentElement.removeAttribute('data-theme');
                themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });
    }

    // Dynamic Form Submission to WhatsApp
    const enquiryForm = document.getElementById('enquiryForm');
    if(enquiryForm) {
        enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const location = document.getElementById('location').value;
            const msg = document.getElementById('message').value;
            
            const waText = `Hello Elite Interior and Decore,%0A%0A*New Enquiry*%0AName: ${name}%0APhone: ${phone}%0AService: ${service}%0ALocation: ${location}%0AMessage: ${msg}%0A%0AI would like to discuss my requirement and get a quotation.`;
            
            window.open(`https://wa.me/919716786164?text=${waText}`, '_blank');
        });
    }
});
