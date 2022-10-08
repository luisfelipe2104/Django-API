import React from 'react'
import { useState } from "react"
import { Form, Button, FormControl } from "react-bootstrap"
import { useNavigate, Link } from "react-router-dom" 

function Login(props) {
  const [username, setUsername] = useState("")
  const navigate = useNavigate()

  function handleLogin(e) {
    fetch("https://sla.onrender.com/api/user-profile/" + username)
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        props.addAlert({ variant: "success", message: "Successfully logged in!" })
        console.log(data, "length ", data.length)
        props.setUser(data.user)
        navigate("/")
      }
      else{
        props.addAlert({ variant: "danger", message: "No user with that name exists!" })
      }
    }).catch((err) => console.log("error: " + err))
  }

  return (
    <Form className="center-form">
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Username" 
          onInput={(e) => {
            setUsername(e.target.value)}
          } 
          />
      <small className='form-text text-muted'>
        Don't have an account? Sign up <Link to="/sign-up">here</Link>
      </small>
      </Form.Group>
      <Button variant="primary" type="button" onClick={ handleLogin }>Login</Button>
    </Form>
  )
}

export default Login