<?php
if ($GET['signin']) {
    $conn = mysqli_connect("localhost", "root", "", "compiler");
    $eid = $_GET['email-id'];
    $uname = $_GET['user_name'];
    $pass = $_GET['your_pass'];

    $sql = "SELECT * FROM `registration` WHERE `email` = '$eid';";
    $result = mysqli_query($conn, $sql);
    $num = mysqli_num_rows($result);
    if ($num == 1) {
        while ($row = mysqli_fetch_assoc($result)) {
            if ($pass == $row['password'] and $uname == $row['username']) {
                $login = true;
                session_start();
                $_SESSION['loggedin'] = true;
                $_SESSION['username'] = $uname;
                echo '<script>window.close()</script>';
                // header("location:http://127.0.0.1:5500/index.html");
            } else {
                $showError = "password or username does not match. please try again...!!";
                // echo '<script>close()</script>';
            }
        }
    } else {
        $showError = "Login failed. please try again...!!";
    };

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
    else{
        echo 'fail';
    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <link rel="stylesheet" href="login.css">
</head>

<body>
    <!-- <script>
        localStorage.setItem('session', 1);
        // window.open('http://127.0.0.1:5500/index.html#');
        // window.close()
    </script> -->
</body>
</html>