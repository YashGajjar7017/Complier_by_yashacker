<?php

$skip=$_POST['logout'];

if($skip){
    session_start();
    session_unset();
    session_destroy();
    header('location:index.html');
    exit;
}
