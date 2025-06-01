// ========== Utility to load HTML components ==========

function loadComponent(id, file, callback) {
    fetch(file)
        .then(res => res.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (callback) callback();
        });
}

// ========== Fade-in Observer ==========

function observeFadeIn() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    document.querySelectorAll('.fade-in:not(.visible)').forEach(el => {
        observer.observe(el);
    });
}

// ========== Country Collapse Handlers ==========

function addCountryToggleHandlers() {
    document.querySelectorAll('.country-toggle').forEach(btn => {
        btn.addEventListener('click', function () {
            const country = this.closest('.country');
            country.classList.toggle('open');
        });
    });
}

// ========== DOM Ready ==========

document.addEventListener("DOMContentLoaded", function () {
    // ---- Load Header and Footer ----
    loadComponent("header", "src/components/header.html");
    loadComponent("footer", "src/components/footer.html");

    // ---- Load Travel Section (with fade-in & country toggles) ----
    loadComponent("travel-section-placeholder", "src/components/travel.html", function() {
        observeFadeIn();
        if (window.initTravelGallery) window.initTravelGallery();
    });

    // ---- Smooth scrolling for navigation ----
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

    // ---- Fade in animation on scroll (for initially present .fade-in) ----
    observeFadeIn();

    // ---- Form submission handler ----
    window.handleSubmit = function(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get('name');
        alert(`Thank you ${name}! Your message has been sent. I'll get back to you soon.`);
        event.target.reset();
    };

    // ---- Active nav link highlighting ----
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

    
    // ---- Travel slideshow (optional: only if you have travel slider) ----
    // If you use a travel slider, include the code here as well
    // (copy from previous "Travel slideshow logic" answers)

    // ---- Floating resume menu (if you use two buttons, no JS needed) ----

});

function filterGalleryByCountry() {
    const countryBtn = document.querySelector('#country-filters .active');
    const country = countryBtn ? countryBtn.getAttribute('data-country') : "all";
    document.querySelectorAll('.gallery-item').forEach(item => {
      const itemCountry = item.getAttribute('data-country');
      const matchCountry = (country === "all" || itemCountry === country);
      item.style.display = matchCountry ? "" : "none";
    });
  }
  document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('#country-filters button').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('#country-filters button').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        filterGalleryByCountry();
      });
    });
  });
  

