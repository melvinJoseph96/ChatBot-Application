<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Registration</title>
    <link rel="stylesheet" href="css/form.css">
    <script src="js/admin.js"></script>
</head>
<body>
<div id="bar">
    <img src="fdm-logo-anim.gif" width="120" height="60">
    <h1>Admin Register Panel</h1>
</div>
    </div>
    <form action="">
        <div class="container">
            <label for="fname"><b>First Name</b></label>
            <input type="text" placeholder="Enter your first name" name="fname" required>
            <label for="sname"><b>Surname</b></label>
            <input type="text" placeholder="Enter your surname" name="sname" required>
            <label for="id"><b>Employee ID</b></label>
            <input type="text" placeholder="Enter your employee ID" name="id" required>
            <div id="usernameCheck">
                <label for="username"><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="username" required>
            </div>
            <label for="password"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="password" required>
            <div id="buttons">
                <button type="submit">Register</button>
                <button onclick="location.href='/admin'">Back</button>
            </div>
        </div>
    </form>
</body>
</html>