import React, { useState } from "react";
import "./styles.scss";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import AuthWrapper from "../AuthWrapper";

import { signInWithGoogle, auth } from "../../firebase/utils";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from "react-router-dom";


const SignIn = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const resetForm = () => {
    setEmail('');
    setPassword('');
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      resetForm();
      navigate('/');

    } catch (error) {
      //console.log(error)
    }
  };

  const configAuthWrapper = {
    headline: "Login",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrapper">
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={e => setEmail(e.target.value)}
          />

          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={e => setPassword(e.target.value)}
          />

          <Button type="submit">Login</Button>

          <div className="socialSignin">
            <div className="row">
              <Button onClick={signInWithGoogle}>Sign in with Google</Button>
            </div>
          </div>
          <div className="links">
            <Link to="/recovery">Reset Password</Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};


export default SignIn;