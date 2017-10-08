<?php

$uri = $_SERVER['REQUEST_URI'];

if($uri == "/")
{
    $html = file_get_contents('page.html');
    echo $html;
}
else if ($uri == "/get")
{
    $tasklist = "";
    if( file_exists("../data/data.json") )
    {
        $tasklist = file_get_contents("../data/data.json");
        if($tasklist == FALSE)
        {
            $tasklist = "";
        }
    }
    echo $tasklist;
}
else if ($uri == "/set")
{
    $postdata = file_get_contents("php://input");
    //$request = json_decode($postdata);
    file_put_contents("../data/data.json.".time(), $postdata); // marche
    file_put_contents("../data/data.json", $postdata);
}
else
{
    header('HTTP/1.0 404 Not Found');
}
