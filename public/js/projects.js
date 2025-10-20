// Load projects content dynamically
document.addEventListener('DOMContentLoaded', function() {
    fetch('public/html/projects-content.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('projects-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading projects:', error));
});