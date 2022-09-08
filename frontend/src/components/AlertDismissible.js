import React from 'react'
import { useState } from "react"
import { Alert } from "react-bootstrap"

function AlertDismissible({message, variant, deleteAlert}) {
  const [show, setShow] = useState(true)

  if (show){
    return <Alert 
        variant={ variant } // might be success, danger, warning
        onClose={() => {
        deleteAlert()
        setShow(false)
        }}
        dismissible
        >
        { message }
        </Alert>
  }
  else{
    return null
  }
}

export default AlertDismissible