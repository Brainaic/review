<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars($_POST['name']);
    $review = htmlspecialchars($_POST['review']);

    // Path to the JSON file storing reviews
    $reviewsFile = 'reviews.json';

    // Initialize the reviews array
    $reviews = [];

    // Check if the file exists and read its contents
    if (file_exists($reviewsFile)) {
        $reviews = json_decode(file_get_contents($reviewsFile), true);
    }

    // Add the new review to the array
    $reviews[] = ['name' => $name, 'review' => $review];

    // Save the reviews array back to the file
    file_put_contents($reviewsFile, json_encode($reviews));

    echo 'Review submitted successfully.';
}
?>
