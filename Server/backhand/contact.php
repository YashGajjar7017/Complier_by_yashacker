<?php 
if(isset($_POST['submit'])){
        echo "
        <html>
            <body>
            <script>
                alert('We will replyyou within 24 hours');
                location.href = 'log.html';
             </script>
            <body>
        <html> ";
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>contact us</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css">
    <link rel="stylesheet" href="contact.css">
</head>
<body >
    <section id="section-wrapper">
        <div class="box-wrapper">
            <div class="info-wrap">
                <h2 class="info-title">Contact Information</h2>
                <h3 class="info-sub-title">Fill up the form and our Team will get back to you within 24 hours</h3>
                <ul class="info-details">
                    <li>
                        <i class="fas fa-phone-alt"></i>
                        <span>Phone:</span> <a href="tel:+91 612 3456 789">+91 6123456789</a>
                    </li>
                    <li>
                        <i class="fas fa-paper-plane"></i>
                        <span>Email:</span> <a href="bytercompiler0102@gmail.com">bytercompiler0102@gmail.com</a>
                    </li>
                    <li>
                        <i class="fas fa-globe"></i>
                        <span>Website:</span> <a href="#">bytercompiler.com</a>
                    </li>
                </ul>
                <ul class="social-icons">
                    <li><a href="#"><i class="fab fa-facebook"></i></a></li>
                    <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                    <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                </ul>
            </div>
            <div class="form-wrap">
                <form action="https://formsubmit.co/f745f237c8b5624b92b442081fb5f7df" method="POST">
                    <h2 class="form-title">Send us a message</h2>
                    <div class="form-fields">
                        <div class="form-group">
                            <input type="text" class="fname" name="fname"placeholder="First Name">
                        </div>
                        <div class="form-group">
                            <input type="text" class="lname"name="lname" placeholder="Last Name">
                        </div>
                        <div class="form-group">
                            <input type="email" class="email" name="email" placeholder="Mail">
                        </div>
                        <div class="form-group">
                            <input type="number" class="phone" name="phone" placeholder="Phone">
                        </div>
                        <div class="form-group">
                            <textarea name="message" id="" placeholder="Write your message"></textarea>
                        </div>
                    </div>
                    <input type="submit" value="Send Message" name="submit" class="submit-button">
                </form>
            </div>
        </div>
    </section>
</body>
</html>