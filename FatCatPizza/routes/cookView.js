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
  console.log("sending...");
  var currentuser = JSON.parse(fs.readFileSync('./current-user.json', 'utf8'));
  res.render('cookView', {
    title: 'Fat Cat Pizza',
    tables: tables.Tables,
    notifications: cookNotifications.notifications,
    pastNotifications: pastNotifications.notifications,
    ingredients: ingredients.ingredients,
    claimed: claimed.claimed,
    userInformation: currentuser});
});

router.post('/addtostock', function(req, res) {
  var ingredient = req.body;
  var ingredientIndex = ingredient.IngredientIndex;
  var ingredientType = ingredient.Type;
  ingredients.ingredients[ingredientType][ingredientIndex].Status = true;
  res.send(ingredients);
  updateIngredientsJson();
});

router.post('/removefromstock', function(req, res) {
  var ingredient = req.body;
  var ingredientIndex = ingredient.IngredientIndex;
  var ingredientType = ingredient.Type;
  ingredients.ingredients[ingredientType][ingredientIndex].Status = false;
  res.send(ingredients);
  updateIngredientsJson();
});

router.post('/updatevariables', function(req, res) {
  var returnCookNotifications = require('./../cook-notifications.json');
  var returnTables = require('./../tables.json');
  var returnPastNotifications = require('./../cook-past.json');
  var returnIngredients = require('./../ingredients.json');
  var returnClaimed = require('./../cook-claimed.json');
  var returnData = {
    tables: returnTables.Tables,
    notifications: returnCookNotifications.notifications,
    pastNotifications: returnPastNotifications.notifications,
    ingredients: returnIngredients.ingredients,
    claimed: returnClaimed.claimed
  };
  res.send(returnData);
});

router.post('/removenotification', function(req, res) {
  var removeNotification = req.body;
  var NotificationIndex = removeNotification.NotificationIndex;
  pastNotifications.notifications.unshift(cookNotifications.notifications[NotificationIndex]);
  claimed.claimed.push(cookNotifications.notifications[NotificationIndex]);
  cookNotifications.notifications.splice(NotificationIndex, 1);
  var returnJson = {
    cookNotifications: cookNotifications.notifications,
    pastNotifications: pastNotifications.notifications,
    claimed: claimed.claimed
  };
  res.send(returnJson);
  updatePastJson();
  updateCookNotificationsJson();
  updateClaimedJson();
});

router.post('/updatestatus', function(req, res) {
  var statusObject = req.body;
  var currentObject = claimed.claimed[statusObject.Index];
  currentObject.Pizza.Status = statusObject.Status;
  tables.Tables[currentObject.TableIndex].Pizza[currentObject.PizzaIndex].Status = statusObject.StatusMessage;
  claimed.claimed[statusObject.Index].Pizza.Status = statusObject.StatusMessage;
  if(statusObject.StatusMessage == "Finished") {
    var tempWaitstaff = require('./../waitstaff-notifications.json');
    var waitNotification = {
      TableNumber: currentObject.TableNumber,
      Description: "Order is ready to be delivered"
    };
    tempWaitstaff.notifications.push(waitNotification);
    waitstaffNotifications = tempWaitstaff;
    updateNotificationsJson();
    claimed.claimed.splice(statusObject.Index, 1);
  }
  res.send(claimed.claimed);
  updateClaimedJson();
  updateTableJson();
});

module.exports = router;
