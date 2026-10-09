from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
	class Role(models.TextChoices):
		CLIENT = "client", "Client"
		LANDLORD = "landlord", "Landlord"

	email = models.EmailField(unique=True)
	phone = models.CharField(max_length=30, blank=True)
	role = models.CharField(max_length=20, choices=Role.choices, default=Role.CLIENT)
