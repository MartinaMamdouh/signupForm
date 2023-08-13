<?php
header('Access-Control-Allow-Origin: *');
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "signup";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (mysqli_connect_error()) {
    echo mysqli_connect_error();
    exit();
} else {

    $fullName = $_POST["fullName"];
    $mobile = $_POST["mobile"];
    $email = $_POST["email"];
    $pasword = $_POST["password"];
    $enc_pwd = md5($pasword);
    $imagePath=$_POST['imagePath'];

    // Validation
    $errors = array();
    
    // Mobile validation
    if (!preg_match("/^[0-9]{11}$/", $mobile)) {
        $errors[] = "Invalid mobile number";
    }

    // Email validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Password must be at least 8 characters long";
    }

    // Password validation
    if (strlen($pasword) < 8) {
        $errors[] = "Password must be at least 8 characters long";
    }
    if (!preg_match("/[A-Z]/", $pasword)) {
        $errors[] = "Password must have at least one uppercase letter";
    }
    if (!preg_match("/[a-z]/", $pasword)) {
        $errors[] = "Password must have at least one lowercase letter";
    }
    if (!preg_match("/[0-9]/", $pasword)) {
        $errors[] = "Password must have at least one digit";
    }
    if (!preg_match("/[!@#$%^&*]/", $pasword)) {
        $errors[] = "Password must have at least one special character (!@#$%^&*)";
    }

    function checkEmailExists($conn, $email) {
        $sql = "SELECT * FROM user WHERE email = '$email'";
        $result = mysqli_query($conn, $sql);
        return mysqli_num_rows($result) > 0;
    }

    if (empty($errors)) {
        if (checkEmailExists($conn, $email)) {
            echo "Email already exists";
        } else {
        $sql = "INSERT INTO user(profileImg,fullName,mobile,email,password) VALUE( '$imagePath','$fullName','$mobile','$email','$enc_pwd'); ";
        $res = mysqli_query($conn, $sql);
        if ($res) {
            echo "Success!";
        } else {
            echo "Error!";
        }
    }
    } else {
        echo implode(", ", $errors);
    }

    $conn->close();
}
