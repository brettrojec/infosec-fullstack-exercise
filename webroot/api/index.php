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

$country_list=[];
$response=curl_exec($api_request);
if(curl_getinfo($api_request) && curl_getinfo($api_request)["http_code"]!=404){
    $country_list=json_decode($response,true);
}

if(2<=strlen($searchTerm) && strlen($searchTerm)<=3){
    curl_setopt($api_request, CURLOPT_URL, $URL_CODE . $searchTerm . $URL_PARAMS);
    $code_response = curl_exec($api_request);
    if(curl_getinfo($api_request) && curl_getinfo($api_request)["http_code"]!=404){
        $country_list=array_merge($country_list,[json_decode($code_response,true)]);
    }
}

$country_list=array_unique($country_list,SORT_REGULAR);
usort($country_list, "pop_sort");

foreach($country_list as &$country){
    foreach(["region","subregion"] as $section){
        if($country[$section]==""){
            $country[$section]="None";
        }
    }
    $langStr = "";
    for($x=0; $x<count($country["languages"]); $x++){
        //$name = $country["langauges"][$x]["name"];  
        //$nativeName=$country["langauges"][$x]["nativeName"];
        //$langStr .= $country["languages"][$x]["nativeName"] . " (" . $country["languages"][$x]["name"] . ")";
        //echo $country["languages"][$x]["name"] . " (" . $country["languages"][$x]["nativeName"] . ")";
        unset($country["languages"][$x]["iso639_1"]);
        unset($country["languages"][$x]["iso639_2"]);
        /*if(strcmp($country["langauges"][$x]["name"], $country["langauges"][$x]["nativeName"])==0){
            $langStr .= $country["langauges"][$x]["name"];
        }else{
            $langStr .= sprintf("%s (%s)", $country["languages"][$x]["nativeName"], $country["langauges"][$x]["name"]);
        }

        if($x < (count($country["languages"])-1)){
            $langStr .= ", ";
        }*/
    }
    //echo $langStr;
    //$country["languages"]=$langStr;
}
unset($country);

echo json_encode([
    "response"=>$country_list,
    "searched_url"=>curl_getinfo($api_request, CURLINFO_EFFECTIVE_URL),
]);

curl_close($api_request);
