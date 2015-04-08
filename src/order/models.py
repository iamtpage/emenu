from django.db import models

# Create your models here.


class Drink(models.Model):
	DRINK_CHOICES = (
		('CocaCola', 'CocaCola'),
		('Sprite', 'Sprite'),
		('Sweet Tea', 'Sweet Tea'),
		('Dr Pepper', 'Dr Pepper'),
		('Lemonade', 'Lemonade'),
		('Water', 'Water'),
		('Canada Dry', 'Canada Dry'),
	)
	itemID = models.IntegerField()
	drink = models.CharField(choices=DRINK_CHOICES, default='water', max_length = 10)

	def __str__(self):
		return self.drink


class Dessert(models.Model):
	DESERT_CHOICES = (
		('Ice Cream', 'Ice Cream'),
		('Lava Cake', 'Lava Cake'),
		('Cookie', 'Cookie'),
		('Brownie', 'Brownie'),
		('Lemon Cake', 'Lemon Cake'),
	)
	itemID = models.IntegerField()
	dessert = models.CharField(choices=DESERT_CHOICES, max_length = 10)

	def __str__(self):
		return self.dessert


class Topping(models.Model):
	TOPPING_CHOICES = (
		('Onions','Onions'),
		('Green Peppers','Green Peppers'),
		('Olives','Olives'),
		('Jalapenos','Jalapenos'),
		('Pineapple','Pineapple'),
		('Pepperoni','Pepperoni'),
		('Meatball','Meatball'),
		('Ham','Ham'),
		('Spinach','Spinach'),
		('Tomato','Tomato'),
		('Chicken','Chicken'),
		('Extra Cheese','Extra Chesse'),
	)
	topping = models.CharField(choices=TOPPING_CHOICES, max_length = 20)

	def __str__(self):
		return self.topping


class Pizza(models.Model):
        SAUCE_CHOICES = (
                ('Marinara', 'Marinara'),
                ('Alfredo', 'Alfredo'),
        )
        CRUST_CHOICES = (
                ('Pan Crust', 'Pan Crust'),
                ('Hand Crust', 'Hand Crust'),
                ('Stuffed Crust', 'Stuffed Crust'),
        )
	itemID = models.IntegerField()
        crust = models.CharField(choices=CRUST_CHOICES, max_length = 13)
        sauce = models.CharField(choices=SAUCE_CHOICES,max_length=9)
       	toppings = models.ManyToManyField(Topping)

	def __str__(self):
		return "Pizza #" + str(self.itemID)


class Item(models.Model):
        ITEM_CHOICES = (
                ('Pizza', 'Pizza'),
                ('Drink', 'Drink'),
                ('Dessert', 'Dessert'),
        )
        item = models.CharField(max_length=8)
	itemID = models.IntegerField()
        price = models.IntegerField()

	def __str__(self):
		return self.item + " #" + str(self.itemID)


class Order(models.Model):
        tableID = models.IntegerField()
        item = models.ManyToManyField(Item)
        price = models.IntegerField()
	active = models.IntegerField()

	def __str__(self):
		return "Table #" + str(self.tableID)
