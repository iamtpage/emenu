//First Loads data into notifications
var tableToChange = 0;
var valueToEdit = 0;
var currentview = 1;
var locationIndex = 0;

function update() {
    CookNotifications();
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
        url:'./cookview/updatevariables',
        contentType:'application/json',
        success: function(data) {
            console.log('returned');
            ingredients = data.ingredients;
            past_notifiations = data.pastNotifications;
            table_information = data.tables;
            notifications = data.notifications;
            claimed = data.claimed;
            if(currentview == 0) currentOrder();
            else if(currentview == 1) CookNotifications();
            else if(currentview == 2) PastNotifications();
            else if(currentview == 3) viewIngredients();
            else if(currentview == 4) expandedClaimed(locationIndex);
            else if(currentview == 5) expandedPast(locationIndex);
        }
    });
}

function currentOrder() {
    currentview = 0;
    var out = "";
    var i = 0;
    var out2 = "";
    //Inserts the code into the header
    out2 = '<ul class="nav navbar-nav navbar-right"><li class="active" ><a href="#" onclick="currentOrder()">Current Order</a></li><li><a href="#" onclick="CookNotifications()">Cook Notifications</a></li><li><a href="#" onclick="PastNotifications()">Past Notifications</a></li><li><a href="#" onclick="viewIngredients()">Ingredients</a></li></ul>';
    for (i = 0; i < claimed.length; i++)
    {
        out += '<div id="notification-row" class="row">';
        out += '<div class="col-md-6 col-sm-6 col-xs-6">';
        out += '<h3>Table ' + claimed[i].TableNumber + '</h3>';
        out += '</div>';
        out += '<div class="col-md-6 col-sm-6 col-xs-6" align="right">';
        out += '<h3></h3>';
        //The i is the location when the x is clicked the option is removed
        out += '<a onclick="expandedClaimed(' + i + ')"><i" class="fa fa-arrow-down fa-3x"></i></a>';
        out += '</div>';
        out += '</div>';
    }
    document.getElementById("notificationRows").innerHTML = out;
    document.getElementById("navOptions").innerHTML = out2;
}

function expandedClaimed(index) {
    currentview = 4;
    locationIndex = index;
    var out = "";
    var i = 0;
    for(i = 0; i < claimed.length; i++)
    {
        out += '<div id="notification-row" class="row">';
        out += '<div class="col-md-6 col-sm-6 col-xs-6">';
        out += '<h3>Table ' + claimed[i].TableNumber + '</h3>';
        out += '</div>';
        out += '<div class="col-md-6 col-sm-6 col-xs-6" align="right">';
        out += '<h3></h3>';
        //The i is the location when the x is clicked the option is removed
        if(i == index) {
            out += '<a onclick="currentOrder()"><i" class="fa fa-arrow-up fa-3x"></i></a>';
            out += '</div>';
            out += '<div id="expandedTable">';
            out += '<div class="col-md-12 col-sm-12 col-xs-12">';
            out += '<div id="TableTitle" class="col-md-12 col-sm-12 col-xs-12">';
            out += '<h4>Ingredients</h4>';
            out += '</div>';
            out += '<table class="table table-striped" width="100%">';
            out += '<thead>';
            out += '<tr>';
            out += '<th class="col-md-4 col-sm-4 col-xs-4">Crust</th>';
            out += '<th class="col-md-4 col-sm-4 col-xs-4">Sauce</th>';
            out += '<th class="col-md-4 col-sm-4 col-xs-4">Toppings</th>';
            out += '</tr>';
            out += '</thead>';
            out += '<tbody>';
            out += '<tr>';
            out += '<th>' + claimed[i].Pizza.Crust + '</th>';
            out += '<th>' + claimed[i].Pizza.Sauce + '</th>';
            out += '<th>';
            var j = 0;
            for(j = 0; j < claimed[i].Pizza.Toppings.length; j++) {
                out+= '<p>' + claimed[i].Pizza.Toppings[j] + '</p>';
            }
            out += '</th>';
            out += '</tr>';
            out += '</tbody>';
            out += '</table>';
            out += '<div align="center">';
            out += '<h3>' + claimed[i].Pizza.SpecialMessage + '</h3>';
            if(claimed[i].Pizza.Status == "In Progress") out += '<th class="col-md-2 col-sm-2 col-xs-2"><a href="#" class="btn btn-default" data-toggle="modal" onclick="updateStatus(0, ' + i + ')">Finish</a></th>';
            else if(claimed[i].Pizza.Status == "Submitted") out += '<th class="col-md-2 col-sm-2 col-xs-2"><a href="#" class="btn btn-primary" data-toggle="modal" onclick="updateStatus(1, ' + i + ')">Start</a></th>';
            out += '<h3></h3>';
            out += '</div>';
            out += '</div>';
            out += '</div>';
        }
        else {
            out += '<a onclick="expandedClaimed(' + i + ')"><i" class="fa fa-arrow-down fa-3x"></i></a>';
            out += '</div>';
        }
        out += '</div>';
    }
    document.getElementById("notificationRows").innerHTML = out;
}

//shows the Cook Notifications
function CookNotifications() {
    currentview = 1;
    var out = "";
    var i = 0;
    var out2 = "";
    //Inserts the code into the header
    out2 = '<ul class="nav navbar-nav navbar-right"><li><a href="#" onclick="currentOrder()">Current Order</a></li><li li class="active" ><a href="#" onclick="CookNotifications()">Cook Notifications</a></li><li><a href="#" onclick="PastNotifications()">Past Notifications</a></li><li><a href="#" onclick="viewIngredients()">Ingredients</a></li></ul>';
    for (i = 0; i < notifications.length; i++)
    {
        out += '<div id="notification-row" class="row">';
        out += '<div class="col-md-6 col-sm-6 col-xs-6">';
        out += '<h3>Table ' + notifications[i].TableNumber + '</h3>';
        out += '</div>';
        out += '<div class="col-md-6 col-sm-6 col-xs-6" align="right">';
        out += '<h3></h3>';
        out += '<div a id="claimButton"><a href="#" class="btn btn-default" data-toggle="modal" onclick="claimOption(' + i + ')">Claim</a></div>';
        out += '</div>';
        out += '</div>';
    }
    document.getElementById("notificationRows").innerHTML = out;
    document.getElementById("navOptions").innerHTML = out2;
}

//Will show past notifications
function PastNotifications() {
    currentview = 2;
    console.log(past_notifications);
    var out = "";
    var i = 0;
    var out2 = "";
    out2 = '<ul class="nav navbar-nav navbar-right"><li><a href="#" onclick="currentOrder()">Current Order</a></li><li><a href="#" onclick="CookNotifications()">Cook Notifications</a></li><li class="active" ><a href="#" onclick="PastNotifications()">Past Notifications</a></li><li><a href="#" onclick="viewIngredients()">Ingredients</a></li></ul>';
    for (i = 0; i < past_notifications.length; i++)
    {
        out += '<div id="notification-row" class="row">';
        out += '<div class="col-md-6 col-sm-6 col-xs-6">';
        out += '<h3>Table ' + past_notifications[i].TableNumber + '</h3>';
        out += '</div>';
        out += '<div class="col-md-6 col-sm-6 col-xs-6" align="right">';
        out += '<h3></h3>';
        //The i is the location when the x is clicked the option is removed
        out += '<a onclick="expandedPast(' + i + ')"><i" class="fa fa-arrow-down fa-3x"></i></a>';
        out += '</div>';
        out += '</div>';
    }
    document.getElementById("notificationRows").innerHTML = out;
    document.getElementById("navOptions").innerHTML = out2;
}

function expandedPast(index) {
    currentview = 5;
    locationIndex = index;
    var out = "";
    var i = 0;
    for(i = 0; i < past_notifications.length; i++)
    {
        out += '<div id="notification-row" class="row">';
        out += '<div class="col-md-6 col-sm-6 col-xs-6">';
        out += '<h3>Table ' + past_notifications[i].TableNumber + '</h3>';
        out += '</div>';
        out += '<div class="col-md-6 col-sm-6 col-xs-6" align="right">';
        out += '<h3></h3>';
        //The i is the location when the x is clicked the option is removed
        if(i == index) {
            out += '<a onclick="P' +
            'astNotifications()"><i" class="fa fa-arrow-up fa-3x"></i></a>';
            out += '</div>';
            out += '<div id="expandedTable">';
            out += '<div class="col-md-12 col-sm-12 col-xs-12">';
            out += '<div id="TableTitle" class="col-md-12 col-sm-12 col-xs-12">';
            out += '<h4>Ingredients</h4>';
            out += '</div>';
            out += '<div align="center">';
            out += '<table class="table table-striped" width="100%">';
            out += '<thead>';
            out += '<tr>';
            out += '<th class="col-md-4 col-sm-4 col-xs-4">Crust</th>';
            out += '<th class="col-md-4 col-sm-4 col-xs-4">Sauce</th>';
            out += '<th class="col-md-4 col-sm-4 col-xs-4">Toppings</th>';
            out += '</tr>';
            out += '</thead>';
            out += '<tbody>';
            out += '<tr>';
            out += '<th>' + past_notifications[i].Pizza.Crust + '</th>';
            out += '<th>' + past_notifications[i].Pizza.Sauce + '</th>';
            out += '<th>';
            var j = 0;
            for(j = 0; j < past_notifications[i].Pizza.Toppings.length; j++) {
                out+= '<p>' + past_notifications[i].Pizza.Toppings[j] + '</p>';
            }
            out += '</th>';
            out += '</th>';
            out += '</tr>';
            out += '</tbody>';
            out += '</table>';


            out += '<h3>' + past_notifications[i].Pizza.SpecialMessage + '</h3>';
            out += '</div>';
            out += '</div>';
            out += '</div>';
        }
        else {
            out += '<a onclick="expandedPast(' + i + ')"><i" class="fa fa-arrow-down fa-3x"></i></a>';
            out += '</div>';
        }
        out += '</div>';
    }
    document.getElementById("notificationRows").innerHTML = out;
}

//Will show table options
function viewIngredients() {
    currentview = 3;
    var i = 0;
    var out = "";
    var out2 = "";
    out2 = '<ul class="nav navbar-nav navbar-right"><li><a href="#" onclick="currentOrder()">Current Order</a></li><li><a href="#" onclick="CookNotifications()">Cook Notifications</a></li><li><a href="#" onclick="PastNotifications()">Past Notifications</a></li><li class="active" ><a href="#" onclick="viewIngredients()">Ingredients</a></li></ul>';
    out += '<div id="notification-row" class="row">';
    out += '<div class="col-md-6 col-sm-6 col-xs-6">';
    out += '<h3>Ingredients</h3>';
    out += '</div>';
    out += '<div id="expandedTable">';
    out += '<div class="col-md-12 col-sm-12 col-xs-12">';
    out += '<div id="TableTitle" class="col-md-12 col-sm-12 col-xs-12">';
    out += '<h4>Drinks</h4>';
    out += '</div>';
    out += '<table class="table table-striped" width="100%">';
    out += '<tbody>';
    for(i = 0; i < ingredients.Drinks.length; i++) {
        out += '<tr>';
        out += '<th class="col-md-10 col-sm-10 col-xs-10">' + ingredients.Drinks[i].Drink +'</th>';
        if(ingredients.Drinks[i].Status) out += '<th class="col-md-2 col-sm-2 col-xs-2"><a href="#" class="btn btn-primary" data-toggle="modal" onclick="removeFromStock(0, ' + i + ')">In Stock</a></th>';
        else out += '<th class="col-md-2 col-sm-2 col-xs-2"><a href="#" class="btn btn-default" data-toggle="modal" onclick="addToStock(0, ' + i + ')">Out of Stock</a></th>';
        out += '</tr>';
    }
    out += '</tbody>';
    out += '</table>';
    out += '</div>';

    out += '<div id="expandedTable">';
    out += '<div class="col-md-12 col-sm-12 col-xs-12">';
    out += '<div id="TableTitle" class="col-md-12 col-sm-12 col-xs-12">';
    out += '<h4>Crusts</h4>';
    out += '</div>';
    out += '<table class="table table-striped" width="100%">';
    out += '<tbody>';
    for(i = 0; i < ingredients.Crusts.length; i++) {
        out += '<tr>';
        out += '<th class="col-md-10 col-sm-10 col-xs-10">' + ingredients.Crusts[i].Crust +'</th>';
        if(ingredients.Crusts[i].Status) out += '<th class="col-md-2 col-sm-2 col-xs-2"><a href="#" class="btn btn-primary" data-toggle="modal" onclick="removeFromStock(1, ' + i + ')">In Stock</a></th>';
        else out += '<th class="col-md-2 col-sm-2 col-xs-2"><a href="#" class="btn btn-default" data-toggle="modal" onclick="addToStock(1, ' + i + ')">Out of Stock</a></th>';
        out += '</tr>';
    }
    out += '</tbody>';
    out += '</table>';
    out += '</div>';

    out += '<div id="expandedTable">';
    out += '<div class="col-md-12 col-sm-12 col-xs-12">';
    out += '<div id="TableTitle" class="col-md-12 col-sm-12 col-xs-12">';
    out += '<h4>Dessert Crusts</h4>';
    out += '</div>';
    out += '<table class="table table-striped" width="100%">';
    out += '<tbody>';
    for(i = 0; i < ingredients.DessertCrusts.length; i++) {
        out += '<tr>';
        out += '<th class="col-md-10 col-sm-10 col-xs-10">' + ingredients.DessertCrusts[i].Crust +'</th>';
        if(ingredients.DessertCrusts[i].Status) out += '<th class="col-md-2 col-sm-2 col-xs-2"><a href="#" class="btn btn-primary" data-toggle="modal" onclick="removeFromStock(2, ' + i + ')">In Stock</a></th>';
        else out += '<th class="col-md-2 col-sm-2 col-xs-2"><a href="#" class="btn btn-default" data-toggle="modal" onclick="addToStock(2, ' + i + ')">Out of Stock</a></th>';
        out += '</tr>';
    }
    out += '</tbody>';
    out += '</table>';
    out += '</div>';

    out += '<div id="expandedTable">';
    out += '<div class="col-md-12 col-sm-12 col-xs-12">';
    out += '<div id="TableTitle" class="col-md-12 col-sm-12 col-xs-12">';
    out += '<h4>Sauces</h4>';
    out += '</div>';
    out += '<table class="table table-striped" width="100%">';
    out += '<tbody>';
    for(i = 0; i < ingredients.Sauces.length; i++) {
        out += '<tr>';
        out += '<th class="col-md-10 col-sm-10 col-xs-10">' + ingredients.Sauces[i].Sauce +'</th>';
        if(ingredients.Sauces[i].Status) out += '<th class="col-md-2 col-sm-2 col-xs-2"><a href="#" class="btn btn-primary" data-toggle="modal" onclick="removeFromStock(3, ' + i + ')">In Stock</a></th>';
        else out += '<th class="col-md-2 col-sm-2 col-xs-2"><a href="#" class="btn btn-default" data-toggle="modal" onclick="addToStock(3, ' + i + ')">Out of Stock</a></th>';
        out += '</tr>';
    }
    out += '</tbody>';
    out += '</table>';
    out += '</div>';

    out += '<div id="expandedTable">';
    out += '<div class="col-md-12 col-sm-12 col-xs-12">';
    out += '<div id="TableTitle" class="col-md-12 col-sm-12 col-xs-12">';
    out += '<h4>Dessert Sauces</h4>';
    out += '</div>';
    out += '<table class="table table-striped" width="100%">';
    out += '<tbody>';
    for(i = 0; i < ingredients.DessertSauces.length; i++) {
        out += '<tr>';
        out += '<th class="col-md-10 col-sm-10 col-xs-10">' + ingredients.DessertSauces[i].Sauce +'</th>';
        if(ingredients.DessertSauces[i].Status) out += '<th class="col-md-2 col-sm-2 col-xs-2"><a href="#" class="btn btn-primary" data-toggle="modal" onclick="removeFromStock(4, ' + i + ')">In Stock</a></th>';
        else out += '<th class="col-md-2 col-sm-2 col-xs-2"><a href="#" class="btn btn-default" data-toggle="modal" onclick="addToStock(4, ' + i + ')">Out of Stock</a></th>';
        out += '</tr>';
    }
    out += '</tbody>';
    out += '</table>';
    out += '</div>';

    out += '<div id="expandedTable">';
    out += '<div class="col-md-12 col-sm-12 col-xs-12">';
    out += '<div id="TableTitle" class="col-md-12 col-sm-12 col-xs-12">';
    out += '<h4>Toppings</h4>';
    out += '</div>';
    out += '<table class="table table-striped" width="100%">';
    out += '<tbody>';
    for(i = 0; i < ingredients.Toppings.length; i++) {
        out += '<tr>';
        out += '<th class="col-md-10 col-sm-10 col-xs-10">' + ingredients.Toppings[i].Topping +'</th>';
        if(ingredients.Toppings[i].Status) out += '<th class="col-md-2 col-sm-2 col-xs-2"><a href="#" class="btn btn-primary" data-toggle="modal" onclick="removeFromStock(5, ' + i + ')">In Stock</a></th>';
        else out += '<th class="col-md-2 col-sm-2 col-xs-2"><a href="#" class="btn btn-default" data-toggle="modal" onclick="addToStock(5, ' + i + ')">Out of Stock</a></th>';
        out += '</tr>';
    }
    out += '</tbody>';
    out += '</table>';
    out += '</div>';

    out += '<div id="expandedTable">';
    out += '<div class="col-md-12 col-sm-12 col-xs-12">';
    out += '<div id="TableTitle" class="col-md-12 col-sm-12 col-xs-12">';
    out += '<h4>Dessert Toppings</h4>';
    out += '</div>';
    out += '<table class="table table-striped" width="100%">';
    out += '<tbody>';
    for(i = 0; i < ingredients.DessertToppings.length; i++) {
        out += '<tr>';
        out += '<th class="col-md-10 col-sm-10 col-xs-10">' + ingredients.DessertToppings[i].Topping +'</th>';
        if(ingredients.DessertToppings[i].Status) out += '<th class="col-md-2 col-sm-2 col-xs-2"><a href="#" class="btn btn-primary" data-toggle="modal" onclick="removeFromStock(6, ' + i + ')">In Stock</a></th>';
        else out += '<th class="col-md-2 col-sm-2 col-xs-2"><a href="#" class="btn btn-default" data-toggle="modal" onclick="addToStock(6, ' + i + ')">Out of Stock</a></th>';
        out += '</tr>';
    }
    out += '</tbody>';
    out += '</table>';
    out += '</div>';
    document.getElementById("notificationRows").innerHTML = out;
    document.getElementById("navOptions").innerHTML = out2;
}

//Deletes option when clicked
function claimOption(location) {
    var removeNotification = {
        "NotificationIndex": location
    };
    var sendObject = JSON.stringify(removeNotification);
    $.ajax({
        type:'POST',
        data: sendObject,
        url:'./cookview/removenotification',
        contentType:'application/json',
        success: function(data) {
            past_notifications = data.pastNotifications;
            notifications = data.cookNotifications;
            currentOrder();
        }
    });
}

//Is called when modals are opened
//When the modal steps are done the table is saved so when finished
//Information can be updated
function tableChangeInformation(location) {
    tableToChange = location;
}

function tableChangeInformationSpecific(tableLocation, editLocation) {
    tableToChange = tableLocation;
    valueToEdit = editLocation;
}

function addToStock(type, index) {
    var ingredientType;
    if(type == 0) ingredientType = 'Drinks';
    else if(type == 1) ingredientType = 'Crusts';
    else if(type == 2) ingredientType = 'DessertCrusts';
    else if(type == 3) ingredientType = 'Sauces';
    else if(type == 4) ingredientType = 'DessertSauces';
    else if(type == 5) ingredientType = 'Toppings';
    else if(type == 6) ingredientType = 'DessertToppings';
    var ingredient = {
        "Type": ingredientType,
        "IngredientIndex": index
    };
    var sendObject = JSON.stringify(ingredient);
    $.ajax({
        type:'POST',
        data: sendObject,
        url:'./cookview/addtostock',
        contentType:'application/json',
        success: function(data) {
            ingredients = data;
            viewIngredients();
        }
    });
}

function removeFromStock(type, index) {
    var ingredientType;
    if(type == 0) ingredientType = 'Drinks';
    else if(type == 1) ingredientType = 'Crusts';
    else if(type == 2) ingredientType = 'DessertCrusts';
    else if(type == 3) ingredientType = 'Sauces';
    else if(type == 4) ingredientType = 'DessertSauces';
    else if(type == 5) ingredientType = 'Toppings';
    else if(type == 6) ingredientType = 'DessertToppings';
    var ingredient = {
        "Type": ingredientType,
        "IngredientIndex": index
    };
    var sendObject = JSON.stringify(ingredient);
    $.ajax({
        type:'POST',
        data: sendObject,
        url:'./cookview/removefromstock',
        contentType:'application/json',
        success: function(data) {
            ingredients = data;
            viewIngredients();
        }
    });
}

function updateStatus(status, index) {
    var statusMessage;
    if(status == 0) statusMessage = "Finished";
    else if(status == 1) statusMessage = "In Progress";
    var statusObject = {
        StatusMessage: statusMessage,
        PizzaArtist: currentuser.firstname,
        Index: index
    };

    var sendObject = JSON.stringify(statusObject);
    $.ajax({
        type:'POST',
        data: sendObject,
        url:'./cookview/updatestatus',
        contentType:'application/json',
        success: function(data) {
            claimed = data;
            if(status == 0) {
                currentOrder();
            }
            else {
                expandedClaimed(locationIndex);
            }
        }
    });
}
