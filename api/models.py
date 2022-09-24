from django.db import models

# Create your models here.
class Profile(models.Model):
    username = models.CharField(unique=True, max_length=30)
    firstName = models.CharField(max_length=30)
    lastName = models.CharField(max_length=30)
    photo = models.ImageField(upload_to="profileImages", blank=True, null=True)
    bio = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username

class FollowersCount(models.Model):
    follower = models.CharField(max_length=100)
    user = models.CharField(max_length=100)

    def __str__(self):
        return self.user

class Post(models.Model):
    author = models.CharField(max_length=30)
    photo = models.ImageField(upload_to="postImages")
    description = models.TextField(default="")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.author
