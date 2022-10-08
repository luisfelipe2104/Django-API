import React, { useEffect, useState } from 'react'
import { Button, ListGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

function ProfileItem({ username, firstName, lastName, photo, bio, created_at }) {
  const navigate = useNavigate()
  const serverUrl = "http://127.0.0.1:8000"
  const [followers, setFollowers] = useState(0)
  const [following, setFollowing] = useState(0)

  fetch("https://sla.onrender.com/api/user-profile/" + username)
        .then((res) => res.json())
        .then((profile) => {
          setFollowers(profile.followers)
          setFollowing(profile.following)
        })

  return (
    <ListGroup.Item>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <img
            src={photo ? serverUrl + photo : "https://via.placeholder.com/80"}
            style={{ width: "80px" }}
          />
          <div>
            <p className="px-2 m-0">
              <strong>{username}</strong>
            </p>
            <p className="px-2 m-0">
              {(firstName ? firstName : "") +
                " " +
                (lastName ? lastName : "")}
            </p>
          </div>
        </div>
        <div className="d-flex flex-column align-items-center">
          <p className="px-2">
            <strong>{followers} Followers</strong>
          </p>
          <Button
            variant="success"
            className="px-2 m-0"
            onClick={() => navigate("/profile/" + username)}
          >
            View
          </Button>
        </div>
      </div>
    </ListGroup.Item>
  )
}

export default ProfileItem