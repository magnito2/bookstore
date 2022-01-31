import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import "./styles.scss";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import AuthWrapper from "../AuthWrapper";
import { Link, useNavigate } from "react-router-dom";
import { emailSignInStart, googleSignInStart } from '../../redux/User/user.actions';

const mapState = ({ user }) => ({
  currentUser: user.currentUser
});

const SignIn = (props) => {
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  
  useEffect(()=>{
    if(currentUser){
      resetForm();
      navigate("/");
    }
  }, [currentUser ]);

  const resetForm = () => {
    setEmail('');
    setPassword('');
  }
  
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(emailSignInStart({ email, password}))
  };

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
  }

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
              <Button onClick={handleGoogleSignIn}>Sign in with Google</Button>
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