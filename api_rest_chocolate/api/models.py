from faulthandler import disable
from django.db import models
from django.forms import IntegerField

# Create your models here.


class CompraChocolate(models.Model):
    initial_amount = models.PositiveIntegerField()
    cost_chocolate_bar = models.PositiveIntegerField()
    wrappers_free = models.PositiveIntegerField()
    chocolate_eaten = models.IntegerField(default=0)
