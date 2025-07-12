import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import '../styles/LoginPage.css';
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const LoginPage = () => {
  const [registrationFormStatus, setRegistrationFormStatus] = useState(false);

  const loginProps = useSpring({
    left: registrationFormStatus ? -500 : 0,
  });

  const registerProps = useSpring({
    left: registrationFormStatus ? 0 : 500,
  });

  const loginButtonProps = useSpring({
    bordeBottom: registrationFormStatus ? "solid 0px transparent" : "solid 2px white"
  })

  const registerButtonProps = useSpring({
    bordeBottom: registrationFormStatus ? "solid 2px white" : "solid 0px transparent"
  })

  const loginClicked = () => {
    setRegistrationFormStatus(false)
  }

  const registerClicked = () => {
    setRegistrationFormStatus(true)
  }

  return (<div className="container">
    <div className="login-wrapper">
      <div className="nav-buttons">
        <animated.button id="loginButton" onClick={loginClicked} style={loginButtonProps}>
          Login
        </animated.button>
        <animated.button id="loginButton" onClick={registerClicked} style={registerButtonProps}>
          Register
        </animated.button>
      </div>
      <div className="form-group">
        <animated.form action="" id="loginform" style={loginProps}>
          <LoginForm />
        </animated.form>
        <animated.form action="" id="registerform" style={registerProps}>
          <RegisterForm />
        </animated.form>
      </div>
    </div>
  </div>);
};

export default LoginPage;
