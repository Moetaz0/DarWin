from rest_framework import generics, permissions, serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import User


class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ("id", "username", "email", "phone", "role")


class RegisterSerializer(serializers.ModelSerializer):
	password = serializers.CharField(write_only=True, min_length=8)

	class Meta:
		model = User
		fields = ("username", "email", "phone", "password", "role")

	def create(self, validated_data):
		return User.objects.create_user(**validated_data)


class RegisterView(generics.CreateAPIView):
	queryset = User.objects.all()
	serializer_class = RegisterSerializer
	permission_classes = (permissions.AllowAny,)


class MeView(APIView):
	permission_classes = (permissions.IsAuthenticated,)

	def get(self, request):
		return Response(UserSerializer(request.user).data)


class LoginView(TokenObtainPairView):
	permission_classes = (permissions.AllowAny,)
