from django.contrib import admin

# Register your models here.

from .models import Drink
from .models import Dessert
from .models import Topping
from .models import Pizza
from .models import Item
from .models import Order

admin.site.register(Drink)
admin.site.register(Dessert)
admin.site.register(Topping)
admin.site.register(Pizza)
admin.site.register(Item)
admin.site.register(Order)
