var express = require('express');
var fs = require('fs');
var router = express.Router();

var waitstaffNotifications = require('./../waitstaff-notifications.json');
var tables = require('./../tables.json');
var pastNotifications = require('./../waitstaff-past.json');
var ingredients = require('./../ingredients.json');
var cookNotifications = require('./../cook-notifications.json');

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

function updatePastJson() {
    var string = JSON.stringify(pastNotifications, null, 2);
    fs.writeFile('./waitstaff-past.json', string, function(err) {
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
    console.log("sending...");
    var currentuser = JSON.parse(fs.readFileSync('./current-user.json', 'utf8'));
    res.render('admin', {
        title: 'Fat Cat Pizza',
        tables: tables.Tables,
        notifications: waitstaffNotifications.notifications,
        pastNotifications: pastNotifications.notifications,
        ingredients: ingredients.ingredients,
        userInformation: currentuser});
});

router.post('/addpizza', function(req, res) {
    var pizza = req.body;
    console.log(pizza);
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

router.post('/addcoupon', function(req, res) {
    var coupon = req.body;
    var TableIndex = coupon.TableIndex;
    delete coupon.TableIndex;
    tables.Tables[TableIndex].Coupon = coupon.Coupon;
    res.send(tables.Tables);
    updateTableJson();
});

router.post('/removepizza', function(req, res) {
    var removePizza = req.body;
    var TableIndex = removePizza.TableIndex;
    var PizzaIndex = removePizza.PizzaIndex;
    tables.Tables[TableIndex].Pizza.splice(PizzaIndex, 1);
    res.send(tables.Tables);
    updateTableJson();
});

router.post('/updateingredients', function(req, res) {
    var returnIngredients = require('./../ingredients.json');
    console.log(returnIngredients);
    res.send(returnIngredients.ingredients);
});

router.post('/updatevariables', function(req, res) {
    var returnWaitstaffNotifications = require('./../waitstaff-notifications.json');
    var returnTables = require('./../tables.json');
    var returnPastNotifications = require('./../waitstaff-past.json');
    var returnIngredients = require('./../ingredients.json');
    var returnData = {
        tables: returnTables.Tables,
        notifications: returnWaitstaffNotifications.notifications,
        pastNotifications: returnPastNotifications.notifications,
        ingredients: returnIngredients.ingredients
    };
    res.send(returnData);
});

router.post('/removecustomer', function(req, res) {
    var removeCustomer = req.body;
    var TableIndex = removeCustomer.TableIndex;
    var CustomerIndex = removeCustomer.CustomerIndex;
    tables.Tables[TableIndex].Customers.splice(CustomerIndex, 1);
    res.send(tables.Tables);
    updateTableJson();
});

router.post('/cleartable', function(req, res) {
    var clearTable = req.body;
    var TableIndex = clearTable.TableIndex;
    delete clearTable.TableIndex;
    tables.Tables[TableIndex] = clearTable;
    res.send(tables.Tables);
    updateTableJson();
});

router.post('/editdrink', function(req, res) {
    var editDrink = req.body;
    var TableIndex = editDrink.TableIndex;
    var CustomerIndex = editDrink.CustomerIndex;
    tables.Tables[TableIndex].Customers[CustomerIndex].Drink = editDrink.Drink;
    res.send(tables.Tables);
    updateTableJson();
});

router.post('/editpizza', function(req, res) {
    var editPizza = req.body;
    var TableIndex = editPizza.TableIndex;
    var PizzaIndex = editPizza.PizzaIndex;
    delete editPizza.TableIndex;
    delete editPizza.PizzaIndex;
    tables.Tables[TableIndex].Pizza[PizzaIndex] = editPizza;
    res.send(tables.Tables);
    updateTableJson();
});

router.post('/comppizza', function(req, res) {
    var compPizza = req.body;
    var TableIndex = compPizza.TableIndex;
    var PizzaIndex = compPizza.PizzaIndex;
    tables.Tables[TableIndex].Pizza[PizzaIndex]['Comp'] = true;
    res.send(tables.Tables);
    updateTableJson();
});

router.post('/compdrink', function(req, res) {
    var compDrink = req.body;
    var TableIndex = compDrink.TableIndex;
    var CustomerIndex = compDrink.CustomerIndex;
    tables.Tables[TableIndex].Customers[CustomerIndex]['Comp'] = true;
    res.send(tables.Tables);
    updateTableJson();
});

router.post('/removenotification', function(req, res) {
    var removeNotification = req.body;
    var NotificationIndex = removeNotification.NotificationIndex;
    pastNotifications.notifications.unshift(waitstaffNotifications.notifications[NotificationIndex]);
    waitstaffNotifications.notifications.splice(NotificationIndex, 1);
    var returnJson = {
        waitstaffNotifications: waitstaffNotifications.notifications,
        pastNotifications: pastNotifications.notifications
    };
    res.send(returnJson);
    updatePastJson();
    updateNotificationsJson();
});

router.post('/addtip', function(req, res) {
    var tip = req.body;
    var TableIndex = tip.TableIndex;
    delete tip.TableIndex;
    tables.Tables[TableIndex].Tip = tip.Tip;
    res.send(tables.Tables);
    updateTableJson();
});

router.post('/paid', function(req, res) {
    var paid = req.body;
    var TableIndex = paid.TableIndex;
    delete paid.TableIndex;
    tables.Tables[TableIndex].Paid = paid.Paid;
    res.send(tables.Tables);
    updateTableJson();
});

router.post('/adddrink', function(req, res) {
    var customer = req.body;
    var TableIndex = customer.TableIndex;
    delete customer.TableIndex;
    tables.Tables[TableIndex].Customers.push(customer);
    res.send(tables.Tables);
    updateTableJson();
});

module.exports = router;
