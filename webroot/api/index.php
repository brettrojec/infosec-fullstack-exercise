<?php
$URL_BASE='https://restcountries.eu/rest/v2/';
$URL_NAME=$URL_BASE . 'name/';
$URL_CODE=$URL_BASE . 'alpha/';
$URL_PARAMS='?fields=alpha2Code;alpha3Code;flag;region;subregion;name;population;languages';

function pop_sort($a, $b){
    return $a['population']<=$b['population'] ? 1 : -1;
}

$searchTerm=$_POST["searchTerm"];
header('Content-Type: application/json');

$api_request = curl_init();
curl_setopt_array($api_request, array(
    CURLOPT_URL => $URL_NAME . $searchTerm . $URL_PARAMS,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => "GET"
));

$response=json_decode(curl_exec($api_request),true);

if(2<=strlen($searchTerm) && strlen($searchTerm)<=3){
    curl_setopt($api_request, CURLOPT_URL, $URL_CODE . $searchTerm . $URL_PARAMS);
    $response=array_merge($response,[json_decode(curl_exec($api_request),true)]);
}

$response=array_unique($response,SORT_REGULAR);
usort($response, "pop_sort");

echo json_encode([
    "response"=>$response,
    "searched_url"=>curl_getinfo($api_request, CURLINFO_EFFECTIVE_URL),
]);

curl_close($api_request);
