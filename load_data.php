<?php
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT"); // A date in the past
header("Pragma: no-cache");

$context = stream_context_create(array(
    'http' => array(
        'header' => 'Cache-Control: no-cache, must-revalidate'
    )
));

$data = file_get_contents('data.json', false, $context);
if ($data === false) {
    die('Error reading data.json');
}
echo $data;
