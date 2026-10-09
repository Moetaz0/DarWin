from rest_framework import status
from rest_framework.test import APITestCase

from .models import User


class AuthenticationApiTests(APITestCase):
	def test_register_login_and_fetch_current_user(self):
		registration = self.client.post(
			"/api/auth/register/",
			{
				"username": "amina",
				"email": "amina@example.com",
				"phone": "+21612345678",
				"password": "secure-pass-123",
				"role": "landlord",
			},
			format="json",
		)

		self.assertEqual(registration.status_code, status.HTTP_201_CREATED)
		user = User.objects.get(username="amina")
		self.assertTrue(user.check_password("secure-pass-123"))

		login = self.client.post(
			"/api/auth/login/",
			{"username": "amina", "password": "secure-pass-123"},
			format="json",
		)

		self.assertEqual(login.status_code, status.HTTP_200_OK)
		self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {login.data['access']}")
		me = self.client.get("/api/auth/me/")

		self.assertEqual(me.status_code, status.HTTP_200_OK)
		self.assertEqual(
			me.data,
			{
				"id": user.id,
				"username": "amina",
				"email": "amina@example.com",
				"phone": "+21612345678",
				"role": "landlord",
			},
		)
from django.test import TestCase

# Create your tests here.
