<?php
// $link1 = ;
if ($_POST['signin']) {
    $conn = mysqli_connect("localhost", "root", "", "compiler");
    $eid = $_POST['email-id'];
    $uname = $_POST['user_name'];
    $pass = $_POST['your_pass'];

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
                echo '<script>close()</script>';
                header("location:'http://127.0.0.1:5500/index.html'");
            } else {
                $showError = "password or username does not match. please try again...!!";
                echo '<script>close()</script>';
            }
        }
    } else {
        $showError = "Login failed. please try again...!!";
    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <link rel="stylesheet" href="pop.css">
</head>

<body>
    <?php
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
    ?>
    <script>
        localStorage.setItem('session', 1);
        // window.open('../index.html');
        // window.close()
    </script>
</body>
</html>