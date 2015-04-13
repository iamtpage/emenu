
var loginEmail;
var loginPassword;

function getLoginInfo()
{
    loginEmail = document.getElementById('login-email').value;
    loginPassword = document.getElementById('login-password').value;
    //give buttons onclick functionality
    //function "add to database"
    //if successful, Welcome...else Login error
}

var registerName;
var registerEmail;
var registerPassword;

function getRegisterInfo()
{
	registerName = document.getElementByID('register-name').value;
	registerEmail = document.getElementByID('register-email').value;
	registerPassword = document.getElementByID('register-password').value;
	//give buttons onclick functionality
    //function "add to database"
    //if successful, Welcome...else Login error
}

//drink refill selection

//assign id's for refill buttons, names, and checkboxes

function getRefillNames()
{
	var guest1 = "";
	var guest2 = "";
	var guest3 = "";
	var guest4 = "";
	var guest5 = "";
	//var remember = document.getElementById('remember');
	if (document.getElementById('Andrew').checked)
	{
    	//alert("checked") ;
    	guest1 = document.getElementById('Andrew').value;
	}
	if (document.getElementById('Austin').checked)
	{
    	guest1 = document.getElementById('Austin').value;
	}
	if (document.getElementById('Carrie').checked)
	{
    	guest1 = document.getElementById('Carrie').value;
	}
	if (document.getElementById('Frank').checked)
	{
    	guest1 = document.getElementById('Frank').value;
	}
	if (document.getElementById('Tyler').checked)
	{
    	guest1 = document.getElementById('Tyler').value;
	}
	alert("Refills for " Andrew " " Austin " " Carrie " " Frank " " Tyler " have been sent");

}

//do another one for "Is this order To-Go?"
function toGoOrder()
{
	var tgOrder = document.getElementById('tgOrder');
	if (tgOrder.checked)
	{
    	alert("This order will be placed for To-Go");
	}

}

//add id to button
function logOut()
{
	//how to sign out?
}

var split = 1;

function splitBill()
{
	split = document.getElementById('receipt-email').value;
}

function calculateBill()
{
	var tipVal = document.getElementById('card-number').value;
	document.getElementById('tip-amount').innerHTML = tipVal;
	var billTotal = 18.32/split;
	document.getElementById('bill-total').innerHTML = billTotal;
	document.getElementById('total').innerHTML = billTotal+tipVal;
}









