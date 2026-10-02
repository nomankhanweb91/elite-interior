/**
 * Dsign Interior - Premium Architectural Script
 * 3D Engine, Mobile Navigation & Interaction Controller
 */

// Single Source of Truth for Business Information
const BUSINESS_CONFIG = {
    name: "Dsign Interior",
    phone: "+91 9716786164",
    email: "info@dsigninterior.in",
    address: "AN ORCHID SHOP NO 01, PLOT NO 120/121, SEC-27, SEAWOODS, NERUL (EAST), NAVI MUMBAI - 400706",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=AN+ORCHID+SHOP+NO+01%2C+PLOT+NO+120%2F121%2C+SEC-27%2C+SEAWOODS%2C+NERUL+%28EAST%29%2C+NAVI+MUMBAI+-+400706"
};
window.BUSINESS_CONFIG = BUSINESS_CONFIG;

document.addEventListener('DOMContentLoaded', () => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches && window.innerWidth > 1024;

    // ========================================================
    // 1. ENTRANCE LOADER (LIGHTWEIGHT & RESPECTFUL)
    // ========================================================
    const loader = document.getElementById('dsign-loader');
    if (loader) {
        if (isReducedMotion || sessionStorage.getItem('dsign_visited')) {
            loader.classList.add('hidden');
        } else {
            setTimeout(() => {
                loader.classList.add('hidden');
                try { sessionStorage.setItem('dsign_visited', 'true'); } catch(e) {}
            }, 600);
        }
    }

    // ========================================================
    // 2. PAGE TRANSITIONS (SMOOTH VEIL)
    // ========================================================
    let veil = document.querySelector('.page-veil');
    if (!veil) {
        veil = document.createElement('div');
        veil.className = 'page-veil';
        document.body.appendChild(veil);
    }

    window.addEventListener('pageshow', () => {
        veil.classList.remove('active');
    });

    if (!isReducedMotion) {
        document.querySelectorAll('a[href]').forEach(link => {
            const href = link.getAttribute('href');
            // Only internal HTML page links, not anchors, mailto, tel, or external
            if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('http') && !link.target) {
                link.addEventListener('click', (e) => {
                    // If on mobile and tapping a category with dropdown accordion, DO NOT navigate or veil!
                    if (window.innerWidth <= 1024 && link.parentElement && link.parentElement.classList.contains('has-dropdown') && link.classList.contains('nav-link')) {
                        return;
                    }
                    if (e.metaKey || e.ctrlKey) return;
                    e.preventDefault();
                    veil.classList.add('active');
                    setTimeout(() => {
                        window.location.href = href;
                    }, 200);
                });
            }
        });
    }

    // ========================================================
    // 3. AMBIENT 3D LIGHTING & CUSTOM CURSOR
    // ========================================================
    let ambientLight = document.querySelector('.ambient-spotlight');
    if (!ambientLight) {
        ambientLight = document.createElement('div');
        ambientLight.className = 'ambient-spotlight';
        document.body.appendChild(ambientLight);
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        document.documentElement.style.setProperty('--mouse-x', `${mouseX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${mouseY}px`);
    }, { passive: true });

    // Custom Cursor on Desktop only
    if (isDesktop && !isReducedMotion) {
        const cursorDot = document.createElement('div');
        cursorDot.className = 'dsign-cursor-dot';
        const cursorRing = document.createElement('div');
        cursorRing.className = 'dsign-cursor-ring';
        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorRing);

        const renderCursor = () => {
            cursorX += (mouseX - cursorX) * 0.16;
            cursorY += (mouseY - cursorY) * 0.16;

            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
            cursorRing.style.left = `${cursorX}px`;
            cursorRing.style.top = `${cursorY}px`;

            requestAnimationFrame(renderCursor);
        };
        requestAnimationFrame(renderCursor);

        const hoverTargets = document.querySelectorAll('a, button, .service-card, .client-logo, .theme-toggle, .faq-question, input, select, textarea');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => cursorRing.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('cursor-hover'));
        });

        window.addEventListener('mousedown', () => cursorRing.classList.add('cursor-click'));
        window.addEventListener('mouseup', () => cursorRing.classList.remove('cursor-click'));
    }

    // ========================================================
    // 4. CINEMATIC 3D HERO PARALLAX & CAMERA DEPTH
    // ========================================================
    const hero = document.querySelector('.hero');
    const heroSlider = document.querySelector('.hero-slider');
    const heroContent = document.querySelector('.hero-content');
    const heroCube = document.querySelector('.hero-iso-cube');

    if (hero && isDesktop && !isReducedMotion) {
        let heroTargetX = 0;
        let heroTargetY = 0;
        let heroCurrentX = 0;
        let heroCurrentY = 0;

        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width - 0.5;
            const relY = (e.clientY - rect.top) / rect.height - 0.5;
            heroTargetX = relX;
            heroTargetY = relY;
        }, { passive: true });

        hero.addEventListener('mouseleave', () => {
            heroTargetX = 0;
            heroTargetY = 0;
        });

        const updateHeroParallax = () => {
            heroCurrentX += (heroTargetX - heroCurrentX) * 0.08;
            heroCurrentY += (heroTargetY - heroCurrentY) * 0.08;

            if (heroSlider) {
                heroSlider.style.transform = `translate3d(${heroCurrentX * -35}px, ${heroCurrentY * -35}px, -40px) scale(1.08)`;
            }
            if (heroContent) {
                const rotX = heroCurrentY * -12;
                const rotY = heroCurrentX * 14;
                heroContent.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(30px)`;
            }
            if (heroCube) {
                heroCube.style.transform = `rotateX(${60 + heroCurrentY * 20}deg) rotateZ(${45 + heroCurrentX * 30}deg) translateY(${heroCurrentY * 15}px)`;
            }

            requestAnimationFrame(updateHeroParallax);
        };
        requestAnimationFrame(updateHeroParallax);
    }

    // ========================================================
    // 5. 3D INTERIOR ROOM INTERACTIVE VIEWPORT (SECTION 2)
    // ========================================================
    const roomBox = document.querySelector('.room-stage-box');
    const roomWorld = document.querySelector('.room-world');

    if (roomBox && roomWorld && !isReducedMotion) {
        let roomRotX = 4;
        let roomRotY = -3;
        let targetRotX = 4;
        let targetRotY = -3;
        let isPointerDown = false;

        const handleRoomMove = (clientX, clientY) => {
            const rect = roomBox.getBoundingClientRect();
            const xPercent = (clientX - rect.left) / rect.width - 0.5;
            const yPercent = (clientY - rect.top) / rect.height - 0.5;

            targetRotY = xPercent * 20; 
            targetRotX = -yPercent * 16;
        };

        roomBox.addEventListener('mousemove', (e) => {
            handleRoomMove(e.clientX, e.clientY);
        }, { passive: true });

        roomBox.addEventListener('mouseleave', () => {
            targetRotX = 3;
            targetRotY = -2;
        });

        roomBox.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                isPointerDown = true;
            }
        }, { passive: true });

        roomBox.addEventListener('touchmove', (e) => {
            if (isPointerDown && e.touches.length === 1) {
                handleRoomMove(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: true });

        roomBox.addEventListener('touchend', () => {
            isPointerDown = false;
            targetRotX = 3;
            targetRotY = -2;
        });

        const updateRoomPhysics = () => {
            roomRotX += (targetRotX - roomRotX) * 0.1;
            roomRotY += (targetRotY - roomRotY) * 0.1;

            roomWorld.style.setProperty('--room-rot-x', `${roomRotX.toFixed(2)}deg`);
            roomWorld.style.setProperty('--room-rot-y', `${roomRotY.toFixed(2)}deg`);

            const hudAngle = document.getElementById('hudAngle');
            if (hudAngle) {
                hudAngle.textContent = `CAM: ${roomRotX.toFixed(1)}° / ${roomRotY.toFixed(1)}°`;
            }

            requestAnimationFrame(updateRoomPhysics);
        };
        requestAnimationFrame(updateRoomPhysics);

        const roomPills = document.querySelectorAll('.room-pill');
        const roomWallBack = document.querySelector('.room-wall-back');
        const hudTitle = document.getElementById('hudRoomTitle');

        const roomPresets = {
            living: {
                title: 'Living Pavilion Suite',
                img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80',
                specs: 'AREA: 68M² · CEILING: 3.4M'
            },
            suite: {
                title: 'Executive Cabin & Lounge',
                img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80',
                specs: 'AREA: 52M² · ACOUSTIC OAK'
            },
            kitchen: {
                title: 'Modular Island Studio',
                img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=80',
                specs: 'AREA: 38M² · QUARTZ & BRASS'
            }
        };

        roomPills.forEach(pill => {
            pill.addEventListener('click', () => {
                roomPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                const presetKey = pill.getAttribute('data-room');
                const data = roomPresets[presetKey];
                if (data && roomWallBack) {
                    roomWallBack.style.backgroundImage = `linear-gradient(rgba(17,24,39,0.25), rgba(17,24,39,0.65)), url('${data.img}')`;
                    if (hudTitle) hudTitle.textContent = data.title;
                    const hudSpecs = document.getElementById('hudRoomSpecs');
                    if (hudSpecs) hudSpecs.textContent = data.specs;
                }
            });
        });
    }

    // ========================================================
    // 6. INTERACTIVE 3D CARDS WITH SPECULAR GLARE
    // ========================================================
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        if (!card.querySelector('.card-glare')) {
            const glare = document.createElement('div');
            glare.className = 'card-glare';
            card.appendChild(glare);
        }

        if (isDesktop && !isReducedMotion) {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const percentX = (x / rect.width);
                const percentY = (y / rect.height);

                card.style.setProperty('--glare-x', `${(percentX * 100).toFixed(1)}%`);
                card.style.setProperty('--glare-y', `${(percentY * 100).toFixed(1)}%`);

                const cardTargetX = (percentX - 0.5) * 12;
                const cardTargetY = (percentY - 0.5) * -12;

                card.style.transform = `perspective(1000px) translateY(-8px) rotateX(${cardTargetY.toFixed(2)}deg) rotateY(${cardTargetX.toFixed(2)}deg) translateZ(10px)`;
            }, { passive: true });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) translateY(0) rotateX(0deg) rotateY(0deg) translateZ(0)';
            });
        }
    });

    // ========================================================
    // 7. MAGNETIC BUTTON MICRO-INTERACTIONS
    // ========================================================
    if (isDesktop && !isReducedMotion) {
        const magneticBtns = document.querySelectorAll('.btn-primary, .btn-outline, .whatsapp-btn');
        magneticBtns.forEach(btn => {
            btn.classList.add('btn-magnetic');

            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                btn.style.transform = `translate3d(${x * 0.22}px, ${y * 0.22}px, 0) scale(1.03)`;
            }, { passive: true });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate3d(0, 0, 0) scale(1)';
            });
        });
    }

    // ========================================================
    // 8. SCROLL-BASED 3D REVEAL OBSERVER
    // ========================================================
    if (!isReducedMotion) {
        const revealElements = document.querySelectorAll('.service-card, .review-card, .stat-box, .about-img, .about-content, .section-header');
        revealElements.forEach((el, idx) => {
            el.classList.add('reveal-init');
            const delay = (idx % 4) + 1;
            el.classList.add(`reveal-delay-${delay}`);
        });

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ========================================================
    // 9. HERO SLIDER AUTO-ROTATION
    // ========================================================
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    if (slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 6000);
    }

    // ========================================================
    // 10. STICKY HEADER SCROLL EFFECT
    // ========================================================
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('is-scrolled');
            } else {
                header.classList.remove('is-scrolled');
            }
        }, { passive: true });
    }

    // ========================================================
    // 11. ROBUST MOBILE NAVIGATION & OVERLAY CONTROLLER
    // ========================================================
    const topContainer = document.querySelector('.top-container');
    const hamburger = document.getElementById('hamburger');
    const navList = document.getElementById('navList');

    // Guarantee hamburger is on the same row as logo inside top-container
    if (topContainer && hamburger && hamburger.parentElement !== topContainer) {
        topContainer.appendChild(hamburger);
    }

    // Ensure accessible attributes on hamburger button
    if (hamburger) {
        hamburger.setAttribute('aria-label', 'Open navigation menu');
        hamburger.setAttribute('aria-expanded', 'false');
    }

    // Create Mobile Backdrop Overlay if not present
    let navBackdrop = document.querySelector('.mobile-nav-backdrop');
    if (!navBackdrop) {
        navBackdrop = document.createElement('div');
        navBackdrop.className = 'mobile-nav-backdrop';
        document.body.appendChild(navBackdrop);
    }

    // Create Mobile Drawer Header with Close Button inside navList
    if (navList && !navList.querySelector('.mobile-drawer-header')) {
        const drawerHeader = document.createElement('div');
        drawerHeader.className = 'mobile-drawer-header';
        drawerHeader.innerHTML = `
            <div class="drawer-brand">Dsign <span>Interior</span></div>
            <button class="mobile-close-btn" id="mobileCloseBtn" aria-label="Close navigation menu">
                <i class="fas fa-times"></i>
            </button>
        `;
        navList.insertBefore(drawerHeader, navList.firstChild);
    }

    let isMobileMenuOpen = false;

    const openMobileMenu = () => {
        if (!navList) return;
        isMobileMenuOpen = true;
        if (header) header.classList.add('menu-open');
        navList.classList.add('active');
        if (navBackdrop) navBackdrop.classList.add('active');
        if (hamburger) {
            hamburger.setAttribute('aria-expanded', 'true');
            hamburger.setAttribute('aria-label', 'Close navigation menu');
            hamburger.classList.add('is-active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-times';
            }
        }
        document.body.style.overflow = 'hidden';
    };

    const closeMobileMenu = () => {
        if (!navList) return;
        isMobileMenuOpen = false;
        if (header) header.classList.remove('menu-open');
        navList.classList.remove('active');
        if (navBackdrop) navBackdrop.classList.remove('active');
        if (hamburger) {
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Open navigation menu');
            hamburger.classList.remove('is-active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-bars';
            }
        }
        document.body.style.overflow = '';
    };

    const toggleMobileMenu = () => {
        if (isMobileMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    };

    // Hamburger button click handler
    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });
    }

    // Close button click handler
    const closeBtn = document.getElementById('mobileCloseBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeMobileMenu();
        });
    }

    // Backdrop click handler (clicking outside the menu panel)
    if (navBackdrop) {
        navBackdrop.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeMobileMenu();
        });
    }

    // Prevent clicks inside drawer panel from closing it
    if (navList) {
        navList.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Escape key press handler
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMobileMenuOpen) {
            closeMobileMenu();
        }
    });

    // Close mobile menu when an actual destination link is clicked & accordion toggle
    if (navList) {
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                const parent = link.closest('.has-dropdown');
                // If it's a mobile accordion parent toggle, DO NOT close the menu
                if (window.innerWidth <= 1024 && parent && link.classList.contains('nav-link')) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const isCurrentlyActive = parent.classList.contains('active');
                    
                    // Close other open dropdowns for smooth accordion effect
                    navList.querySelectorAll('.has-dropdown').forEach(other => {
                        if (other !== parent) other.classList.remove('active');
                    });
                    
                    if (isCurrentlyActive) {
                        parent.classList.remove('active');
                    } else {
                        parent.classList.add('active');
                    }
                    return;
                }

                // If destination page link clicked, close the drawer
                closeMobileMenu();
            });
        });
    }

    // Fallback outside-click on document
    document.addEventListener('click', (e) => {
        if (isMobileMenuOpen) {
            const isInsideMenu = navList && navList.contains(e.target);
            const isHamburger = hamburger && (hamburger === e.target || hamburger.contains(e.target));
            if (!isInsideMenu && !isHamburger) {
                closeMobileMenu();
            }
        }
    });

    // ========================================================
    // 13. FAQ ACCORDION
    // ========================================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(faq => faq.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // ========================================================
    // 14. THEME TOGGLE
    // ========================================================
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
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

    // ========================================================
    // 15. DYNAMIC FORM SUBMISSION TO WHATSAPP
    // ========================================================
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const location = document.getElementById('location').value;
            const msg = document.getElementById('message').value;
            
            const waText = `Hello Dsign Interior,%0A%0A*New Enquiry*%0AName: ${name}%0APhone: ${phone}%0AService: ${service}%0ALocation: ${location}%0AMessage: ${msg}%0A%0AI would like to discuss my requirement and get a quotation.`;
            
            window.open(`https://wa.me/919716786164?text=${waText}`, '_blank');
        });
    }
});
