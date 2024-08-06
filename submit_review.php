<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars($_POST['name']);
    $review = htmlspecialchars($_POST['review']);

    $reviewsFile = 'reviews.json';
    $reviews = [];

    if (file_exists($reviewsFile)) {
        $reviews = json_decode(file_get_contents($reviewsFile), true);
    }

    $reviews[] = ['name' => $name, 'review' => $review];
    if (file_put_contents($reviewsFile, json_encode($reviews))) {
        echo 'Review submitted successfully.';
    } else {
        echo 'Error writing to file.';
    }
} else {
    echo 'Invalid request method.';
}
?>
