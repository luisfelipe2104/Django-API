from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import UserSerializer
from .serializers import PostSerializer
from .serializers import FollowersCountSerializer
from .models import Post, Profile
from .models import FollowersCount

# Create your views here.
@api_view(['GET'])
def userList(resquest):
    users = Profile.objects.all()
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
    user = Profile.objects.get(username=pk)
    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)


@api_view(['GET'])
def userProfile(request, pk):
    followersList = FollowersCount.objects.filter(user=pk)
    followers = len(FollowersCount.objects.filter(user=pk))
    following = len(FollowersCount.objects.filter(follower=pk))
    user = Profile.objects.get(username=pk)
    try:
        profileImage = user.photo.url
    except ValueError:
        profileImage = ""


    serializer = FollowersCountSerializer(followersList, many=True)

    data = {
        "user":user.username,
        "followers":followers,
        "following":following,
        "profileImage":profileImage,
        "followerList": serializer.data
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

@api_view(['POST'])
def updateProfile(request, pk):
    user = Profile.objects.get(id=pk)
    serializer = UserSerializer(instance=user, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['POST'])
def updatePost(request, pk):
    post = Post.objects.get(id=pk)
    serializer = PostSerializer(instance=post, data=request.data)

    # instance = self.get_object()
    # instance.name = request.data.get("name")
    # instance.save()

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['POST'])
def followUser(request):
    serializer = FollowersCountSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['GET'])
def followingTable(request):
    list = FollowersCount.objects.all()

    serializer = FollowersCountSerializer(list, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def checkFollowing(request, pk):
    list = FollowersCount.objects.filter(follower=pk)

    serializer = FollowersCountSerializer(list, many=True)

    return Response(serializer.data)

@api_view(['DELETE'])
def unfollow(request, pk):
    id = FollowersCount.objects.get(id=pk)
    id.delete()

    return Response("Item successfully deleted!")
