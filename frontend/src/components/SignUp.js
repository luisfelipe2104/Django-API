import React from 'react'
import { useState } from "react"
import { useNavigate } from "react-router-dom" 
import { Form, Button } from "react-bootstrap";
import "../css/SignUp.css"

function SignUp(props) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const navigate = useNavigate() // allow us to navigate through different pages

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

  function createAccount(e) {
    var csrftoken = getCookie('csrftoken')

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        username: username,
      }),
    };
    fetch("http://127.0.0.1:8000/api/createUser", requestOptions) // sends the data to the api
      .then((res) => {
        return res.json();
      })
      .then((data) => (console.log(data), 
                      props.setAlert({variant: "success", 
                      message: "Your account has been created."
                    }),
                    props.setUser(data.username),
                    navigate("/")
                      ))
      .catch((err) => console.error(err));
  }

  function updadeUsername(e){
    setUsername(e.target.value)
  }

  function updadeFirstName(e){
    setFirstName(e.target.value)
  }

  function updadeLastName(e){
    setLastName(e.target.value)
  }

  return (
    <Form className="center-form">
      <Form.Group className="mb-4">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Username" onInput={updadeUsername} />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="First Name" onInput={updadeFirstName} />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Last Name" onInput={updadeLastName} />
      </Form.Group>

      <Button variant="primary" type="button" onClick={createAccount}>Create Account</Button>
    </Form>
  )
}

export default SignUp