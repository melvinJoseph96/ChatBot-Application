<!DOCTYPE html>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" href="css/form.css">
    <link rel="stylesheet" href="css/admin.css">
</head>
<body>
<form method="post" action="/admin">
    <div id="bar">
        <img src="media/fdm-logo-anim.gif" width="120" height="60">
        <h1>Admin Login</h1>
    </div>
    <div class="container">
        <br><br><br><br>
        <label id='firstLabel' for="username"><b>Username</b></label>
        <input id='first' type="text" placeholder="Enter Username" name="username" required>
        <label for="password"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="password" required>
        <div class="error"><c:if test="${not empty error}">${error}</c:if></div>
        <div id="buttons">
            <button id="login" type="submit">Login</button>
            <button id="register" onclick="location.href='/register'">Register</button>
        </div>
    </div>
</form>
</body>
</html>