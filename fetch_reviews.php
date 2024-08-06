<?php
// Path to the JSON file storing reviews
$reviewsFile = 'reviews.json';

// Initialize the reviews array
$reviews = [];

// Check if the file exists and read its contents
if (file_exists($reviewsFile)) {
    $reviews = json_decode(file_get_contents($reviewsFile), true);
}

// Return the reviews as JSON
header('Content-Type: application/json');
echo json_encode($reviews);
?>
