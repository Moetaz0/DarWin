from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
	fieldsets = UserAdmin.fieldsets + (("Profile", {"fields": ("phone", "role")}),)
	add_fieldsets = UserAdmin.add_fieldsets + (("Profile", {"fields": ("email", "phone", "role")}),)
from django.contrib import admin

# Register your models here.
