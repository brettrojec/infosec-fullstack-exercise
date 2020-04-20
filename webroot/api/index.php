<?php
$URL_BASE="https://restcountries.eu/rest/v2/";
$URL_NAME=$URL_BASE . "name/";
$URL_CODE=$URL_BASE . "alpha/"
 header('Content-Type: application/json');
 echo json_encode(['data' => [$_POST["searchTerm"]]]);
