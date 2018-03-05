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
        <img src="fdm-logo-anim.gif" width="120" height="60">
        <h1>Admin Login</h1>
    </div>
    <div class="container">
        <label for="username"><b>Username</b></label>
        <input type="text" placeholder="Enter Username" name="username" required>
        <label for="password"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="password" required>
        <div id="buttons">
            <button type="submit">Login</button>
            <button onclick="location.href='/register'">Register</button>
        </div>
        <c:if test="${not empty error}">
            ${error}
        </c:if>
    </div>
</form>
</body>
</html>