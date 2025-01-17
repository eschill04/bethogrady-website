// document.addEventListener('DOMContentLoaded', () => {
//     const container = document.getElementById('data-container');
//     container.innerHTML = '<p>Static content goes here.</p>';
// });
document.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 0;

    function showSlides() {
        const slides = document.querySelectorAll('.slide');
        
        // Remove the "active" class from all slides
        slides.forEach(slide => slide.classList.remove('active'));

        // Increment slide index
        currentSlide++;

        // Reset to the first slide if at the end
        if (currentSlide > slides.length) {
            currentSlide = 1;
        }

        // Add the "active" class to the current slide
        slides[currentSlide - 1].classList.add('active');

        // Set the slideshow interval
        setTimeout(showSlides, 3000); // Change every 3 seconds
    }

    // Initialize slideshow
    showSlides();
});
