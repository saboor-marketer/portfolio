// Digital Marketing Portfolio - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navLinks.forEach(link => {
                if (!link.classList.contains('btn-upgrade')) {
                    link.style.color = '#333 !important';
                }
            });
        } else {
            navbar.classList.remove('scrolled');
            navLinks.forEach(link => {
                if (!link.classList.contains('btn-upgrade')) {
                    link.style.color = 'white !important';
                }
            });
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.navbar-nav .nav-link');

    function highlightNavigation() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // Animate skill progress bars when they come into view
    const skillBars = document.querySelectorAll('.progress-bar');
    const animateSkills = () => {
        skillBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (barTop < windowHeight - 100) {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            }
        });
    };

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Animate skill bars
                if (entry.target.classList.contains('about-section')) {
                    setTimeout(animateSkills, 500);
                }
            }
        });
    }, observerOptions);

    // Observe sections for animation
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observe cards for animation
    const cards = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .blog-card');
    cards.forEach(card => {
        observer.observe(card);
    });

    // Portfolio filter functionality (if needed in future)
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Add hover effects to portfolio items
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('img').style.transform = 'scale(1.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('img').style.transform = 'scale(1)';
        });
    });

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[placeholder="Your Name"]').value;
            const email = this.querySelector('input[placeholder="Your Email"]').value;
            const subject = this.querySelector('input[placeholder="Subject"]').value;
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            background: ${type === 'success' ? '#28a745' : '#dc3545'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            transform: translateX(400px);
            transition: all 0.3s ease;
            max-width: 350px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }

    // Image lazy loading
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.style.opacity = '0';
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        imageObserver.observe(img);
    });

    // Mobile menu close on link click
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    navItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Testimonials slider (simple version)
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.style.opacity = i === index ? '1' : '0.3';
            card.style.transform = i === index ? 'scale(1)' : 'scale(0.95)';
        });
    }

    // Auto-rotate testimonials every 5 seconds
    if (testimonialCards.length > 1) {
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    // Initialize first testimonial
    showTestimonial(0);

    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
            this.style.color = 'white';
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.background = 'white';
                icon.style.color = '#667eea';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = 'white';
            this.style.color = '#333';
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
                icon.style.color = 'white';
            }
        });
    });

    // Counter animation for statistics (if added)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    // Initialize counters if they exist
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(counter, target);
                    counterObserver.unobserve(counter);
                }
            });
        });
        counterObserver.observe(counter);
    });

    // Hire Me Popup functionality
    const hireBtn = document.getElementById('hireBtn');
    const hirePopup = document.getElementById('hirePopup');
    const closePopup = document.getElementById('closePopup');
    const hireForm = document.getElementById('hireForm');
    
    let hoverTimeout;
    let isPopupOpen = false;

    // Show popup on hover
    hireBtn.addEventListener('mouseenter', function() {
        if (!isPopupOpen) {
            hoverTimeout = setTimeout(() => {
                hirePopup.classList.add('show');
                isPopupOpen = true;
            }, 500); // Show after 500ms hover
        }
    });

    // Clear timeout if mouse leaves before 500ms
    hireBtn.addEventListener('mouseleave', function() {
        clearTimeout(hoverTimeout);
    });

    // Close popup when clicking close button
    closePopup.addEventListener('click', function() {
        hirePopup.classList.remove('show');
        isPopupOpen = false;
    });

    // Close popup when clicking outside
    hirePopup.addEventListener('click', function(e) {
        if (e.target === hirePopup) {
            hirePopup.classList.remove('show');
            isPopupOpen = false;
        }
    });

    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isPopupOpen) {
            hirePopup.classList.remove('show');
            isPopupOpen = false;
        }
    });

    // Handle form submission
    hireForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[placeholder="Your Name"]').value;
        const email = this.querySelector('input[placeholder="Your Email"]').value;
        const company = this.querySelector('input[placeholder="Company/Organization"]').value;
        const service = this.querySelector('select').value;
        const budget = this.querySelector('input[placeholder="Budget Range"]').value;
        const details = this.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !company || !service || !budget || !details) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Proposal request sent successfully! I\'ll get back to you within 24 hours.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            hirePopup.classList.remove('show');
            isPopupOpen = false;
        }, 2000);
    });

    // Prevent popup from closing when clicking inside the form
    document.querySelector('.hire-popup-content').addEventListener('click', function(e) {
        e.stopPropagation();
    });

    console.log('Digital Marketing Portfolio - JavaScript loaded successfully!');
});
