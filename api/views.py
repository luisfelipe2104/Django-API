from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import UserSerializer
from .serializers import PostSerializer
from .serializers import FollowersCountSerializer
from .models import Post, User
from .models import FollowersCount

# Create your views here.
@api_view(['GET'])
def userList(resquest):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)

    return Response(serializer.data)

@api_view(['POST'])
def createUser(request):
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['GET'])
def getUser(request, pk):
    user = User.objects.get(username=pk)
    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)

@api_view(['GET'])
def userProfile(request, pk):
    followers = len(FollowersCount.objects.filter(user=pk))
    following = len(FollowersCount.objects.filter(follower=pk))
    user = User.objects.get(username=pk)
    profileImage = user.photo.url

    data = {
        "user":user.username,
        "followers":followers,
        "following":following,
        "profileImage":profileImage,
    }

    return Response(data)

@api_view(['POST'])
def createPost(request):
    serializer = PostSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['GET'])
def postList(request):
    Posts = Post.objects.all()
    serializer = PostSerializer(Posts, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def getPost(request, pk):
    post = Post.objects.filter(author=pk)
    serializer = PostSerializer(post, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def getFollowingPosts(request, pk):
    followers = FollowersCount.objects.filter(follower=pk)
    serializer = FollowersCountSerializer(followers, many=True)

    return Response(serializer.data)
