import React from 'react'
import "../css/CreatePost.css"
import { useState, useEffect } from "react"
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

function CreatePost({ user, setAlert }) {
  const [caption, setCaption] = useState("")
  const [file, setFile] = useState("")
  const navigate = useNavigate()

  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

  // runs as soon as the component is redered, make sure we're signed in
  useEffect(() => {
    if(!user) {
      setAlert({ variant: "danger", message: "Please sign in to make a post!" })
      navigate("/login")
    }
  }, [user])  // runs this effect whenever the user changes

  function uploadFile(e){
    setFile(e.target.files[0])
  }

  function makePost(){
    
    // when we send a file, we need to send it in a form of formData
    const formData = new FormData()
    formData.append("author", user)
    formData.append("photo", file)
    formData.append("description", caption)
    var csrftoken = getCookie('csrftoken')
    
    console.log(formData)
    const requestOptions = {
      method: "POST",
      body: formData,
    }
    fetch("http://127.0.0.1:8000/api/create-post", requestOptions)
    .then((_res) => {
      setAlert({ variant: "success", message: "Post created!" })
      navigate("/")
    }).catch((err) => setAlert({ variant: "danger", message: err.message }))
  }

  return (
    <Form className="post-form">
      <div className="create-post">
        <Form.Group className="mb-3">
          {/* references the file and display it */}
          <img src={ file ? URL.createObjectURL(file) : null } className="post-image"></img>
        </Form.Group>

        <Form.Group className="mb-3">
          <input type="file" accept="image/*" onChange={uploadFile} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control 
            type="text" 
            placeholder="Enter a Caption" 
            onInput={ (e) => setCaption(e.target.value) } />
        </Form.Group>
        <div className="post-button-wrapper">
          <Button className="post-button" variant="primary" type="button" onClick={ makePost }>Post</Button>
        </div>
      </div>
    </Form>
  )
}

export default CreatePost