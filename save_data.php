<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $productName = $_POST['productName'];
    $quantityInStock = $_POST['quantityInStock'];
    $pricePerItem = $_POST['pricePerItem'];
    $datetimeSubmitted = date('Y-m-d H:i:s');

    $data = json_decode(file_get_contents('data.json'), true);

    if (isset($_POST['index'])) {
        $index = $_POST['index'];
        $data[$index] = [
            'productName' => $productName,
            'quantityInStock' => $quantityInStock,
            'pricePerItem' => $pricePerItem,
            'datetimeSubmitted' => $datetimeSubmitted
        ];
    } else {
        $data[] = [
            'productName' => $productName,
            'quantityInStock' => $quantityInStock,
            'pricePerItem' => $pricePerItem,
            'datetimeSubmitted' => $datetimeSubmitted
        ];
    }
    file_put_contents('data.json', json_encode($data, JSON_PRETTY_PRINT));
    clearstatcache();
}
