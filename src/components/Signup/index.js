import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import FormInput from "../forms/FormInput";
import Button from "../forms/Button";
import AuthWrapper from "../AuthWrapper";
import { resetAllAuthForms, signUpUser } from "../../redux/User/user.actions";

import "./styles.scss";
import userTypes from "../../redux/User/user.types";

const mapState = ({user}) => ({
  signUpSuccess: user.signUpSuccess,
  signUpError: user.signUpError
});

const Signup = (props) => {
  const {signUpSuccess, signUpError} = useSelector(mapState)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(()=> {
    if(signUpSuccess){
      reset();
      dispatch(resetAllAuthForms());
      navigate('/');
    }
  }, [signUpSuccess]); 

  useEffect(()=> {
    if(Array.isArray(signUpError) && signUpError.length > 0){
      setErrors(signUpError);
    }
  }, [signUpError]); 

  const reset = () => {
    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors([]);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(signUpUser({
      displayName,
      email,
      password,
      confirmPassword
    }));
  };

  const configAuthWrapper = {
    headline: "Registration",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {errors.length ? (
          <ul>
            {errors.map((err, index) => {
              return <li key={index}>{err}</li>;
            })}
          </ul>
        ) : null}
        <form onSubmit={handleFormSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            placeholder="Full Name"
            handleChange={e => setDisplayName(e.target.value)}
          />

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
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            handleChange={e => setConfirmPassword(e.target.value)}
          />

          <Button type="submit">Register</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default Signup;
