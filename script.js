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
                addReviewToSlider(name, review);
                form.reset(); // Reset the form
            } else {
                alert('Failed to submit review.');
            }
        };
        xhr.send(`name=${encodeURIComponent(name)}&review=${encodeURIComponent(review)}`);
    });

    function addReviewToSlider(name, review) {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');
        reviewElement.innerHTML = `<p><strong>${name}</strong></p><p>${review}</p>`;
        reviewSlider.appendChild(reviewElement);

        // Display the new review immediately
        showReview(reviewElement);
    }

    function showReview(reviewElement) {
        const activeReview = reviewSlider.querySelector('.review.active');
        if (activeReview) {
            activeReview.classList.remove('active');
        }
        reviewElement.classList.add('active');
    }

    // Simulate slider functionality (simple approach, can be improved)
    let currentReviewIndex = 0;
    setInterval(() => {
        const reviews = reviewSlider.querySelectorAll('.review');
        if (reviews.length > 0) {
            reviews[currentReviewIndex].classList.remove('active');
            currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
            reviews[currentReviewIndex].classList.add('active');
        }
    }, 3000); // Change every 3 seconds
});
