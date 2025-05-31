// ------------------------
// Load Header and Footer
// ------------------------
function loadComponent(id, file) {
    fetch(file)
        .then(res => res.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        });
}
window.addEventListener('DOMContentLoaded', () => {
    loadComponent("header", "../src/components/header.html");
    loadComponent("footer", "../src/components/footer.html");
});

// ------------------------
// Smooth scrolling for navigation
// ------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        const headerOffset = 80;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// ------------------------
// Fade in animation on scroll
// ------------------------
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// ------------------------
// Form submission handler
// ------------------------
function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get('name');
    alert(`Thank you ${name}! Your message has been sent. I'll get back to you soon.`);
    event.target.reset();
}

// ------------------------
// Active nav link highlighting
// ------------------------
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ------------------------
// Dynamic, smooth, multi-slider (auto, pause on hover, buttons/dots)
// ------------------------
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.slider').forEach((slider) => {
        const slides = slider.getElementsByClassName('slide');
        const dots = slider.parentElement.querySelectorAll('.dot');
        let current = 0;
        let interval = null;

        // Show the desired slide, hide others
        function show(n) {
            if (n >= slides.length) n = 0;
            if (n < 0) n = slides.length - 1;
            for (let i = 0; i < slides.length; i++) slides[i].classList.remove('active');
            slides[n].classList.add('active');
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[n]) dots[n].classList.add('active');
            current = n;
        }

        // Auto-play unique to this slider, with slight random offset to avoid sync
        function startAutoPlay() {
            stopAutoPlay();
            interval = setInterval(() => {
                show(current + 1);
            }, 3000 + Math.random() * 1000);
        }
        function stopAutoPlay() {
            if (interval) clearInterval(interval);
        }

        // Event: Buttons
        slider.parentElement.querySelectorAll('.slider-nav.prev').forEach(btn =>
            btn.onclick = () => { show(current - 1); }
        );
        slider.parentElement.querySelectorAll('.slider-nav.next').forEach(btn =>
            btn.onclick = () => { show(current + 1); }
        );

        // Event: Dots
        dots.forEach((dot, i) =>
            dot.onclick = () => { show(i); }
        );

        // Pause auto on hover
        slider.addEventListener('mouseenter', stopAutoPlay);
        slider.addEventListener('mouseleave', startAutoPlay);

        // Init
        show(0);
        startAutoPlay();
    });
});
