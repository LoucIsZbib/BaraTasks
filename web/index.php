<?php

$uri = $_SERVER[REQUEST_URI];

if($uri == "/")
{
    $html = file_get_contents('page.html');
    echo $html;
}
else if ($uri == "/get")
{
    $tasklist = file_get_contents("data.json");
    echo $tasklist;
}
else if ($uri == "/set")
{
    $postdata = file_get_contents("php://input");
    //$request = json_decode($postdata);
    file_put_contents("phpjson.".time(), $postdata); // marche
    file_put_contents("data.json", $postdata);
}
else
{
    header('HTTP/1.0 404 Not Found');
}
