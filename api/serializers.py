from rest_framework import serializers
from .models import Profile
from .models import FollowersCount
from .models import Post

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'username', 'firstName', 'lastName', 'photo', 'bio', 'created_at']

class FollowersCountSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowersCount
        fields = ['id', 'follower', 'user']

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'author', 'photo', 'description', 'created_at']
