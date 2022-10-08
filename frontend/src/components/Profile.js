import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom"
import { Button } from "react-bootstrap"
import EditProfile from "./EditProfile"
import '../css/Profile.css'

function Profile({user, setAlert}) {
  const serverUrl = "http://127.0.0.1:8000"
  const [profileData, setProfileData] = useState({})
  const [posts, setPosts] = useState([])
  const [followers, setFollowers] = useState(0)
  const [followingAmmount, setFollowingAmmount] = useState(0)
  const [following, setFollowing] = useState(false)
  const [owner, setOwner] = useState(false)
  const [editing, setEditing] = useState(false)
  const params = useParams()
  const [followerList, setFollowerList] = useState([])
  const [followerList2, setFollowerList2] = useState([])

  useEffect(() => {
    updateProfile(params.username)



  }, [params.username, user])

  function updateFollowing(profile){
    fetch("https://sla.onrender.com/api/user-profile/" + profile)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      setFollowerList(data.followerList)

      let folls = followerList.map((element) => {
        return element.follower
      })

      setFollowerList2(folls)



    })


        // setFollowerList2(folls)
        console.log(followerList2)

        console.log(followerList)

    // setFollowerList(followerList)

    // console.log(folls)

    followerList2.forEach((follower) => {
      if(follower === user){
        console.log("0kkkkk")
        setFollowing(true)
        return
      }
    })
    return

  }


  function updateProfile(username){
    fetch("https://sla.onrender.com/api/getUser/" + username)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.username)
      fetch("https://sla.onrender.com/api/check-following/" + user)
      .then((res) => {
        return res.json()
      })
      .then((data2) => {
        data2.forEach((i) => {
          console.log(i.user)
          if(i.user === data.username){
            setFollowing(true)
            console.log(following)
          }
        })
      })
      if(data.lenth === 0){
        setAlert({variant: "danger", message: "Profile does not exist."})
        return
      }
      fetch("https://sla.onrender.com/api/get-post/" + username)
      .then((res) => res.json())
      .then((postes) => {
        setProfileData(data)
        setPosts(postes)
        // setFollowing(data)
        setOwner(user === data.username)
        console.log(data)
        console.log(posts)
        console.log(postes)
      })

    })
    .catch((err) => console.log(err))
  }

  // updateProfile("Kobe")

  function followClick(){
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: profileData.username,
        follower: user,
      }),
    }
    if(!following){
      fetch("https://sla.onrender.com/api/follow-user", requestOptions)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setFollowing(true)
        console.log(data)
      })
    }
    else if(following){
      fetch("https://sla.onrender.com/api/check-following/" + user)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data)
        data.forEach((i) => {
          if (i.user === profileData.username){
            setFollowing(false)
            const requestOptions = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          };
          fetch("https://sla.onrender.com/api/unfollow/" + i.id, requestOptions)
            .then((res) => res.json())
            .then((_data) => updateProfile(params.username))
              }
          })
      })
    }
  }

  function hideEditCallback(data){
    if(data){
      profileData.firstName = data.firstName
      profileData.lastName = data.lastName
      profileData.bio = data.bio
      if(data.photo){
        profileData.photo = data.photo
      }
    }
    setEditing(false)
  }

  if (profileData == {})  return null

  return (
    <div className="profile">
    <EditProfile
      user={user}
      show={editing}
      hideCallback={hideEditCallback}
      profileData={profileData}
      setAlert={setAlert} />

    <div className="profile-banner">
      <h4>@{profileData.username}</h4>
      <div className="profile-data">
        <img
          id="profile-img"
          src={profileData.photo
                ? serverUrl + profileData.photo
                : "https://via.placeholder.com/80"} />

        <div className="vertical-data">
          <p><strong>Posts</strong></p>
          <h4>{posts ? posts.length : 0}</h4>
        </div>

        <div className="vertical-data">
          <p><strong>Followers</strong></p>
          <h4>{followers}</h4>
        </div>

        <div className="vertical-data">
          <p><strong>Following</strong></p>
          <h4>{followingAmmount}</h4>
        </div>

        <div className='follow-button'>
          { user && !owner ? (
            <Button variant={following ? "danger" : "success"} onClick={followClick}>
                {following ? "Unfollow" : "Follow"}
            </Button>
          ) : null }

          { user && owner ?
            <Button variant="primary" onClick={() => setEditing(true)}>
              Edit
            </Button> : null}
        </div>
      </div>
      <div className="profile-bio">
        <div className='profile-name'>
          <strong>
          {(profileData.firstName ? profileData.firstName : "") +
                " " +
          (profileData.lastName ? profileData.lastName : "")}
          </strong>
        </div>
        <div className="profile-text">{profileData.bio}</div>
      </div>
      </div>
      <div className="break"></div>
      <div className="profile-posts-wrapper">
        <div className="profile-posts">
          { posts && posts.length > 0 ? posts.map((post, idx) => {
                  return <img src={ serverUrl + post.photo} key={idx} />})
                  : console.log("false") }
        </div>
      </div>
    </div>
  )
}

export default Profile
