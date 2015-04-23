
var loginEmail;
var loginPassword;
var tableIndex;
var modalview = -1;
var globalCustomerIndex;
var submitted = false;
var pageview = 0;
var inModal = false;

function update() {
	tableIndex = currentuser.tableIndex;
			updateVariables();
			mainPage();
			setInterval(function () {
				updateVariables()
			}, 1000);
}

function updateVariables()
{
	var sendObject = {};
	$.ajax({
		type:'POST',
		data: sendObject,
		url:'./homepage/updatevariables',
		contentType:'application/json',
		success: function(data) {
			ingredients = data.ingredients;
			table_information = data.tables;
			if(modalview == 1) drinkChange(globalCustomerIndex);

			if (pageview == 1) submit();
			else if (pageview == 2) paybill();
			else if (pageview == 3) expand();
		}
	});
}

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
function logout()
{
	var username = document.getElementById('logout-username').value;
	var password = document.getElementById('logout-password').value;
	if(username == "admin" && password == "password") window.location.replace('/');
	else {
		var out = "INVALID USERNAME/PASSWORD";
		document.getElementById('failed').innerHTML = out;
	}
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

function drinkModal()
{
	modalview = 0;
	var out = "";
	out += '<table class="table table-striped">';
	out += '<thead>';
	out += '<tr>';
	out += '<th>Guest</th>';
	out += '<th>Current Drink</th>';
	out += '<th>Refill</th>';
	out += '<th>Drink</th>';
	out += '</tr>';
	out += '</thead>';
	out += '<tbody>';
	var i = 0;
	for(i = 0; i < table_information[tableIndex].Customers.length; i++) {
		out += '<tr>';
		out += '<th>' + table_information[tableIndex].Customers[i].Name + '</th>';
		out += '<th>' + table_information[tableIndex].Customers[i].Drink + '</th>';
		out += '<th><input type="checkbox" value="' + table_information[tableIndex].Customers[i].Drink + '" id="refillCheckbox'+ i +'"></th>';
		out += '<th><a href="#drink-chooser" class="btn btn-default" data-toggle="modal" data-dismiss="modal" onclick="drinkChange(' + i + ')">Change</a></th>';
		out += '</tr>';
	}
	out += '</tbody>';
	out += '</table>';

	var out2 = "";
	if(table_information[tableIndex].Customers.length < 4) out2 += '<a href="#AddDrinkModal"  class="btn btn-default" data-dismiss="modal" data-toggle="modal">Add Guest</a>';
	out2 += '<a class="btn btn-default" data-dismiss="modal">Close</a>';
	out2 += '<button data-dismiss="modal" class="btn btn-primary" onclick="sendDrinkOrder()">Send Drink Order</button>';
	document.getElementById("drinkModalBody").innerHTML = out;
	document.getElementById("numGuests").innerHTML = out2;
}

function drinkChange(customerIndex) {
	modalview = 1;
	globalCustomerIndex = customerIndex;
	var out = "";
	var availableDrinks = ingredients.Drinks;
	out += '<ul class="row list-unstyled">';
	var i = 0;
	for(i = 0; i < availableDrinks.length; i++) {
		if (availableDrinks[i].Status) {
			out += '<li class="col-lg-2 col-md-2 col-sm-3 col-xs-4">';
			out += '<a class="btn btn-default" data-dismiss="modal" data-toggle="modal" href="#drinks" onclick="updateDrink(' + customerIndex + ', ' + i + ')">';
			out += '<img class="img-responsive" src="' + availableDrinks[i].src + '">';
			out += '</a>';
			out += '</li>';
		}
	}
	out += '</ul>';
	document.getElementById("drinkChooserModal").innerHTML = out;
}

function updateDrink(customerIndex, drinkIndex)
{
	var updateDrinkJSON = {
		CustomerIndex: customerIndex,
		DrinkIndex: drinkIndex,
		TableIndex: tableIndex
	};
	var sendObject = JSON.stringify(updateDrinkJSON);
	$.ajax({
		type: 'POST',
		data: sendObject,
		url: './homepage/updatedrink',
		contentType: 'application/json',
		success: function (data) {
			table_information = data;
			drinkModal();
		}
	});
}

function addDrink() {
	var Customer = {
		"Name": "None",
		"Drink": "None",
		"Comp": false,
		tableIndex: tableIndex
	};
	var e = document.getElementById("GuestName");
	Customer.Name = e.value;
	console.log(Customer.Name);
	e.value = "";
	var sendObject = JSON.stringify(Customer);
	$.ajax({
		type: 'POST',
		data: sendObject,
		url: './homepage/addcustomer',
		contentType: 'application/json',
		success: function (data) {
			table_information = data;
			drinkModal();
		}
	});
}

function addCarousel()
{
	var out = "";
	out += '<div class="container">';
	out +=  '<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">';
	out +=  '<ol class="carousel-indicators">';
	out +=  '<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>';
	out +=  '<li data-target="#carousel-example-generic" data-slide-to="1"></li>';
	out +=  '<li data-target="#carousel-example-generic" data-slide-to="2"></li>';
	out +=  '</ol>';
	out +=  '<div class="carousel-inner">';
	out +=  '<div class="item active">';
	out +=  '<img src="./images/ad-holder.jpg" alt="...">';
	out +=  '<div class="text-left" id="below-caption">';
	out +=  '<h3>Your Ad here</h3>';
	out +=  '<p>Upload a file to advertise with us!</p>';
	out +=  '</div>';
	out +=  '<div class="text-right" id="below-caption">';
	out +=  '<a class="btn btn-default" href="#food" data-toggle="modal">View Our Menu</a>';
	out +=  '</div>';
	out +=  '</div>';
	out +=  '<div class="item">';
	out +=  '<img src="./images/pizza-banner.jpg" alt="...">';
	out +=  '<div class="text-left" id="below-caption">';
	out +=  '<h3>Food Specials</h3>';
	out +=  '<p>Our new Spicy Pepperoni will knock your socks off!</p>';
	out +=  '</div>';
	out +=  '<div class="text-right" id="below-caption">';
	out +=  '<a class="btn btn-default" href="#food" data-toggle="modal">View Our Menu</a>';
	out +=  '</div>';
	out +=  '</div>';
	out +=  '<div class="item">';
	out +=  '<img src="./images/dessert-pizza.jpg" alt="...">';
	out +=  '<div class="text-left" id="below-caption">';
	out +=  '<h3>Dessert Specials</h3>';
	out +=  '<p>Our new lava cake will melt your heart!</p>';
	out +=  '</div>';
	out +=  '<div class="text-right" id="below-caption">';
	out +=  '<a class="btn btn-default" href="#desserts" data-toggle="modal">View Desserts</a>';
	out +=  '</div>';
	out +=  '</div>';
	out +=  '</div>';
	out +=  '</div>';
	out += '</div>';
	document.getElementById("carouselBody").innerHTML = out;
	mainPage();
}

function mainPage() {
	pageview = 0;
	var out;
	out = "";
	var out2 = "";
	out +=  '<div class="container">';
	out +=  '<div class="row" id="under-specials">';
	out +=  '<div class="col-sm-4">';
	out +=  '<a href="#drinks" data-toggle="modal" class="thumbnail" onclick="drinkModal()">';
	out +=  '<img src="./images/soda.jpg" alt="">';
	out +=  '</a>';
	out +=  '<h3 class="text-center">Drinks</h3>';
	out +=  '<p>We offer a variety of drinks, click the picture above to choose from our selection</p>';
	out +=  '</div>';
	out +=  '<div class="col-sm-4">';
	out +=  '<a href="#food" data-toggle="modal" class="thumbnail">';
	out +=  '<img src="./images/pizza.jpg" alt="">';
	out +=  '</a>';
	out +=  '<h3 class="text-center">Food</h3>';
	out +=  "<p>Here at Fat Cat Pizza, we offer a unique pizza-building experience.  You'll be in control every step of the way!  We also offer some delicious desserts!  Click the picture above to see!</p>";
	out +=  '</div>';
	out +=  '<div class="col-sm-4">';
	out +=  '<a href="#game" class="thumbnail" data-toggle="modal">';
	out +=  '<img src="./images/tic.jpg" alt="">';
	out +=  '</a>';
	out +=  '<h3 class="text-center">Games</h3>';
	out +=  '<p>Bored?  Need something to pass the time?  Want a chance of winning a free dessert?  Click the picture above to give it a shot!</p>';
	out +=  '</div>';
	out +=  '</div>';
	out +=  '</div>';
	out +=  '<div>';

	out2 += '<li class="active" onclick="addCarousel()"><a href="#">Home</a></li>';
	out2 += '<li><a href="#drinks" data-toggle="modal" onclick="drinkModal()"> Drinks</a></li>';
	out2 += '<li><a href="#food" data-toggle="modal" onclick="updateIngredients()">Food</a></li>';
	out2 += '<li><a href="#login" data-toggle="modal">Login/Register</a></li>';
	out2 += '<li><a href="#" data-toggle="modal" onclick="submit()">Pay Bill</a></li>';
	out2 += '<li><a href="#help" data-toggle="modal" onclick="callWaitStaff()"><i class="fa fa-question-circle fa-3" style="font-size: large"></i></a></li>';
	document.getElementById("homepageBody").innerHTML = out;
	document.getElementById("homepageBar").innerHTML = out2;
}

function submit()
{
	expand();
	var out2 = "";
	pageview = 1;
	out2 += '<li><a href="#" onclick="addCarousel()">Home</a></li>';
	out2 += '<li><a href="#drinks" data-toggle="modal" onclick="drinkModal()"> Drinks</a></li>';
	out2 += '<li><a href="#food" data-toggle="modal" onclick="updateIngredients()">Food</a></li>';
	out2 += '<li><a href="#login" data-toggle="modal">Login/Register</a></li>';
	out2 += '<li class="active"><a href="#" data-toggle="modal">Pay Bill</a></li>';
	out2 += '<li><a href="#help" data-toggle="modal" onclick="callWaitStaff()"><i class="fa fa-question-circle fa-3" style="font-size: large"></i></a></li>';
	document.getElementById("homepageBar").innerHTML = out2;
	document.getElementById("carouselBody").innerHTML = "";
}

function callWaitStaff() {
	var notify = {
		tableIndex: tableIndex
	};
	var sendObject = JSON.stringify(notify);
	$.ajax({
		type: 'POST',
		data: sendObject,
		url: './homepage/help',
		contentType: 'application/json',
		success: function (data) {
			table_information = data;
		}
	});
}

function sendDrinkOrder() {
	var i = 0;
	var refillDrinks = [];
	for(i = 0; i < table_information[tableIndex].Customers.length; i++)
	{
		var e = document.getElementById('refillCheckbox' + i);
		if(e != null) if(e.checked) refillDrinks.push(e.value);
	}
	var refillNotification = {
		Drinks: refillDrinks,
		tableIndex: tableIndex
	};
	var sendObject = JSON.stringify(refillNotification);
	$.ajax({
		type: 'POST',
		data: sendObject,
		url: './homepage/refillnotification',
		contentType: 'application/json',
		success: function (data) {
			table_information = data;
		}
	});
}

function addPizza(type)
{
	inAModal = false;
	var e;
	var pizza = { "Crust": "None",
		"Sauce": "None",
		"Toppings": [],
		"Comp": false,
		"Status": "Submitted",
		"SpecialMessage": "None"
	};
	if(type == 1) {
		e = document.getElementById("crust");
		pizza.Crust = e.options[e.selectedIndex].value;
		e = document.getElementById("sauce");
		e.options[e.selectedIndex].selected = false;
		pizza.Sauce = e.options[e.selectedIndex].value;
		e.options[e.selectedIndex].selected = false;
		e = document.getElementById("toppings");
		var i = 0;
		for (i = 0; i < e.options.length; i++) {
			if (e.options[i].selected) {
				pizza.Toppings.push(e.options[i].value);
				e.options[i].selected = false;
			}
		}
		e = document.getElementById("special-instructions");
		pizza.SpecialMessage = e.value;
		pizza['TableIndex'] = tableIndex;
	}
	else {
		e = document.getElementById("dessertCrust");
		pizza.Crust = e.options[e.selectedIndex].value;
		e = document.getElementById("dessertSauce");
		e.options[e.selectedIndex].selected = false;
		pizza.Sauce = e.options[e.selectedIndex].value;
		e.options[e.selectedIndex].selected = false;
		e = document.getElementById("dessertToppings");
		var i = 0;
		for (i = 0; i < e.options.length; i++) {
			if (e.options[i].selected) {
				pizza.Toppings.push(e.options[i].value);
				e.options[i].selected = false;
			}
		}
		e = document.getElementById("special-instructions-dessert");
		pizza.SpecialMessage = e.value;
		pizza['TableIndex'] = tableIndex;
	}

	e.value = "";
	var sendObject =  JSON.stringify(pizza);
	$.ajax({
		type:'POST',
		data: sendObject,
		url:'./homepage/addpizza',
		contentType:'application/json',
		success: function(data) {
			table_information = data;
		}
	});
}

function updateIngredients() {
	inAModal = true;
	var out = "";
	var Toppings = ingredients.Toppings;
	console.log(Toppings);
	var Crusts = ingredients.Crusts;
	var Sauces = ingredients.Sauces;
	var Drinks = ingredients.Drinks;
	var dessertCrusts = ingredients.DessertCrusts;
	var dessertSauces = ingredients.DessertSauces;
	var dessertToppings = ingredients.DessertToppings;

	//For Crust
	var i = 0;
	for(i = 0; i < Crusts.length; i++) {
		if(Crusts[i].Status) out += '<option value="'+ Crusts[i].Crust + '">' + Crusts[i].Crust + '</option>';
	}
	document.getElementById("crust").innerHTML = out;
	out = "";
	for(i = 0; i < Sauces.length; i++) {
		if(Sauces[i].Status) out += '<option value="'+ Sauces[i].Sauce + '">' + Sauces[i].Sauce + '</option>';
	}
	document.getElementById("sauce").innerHTML = out;
	out = "";
	for(i = 0; i < Toppings.length; i++) {
		if(Toppings[i].Status) out += '<option value="'+ Toppings[i].Topping + '">' + Toppings[i].Topping + '</option>';
	}
	document.getElementById("toppings").innerHTML = out;
	out = "";
	for(i = 0; i < dessertCrusts.length; i++) {
		if(dessertCrusts[i].Status) out += '<option value="'+ dessertCrusts[i].Crust + '">' + dessertCrusts[i].Crust + '</option>';
	}
	document.getElementById("dessertCrust").innerHTML = out;
	out = "";
	for(i = 0; i < dessertSauces.length; i++) {
		if(dessertSauces[i].Status) out += '<option value="'+ dessertSauces[i].Sauce + '">' + dessertSauces[i].Sauce + '</option>';
	}
	document.getElementById("dessertSauce").innerHTML = out;
	out = "";
	for(i = 0; i < dessertToppings.length; i++) {
		if(dessertToppings[i].Status) out += '<option value="'+ dessertToppings[i].Topping + '">' + dessertToppings[i].Topping + '</option>';
	}
	document.getElementById("dessertToppings").innerHTML = out;
	out = "";
}

function expand() {
	pageview = 3;
	viewLocation = location;
	var out = "";
	var pizzaPrice = 10;
	var drinkPrice = 0;
	var totalPrice = 0;
	var tipPrice = 0;
	out += '<div class="container">'
	out += '<div id="notification-row" class="row">';
	out += '<div class="col-md-12 col-sm-12 col-xs-12">';
	out += '<h3>Table ' + table_information[tableIndex].TableNumber + '</h3>';
	out += '</div>';
	out += '<div id="expandedTable">';
	out += '<div class="col-md-12 col-sm-12 col-xs-12">';
	out += '<div id="TableTitle" class="col-md-12 col-sm-12 col-xs-12">';
	out += '<h4>Drinks</h4>';
	out += '</div>';
	out += '<table class="table table-striped" width="100%">';
	out += '<thead>';
	out += '<tr>';
	out += '<th class="col-md-2 col-sm-2 col-xs-2">Guest</th>';
	out += '<th class="col-md-6 col-sm-6 col-xs-6">Drink</th>';
	out += '<th class="col-md-2 col-sm-2 col-xs-2">Price</th>';
	out += '<th class="col-md-2 col-sm-2 col-xs-2"></th>';
	out += '</tr>';
	out += '</thead>';
	out += '<tbody>';
	var j = 0;
	for(j = 0; j < table_information[tableIndex].Customers.length; j++)
	{
		out += '<tr>';
		out += '<th>' + table_information[tableIndex].Customers[j].Name + '</th>';
		out += '<th>' + table_information[tableIndex].Customers[j].Drink + '</th>';
		if(table_information[tableIndex].Customers[j].Comp) drinkPrice = 0;
		else if(table_information[tableIndex].Customers[j].Drink == "Water") drinkPrice = 0;
		else drinkPrice = 1;
		totalPrice += drinkPrice;
		out += '<th>' + drinkPrice.toFixed(2) + '</th>';
		if (!table_information[tableIndex].Customers[j].Comp) out += '<th></th></tr>';
		else out+= '<th>COMP</th>';
	}
	out += '</tbody>';
	out += '</table>';
	out += '<div id="TableTitle" class="col-md-12 col-sm-12 col-xs-12">'
	out += '<h4>Pizza</h4>';
	out += '</div>';
	out += '<table class="table table-striped">';
	out += '<thead>';
	out += '<tr>';
	out += '<th class="col-md-2 col-sm-2 col-xs-2">Pizza</th>';
	out += '<th class="col-md-2 col-sm-2 col-xs-2">Crust</th>';
	out += '<th class="col-md-2 col-sm-2 col-xs-2">Sauce</th>';
	out += '<th class="col-md-2 col-sm-2 col-xs-2">Toppings</th>';
	out += '<th class="col-md-2 col-sm-2 col-xs-2">Price</th>';
	out += '<th class="col-md-2 col-sm-2 col-xs-2">Status</th>';
	out += '</tr>';
	out += '</thead>';
	out += '<tbody>';
	for(j = 0; j < table_information[tableIndex].Pizza.length; j++)
	{
		out += '<tr>';
		out += '<th>Pizza ' + (j + 1) + '</th>';
		out += '<th>' + table_information[tableIndex].Pizza[j].Crust + '</th>';
		out += '<th>' + table_information[tableIndex].Pizza[j].Sauce + '</th>';
		out += '<th>';
		var k = 0;
		if(table_information[tableIndex].Pizza[j].Crust == 'Kids Pizza') pizzaPrice = 5;
		else pizzaPrice = 10;
		for(k = 0; k < table_information[tableIndex].Pizza[j].Toppings.length; k++)
		{
			out += '<p>' + table_information[tableIndex].Pizza[j].Toppings[k] + '</p>';
			if(!table_information[tableIndex].Pizza[j].Comp) pizzaPrice += .3;
		}
		out += '</th>';
		var compPrice = 0;
		if(!table_information[tableIndex].Pizza[j].Comp) out += '<th>' + pizzaPrice.toFixed(2) + '</th>';
		else out+= '<th>' + compPrice.toFixed(2) + '</th>';
		if(!table_information[tableIndex].Pizza[j].Comp) totalPrice += pizzaPrice;
		if(!table_information[tableIndex].Pizza[j].Comp) out += '<th>' + table_information[tableIndex ].Pizza[j].Status + '</tr>';
		else out+= '<th>COMP</th>';
	}
	out += '</tbody>';
	out += '</table>';
	out += '<h4 id="TableTitle">Total</h4>';
	out += '<table class="table table-striped">';
	out += '<tbody>';
	out += '<tr>';
	out += '<th class="col-md-8 col-sm-8 col-xs-8">Tip</th>';
	out += '<th class="col-md-2 col-sm-2 col-xs-2">' + parseFloat(table_information[tableIndex].Tip).toFixed(2) + '</th>';
	totalPrice += parseFloat(table_information[tableIndex].Tip);
	out += '<th class="col-md-2 col-sm-2 col-xs-2"><a href="#AddTip" class="btn btn-default" data-toggle="modal" data-dismiss="modal">Add Tip</a></th>';
	out += '</tr>';
	out += '<tr>';
	out += '<th>Coupon</th>';
	var CouponValue = table_information[tableIndex].Coupon;
	totalPrice -= CouponValue;
	out += '<th>' + CouponValue.toFixed(2) + '</th>';
	out += '<th><a href="#AddCoupon" class="btn btn-default" data-toggle="modal" data-dismiss="modal">Add Coupon</a></th>';
	out += '</tr>';
	out += '<tr>';
	out += '<th>Total</th>';
	if(totalPrice < 0) totalPrice = 0;
	out += '<th>' + totalPrice.toFixed(2) + '</th>';
	if(table_information[tableIndex].Paid) {
		out += '<th><a href="#receipt" class="btn btn-default" data-toggle="modal" data-dismiss="modal">Receipt</a></th>';
	}
	else {
		out += '<th><a href="#PayBill" class="btn btn-default" data-toggle="modal" data-dismiss="modal">Pay Tab</a></th>';
	}
	out += '</tr>';
	out += '</tbody>';
	out += '</table>';
	out += '</div>';
	out += '</div>';
	out += '</div>';
	out += '</div>';
	document.getElementById("homepageBody").innerHTML = out;
}

function addTip()
{
	var e = document.getElementById("tipInput");
	var tip = {"Tip": e.value};
	e.value = "";
	tip['TableIndex'] = tableIndex;
	var sendObject = JSON.stringify(tip);
	$.ajax({
		type:'POST',
		data: sendObject,
		url:'./waitview/addtip',
		contentType:'application/json',
		success: function(data) {
			table_information = data;
			expand();
		}
	});
}

function beenPaid() {
	var paid = {"Paid": true};
	paid['TableIndex'] = tableIndex;
	var sendObject = JSON.stringify(paid);
	$.ajax({
		type: 'POST',
		data: sendObject,
		url: './waitview/paid',
		contentType: 'application/json',
		success: function (data) {
			table_information = data;
			expand();
		}
	});
}

function addCoupon() {
	var e = document.getElementById("couponForm");
	var couponCode = e.value;
	var out = "";
	if(couponCode == "COUPON1") {
		out += 'CONGRATS YOU GET A DOLLAR OFF';
		var coupon = {"Coupon": 1,
			"TableIndex": tableIndex};
		var sendObject = JSON.stringify(coupon);
		$.ajax({
			type:'POST',
			data: sendObject,
			url:'./waitview/addcoupon',
			contentType:'application/json',
			success: function(data) {
				table_information = data;
				document.getElementById("couponResponse").innerHTML = out;
				e.value= "";
				expand();
			}
		});
	}
	else {
		out += 'NOT A VALID COUPON';
		e.value = "";
		document.getElementById("couponResponse").innerHTML = out;
	}
}

function printReceipt()
{
	var receiptObject = {
		TableIndex: tableIndex
	};
	var sendObject = JSON.stringify(receiptObject);
	$.ajax({
		type:'POST',
		data: sendObject,
		url:'./homepage/requestreceipt',
		contentType:'application/json',
		success: function(data) {
			table_information = data;
			expand();
		}
	});
}

function nutrition() {

	var i;
	var drinks = ingredients.Drinks;
	var crusts = ingredients.Crusts;
	var sauces = ingredients.Sauces;
	var toppings = ingredients.Toppings;
	var dCrusts = ingredients.DessertCrusts;
	var dSauces = ingredients.DessertSauces;
	var dToppings = ingredients.DessertToppings;

	var out = "";
	out += '<tr id="redBack">';
	out += '<th>Drinks</th>';
	out += '<th></th>';
	out += '<th></th>';
	out += '</tr>';
	for (i = 0; i < drinks.length; i++) {
		out += '<tr>';
		out += '<th>' + drinks[i].Drink + '</th>';
		out += '<th>' + drinks[i].Calories + '</th>';
		out += '<th>' + drinks[i].Allergy + '</th>';
		out += '</tr>';
	}
	out += '<tr id="redBack">';
	out += '<th>Crusts</th>';
	out += '<th></th>';
	out += '<th></th>';
	out += '</tr>';
	for (i = 0; i < crusts.length; i++) {
		out += '<tr>';
		out += '<th>' + crusts[i].Crust + '</th>';
		out += '<th>' + crusts[i].Calories + '</th>';
		out += '<th>' + crusts[i].Allergy + '</th>';
		out += '</tr>';
	}
	out += '<tr id="redBack">';
	out += '<th>Sauces</th>';
	out += '<th></th>';
	out += '<th></th>';
	out += '</tr>';
	for (i = 0; i < sauces.length; i++) {
		out += '<tr>';
		out += '<th>' + sauces[i].Sauce + '</th>';
		out += '<th>' + sauces[i].Calories + '</th>';
		out += '<th>' + sauces[i].Allergy + '</th>';
		out += '</tr>';
	}
	out += '<tr id="redBack">';
	out += '<th>Toppings</th>';
	out += '<th></th>';
	out += '<th></th>';
	out += '</tr>';
	for (i = 0; i < toppings.length; i++) {
		out += '<tr>';
		out += '<th>' + toppings[i].Topping + '</th>';
		out += '<th>' + toppings[i].Calories + '</th>';
		out += '<th>' + toppings[i].Allergy + '</th>';
		out += '</tr>';
	}
	out += '<tr  id="redBack">';
	out += '<th>Dessert Crusts</th>';
	out += '<th></th>';
	out += '<th></th>';
	out += '</tr>';
	for (i = 0; i < dCrusts.length; i++) {
		out += '<tr>';
		out += '<th>' + dCrusts[i].Crust + '</th>';
		out += '<th>' + dCrusts[i].Calories + '</th>';
		out += '<th>' + dCrusts[i].Allergy + '</th>';
		out += '</tr>';
	}
	out += '<tr id="redBack">';
	out += '<th>Dessert Sauces</th>';
	out += '<th></th>';
	out += '<th></th>';
	out += '</tr>';
	for (i = 0; i < dSauces.length; i++) {
		out += '<tr>';
		out += '<th>' + dSauces[i].Sauce + '</th>';
		out += '<th>' + dSauces[i].Calories + '</th>';
		out += '<th>' + dSauces[i].Allergy + '</th>';
		out += '</tr>';
	}
	out += '<tr id="redBack">';
	out += '<th>Dessert Toppings</th>';
	out += '<th></th>';
	out += '<th></th>';
	out += '</tr>';
	for (i = 0; i < dToppings.length; i++) {
		out += '<tr>';
		out += '<th>' + dToppings[i].Topping + '</th>';
		out += '<th>' + dToppings[i].Calories + '</th>';
		out += '<th>' + dToppings[i].Allergy + '</th>';
		out += '</tr>';
	}
	document.getElementById("foodInformation").innerHTML = out;
}


