//First Loads data into notifications
var tableToChange = 0;
var valueToEdit = 0;
var tableTip = 0.00;
var currentview = 0;
var viewlocation = 0;
var inAModal = false;

function update() {
    TableNotifications();
    updateVariables();
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
        url:'./waitview/updatevariables',
        contentType:'application/json',
        success: function(data) {
            console.log('returned');
            ingredients = data.ingredients;
            if(!inAModal) updateIngredients();
            past_notifiations = data.pastNotifications;
            table_information = data.tables;
            notifications = data.notifications;
            if(currentview == 0) TableNotifications();
            else if(currentview == 1) PastNotification();
            else if(currentview == 2) ViewTables();
            else if(currentview == 3) expand(viewLocation);
        }
    });
}


//shows the table notifications
function TableNotifications() {
    currentview = 0;
    var out = "";
    var i = 0;
    var out2 = "";
    //Inserts the code into the header
    out2 = '<ul class="nav navbar-nav navbar-right"><li class="active"><a href="#drinks" data-toggle="modal" onclick="TableNotifications()">Table Notifications</a></li><li><a href="#food" data-toggle="modal" onclick="PastNotifications()">Past Notifications</a></li><li><a href="#login" data-toggle="modal" onclick="ViewTables()">Tables</a></li></ul>';
    for (i = 0; i < notifications.length; i++)
    {
        out += '<div id="notification-row" class="row">';
        out += '<div class="col-md-6 col-sm-6 col-xs-6">';
        out += '<h3>Table ' + notifications[i].TableNumber + '</h3>';
        out += '<p>' + notifications[i].Description + '</p>';
        out += '</div>';
        out += '<div class="col-md-6 col-sm-6 col-xs-6" align="right">';
        out += '<h3></h3>';
        //The i is the location when the x is clicked the option is removed
        out += '<a onclick="deleteOption(' + i + ')"><i" class="fa fa-times fa-3x"></i></a>';
        out += '</div>';
        out += '</div>';
    }
    document.getElementById("notificationRows").innerHTML = out;
    document.getElementById("navOptions").innerHTML = out2;
}

//Will show past notifications
function PastNotifications() {
    currentview = 1;
    console.log(past_notifications);
    var out = "";
    var i = 0;
    var out2 = "";
    out2 = '<ul class="nav navbar-nav navbar-right"><li><a href="#drinks" data-toggle="modal" onclick="TableNotifications()">Table Notifications</a></li><li class="active"><a href="#food" data-toggle="modal" onclick="PastNotifications()">Past Notifications</a></li><li><a href="#login" data-toggle="modal" onclick="ViewTables()">Tables</a></li></ul>';
    for(i = 0; i < past_notifications.length; i++)
    {
        out += '<div id="notification-row" class="row">';
        out += '<div class="col-md-6 col-sm-6 col-xs-6">';
        out += '<h3>Table ' + past_notifications[i].TableNumber + '</h3>';
        out += '<p>'+ past_notifications[i].Description + '</p>';
        out += '</div>';
        out += '</div>';
    }
    document.getElementById("notificationRows").innerHTML = out;
    document.getElementById("navOptions").innerHTML = out2;
}

//Will show table options
function ViewTables() {
    currentview = 2;
    var i = 0;
    var out = "";
    var out2 = "";
    out2 = '<ul class="nav navbar-nav navbar-right"><li><a href="#drinks" data-toggle="modal" onclick="TableNotifications()">Table Notifications</a></li><li><a href="#food" data-toggle="modal" onclick="PastNotifications()">Past Notifications</a></li><li class="active"><a href="#login" data-toggle="modal" onclick="ViewTables()">Tables</a></li></ul>';
    for(i = 0; i < table_information.length; i++)
    {
        out += '<div id="notification-row" class="row">';
        out += '<div class="col-md-6 col-sm-6 col-xs-6">';
        out += '<h3>Table ' + table_information[i].TableNumber + '</h3>';
        out += '</div>';
        out += '<div class="col-md-6 col-sm-6 col-xs-6" align="right">';
        //The i is the location when the x is clicked the option is removed
        out += '<a onclick="expand(' + i + ')"><i" class="fa fa-arrow-down fa-3x"></i></a>';
        out += '</div>';
        out += '</div>';
    }
    document.getElementById("notificationRows").innerHTML = out;
    document.getElementById("navOptions").innerHTML = out2;
}

//Deletes option when clicked
function deleteOption(location) {
    var removeNotification = {
      "NotificationIndex": location
    };
    var sendObject = JSON.stringify(removeNotification);
    $.ajax({
        type:'POST',
        data: sendObject,
        url:'./waitview/removenotification',
        contentType:'application/json',
        success: function(data) {
            past_notifications = data.pastNotifications;
            notifications = data.waitstaffNotifications;
            TableNotifications();
        }
    });
}

//Is called when modals are opened
//When the modal steps are done the table is saved so when finished
//Information can be updated
function tableChangeInformation(location) {
    inAModal = true;
    tableToChange = location;
}

function cancel()
{
    inAModal = false;
}


function updateIngredients() {
    var out = "";
    var Toppings = ingredients.Toppings;
    var Crusts = ingredients.Crusts;
    var Sauces = ingredients.Sauces;
    var Drinks = ingredients.Drinks;

    //For Crust
    var i = 0;
    for(i = 0; i < Crusts.length; i++) {
        if(Crusts[i].Status) out += '<option value="'+ Crusts[i].Crust + '">' + Crusts[i].Crust + '</option>';
    }
    document.getElementById("crust").innerHTML = out;
    document.getElementById("editCrust").innerHTML = out;
    out = "";
    for(i = 0; i < Sauces.length; i++) {
        if(Sauces[i].Status) out += '<option value="'+ Sauces[i].Sauce + '">' + Sauces[i].Sauce + '</option>';
    }
    document.getElementById("sauce").innerHTML = out;
    document.getElementById("editSauce").innerHTML = out;
    out = "";
    for(i = 0; i < Toppings.length; i++) {
        if(Toppings[i].Status) out += '<option value="'+ Toppings[i].Topping + '">' + Toppings[i].Topping + '</option>';
    }
    document.getElementById("toppings").innerHTML = out;
    document.getElementById("editToppings").innerHTML = out;
    out = "";
    for(i = 0; i < Drinks.length; i++) {
        if(Drinks[i].Status) out += '<option value="'+ Drinks[i].Drink + '">' + Drinks[i].Drink + '</option>';
    }
    document.getElementById("editDrinkSelection").innerHTML = out;
    document.getElementById("drinkSelection").innerHTML = out;
    out = "";
}

function tableChangeInformationSpecific(tableLocation, editLocation) {
    inAModal = true;
    tableToChange = tableLocation;
    valueToEdit = editLocation;
}

function addPizza()
{
    inAModal = false;
    var e = document.getElementById("crust");
    var pizza = { "Crust": "None",
        "Sauce": "None",
        "Toppings": [],
        "Comp": false,
        "Status": "Submitted",
        "SpecialMessage": "None"
    };
    pizza.Crust = e.options[e.selectedIndex].value;
    e = document.getElementById("sauce");
    e.options[e.selectedIndex].selected = false;
    pizza.Sauce = e.options[e.selectedIndex].value;
    e.options[e.selectedIndex].selected = false;
    e = document.getElementById("toppings");
    var i = 0;
    for(i = 0; i < e.options.length; i++)
    {
        if(e.options[i].selected)
        {
            pizza.Toppings.push(e.options[i].value);
            e.options[i].selected = false;
        }
    }
    pizza['TableIndex'] = tableToChange;
    e = document.getElementById("special-instructions");
    pizza.SpecialMessage = e.value;
    e.value = "";
    var sendObject =  JSON.stringify(pizza);
    $.ajax({
       type:'POST',
        data: sendObject,
        url:'./waitview/addpizza',
        contentType:'application/json',
        success: function(data) {
            table_information = data;
            expand(tableToChange);
        }
    });
}

function addDrink()
{
    inAModal = false;
    var Customer = { "Name": "None",
        "Drink": "None",
        "Comp": false};
    var e = document.getElementById("GuestName");
    Customer.Name = e.value;
    e.value = "";
    e = document.getElementById("drinkSelection");
    Customer.Drink = e.options[e.selectedIndex].value;
    e.options[e.selectedIndex].selected = false;
    Customer['TableIndex'] = tableToChange;
    var sendObject = JSON.stringify(Customer);
    $.ajax({
        type:'POST',
        data: sendObject,
        url:'./waitview/adddrink',
        contentType:'application/json',
        success: function(data) {
            table_information = data;
            expand(tableToChange);
        }
    });
}

function addTip()
{
    inAModal = false;
    var e = document.getElementById("tipInput");
    var tip = {"Tip": e.value};
    e.value = "";
    tip['TableIndex'] = tableToChange;
    var sendObject = JSON.stringify(tip);
    $.ajax({
        type:'POST',
        data: sendObject,
        url:'./waitview/addtip',
        contentType:'application/json',
        success: function(data) {
            table_information = data;
            expand(tableToChange);
        }
    });
}

function beenPaid() {
    inAModal = false;
    var paid = {"Paid": true};
    paid['TableIndex'] = tableToChange;
    var sendObject = JSON.stringify(paid);
    $.ajax({
        type: 'POST',
        data: sendObject,
        url: './waitview/paid',
        contentType: 'application/json',
        success: function (data) {
            table_information = data;
            expand(tableToChange);
        }
    });
}

function removeTable()
{
    var clearTable = {
        "TableNumber": table_information[tableToChange].TableNumber,
        "Customers": [
        ],
        "Pizza": [
        ],
        "Tip": 0,
        "Paid": false,
        "TableIndex": tableToChange,
        "Coupon": 0
    };
    var sendObject = JSON.stringify(clearTable);
    $.ajax({
        type:'POST',
        data: sendObject,
        url:'./waitview/cleartable',
        contentType:'application/json',
        success: function(data) {
            table_information = data;
            expand(tableToChange);
        }
    });
}

function removeCustomer()
{
    inAModal = false;
    var removeCustomerJson = {
        "TableIndex": tableToChange,
        "CustomerIndex": valueToEdit
    };
    var sendObject = JSON.stringify(removeCustomerJson);
    $.ajax({
        type:'POST',
        data: sendObject,
        url:'./waitview/removecustomer',
        contentType:'application/json',
        success: function(data) {
            table_information = data;
            expand(tableToChange);
        }
    });
}

function removePizza()
{
    inAModal = false;
    var removePizzaJson = {
        "TableIndex": tableToChange,
        "PizzaIndex": valueToEdit
    };
    var sendObject = JSON.stringify(removePizzaJson);
    $.ajax({
        type:'POST',
        data: sendObject,
        url:'./waitview/removepizza',
        contentType:'application/json',
        success: function(data) {
            table_information = data;
            expand(tableToChange);
        }
    });
}

function editDrink()
{
    inAModal = false;
    e = document.getElementById("editDrinkSelection");
    var editDrinkJson = {
        "TableIndex": tableToChange,
        "CustomerIndex": valueToEdit,
        "Drink": e.options[e.selectedIndex].value,
        "Comp": false
    };
    e.options[e.selectedIndex].selected = false;
    var sendObject = JSON.stringify(editDrinkJson);
    $.ajax({
        type:'POST',
        data: sendObject,
        url:'./waitview/editdrink',
        contentType:'application/json',
        success: function(data) {
            table_information = data;
            expand(tableToChange);
        }
    });
}

function compPizza() {
    inAModal = false;
    var out = "";
    var e = document.getElementById("adminPasswordPizza");
    var password = e.value;
    e.value = "";
    e = document.getElementById("adminUsernamePizza");
    var username = e.value;
    e.value = "";
    var couponCode = e.value;
    var comp = {};
    comp['TableIndex'] = tableToChange;
    comp['PizzaIndex'] = valueToEdit;
    if(username == "Admin" && password == "password")
    {
        out += "Meal Comped";
        var sendObject = JSON.stringify(comp);
        $.ajax({
            type:'POST',
            data: sendObject,
            url:'./waitview/comppizza',
            contentType:'application/json',
            success: function(data) {
                table_information = data;
                document.getElementById("compResponsePizza").innerHTML = out;
                expand(tableToChange);
            }
        });
    }
    else
    {
        out += "Invalid Username/Password";
        document.getElementById("compResponsePizza").innerHTML = out;
    }
}

function compDrink() {
    inAModal = false;
    var out = "";
    var e = document.getElementById("adminPasswordDrink");
    var password = e.value;
    e.value = "";
    e = document.getElementById("adminUsernameDrink");
    var username = e.value;
    e.value = "";
    var couponCode = e.value;
    var comp = {};
    comp['TableIndex'] = tableToChange;
    comp['CustomerIndex'] = valueToEdit;
    if(username == "Admin" && password == "password") {
        var sendObject = JSON.stringify(comp);
        $.ajax({
            type:'POST',
            data: sendObject,
            url:'./waitview/compdrink',
            contentType:'application/json',
            success: function(data) {
                table_information = data;
                out += "Drink Comped";
                document.getElementById("compResponseDrink").innerHTML = out;
                expand(tableToChange);
            }
        });
    }
    else
    {
        out += "Invalid Username/Password";
        document.getElementById("compResponseDrink").innerHTML = out;
    }
}

function addCoupon() {
    inAModal = false;
    var e = document.getElementById("couponForm");
    var couponCode = e.value;
    var out = "";
    if(couponCode == "COUPON1") {
        out += 'CONGRATS YOU GET A DOLLAR OFF';
        var coupon = {"Coupon": 1,
        "TableIndex": tableToChange};
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
                expand(tableToChange);
            }
        });
    }
    else {
        out += 'NOT A VALID COUPON';
        e.value = "";
        document.getElementById("couponResponse").innerHTML = out;
    }
}

function editPizza()
{
    inAModal = false;
    var e = document.getElementById("editCrust");
    var pizza = { "Crust": "None",
        "Sauce": "None",
        "Toppings": [],
        "Comp": false,
        "Status": table_information[tableToChange].Pizza[valueToEdit]['Status'],
        "SpecialInstructions": table_information[tableToChange].Pizza[valueToEdit]['SpecialInstructions']
    };
    pizza.Crust = e.options[e.selectedIndex].value;
    e = document.getElementById("editSauce");
    e.options[e.selectedIndex].selected = false;
    pizza.Sauce = e.options[e.selectedIndex].value;
    e.options[e.selectedIndex].selected = false;
    e = document.getElementById("editToppings");
    var i = 0;
    for(i = 0; i < e.options.length; i++)
    {
        if(e.options[i].selected)
        {
            pizza.Toppings.push(e.options[i].value);
            e.options[i].selected = false;
        }
    }
    pizza['TableIndex'] = tableToChange;
    pizza['PizzaIndex'] = valueToEdit;
    var sendObject = JSON.stringify(pizza);
    $.ajax({
        type:'POST',
        data: sendObject,
        url:'./waitview/editpizza',
        contentType:'application/json',
        success: function(data) {
            table_information = data;
            expand(tableToChange);
        }
    });
}


function expand(location) {
    currentview = 3;
    viewLocation = location;
    var out = "";
    var pizzaPrice = 10;
    var drinkPrice = 0;
    var totalPrice = 0;
    var tipPrice = 0;
    for(i = 0; i < table_information.length; i++)
    {
        if(location == i)
        {
            out += '<div id="notification-row" class="row">';
            out += '<div class="col-md-6 col-sm-6 col-xs-6">';
            out += '<h3>Table ' + table_information[i].TableNumber + '</h3>';
            out += '</div>';
            out += '<div class="col-md-6 col-sm-6 col-xs-6" align="right">';
            //The i is the location when the x is clicked the option is removed
            out += '<a onclick="ViewTables()"><i" class="fa fa-arrow-up fa-3x"></i></a>';
            out += '</div>';
            out += '<div id="expandedTable">'
            out += '<div class="col-md-12 col-sm-12 col-xs-12">';
            out += '<div id="TableTitle" class="col-md-6 col-sm-6 col-xs-6">'
            out += '<h4>Drinks</h4>';
            out += '</div>'
            out += '<div id="TableTitle" class="col-md-6 col-sm-6 col-xs-6" align="right">'
            out += '<a href="#AddDrinkModal" data-toggle="modal" data-dismiss="modal" onclick="tableChangeInformation(' + i + ')"><i id="AddPizza" class="fa fa-plus fa-2x"></i></a>'
            out += '</div>'
            out += '<table class="table table-striped" width="100%">';
            out += '<thead>';
            out += '<tr>';
            out += '<th class="col-md-2 col-sm-2 col-xs-2">Guest</th>';
            out += '<th class="col-md-6 col-sm-6 col-xs-6">Drink</th>';
            out += '<th class="col-md-2 col-sm-2 col-xs-2">Price</th>'
            out += '<th class="col-md-2 col-sm-2 col-xs-2">Remove</th>';
            out += '</tr>';
            out += '</thead>';
            out += '<tbody>';
            var j = 0;
            for(j = 0; j < table_information[i].Customers.length; j++)
            {
                out += '<tr>';
                out += '<th>' + table_information[i].Customers[j].Name + '</th>';
                out += '<th>' + table_information[i].Customers[j].Drink + '</th>';
                if(table_information[i].Customers[j].Comp) drinkPrice = 0;
                else if(table_information[i].Customers[j].Drink == "Water" || table_information[i].Customers[j].Drink == "None") drinkPrice = 0;
                else drinkPrice = 1;
                totalPrice += drinkPrice;
                out += '<th>' + drinkPrice.toFixed(2) + '</th>';
                if (!table_information[i].Customers[j].Comp) out += '<th><a href="#EditDrinkModal" class="btn btn-default" data-toggle="modal" data-dismiss="modal" onclick="tableChangeInformationSpecific(' + i + ', ' + j + ')">Edit Drink</a></th></tr>';
                else out+= '<th>COMP</th>';
            }
            out += '</tbody>';
            out += '</table>';
            out += '<div id="TableTitle" class="col-md-6 col-sm-6 col-xs-6">'
            out += '<h4>Pizza</h4>';
            out += '</div>'
            out += '<div id="TableTitle" class="col-md-6 col-sm-6 col-xs-6" align="right">'
            out += '<a href="#AddPizzaModal" data-toggle="modal" data-dismiss="modal" onclick="tableChangeInformation(' + i + ')"><i id="AddPizza" class="fa fa-plus fa-2x"></i></a>'
            out += '</div>'
            out += '<table class="table table-striped">';
            out += '<thead>';
            out += '<tr>';
            out += '<th class="col-md-2 col-sm-2 col-xs-2">Pizza</th>';
            out += '<th class="col-md-2 col-sm-2 col-xs-2">Crust</th>';
            out += '<th class="col-md-2 col-sm-2 col-xs-2">Sauce</th>';
            out += '<th class="col-md-2 col-sm-2 col-xs-2">Toppings</th>';
            out += '<th class="col-md-2 col-sm-2 col-xs-2">Price</th>';
            out += '<th class="col-md-2 col-sm-2 col-xs-2">Remove</th>';
            out += '</tr>';
            out += '</thead>';
            out += '<tbody>';
            var j = 0;
            for(j = 0; j < table_information[i].Pizza.length; j++)
            {
                out += '<tr>';
                out += '<th>Pizza ' + (j + 1) + '</th>';
                out += '<th>' + table_information[i].Pizza[j].Crust + '</th>';
                out += '<th>' + table_information[i].Pizza[j].Sauce + '</th>';
                out += '<th>';
                var k = 0;
                if(table_information[i].Pizza[j].Crust == 'Kids Pizza') pizzaPrice = 5;
                else pizzaPrice = 10;
                for(k = 0; k < table_information[i].Pizza[j].Toppings.length; k++)
                {
                    out += '<p>' + table_information[i].Pizza[j].Toppings[k] + '</p>';
                    if(!table_information[i].Pizza[j].Comp) pizzaPrice += .3;
                }
                out += '</th>';
                var compPrice = 0;
                if(!table_information[i].Pizza[j].Comp) out += '<th>' + pizzaPrice.toFixed(2) + '</th>';
                else out+= '<th>' + compPrice.toFixed(2) + '</th>';
                if(!table_information[i].Pizza[j].Comp) totalPrice += pizzaPrice;
                if(!table_information[i].Pizza[j].Comp) out += '<th><a href="#EditPizzaModal" class="btn btn-default" data-toggle="modal" data-dismiss="modal" onclick="tableChangeInformationSpecific(' + i + ', ' + j + ')">Edit Pizza</a></th></tr>';
                else out+= '<th>COMP</th>';
            }
            out += '</tbody>';
            out += '</table>';
            out += '<h4 id="TableTitle">Total</h4>';
            out += '<table class="table table-striped">';
            out += '<tbody>';
            out += '<tr>';
            out += '<th class="col-md-8 col-sm-8 col-xs-8">Tip</th>';
            out += '<th class="col-md-2 col-sm-2 col-xs-2">' + parseFloat(table_information[i].Tip).toFixed(2) + '</th>';
            totalPrice += parseFloat(table_information[i].Tip);
            out += '<th class="col-md-2 col-sm-2 col-xs-2"><a href="#AddTip" class="btn btn-default" data-toggle="modal" onclick="tableChangeInformation(' + i + ')" data-dismiss="modal">Add Tip</a></th>';
            out += '</tr>';
            out += '<tr>';
            out += '<th>Coupon</th>';
            var CouponValue = table_information[i].Coupon;
            totalPrice -= CouponValue;
            out += '<th>' + CouponValue.toFixed(2) + '</th>';
            out += '<th><a href="#AddCoupon" class="btn btn-default" data-toggle="modal" onclick="tableChangeInformation(' + i + ')" data-dismiss="modal">Add Coupon</a></th>';
            out += '</tr>';
            out += '<tr>';
            out += '<th>Total</th>';
            if(totalPrice < 0) totalPrice = 0;
            out += '<th>' + totalPrice.toFixed(2) + '</th>';
            if(table_information[i].Paid) {
                out += '<th><a href="#PrintRecipt" class="btn btn-default" data-toggle="modal" onclick="tableChangeInformation(' + i + ')" data-dismiss="modal">Print Recipt</a></th>';
                out += '</tr>';
                out += '<th></th><th></th>';
                out += '<th><a href="#ClearTableModal" class="btn btn-default" data-toggle="modal" onclick="tableChangeInformation(' + i + ')" data-dismiss="modal">Clear Table</a></th>'
            }
            else {
                out += '<th><a href="#PayBill" class="btn btn-default" data-toggle="modal" onclick="tableChangeInformation(' + i + ')" data-dismiss="modal">Pay Tab</a></th>';
            }
            out += '</tr>';
            out += '</tbody>';
            out += '</table>';
            out += '</div>';
            out += '</div>';
            out += '</div>';
        }
        else {
            out += '<div id="notification-row" class="row">';
            out += '<div class="col-md-6 col-sm-6 col-xs-6">';
            out += '<h3>Table ' + table_information[i].TableNumber + '</h3>';
            out += '</div>';
            out += '<div class="col-md-6 col-sm-6 col-xs-6" align="right">';
            //The i is the location when the x is clicked the option is removed
            out += '<a onclick="expand(' + i + ')"><i" class="fa fa-arrow-down fa-3x"></i></a>';
            out += '</div>';
            out += '</div>';
        }
    }
    document.getElementById("notificationRows").innerHTML = out;
}