var express = require('express');
var fs = require('fs');
var router = express.Router();

var waitstaffNotifications = require('./../waitstaff-notifications.json');
var cookNotifications = require('./../cook-notifications.json');
var tables = require('./../tables.json');
var claimed = require('./../cook-claimed.json');
var pastNotifications = require('./../cook-past.json');
var ingredients = require('./../ingredients.json');

function updateTableJson() {
    var string = JSON.stringify(tables, null, 2);
    fs.writeFile('./tables.json', string, function(err) {
        if(err) {
            console.log(err);
        }
        else
        {
            console.log("File Saved");
        }
    });
}
function updateNotificationsJson() {
    var string = JSON.stringify(waitstaffNotifications, null, 2);
    fs.writeFile('./waitstaff-notifications.json', string, function(err) {
        if(err) {
            console.log(err);
        }
        else
        {
            console.log("File Saved");
        }
    });
}

function updateIngredientsJson() {
    var string = JSON.stringify(ingredients, null, 2);
    fs.writeFile('./ingredients.json', string, function(err) {
        if(err) {
            console.log(err);
        }
        else
        {
            console.log("File Saved");
        }
    });
}

function updatePastJson() {
    var string = JSON.stringify(pastNotifications, null, 2);
    fs.writeFile('./cook-past.json', string, function(err) {
        if(err) {
            console.log(err);
        }
        else
        {
            console.log("File Saved");
        }
    });
}

function updateClaimedJson() {
    var string = JSON.stringify(claimed, null, 2);
    fs.writeFile('./cook-claimed.json', string, function(err) {
        if(err) {
            console.log(err);
        }
        else
        {
            console.log("File Saved");
        }
    });
}

function updateCookNotificationsJson() {
    var string = JSON.stringify(cookNotifications, null, 2);
    fs.writeFile('./cook-notifications.json', string, function(err) {
        if(err) {
            console.log(err);
        }
        else
        {
            console.log("File Saved");
        }
    });
}

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("downloading");
    var currentuser = JSON.parse(fs.readFileSync('./current-user.json', 'utf8'));
    res.render('customerView', {
        title: 'Fat Cat Pizza',
        tables: tables.Tables,
        ingredients: ingredients.ingredients,
        userInformation: currentuser});
});

router.post('/user', function(req, res) {
    currentuser = require('./../current-user.json');
    res.send(currentuser);
});

router.post('/addcustomer', function(req, res) {
    var customer = req.body;
    var tableIndex = customer.tableIndex;
    delete customer.tableIndex;
    tables.Tables[tableIndex].Customers.push(customer);
    res.send(tables.Tables);
    updateTableJson();
});

router.post('/updatedrink', function(req, res) {
    var updateDrink = req.body;
    var customerIndex = updateDrink.CustomerIndex;
    var tableIndex = updateDrink.TableIndex;
    var drinkIndex = updateDrink.DrinkIndex;
    tables.Tables[tableIndex].Customers[customerIndex].Drink = ingredients.ingredients.Drinks[drinkIndex].Drink;
    res.send(tables.Tables);
    updateTableJson();
});

router.post('/updatevariables', function(req, res) {
    var returnTables = require('./../tables.json');
    var returnIngredients = require('./../ingredients.json');
    var returnData = {
        tables: returnTables.Tables,
        ingredients: returnIngredients.ingredients
    };
    res.send(returnData);
});

router.post('/refillnotification', function(req, res) {
    var refillNotification = req.body;
    var notification = {
        TableNumber: tables.Tables[refillNotification.tableIndex].TableNumber,
        Description: ""
    };

    var i = 0;
    notification.Description = "The following drink(s) need to be refilled: ";
    for(i = 0; i < refillNotification.Drinks.length; i++) {
        if (refillNotification.Drinks.length - 1 == i) notification.Description += refillNotification.Drinks[i];
        else {
            notification.Description += refillNotification.Drinks[i] + ", ";
        }
    }
    var tempWaitStaffNotifications = require('./../waitstaff-notifications.json');
    tempWaitStaffNotifications.notifications.push(notification);
    waitstaffNotifications = tempWaitStaffNotifications;
    res.send(tables.Tables);
    updateNotificationsJson();
});

router.post('/help', function(req, res) {
    var helpNotification = req.body;
    var notification = {
        TableNumber: tables.Tables[helpNotification.tableIndex].TableNumber,
        Description: "Requested Waitstaff Assistance"
    };

    var tempWaitStaffNotifications = require('./../waitstaff-notifications.json');
    tempWaitStaffNotifications.notifications.push(notification);
    waitstaffNotifications = tempWaitStaffNotifications;
    res.send(tables.Tables);
    updateNotificationsJson();
});

router.post('/addpizza', function(req, res) {
    var pizza = req.body;
    var TableIndex = pizza.TableIndex;
    var cookNotification = {
        "TableNumber": TableIndex + 1,
        "Pizza": pizza,
        "TableIndex": TableIndex
    };
    delete pizza.TableIndex;
    tables.Tables[TableIndex].Pizza.push(pizza);
    cookNotification['PizzaIndex'] = tables.Tables[TableIndex].Pizza.length - 1;
    cookNotifications.notifications.push(cookNotification);
    res.send(tables.Tables);
    updateTableJson();
    updateCookNotificationsJson();
});

router.post('/addtip', function(req, res) {
    var tip = req.body;
    var TableIndex = tip.TableIndex;
    delete tip.TableIndex;
    tables.Tables[TableIndex].Tip = tip.Tip;
    res.send(tables.Tables);
    updateTableJson();
});

router.post('/requestreceipt', function(req, res) {
    var receipt = req.body;
    var notification = {
        TableNumber: tables.Tables[receipt.TableIndex].TableNumber,
        Description: "Needs a printed receipt"
    };
    var tempWaitStaffNotifications = require('./../waitstaff-notifications.json');
    tempWaitStaffNotifications.notifications.push(notification);
    waitstaffNotifications = tempWaitStaffNotifications;
    res.send(tables.Tables);
    updateNotificationsJson();
});

module.exports = router;
