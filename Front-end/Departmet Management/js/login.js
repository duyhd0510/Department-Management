$(function() {
    var isRememberMe = storage.getRememberMe();
    document.getElementById("rememberMe").checked = isRememberMe;
});

function login() {
    //get username password
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (!username) {
        showNameErrorMessage("Please input username");
        return;
    }

    if (!password) {
        showNameErrorMessage("Please input password");
        return;
    }

    if (username.length < 6 || username.length > 50 || password.length < 6 || password.length > 50) {
        showNameErrorMessage("Login fail!");
        return;
    }


    //todo validate

    //call API
    $.ajax({
        url: 'http://localhost:8080/api/v1/login',
        type: 'GET',
        // data: JSON.stringify(department),
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
        },
        success: function (data, textStatus, xhr) {
            // console.log(data);

            var rememberMe = document.getElementById("rememberMe").checked;
            storage.saveRememberMe(rememberMe);
            storage.setItem("ID", data.id);
            storage.setItem("FULL_NAME", data.fullName);
            storage.setItem("USER_NAME", username);
            storage.setItem("PASS_WORD", password);
            storage.setItem("ROLE", data.role);

            // window.location.href = "http://127.0.0.1:5500/html/program.html";
            window.location.replace("http://127.0.0.1:5500/html/program.html");

        },
        error(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 401) {
                showNameErrorMessage("Login fail!");
            } else {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        }
    })
}

function hideNameErrorMessage() {
    document.getElementById("errorNameMessage").style.display = "none";
}

function showNameErrorMessage(message) {
    document.getElementById("errorNameMessage").style.display = "block";
    document.getElementById("errorNameMessage").innerHTML = message;
}