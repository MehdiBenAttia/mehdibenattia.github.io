function initTravelGallery() {
    // Filter logic
    const filters = document.querySelectorAll('.gallery-filters button');
    const items = document.querySelectorAll('.gallery-item');
    filters.forEach(btn => {
      btn.addEventListener('click', function() {
        filters.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filter = this.getAttribute('data-country'); // use 'data-country' for country filtering
        items.forEach(item => {
          const itemCountry = item.getAttribute('data-country');
          if (filter === "all" || itemCountry === filter) {
            item.style.display = "";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  
    // Lightbox logic
    // const lightbox = document.getElementById('galleryLightbox');
    // const lightboxImg = document.getElementById('lightboxImg');
    // const lightboxCaption = document.getElementById('lightboxCaption');
    // const closeBtn = document.getElementById('closeLightbox');
    // document.querySelectorAll('.gallery-item img').forEach(img => {
    //   img.addEventListener('click', function() {
    //     lightboxImg.src = this.src;
    //     lightboxCaption.textContent = this.getAttribute('data-caption') || this.alt;
    //     lightbox.classList.add('show');
    //   });
    // });
    // if (closeBtn) {
    //   closeBtn.addEventListener('click', function() {
    //     lightbox.classList.remove('show');
    //     lightboxImg.src = "";
    //     lightboxCaption.textContent = "";
    //   });
    // }
    // if (lightbox) {
    //   lightbox.addEventListener('click', function(e) {
    //     if (e.target === lightbox) {
    //       lightbox.classList.remove('show');
    //       lightboxImg.src = "";
    //       lightboxCaption.textContent = "";
    //     }
    //   });
    // }
}
// Make the function callable from main.js
window.initTravelGallery = initTravelGallery;
