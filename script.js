// script.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('review-form');
    const reviewSlider = document.getElementById('review-slider');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Capture review data
        const name = form.elements['name'].value;
        const review = form.elements['review'].value;

        // Send data to server via AJAX
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'submit_review.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {
            if (xhr.status === 200) {
                // Clear the slider and reload reviews
                reviewSlider.innerHTML = '';
                loadReviews();
                form.reset(); // Reset the form
            } else {
                alert('Failed to submit review.');
            }
        };
        xhr.send(`name=${encodeURIComponent(name)}&review=${encodeURIComponent(review)}`);
    });

    function loadReviews() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'fetch_reviews.php', true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                const reviews = JSON.parse(xhr.responseText);
                reviews.forEach((reviewData, index) => {
                    const reviewElement = document.createElement('div');
                    reviewElement.classList.add('review');
                    if (index === 0) {
                        reviewElement.classList.add('active');
                    }
                    reviewElement.innerHTML = `<p><strong>${reviewData.name}</strong></p><p>${reviewData.review}</p>`;
                    reviewSlider.appendChild(reviewElement);
                });
                // Start the slider
                startSlider();
            }
        };
        xhr.send();
    }

    function startSlider() {
        let currentReviewIndex = 0;
        const reviews = reviewSlider.querySelectorAll('.review');
        if (reviews.length > 1) {
            setInterval(() => {
                reviews[currentReviewIndex].classList.remove('active');
                currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
                reviews[currentReviewIndex].classList.add('active');
            }, 3000); // Change every 3 seconds
        }
    }

    // Initial load of reviews
    loadReviews();
});
