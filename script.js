// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// EmailJS Integration
// IMPORTANT: Replace these with your actual EmailJS credentials
// 1. Sign up at https://www.emailjs.com/
// 2. Create an email service (e.g., Gmail)
// 3. Create an email template with variables: {{from_name}}, {{from_email}}, {{message}}
// 4. Get your Public Key, Service ID, and Template ID

const EMAILJS_PUBLIC_KEY = 'Mat67Q4Rf5goxxDFQ';
const EMAILJS_SERVICE_ID = 'service_ebbezvk';
const EMAILJS_TEMPLATE_ID = 'template_8xn3hxj';

// Initialize EmailJS with public key
(function() {
    emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY
    });
})();

// Form submission with EmailJS
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Change button text to show loading
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Get form data for debugging
    const formData = {
        from_name: contactForm.from_name.value,
        from_email: contactForm.from_email.value,
        message: contactForm.message.value
    };
    console.log('Sending email with data:', formData);
    
    // Send email using EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        })
        .catch((error) => {
            console.error('EmailJS Error:', error);
            alert('Oops! Something went wrong. Error: ' + (error.text || error.message || 'Unknown error'));
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-category, .project-card, .experience-card, .about-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
