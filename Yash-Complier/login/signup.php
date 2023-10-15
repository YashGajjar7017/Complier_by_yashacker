<?php
session_start();
if ($_POST['signup']) {
    $conn = mysqli_connect("localhost", "root", "", "compiler");
    $fname = $_POST['first-name'];
    $lname = $_POST['last-name'];
    $eid = $_POST['email'];
    $uname = $_POST['user-name'];
    $pass = $_POST['pass'];
    $rpass = $_POST['re_pass'];

    $existsql = "SELECT * FROM `registration` WHERE `email` = '$eid';";
    $result = mysqli_query($conn, $existsql);
    $numexistrow = mysqli_num_rows($result);
    if ($numexistrow > 0) {
        $showError = "Email already Exists...!!";
    } else {

        if ($pass == $rpass) {

            $query = "INSERT INTO `registration`(`firstname`, `lastname`, `email`, `username`, `password`,`cpassword`) VALUES ('$fname','$lname','$eid','$uname','$pass','$rpass');";
            $ex = mysqli_query($conn, $query);
            if ($ex) {
                echo '<script>window.close()</script>';
                // header('location:http://127.0.0.1:5500/index.html$uname');
            }
        } else {
            $showError = "Password does not match. please try again...!!!";
            // echo '<script>close()</script>';
            // header('location:$link');
        }
    }
    if ($showError) {
        echo "
        <html>
            <body>
            <script>
                alert('$showError');
             </script>
            <body>
        <html> ";
    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <link rel="stylesheet" href="login.css">
</head>

<body>
    <script>
        localStorage.setItem('session', 1);
        // location.href = 'http://127.0.0.1:5500/index.html#';
        // window.close()
    </script>
</body>
</html>