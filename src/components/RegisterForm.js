import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

const RegisterForm = () => {
  const [showPass, setShowPass] = useState(false)
  const [message, setMessage] = useState("")

  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    city: "",
    street: ""
  })

  const togglePassword = (event) => {
    event.preventDefault();

    setShowPass(!showPass)
  }


  return (
    <React.Fragment>
      <div className='inputs-container'>
        <div className='input-container'>
          <label className='email'>Email</label>
          <input
            type='text'
            className='email'
            onChange={(e) => setUser({
              ...user,
              email: e.target.value
            })}
          >
          </input>
        </div>
      </div>
      <div className='input-container'>
        <label className='password'>Password</label>
        <input
          type={showPass ? "text" : "password"}
          className='password'
          onChange={(e) => setUser({
            ...user,
            password: e.target.value
          })}
        >
        </input>
        <span onClick={(e) => togglePassword(e)} style={{ cursor: "pointer" }}>
          <span>
            {showPass ? (
              <FontAwesomeIcon icon={faEye} className='customIcon' />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} className='customIcon' />
            )}
          </span>
        </span>
      </div>
      <div className='inputs-container'>
        <div className='input-container'>
          <label className='city'>City</label>
          <input type="text" className='city'></input>
        </div>
        <div className='input-container'>
          <label className='street'>Street</label>
          <input type="text" className='street'></input>
        </div>
      </div>
      <button className='submit'>
        submit
      </button>
      <span style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        {message}
      </span>
    </React.Fragment >
  )
}

export default RegisterForm
