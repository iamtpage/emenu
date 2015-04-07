from django.db import models

# Create your models here.


class Drink(models.Model):
	DRINK_CHOICES = (
		('cocacola', 'CocaCola'),
		('sprite', 'Sprite'),
		('sweettea', 'Sweet Tea'),
		('drpepper', 'Dr Pepper'),
		('lemonade', 'Lemonade'),
		('water', 'Water'),
		('canadadry', 'Canada Dry'),
	)
	itemId = models.IntegerField()
	drink = models.CharField(choices=DRINK_CHOICES, default='water', max_length = 10)


class Dessert(models.Model):
	DESERT_CHOICES = (
		('icecream', 'Ice Cream'),
		('lavacake', 'Lava Cake'),
		('cookie', 'Cookie'),
		('brownie', 'Brownie'),
		('lemoncake', 'Lemon Cake'),
	)
	itemId = models.IntegerField()
	desert = models.CharField(choices=DESERT_CHOICES, max_length = 10)


class Topping(models.Model):
	TOPPING_CHOICES = (
		('onions','Onions'),
		('greenpeppers','Green Peppers'),
		('olives','Olives'),
		('jalapenos','Jalapenos'),
		('pineapple','Pineapple'),
		('pepperoni','Pepperoni'),
		('meatball','Meatball'),
		('ham','Ham'),
		('spinach','Spinach'),
		('tomato','Tomato'),
		('chicken','Chicken'),
		('extracheese','Extra Chesse'),
	)
	topping = models.CharField(choices=TOPPING_CHOICES, max_length = 20)


class Pizza(models.Model):
        SAUCE_CHOICES = (
                ('marinara', 'Marinara'),
                ('alfredo', 'Alfredo'),
        )
        CRUST_CHOICES = (
                ('pancrust', 'Pan Crust'),
                ('handcrust', 'Hand Crust'),
                ('stuffedcrust', 'Stuffed Crust'),
        )
	itemId = models.IntegerField()
        crust = models.CharField(choices=CRUST_CHOICES, max_length = 13)
        sauce = models.CharField(choices=SAUCE_CHOICES,max_length=9)
       	toppings = models.ManyToManyField(Topping)


class Item(models.Model):
        ITEM_CHOICES = (
                ('pizza', 'Pizza'),
                ('drink', 'Drink'),
                ('dessert', 'Dessert'),
        )

        item = models.CharField(max_length=8)
	itemId = models.IntegerField()
        name = models.CharField(max_length=80)
        price = models.IntegerField()
        description = models.CharField(max_length=200)


class Order(models.Model):
        tableID = models.IntegerField()
        item = models.ForeignKey(Item)
        price = models.IntegerField()
        quantity = models.IntegerField()

