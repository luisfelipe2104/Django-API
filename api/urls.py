from django.urls import path
from . import views

urlpatterns = [
    path("createUser", views.createUser, name="CreateUser"),
    path("userList", views.userList, name="UserList"),
    path("getUser/<str:pk>", views.getUser, name="getUser"),
    path("user-profile/<str:pk>", views.userProfile, name="User Profile"),
    path("create-post", views.createPost, name="CreatePost"),
    path("post-list", views.postList, name="PostList"),
    path("get-post/<str:pk>", views.getPost, name="GetPost"),
    path("get-posts-of-following/<str:pk>", views.getFollowingPosts, name="followingPosts"),
    path("update-profile/<str:pk>", views.updateProfile, name="UpdateProfile"),
    path("update-post/<str:pk>", views.updatePost, name="updatePost"),
    path("follow-user", views.followUser, name="followUser"),
    path("follow-table", views.followingTable, name="followingTable"),
    path("check-following/<str:pk>", views.checkFollowing, name="checkFollowing"),
    path("unfollow/<str:pk>", views.unfollow, name="Unfollow")
]
