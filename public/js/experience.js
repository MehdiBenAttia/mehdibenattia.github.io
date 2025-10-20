// Load professional experience content dynamically
document.addEventListener('DOMContentLoaded', function() {
    const experienceContainer = document.getElementById('experience-container');
    
    if (experienceContainer) {
        fetch('public/html/experience.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load experience content');
                }
                return response.text();
            })
            .then(data => {
                experienceContainer.innerHTML = data;
                
                // Add fade-in animation observer for experience cards
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
                
                // Observe all experience cards
                const cards = document.querySelectorAll('.experience-card.fade-in');
                cards.forEach(card => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    observer.observe(card);
                });
            })
            .catch(error => {
                console.error('Error loading experience content:', error);
                experienceContainer.innerHTML = '<p>Failed to load experience content. Please refresh the page.</p>';
            });
    }
});