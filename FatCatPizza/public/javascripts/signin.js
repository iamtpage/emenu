var username;
var password;

function verifyUser() {
	getLoginInfo();
	var loginIndex = -1;
	var i;
	for(i = 0; i < users.length; i++)
	{
		if(users[i].username == username) {
			if(users[i].password == password) {
				loginIndex = i;
			}
		}
	}
	if(loginIndex == -1) {
		document.getElementById("failed").innerHTML = "INVALID USERNAME/PASSWORD"
	}
	else {
		var sendObject = JSON.stringify(users[loginIndex]);
		$.ajax({
			type: 'POST',
			data: sendObject,
			url: './currentuser',
			contentType: 'application/json',
			success: function () {

				window.location.replace(users[loginIndex].url);
			}
		});
	}
}

function getLoginInfo()
{
	username = document.getElementById('login-username').value;
	password = document.getElementById('login-password').value;
}