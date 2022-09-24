import React, { useState, useEffect } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

function EditProfile({ show, hideCallback, user, setAlert, profileData }) {
  const serverUrl = "http://127.0.0.1:8000"
  const [bio, setBio] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [file, setFile] = useState("")
  const [profileImage, setProfileImage] = useState("")

  useEffect(() => {
    setFirstName(profileData.firstName)
    setLastName(profileData.lastName)
    setBio(profileData.bio)
    setProfileImage(profileData.photo)
  }, [profileData])

  function updateProfile(){
    const formData = new FormData()
    if(file){
      formData.append("photo", file)
    }
    else{
      formData.append("photo", profileImage)
    }
    formData.append("username", user)
    formData.append("firstName", firstName)
    formData.append("lastName", lastName)
    formData.append("bio", bio)

    const requestOptions = {
      method: "POST",
      body: formData
    }
    fetch("http://127.0.0.1:8000/api/getUser/" + user)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      const id = data.id
      fetch("http://127.0.0.1:8000/api/update-profile/" + id, requestOptions)
      .then((res) => res.json())
      .then((profile) => {
        console.log(profile)
        setAlert({variant: "success", message: "Profile updated successfully."})
        hideCallback(profile)
      }).catch((err) => {
           setAlert({variant: "danger", message: err.message})
           hideCallback(undefined)
         })
    })
    // fetch("update-profile", requestOptions)
    // .then((res) => res.json())
    // .then((data) => { setAlert({variant: "success", message: "Profile updated successfully."})
    // if (photo) data.photo = URL.createObjectURL(photo)
    // hideCallback(data)
  // }).catch((err) => {
  //     setAlert({variant: "danger", message: err.message})
  //     hideCallback(undefined)
  //   })
  }

  return (
    <Modal show={show} onHide={hideCallback}>
    <Modal.Header closeButton>
      <Modal.Title>Edit Profile</Modal.Title>
    </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            { profileData.photo && !file ? (
                <img src={serverUrl + profileData.photo} className="upload-image" />
                  ) : <img src={file ? URL.createObjectURL(file) : null} className="upload-image" /> }
          </Form.Group>

          <Form.Group className="mb-3">
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])}></input>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
                type="text"
                placeholder="First Name"
                defaultValue={profileData.firstName}
                onInput={(e) => setFirstName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
                  type="text"
                  placeholder="Last Name"
                  defaultValue={profileData.lastName}
                  onInput={(e) => setLastName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
                  type="text"
                  placeholder="Bio"
                  defaultValue={profileData.bio}
                  onInput={(e) => setBio(e.target.value)} />
          </Form.Group>
          <div>
            <Button variant="primary" onClick={updateProfile}>Update</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default EditProfile
