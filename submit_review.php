<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars($_POST['name']);
    $review = htmlspecialchars($_POST['review']);

    // Store reviews in a file (this is just an example; use a database in production)
    $reviewsFile = 'reviews.json';
    $reviews = [];

    if (file_exists($reviewsFile)) {
        $reviews = json_decode(file_get_contents($reviewsFile), true);
    }

    $reviews[] = ['name' => $name, 'review' => $review];
    file_put_contents($reviewsFile, json_encode($reviews));

    echo 'Review submitted successfully.';
}
?>
